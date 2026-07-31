import bcrypt from 'bcrypt';
import prisma from '../prisma';

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@avatec.com';
  const password = process.env.ADMIN_PASSWORD || 'securepassword123';

  // Check if admin already exists
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log(`Admin user with email ${email} already exists.`);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.adminUser.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  console.log(`Successfully created admin user: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
