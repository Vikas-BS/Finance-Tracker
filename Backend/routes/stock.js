import express from 'express';
import { addStocks, deleteStock, getStocks } from '../controllers/stockController.js';
import { verifyToken } from '../middleware/authentication.js';
const router = express.Router();

router.post('/',verifyToken,addStocks);
router.get('/',verifyToken,getStocks);
router.delete('/:symbol',verifyToken,deleteStock)

export default router;