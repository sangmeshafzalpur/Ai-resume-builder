import express from 'express';
import { generateSummary, enhanceBullet } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Both routes are protected so only valid users can consume AI quota
router.post('/generate-summary', protect, generateSummary);
router.post('/enhance-bullets', protect, enhanceBullet);

export default router;
