import React, { useState } from "react";
import BalanceCard from "./BalanceCard";
import IncomeCard from "./IncomeCard";
import ExpenseCard from "./ExpenseCard";
import IncPi from "../components/IncPi";
import ExpPi from "../components/ExpPi"

const DashboardCards = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const balance = totalIncome - totalExpense;
  const [incomeTrigger, setIncomeTrigger] = useState(0);
  const [expenseTrigger, setExpenseTrigger] = useState(0);

  return (
    <div className="flex flex-wrap gap-6 justify-center p-6 sm:p-8 bg-white">
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

      <div className="w-full sm:w-[48%] lg:w-[30%] flex justify-center">
        <div className="w-full max-w-sm">
          <ExpenseCard
            onTotalChange={setTotalExpense}
            onExpenseAdded={() => setExpenseTrigger((prev) => prev + 1)}
          />
        </div>
      </div>

      <div className="w-full flex justify-start px-4 sm:px-6 lg:px-12 mt-4">
        <div className="w-full md:w-[62%] lg:w-[53.33%] xl:w-[67%] bg-white shadow-md border border-gray-200 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-black mb-6 text-center">
            Income vs Expense Analysis
          </h2>

          <div className="flex flex-wrap w-full justify-center gap-4">
            <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[48%] xl:w-[45%] bg-white shadow-inner border border-gray-100 rounded-xl p-3">
              <IncPi trigger={incomeTrigger} />
            </div>

            <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[48%] xl:w-[45%] bg-white shadow-inner border border-gray-100 rounded-xl p-3">
              <ExpPi onChange={expenseTrigger} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
