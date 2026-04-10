import express from 'express';
import {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
} from '../controllers/resumeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Allow public access to get a single resume so that shared links work
// We handle the privacy logic within the controller
router.get('/:id', async (req, res, next) => {
  // If authorization header exists, run the protect middleware
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    return protect(req, res, () => getResumeById(req, res));
  }
  // Otherwise, just proceed without req.user
  getResumeById(req, res);
});

router.route('/').get(protect, getResumes).post(protect, createResume);
router.route('/:id').put(protect, updateResume).delete(protect, deleteResume);


export default router;
