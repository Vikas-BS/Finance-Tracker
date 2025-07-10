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
    <div className="w-full px-4 py-6 sm:px-6 md:px-8 lg:px-12 bg-white flex flex-col ">
      <div className="w-full max-w-[1280px] flex flex-wrap gap-10 m-3 justify-center">
        <div className="w-full sm:w-[48%] lg:w-[30%] flex justify-center">
          <div className="w-full max-w-sm">
            <BalanceCard balance={balance} />
          </div>
        </div>

        <div className="w-full sm:w-[48%] lg:w-[30%] flex justify-center">
          <div className="w-full max-w-sm">
            <IncomeCard
              onTotalChange={setTotalIncome}
              onIncomeAdded={() => setIncomeTrigger((prev) => prev + 1)}
            />
          </div>
        </div>

        <div className="w-full sm:w-[48%] lg:w-[30%] flex justify-center ">
          <div className="w-full max-w-sm">
            <ExpenseCard onTotalChange={setTotalExpense}
            onExpenseAdded={() => setExpenseTrigger((prev) => prev + 1)}
             />
          </div>
        </div>

        {/* Charts Row: Income vs Expense + Stock Market */}
        <div className="w-full max-w-[1280px] flex flex-wrap gap-6 pl-5 mt-6  px-3">
          {/* Income vs Expense */}

          <div className="w-full lg:w-[66.5%]  ">
            <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6 h-full">
              <h2 className="text-lg sm:text-xl font-semibold text-black mb-6 text-center">
                Income vs Expense Analysis
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex-1 min-w-[240px] max-w-[500px] bg-white shadow-inner border border-gray-100 rounded-xl p-4">
                  <IncPi trigger={incomeTrigger} />
                </div>
                <div className="flex-1 min-w-[240px] max-w-[500px] bg-white shadow-inner border border-gray-100 rounded-xl p-4">
                  <ExpPi trigger={expenseTrigger} />
                </div>
              </div>
            </div>
          </div>

          {/* Stock Market */}
          <div className="w-full lg:w-[31%] ">
            <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6 h-full">
              <h2 className="text-lg sm:text-xl font-semibold text-black mb-6 text-center">
                Stock Market
              </h2>
              <div className="overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white justify-center">
                <StockMarket />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
