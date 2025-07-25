import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BASE_COLORS = [
  "#4CAF50", "#2196F3", "#FF9800", "#9C27B0",
  "#F44336", "#00BCD4", "#FFEB3B", "#795548",
  "#03A9F4", "#8BC34A", "#FF5722", "#E91E63",
];

const ExpensePieChart = ({ onChange }) => {
  const [expenseData, setExpenseData] = useState([]);
  const [categoryColorMap, setCategoryColorMap] = useState({});

  const fetchExpense = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/expense`, {
      credentials: 'include',
    });

    const result = await res.json();
    const rawData = Array.isArray(result) ? result : result.data || [];

    const categoryMap = {};
    rawData.forEach((item) => {
      const category = item.category;
      const amount = Number(item.amount);
      categoryMap[category] = (categoryMap[category] || 0) + amount;
    });

    const chartData = Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    }));

    const newColorMap = { ...categoryColorMap };
    let colorIndex = Object.keys(newColorMap).length;

    chartData.forEach((item) => {
      if (!newColorMap[item.name]) {
        newColorMap[item.name] = BASE_COLORS[colorIndex % BASE_COLORS.length];
        colorIndex++;
      }
    });

    setCategoryColorMap(newColorMap);
    setExpenseData(chartData);
  };

  useEffect(() => {
    fetchExpense();
  }, [onChange]);

  return (
    <div className="w-full rounded-2xl bg-white  border border-gray-200 dark:border-slate-700 dark:bg-slate-800  shadow-md p-4 sm:p-6 min-h-[360px] max-h-[500px]">
      <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center sm:text-left">
        Expense by Category
      </h3>

      <div className="w-full h-[250px] sm:h-[300px] md:h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expenseData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              paddingAngle={2}
              
            >
              {expenseData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={categoryColorMap[entry.name] || "#ccc"}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpensePieChart;
