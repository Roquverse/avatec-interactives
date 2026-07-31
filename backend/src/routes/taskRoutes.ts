import express from 'express';
import { getProjectTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';

const router = express.Router();

router.get('/project/:projectId', getProjectTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
