import express from 'express';
import { getBlogPosts, getBlogPost, createBlogPost, updateBlogPost, deleteBlogPost } from '../controllers/blogController';
import { authenticateToken as authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getBlogPosts);
router.get('/:id', getBlogPost);
router.post('/', authenticate, createBlogPost);
router.put('/:id', authenticate, updateBlogPost);
router.delete('/:id', authenticate, deleteBlogPost);

export default router;
