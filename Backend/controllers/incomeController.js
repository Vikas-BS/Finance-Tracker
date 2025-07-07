import Income from '../models/Income.js';

export const addIncome = async(req,res) =>{
    const {title,amount,category,description,date} = req.body;
    // console.log('Request body:', req.body);
    // console.log('User ID:', req.user);
    try{
        const income = await Income.create({
            user: req.user.userId,
            title,
            amount:Number(amount),
            category,
            description,
            date
        
        });

        console.log('Income saved:', income);
        res.status(201).json(income);
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const getIncomes = async(req,res) =>{
    try{
        const incomes = await Income.find({user:req.user.userId}).sort({date:-1});
        res.json(incomes);
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
