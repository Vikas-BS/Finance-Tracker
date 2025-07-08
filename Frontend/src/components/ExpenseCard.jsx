import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExpenseCard = ({ onTotalChange , onExpenseAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [customCategory , setCustomCategory] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
  });
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const fetchExpense = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/expense`, {
        method: "GET",
        credentials: 'include'
      });

      const data = await res.json();
      if (res.ok) {
        const total = data.reduce((acc, item) => acc + Number(item.amount), 0);
        setTotal(total);
        onTotalChange(total);
      } else {
        toast.error(data.message || "Failed to fetch expenses.");
      }
      
    } catch (err) {
      toast.error("Fetch error: " + err.message);
    }
  };

  const handleSubmit = async () => {
    const finalCategory = formData.category === 'Others' ? customCategory : formData.category;

    if (!formData.title || !formData.amount || !formData.category) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/expense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          category:finalCategory,
          amount: Number(formData.amount),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        await fetchExpense();
        handleCloseModal();
        toast.success("Expense added successfully!");
      } if(typeof onExpenseAdded === "function"){
        onExpenseAdded();
      }else {
        toast.error(data.message || "Failed to add expense.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchExpense();
  }, []);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ title: "", amount: "", category: "", description: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
    
      <div onClick={()=> navigate("/expensepage")} className="bg-gradient-to-tr from-red-100 via-white to-white text-black rounded-2xl p-6 shadow-md border  transform transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] w-full max-w-sm hover:cursor-pointer">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-red-700">Expenses</h3>
          <button
            onClick={(e)=>{
              e.stopPropagation();
              handleOpenModal();
            }}
            className="p-2 bg-red-200 hover:bg-red-300 rounded-full transition"
            title="Add Expense"
          >
            <MoreVertical className="text-red-700" size={18} />
          </button>
        </div>
        <div className="text-3xl font-bold text-red-600 mt-4 truncate max-w-full">
          ₹ {total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </div>
        <p className="text-sm text-gray-500 mt-1">Total expenses</p>
      </div>

     
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-5 text-red-600">Add Expense</h2>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full p-3 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 mb-4"
            />
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="w-full p-3 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 mb-4"
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 mb-4"
            >
              <option value="" disabled>Select Category</option>
              <option>Food</option>
              <option>Transport</option>
              <option>Bills</option>
              <option>Shopping</option>
              <option>Entertainment</option>
              <option>Healthcare</option>
              <option>Others</option>
            </select>

            {formData.category=== 'Others' &&(
              <input
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="Enter your custom category"
              className="w-full p-3 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 mb-4"
              required

              >
              </input>
            )}
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description (optional)"
              rows={3}
              className="w-full p-3 border bg-white text-black rounded-lg focus:outline-none focus:ring-2  mb-4"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpenseCard;
