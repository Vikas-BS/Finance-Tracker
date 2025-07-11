import React from "react";

const BalanceCard = ({ balance }) => {
  const amount =
    typeof balance === "number"
      ? balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })
      : "0.00";

  return (
    <div className=" h-full bg-white/30 dark:bg-blue-600  backdrop-blur-md text-gray-900 dark:text-gray-200 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-none hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.03] w-full max-w-sm relative overflow-hidden">
     
      <div className="absolute inset-0 rounded-2xl dark:border-none border-2 border-transparent bg-gradient-to-tr from-indigo-300 via-purple-300 to-pink-300 opacity-20 pointer-events-none"></div>

     
      <div className="relative z-10">
        <h3 className="text-lg font-medium mb-2 text-indigo-800 dark:text-gray-200">Current Balance</h3>
        <div className="text-4xl font-extrabold text-gray-800 dark:text-gray-200 tracking-tight truncate max-w-full">
          ₹ {amount}
        </div>
        
      </div>
    </div>
  );
};

export default BalanceCard;
