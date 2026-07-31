import { Request, Response } from 'express';
import prisma from '../prisma';

export const getProjectTasks = async (req: Request<{ projectId: string }>, res: Response) => {
  try {
    const { projectId } = req.params;
    const tasks = await prisma.task.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { projectId, title, status } = req.body;
    const task = await prisma.task.create({
      data: {
        projectId,
        title,
        status: status || 'TODO'
      }
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const updateTask = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;
    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        status
      }
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({
      where: { id }
    });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
