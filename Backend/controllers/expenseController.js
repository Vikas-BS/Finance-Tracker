import Expense from '../models/Expense.js';
import Income from '../models/Income.js'; // Required to fetch income

export const addExpense = async (req, res) => {
  const { title, amount, category, description,date } = req.body;

  try {
 
    const incomes = await Income.find({ user: req.user.userId });
    const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);

 
    const expenses = await Expense.find({ user: req.user.userId });
    const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  
    if (totalExpense + amount > totalIncome) {
      return res.status(400).json({ message: "Expense exceeds available income." });
    }

    const expense = await Expense.create({
      user: req.user.userId,
      title,
      amount,
      category,
      description,
      date
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getExpense = async(req , res)=>{
    try{
        const expenses = await Expense.find({user:req.user.userId}).sort({date:-1});
    res.status(200).json(expenses);
    }catch(err){
        res.status(500).json({message:err.message})
    }
    
}