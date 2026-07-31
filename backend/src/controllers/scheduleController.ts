import { Request, Response } from 'express';
import prisma from '../prisma';
import { getCache, setCache, delCache } from '../redis';

export const getScheduleEvents = async (req: Request, res: Response) => {
  try {
    const cached = await getCache('schedules:all');
    if (cached) return res.json(cached);

    const items = await prisma.scheduleEvent.findMany({
      orderBy: { createdAt: 'desc' },
    });
    await setCache('schedules:all', items, 3600);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
};

export const getScheduleEvent = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const cacheKey = `schedule:{id}`.replace('{id}', id);
    const cached = await getCache(cacheKey);
    if (cached) return res.json(cached);

    const item = await prisma.scheduleEvent.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ error: 'Not found' });
    
    await setCache(cacheKey, item, 3600);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
};

export const createScheduleEvent = async (req: Request, res: Response) => {
  try {
    const item = await prisma.scheduleEvent.create({ data: req.body });
    await delCache('schedules:all');
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create' });
  }
};

export const updateScheduleEvent = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const item = await prisma.scheduleEvent.update({ where: { id }, data: req.body });
    const cacheKey = `schedule:{id}`.replace('{id}', id);
    await delCache('schedules:all');
    await delCache(cacheKey);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update' });
  }
};

export const deleteScheduleEvent = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.scheduleEvent.delete({ where: { id } });
    const cacheKey = `schedule:{id}`.replace('{id}', id);
    await delCache('schedules:all');
    await delCache(cacheKey);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete' });
  }
};
