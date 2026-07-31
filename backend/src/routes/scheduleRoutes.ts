import express from 'express';
import { getScheduleEvents, getScheduleEvent, createScheduleEvent, updateScheduleEvent, deleteScheduleEvent } from '../controllers/scheduleController';
import { authenticateToken as authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getScheduleEvents);
router.get('/:id', getScheduleEvent);
router.post('/', authenticate, createScheduleEvent);
router.put('/:id', authenticate, updateScheduleEvent);
router.delete('/:id', authenticate, deleteScheduleEvent);

export default router;
