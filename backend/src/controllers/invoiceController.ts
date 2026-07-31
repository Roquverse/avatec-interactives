import { Request, Response } from 'express';
import prisma from '../prisma';
import { getCache, setCache, delCache } from '../redis';

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const cached = await getCache('invoices:all');
    if (cached) return res.json(cached);

    const items = await prisma.invoice.findMany({
      orderBy: { createdAt: 'desc' },
    });
    await setCache('invoices:all', items, 3600);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
};

export const getInvoice = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const cacheKey = `invoice:{id}`.replace('{id}', id);
    const cached = await getCache(cacheKey);
    if (cached) return res.json(cached);

    const item = await prisma.invoice.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ error: 'Not found' });
    
    await setCache(cacheKey, item, 3600);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
};

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const item = await prisma.invoice.create({ data: req.body });
    await delCache('invoices:all');
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create' });
  }
};

export const updateInvoice = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const item = await prisma.invoice.update({ where: { id }, data: req.body });
    const cacheKey = `invoice:{id}`.replace('{id}', id);
    await delCache('invoices:all');
    await delCache(cacheKey);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update' });
  }
};

export const deleteInvoice = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.invoice.delete({ where: { id } });
    const cacheKey = `invoice:{id}`.replace('{id}', id);
    await delCache('invoices:all');
    await delCache(cacheKey);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete' });
  }
};
