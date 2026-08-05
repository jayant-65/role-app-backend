import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { getAdminStats, getManagerSummary, getUserProfile } from '../controllers/dashboardController.js';
const router = express.Router();

router.get('/admin', protect, authorize('Admin'), getAdminStats);
router.get('/manager', protect, authorize('Admin', 'Manager'), getManagerSummary);
router.get('/user', protect, authorize('Admin', 'Manager', 'User'), getUserProfile);

export default router;
