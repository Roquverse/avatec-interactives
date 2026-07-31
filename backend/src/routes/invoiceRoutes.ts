import express from 'express';
import { getInvoices, getInvoice, createInvoice, updateInvoice, deleteInvoice } from '../controllers/invoiceController';
import { authenticateToken as authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getInvoices);
router.get('/:id', getInvoice);
router.post('/', authenticate, createInvoice);
router.put('/:id', authenticate, updateInvoice);
router.delete('/:id', authenticate, deleteInvoice);

export default router;
