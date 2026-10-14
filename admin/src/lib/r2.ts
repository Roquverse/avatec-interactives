/**
 * Cloudflare R2 & Supabase Storage Upload Utility
 *
 * Upload order of precedence:
 * 1. Cloudflare Worker endpoint (VITE_R2_WORKER_URL) if configured
 * 2. Supabase Storage bucket 'portfolio' (Public CDN URL)
 * 3. Base64 Optimized Data URL (Guarantees image is permanently saved even if no storage bucket is configured yet)
 */

import { supabase } from './supabase'

const R2_PUBLIC_URL = import.meta.env.VITE_R2_PUBLIC_URL || ''
const R2_WORKER_URL = import.meta.env.VITE_R2_WORKER_URL || ''

/**
 * Convert a File to a Base64 Data URL.
 */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (e) => reject(e)
    reader.readAsDataURL(file)
  })
}

/**
 * Optimize and compress an image client-side to ensure lightweight Base64 storage.
 */
export async function optimizeImageForDataUrl(file: File): Promise<string> {
  // If file is already small (under 1.2MB), keep original
  if (file.size < 1.2 * 1024 * 1024) {
    return fileToDataUrl(file)
  }

  // Otherwise, resize down to max 1920px
  return new Promise((resolve) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      const maxDim = 1920
      let width = img.width
      let height = img.height

      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width)
          width = maxDim
        } else {
          width = Math.round((width * maxDim) / height)
          height = maxDim
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')

      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      } else {
        fileToDataUrl(file).then(resolve)
      }
    }
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      fileToDataUrl(file).then(resolve)
    }
    img.src = objectUrl
  })
}

/**
 * Primary Upload Function
 */
export async function uploadToR2(file: File): Promise<string> {
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
  const fileName = `portfolio-${Date.now()}-${sanitizedName}`

  // 1. If a Cloudflare Worker upload endpoint is configured
  if (R2_WORKER_URL) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('filename', fileName)

      const response = await fetch(R2_WORKER_URL, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        if (data.url) return data.url
        if (R2_PUBLIC_URL) return `${R2_PUBLIC_URL.replace(/\/$/, '')}/${fileName}`
      } else {
        console.warn('R2 worker upload responded with error:', response.status, response.statusText)
      }
    } catch (workerErr) {
      console.warn('R2 worker upload failed, trying Supabase Storage fallback:', workerErr)
    }
  }

  // 2. Upload to Supabase Storage bucket ('portfolio')
  try {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('portfolio')
      .upload(`projects/${fileName}`, file, {
        cacheControl: '3600',
        upsert: true,
      })

    if (!uploadError && uploadData) {
      const { data: publicUrlData } = supabase.storage
        .from('portfolio')
        .getPublicUrl(`projects/${fileName}`)

      if (publicUrlData?.publicUrl) {
        console.log('Uploaded successfully to Supabase Storage:', publicUrlData.publicUrl)
        return publicUrlData.publicUrl
      }
    }

    if (uploadError) {
      console.warn(
        "Supabase Storage 'portfolio' bucket upload error:",
        uploadError.message,
        "\nTo enable Supabase Cloud Storage, run supabase/storage.sql in the Supabase SQL Editor."
      )
    }
  } catch (storageErr) {
    console.warn('Supabase storage exception:', storageErr)
  }

  // 3. Fallback: Base64 Embedded Data URL
  // Ensures image is immediately visible, never 404s, and survives page reloads
  console.info('Using client-side Base64 Data URL fallback for uploaded asset.')
  try {
    const dataUrl = await optimizeImageForDataUrl(file)
    return dataUrl
  } catch (dataUrlErr) {
    console.error('Data URL fallback failed:', dataUrlErr)
  }

  // Final emergency fallback: local object URL
  return URL.createObjectURL(file)
}
