const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const prisma = new PrismaClient();

async function reset() {
  try {
    const email = 'helpdesk@avatecinteractives.dev';
    // Generate a 13 character password
    const password = crypto.randomBytes(10).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 13);
    if (password.length < 13) {
      // Fallback if base64 stripping makes it too short
      return reset();
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        name: 'Avatec Helpdesk'
      },
      create: {
        email,
        password: hashedPassword,
        name: 'Avatec Helpdesk'
      }
    });

    console.log('SUCCESS');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

reset();
