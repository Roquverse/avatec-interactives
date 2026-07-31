import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import clientRoutes from './routes/clientRoutes';
import projectRoutes from './routes/projectRoutes';
import authRoutes from './routes/authRoutes';
import uploadRoutes from './routes/uploadRoutes';
import blogRoutes from './routes/blogRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import scheduleRoutes from './routes/scheduleRoutes';
import taskRoutes from './routes/taskRoutes';
import path from 'path';
import { authenticateToken } from './middleware/authMiddleware';

const app: Express = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', authenticateToken, clientRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/invoices', authenticateToken, invoiceRoutes);
app.use('/api/schedules', authenticateToken, scheduleRoutes);
app.use('/api/tasks', authenticateToken, taskRoutes);

// Static files
app.use('/project', express.static(path.join(process.cwd(), 'project')));

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
