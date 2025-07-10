import mongoose from 'mongoose';


const stockSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // It’s a special type in Mongoose used to reference another document in a different collection — like a foreign key in SQL.
    ref: "User",
    required: true,
  },
  stocks: {
    type: [String],
    default: [],
  },
},{ timestamps: true });

export default mongoose.model('Stocks', stockSchema);
