import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthExp } from "../services/AuthExp";

const categoryIcons = {
  Food: "🍔",
  Transport: "🚗",
  Bills: "💰",
  Shopping: "🛒",
  Entertainment: "🎭",
  Healthcare: "🩺",
  Others: "🧩",
};

const Expense = () => {
  const [expense, setExpense] = useState([]);
  const [filteredExpense, setFilteredExpense] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 5;

  const fetchexpense = async () => {
    try {
      const res = await AuthExp.getExpense();
      const data = res.data;
      if (res.data) {
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setExpense(sorted);
        setFilteredExpense(sorted);
        const uniqueCategories = [
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      } else {
        toast.error(data.message || "Failed to fetch Expense");
      }
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };
  useEffect(() => {
    fetchexpense();
  }, []);

  useEffect(() => {
    let result = [...expense];

    if (selectedCategory) {
      result = result.filter((item) => item.category === selectedCategory);
    }
    setFilteredExpense(result);
    setCurrentPage(1);
  }, [selectedCategory, expense]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredExpense.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredExpense.length / ITEMS_PER_PAGE);

  const clearFilters = () => {
    setSelectedCategory("");
  };

  return (
    <div className="min-h-screen  w-full bg-white dark:bg-slate-800 py-10 px-4 sm:px-10">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex p-2 pr-5 items-center gap-2 bg-white text-gray-700 dark:bg-slate-700 dark:text-gray-200 hover:text-black mb-6"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <h1 className="text-2xl font-bold text-red-500 dark:text-gray-200 mb-6">
          Expense History
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border dark:border-none rounded-lg w-full sm:w-48 bg-white dark:bg-slate-600 text-black dark:text-gray-200"
          >
            <option value="">All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={clearFilters}
            className="bg-gray-100 dark:bg-slate-600 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200"
          >
            Clear Filters
          </button>
        </div>

        {currentItems.length === 0 ? (
          <p className="text-gray-500">No expense entries found.</p>
        ) : (
          <div className="space-y-4">
            {currentItems.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-700 p-4 rounded-xl shadow  dark:border-none border border-gray-200 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">
                      {categoryIcons[item.category] || "💵"}
                    </span>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {item.title}
                    </h2>
                  </div>
                  <span className="text-red-500 font-bold text-lg">
                    -₹{" "}
                    {Number(item.amount).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Date:{" "}
                  {new Date(item.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="text-sm text-gray-500">
                  Category:{" "}
                  <span className="font-medium text-gray-700 dark:text-gray-500">
                    {item.category}
                  </span>
                </p>
                {item.description && (
                  <p className="text-sm text-gray-600 mt-1 italic">
                    "{item.description}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-lg border text-sm ${
                  currentPage === i + 1
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Expense;
