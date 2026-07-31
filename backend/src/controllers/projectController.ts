import { Request, Response } from 'express';
import prisma from '../prisma';
import { getCache, setCache, delCache } from '../redis';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const cachedProjects = await getCache('projects:all');
    if (cachedProjects) {
      return res.json(cachedProjects);
    }

    const { portfolio, admin } = req.query;
    
    // In admin mode, we fetch all projects, otherwise we might filter
    // If portfolio=true is passed, only fetch isPortfolio: true
    const whereClause: any = {};
    if (portfolio === 'true') {
      whereClause.isPortfolio = true;
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      include: {
        client: true,
        tasks: true
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    await setCache('projects:all', projects, 3600);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export const getProject = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    const cachedProject = await getCache(`project:${id}`);
    if (cachedProject) {
      return res.json(cachedProject);
    }

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        client: true,
        tasks: true
      },
    });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await setCache(`project:${id}`, project, 3600);
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description, status, clientId, imageUrl, websiteUrl, tags, companyName, country, category, projectInfo, challenges, outcome, scopeOfWork, gallery, projectType, industry, platform, isPortfolio, startDate, endDate, progress } = req.body;
    const project = await prisma.project.create({
      data: {
        name,
        description,
        status,
        clientId,
        imageUrl,
        websiteUrl,
        tags: tags || [],
        companyName,
        country,
        category,
        projectInfo,
        challenges,
        outcome,
        scopeOfWork,
        gallery: gallery || [],
        projectType,
        industry,
        platform,
        isPortfolio: isPortfolio || false,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        progress: progress || 0
      },
    });

    await delCache('projects:all');
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

export const updateProject = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, status, clientId, imageUrl, websiteUrl, tags, companyName, country, category, projectInfo, challenges, outcome, scopeOfWork, gallery, projectType, industry, platform, isPortfolio, startDate, endDate, progress } = req.body;
    const project = await prisma.project.update({
      where: { id },
      data: {
        name,
        description,
        status,
        clientId,
        imageUrl,
        websiteUrl,
        tags: tags || [],
        companyName,
        country,
        category,
        projectInfo,
        challenges,
        outcome,
        scopeOfWork,
        gallery: gallery || [],
        projectType,
        industry,
        platform,
        isPortfolio: isPortfolio !== undefined ? isPortfolio : undefined,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        progress: progress !== undefined ? progress : undefined
      },
    });

    await delCache('projects:all');
    await delCache(`project:${id}`);
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

export const deleteProject = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({
      where: { id },
    });

    await delCache('projects:all');
    await delCache(`project:${id}`);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};
