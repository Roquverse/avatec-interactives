import { Request, Response } from 'express';
import prisma from '../prisma';
import { getCache, setCache, delCache } from '../redis';

export const getClients = async (req: Request, res: Response) => {
  try {
    const cachedClients = await getCache('clients:all');
    if (cachedClients) {
      return res.json(cachedClients);
    }

    const clients = await prisma.client.findMany({
      include: {
        projects: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    await setCache('clients:all', clients, 3600);
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
};

export const getClient = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    const cachedClient = await getCache(`client:${id}`);
    if (cachedClient) {
      return res.json(cachedClient);
    }

    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        projects: true,
      },
    });
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    await setCache(`client:${id}`, client, 3600);
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch client' });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, company } = req.body;
    const client = await prisma.client.create({
      data: {
        name,
        email,
        phone,
        company,
      },
    });

    await delCache('clients:all');
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create client' });
  }
};

export const updateClient = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone, company } = req.body;
    const client = await prisma.client.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        company,
      },
    });

    await delCache('clients:all');
    await delCache(`client:${id}`);
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update client' });
  }
};

export const deleteClient = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.client.delete({
      where: { id },
    });

    await delCache('clients:all');
    await delCache(`client:${id}`);
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete client' });
  }
};
