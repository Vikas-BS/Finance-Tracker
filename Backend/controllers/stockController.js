import Stocks from "../models/Stocks.js"


export const addStocks = async (req, res) => {
  const { stocks } = req.body;

  try {
    const updated = await Stocks.findOneAndUpdate(
      { user: req.user.userId },
      { $addToSet: { stocks: { $each: stocks.map(s => s.toUpperCase()) } } },
      { new: true, upsert: true }
    );

    res.status(201).json(updated); // return full doc
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getStocks = async (req, res) => {
  try {
    const stocksDoc = await Stocks.findOne({ user: req.user.userId });
    res.json(stocksDoc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



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
