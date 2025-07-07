import { getCurrentUser } from '../controllers/homeController.js';
import express from 'express';
import { verifyToken } from '../middleware/authentication.js';

const router  = express.Router()

router.get('/', verifyToken, getCurrentUser);

export default router