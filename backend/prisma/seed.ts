import prisma from '../src/prisma';

const projects = [
  {
    name: 'Homeowner & Artisan Platform',
    companyName: 'SkillPay',
    description: 'A full-stack cross-border platform connecting homeowners with reliable local artisans, featuring smart matching, chat features, and real-time project management.',
    country: 'United States',
    category: 'SaaS Platform',
    tags: ['Nest.js', 'React', 'PostgreSQL', 'Stripe', 'Redis', 'Paypal', 'Flutter', 'Prisma'],
    imageUrl: '/project/skillpay.png',
  },
  {
    name: 'Farmers Finance & E-commerce Platform',
    companyName: 'Farmlife Market',
    description: 'A smart fin-tech e-commerce solution that provides financial support to farmers and connects them directly to consumers.',
    country: 'United States',
    category: 'Fin-tech SaaS',
    tags: ['Next.js', 'Express', 'PostgreSQL', 'Stripe', 'Redis', 'Paypal', 'Flutter', 'Medusa.js', 'Cloudinary', 'Google Maps', 'AWS', 'Resend'],
    imageUrl: '/project/farmlife.png',
  },
  {
    name: 'Holistic Wellness Platform',
    companyName: 'House of Seitu',
    description: 'A wellness platform, providing tailored treatment plans and product recommendations.',
    country: 'United States',
    category: 'Wellness SaaS',
    tags: ['HTML', 'CSS', 'JavaScript', 'Php', 'MySQL', 'Wordpress', 'Stripe', 'Paypal'],
    imageUrl: '/project/hos.png',
  },
];

async function main() {
  console.log('Start seeding...');
  // Clear existing projects to prevent duplicates on multiple seed runs
  await prisma.project.deleteMany();
  
  for (const projectData of projects) {
    const project = await prisma.project.create({
      data: projectData,
    });
    console.log(`Created project with id: ${project.id}`);
  }
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
