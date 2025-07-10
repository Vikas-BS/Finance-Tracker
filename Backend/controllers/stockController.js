import Stocks from "../models/Stocks.js"


export const addStocks = async(req,res) =>{
    const {stocks} = req.body;

    try{
        const stock = await Stocks.create({
            user: req.user.userId,
            stocks,
        
        });

        console.log('Stocks saved:', stock);
        res.status(201).json(stock);
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const getStocks = async(req,res) =>{
    try{
        const stocks = await Stocks.find({user:req.user.userId});
        res.json(stocks);
    }catch(err){
        res.status(500).json({message:err.message})
    }
}


export const deleteStock = async (req, res) => {
  try {
    const updated = await Stocks.findOneAndUpdate(
      { user: req.user.userId },
      { $pull: { stocks: req.params.symbol.toUpperCase() } },
      { new: true }
    );

    res.status(200).json(updated.stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
