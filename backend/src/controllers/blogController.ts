import { Request, Response } from 'express';
import prisma from '../prisma';
import { getCache, setCache, delCache } from '../redis';

export const getBlogPosts = async (req: Request, res: Response) => {
  try {
    const cached = await getCache('blogs:all');
    if (cached) return res.json(cached);

    const items = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    });
    await setCache('blogs:all', items, 3600);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
};

export const getBlogPost = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const cacheKey = `blog:{id}`.replace('{id}', id);
    const cached = await getCache(cacheKey);
    if (cached) return res.json(cached);

    const item = await prisma.blogPost.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ error: 'Not found' });
    
    await setCache(cacheKey, item, 3600);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
};

export const createBlogPost = async (req: Request, res: Response) => {
  try {
    const item = await prisma.blogPost.create({ data: req.body });
    await delCache('blogs:all');
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create' });
  }
};

export const updateBlogPost = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const item = await prisma.blogPost.update({ where: { id }, data: req.body });
    const cacheKey = `blog:{id}`.replace('{id}', id);
    await delCache('blogs:all');
    await delCache(cacheKey);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update' });
  }
};

export const deleteBlogPost = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.blogPost.delete({ where: { id } });
    const cacheKey = `blog:{id}`.replace('{id}', id);
    await delCache('blogs:all');
    await delCache(cacheKey);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete' });
  }
};
