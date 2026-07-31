import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:51214/template1';

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const count = await prisma.project.count();
  if (count > 0) {
    console.log(`Database already has ${count} projects. Skipping seed.`);
    return;
  }

  console.log('Seeding projects...');

  const projects = [
    {
      name: 'Avatec Dashboard Redesign',
      description: 'A complete overhaul of the internal management dashboard.',
      status: 'COMPLETED',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
      websiteUrl: 'https://admin.avatecinteractives.dev',
      tags: ['React', 'TypeScript', 'Node.js'],
      isPortfolio: true,
      projectInfo: 'The goal of this project was to modernize the legacy dashboard, improving load times by 40% and introducing a new design system.',
      challenges: 'Migrating from a legacy monolithic architecture to a decoupled React frontend and Node backend without downtime.',
      outcome: 'Successfully launched to 500+ internal users with a 98% satisfaction rate.'
    },
    {
      name: 'E-Commerce Platform Expansion',
      description: 'Scaling the e-commerce platform to support international markets.',
      status: 'ACTIVE',
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
      websiteUrl: 'https://example.com/ecommerce',
      tags: ['Next.js', 'PostgreSQL', 'Stripe'],
      isPortfolio: true,
      projectInfo: 'An initiative to add multi-currency support, localization, and a revamped checkout flow.',
      challenges: 'Handling complex tax calculation rules across different jurisdictions and integrating multiple payment gateways.',
      outcome: 'Currently in beta testing in 3 countries, seeing a 15% increase in conversion rates.'
    },
    {
      name: 'Financial Analytics App',
      description: 'Mobile application for real-time financial data visualization.',
      status: 'PLANNED',
      imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
      websiteUrl: 'https://example.com/finance',
      tags: ['Flutter', 'Firebase', 'Data Vis'],
      isPortfolio: true,
      projectInfo: 'A new mobile app targeting retail investors, providing AI-driven insights and portfolio tracking.',
      challenges: 'Ensuring real-time data synchronization with low latency while maintaining battery efficiency on mobile devices.',
      outcome: 'Project is in the planning phase. Architecture review completed.'
    }
  ];

  for (const p of projects) {
    const created = await prisma.project.create({
      data: p
    });
    console.log(`Created project: ${created.name}`);
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
