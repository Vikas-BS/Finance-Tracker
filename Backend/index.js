import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import incomeRoutes from './routes/inc.js'
import expenseRoutes from './routes/exp.js'
import homeRoutes from './routes/home.js'
import stockRoutes from './routes/stock.js'
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/user.js'
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
app.use(cors({
  origin: 'https://finance-tracker-flax-pi.vercel.app', 
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/home',homeRoutes);
app.use('/api/user',userRoutes);
app.use('/api/stock',stockRoutes);
app.get('/' ,(req,res) =>{
  res.json("hello");
})


const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('Mongo error:', err));

app.listen(PORT, () => console.log(`Server running on `));
