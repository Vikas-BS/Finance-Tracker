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
    <div className="w-full px-4 py-8 bg-white dark:bg-slate-950 transition-all">
      <div className="max-w-screen-2xl mx-auto space-y-10">

        {/* Balance, Income, Expense Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Income vs Expense Chart */}
          <div className="col-span-1 lg:col-span-2 bg-white dark:bg-slate-800 shadow-md rounded-xl border dark:border-slate-700 p-6">
            <h2 className="text-xl font-semibold mb-6 text-center text-black dark:text-gray-200">
              Income vs Expense Analysis
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex-1 min-w-[240px] max-w-[500px] bg-white dark:bg-slate-800 shadow-inner rounded-xl border dark:border-slate-700 p-4">
                <IncPi trigger={incomeTrigger} />
              </div>
              <div className="flex-1 min-w-[240px] max-w-[500px] bg-white dark:bg-slate-800 shadow-inner rounded-xl border dark:border-slate-700 p-4">
                <ExpPi trigger={expenseTrigger} />
              </div>
            </div>
          </div>

          {/* Stock Market */}
          <div className="col-span-1 bg-white dark:bg-slate-800 shadow-md rounded-xl border dark:border-slate-700 p-6">
            <h2 className="text-xl font-semibold mb-6 text-center text-black dark:text-gray-200">
              Stock Market
            </h2>
            <div className="overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-400 scrollbar-track-white dark:scrollbar-track-slate-700">
              <StockMarket />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardCards;
