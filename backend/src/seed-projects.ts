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
      projectType: 'Internal Tool',
      industry: 'Software',
      platform: 'Web Application',
      projectInfo: 'The goal of this project was to modernize the legacy dashboard, improving load times by 40% and introducing a new design system.',
      challenges: 'Migrating from a legacy monolithic architecture to a decoupled React frontend and Node backend without downtime.',
      outcome: 'Successfully launched to 500+ internal users with a 98% satisfaction rate.',
      scopeOfWork: 'Full-stack development, UX/UI redesign, and cloud infrastructure migration.',
      gallery: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015',
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076'
      ]
    },
    {
      name: 'E-Commerce Platform Expansion',
      description: 'Scaling the e-commerce platform to support international markets.',
      status: 'ACTIVE',
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
      websiteUrl: 'https://example.com/ecommerce',
      tags: ['Next.js', 'PostgreSQL', 'Stripe'],
      category: 'Fintech',
      projectType: 'B2B Platform',
      industry: 'Financial Technology',
      platform: 'Web & API',
      projectInfo: 'PayFlow provides seamless cross-border payment infrastructure for African businesses. The platform simplifies transactions across multiple currencies and local payment methods.',
      challenges: 'The main challenge was unifying a fragmented financial ecosystem across different African countries, each with strict regulatory requirements, varied payment gateways, and slow traditional banking processes.',
      outcome: 'We developed a unified API that handles multi-currency wallets, instant settlements, and compliance checks automatically. The platform now processes over $50M monthly with 99.9% uptime.',
      scopeOfWork: 'In collaboration with PayFlow, we developed a comprehensive system covering brand identity, a powerful mobile app, and a resilient backend infrastructure. We created a bespoke design language that conveys trust and speed.',
      gallery: [
        'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2070',
        'https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?q=80&w=2070',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'
      ]
    },
    {
      name: 'Financial Analytics App',
      description: 'Mobile application for real-time financial data visualization.',
      status: 'PLANNED',
      imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
      websiteUrl: 'https://example.com/finance',
      tags: ['Flutter', 'Firebase', 'Data Vis'],
      isPortfolio: true,
      projectType: 'Consumer App',
      industry: 'Wealth Management',
      platform: 'iOS & Android',
      projectInfo: 'A new mobile app targeting retail investors, providing AI-driven insights and portfolio tracking.',
      challenges: 'Ensuring real-time data synchronization with low latency while maintaining battery efficiency on mobile devices.',
      outcome: 'Project is in the planning phase. Architecture review completed.',
      scopeOfWork: 'Mobile application design and development, API integration, and real-time data synchronization architecture.',
      gallery: [
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'
      ]
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
