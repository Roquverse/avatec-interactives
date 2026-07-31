import { Request, Response } from 'express';
import prisma from '../prisma';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        client: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export const getProject = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        client: true,
      },
    });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description, status, clientId, imageUrl, websiteUrl, tags, companyName, country, category } = req.body;
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
      },
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

export const updateProject = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, status, clientId, imageUrl, websiteUrl, tags, companyName, country, category } = req.body;
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
      },
    });
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
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};
