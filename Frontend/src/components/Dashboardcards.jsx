import React, { useState } from "react";
import BalanceCard from "./BalanceCard";
import IncomeCard from "./IncomeCard";
import ExpenseCard from "./ExpenseCard";
import IncPi from "../components/IncPi";
import ExpPi from "../components/ExpPi";
import StockMarket from "../components/StockMarket";

const DashboardCards = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const balance = totalIncome - totalExpense;
  const [incomeTrigger, setIncomeTrigger] = useState(0);
  const [expenseTrigger, setExpenseTrigger] = useState(0);

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 bg-white dark:bg-slate-950-custom transition-all">
      <div className="max-w-screen-2xl mx-auto space-y-8 sm:space-y-10 lg:space-y-12">
        {/* Balance, Income, Expense Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <BalanceCard balance={balance} />
          <IncomeCard
            onTotalChange={setTotalIncome}
            onIncomeAdded={() => setIncomeTrigger(prev => prev + 1)}
          />
          <ExpenseCard
            onTotalChange={setTotalExpense}
            onExpenseAdded={() => setExpenseTrigger(prev => prev + 1)}
          />
        </div>

        {/* Charts + Stock Market */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Income vs Expense Chart */}
          <div className="col-span-1 lg:col-span-2 bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border dark:border-slate-700 p-4 sm:p-6 lg:p-8">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 lg:mb-8 text-center text-black dark:text-gray-200">
              Income vs Expense Analysis
            </h2>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
              <div className="flex-1 min-w-[240px] max-w-[500px] bg-white dark:bg-slate-800 shadow-inner rounded-xl border dark:border-slate-700 p-4 sm:p-6">
                <IncPi trigger={incomeTrigger} />
              </div>
              <div className="flex-1 min-w-[240px] max-w-[500px] bg-white dark:bg-slate-800 shadow-inner rounded-xl border dark:border-slate-700 p-4 sm:p-6">
                <ExpPi trigger={expenseTrigger} />
              </div>
            </div>
          </div>

          {/* Stock Market */}
          <div className="col-span-1 bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border dark:border-slate-700 p-4 sm:p-6 lg:p-8">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 text-center text-black dark:text-gray-200">
              Stock Market
            </h2>
            <div className="overflow-y-auto max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-400 scrollbar-track-white dark:scrollbar-track-slate-700 rounded-xl">
              <StockMarket />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
