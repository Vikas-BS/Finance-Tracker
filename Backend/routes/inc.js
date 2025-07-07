import express from 'express';
import { addIncome, getIncomes } from '../controllers/incomeController.js';
import { verifyToken } from '../middleware/authentication.js';
const router = express.Router();

router.post('/',verifyToken,addIncome);
router.get('/',verifyToken,getIncomes);

export default router;