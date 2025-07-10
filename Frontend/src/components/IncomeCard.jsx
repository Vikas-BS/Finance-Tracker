import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const IncomeCard = ({ onTotalChange, onIncomeAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
  });
  const [total, setTotal] = useState(0);
  const [customCategory, setCustomCategory] = useState("");
  const navigate = useNavigate();
  const titleRef = useRef(null);

  // Fetch income data
  const fetchIncome = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/income`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        const totalAmount = data.reduce((acc, item) => acc + Number(item.amount), 0);
        setTotal(totalAmount);
        onTotalChange(totalAmount);
      } else {
        toast.error(data.message || "Failed to fetch income.");
      }
    } catch (err) {
      toast.error("Fetch error: " + err.message);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  useEffect(() => {
    if (showModal && titleRef.current) {
      titleRef.current.focus();
    }

    const handleEsc = (e) => {
      if (e.key === "Escape") handleCloseModal();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showModal]);

  const handleSubmit = async () => {
    const finalCategory = formData.category === "Others" ? customCategory : formData.category;

    if (!formData.title || !formData.amount || !formData.category) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/income`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          category: finalCategory,
          amount: Number(formData.amount),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        await fetchIncome();
        handleCloseModal();
        toast.success("Income added successfully!");
        if (typeof onIncomeAdded === "function") onIncomeAdded();
      } else {
        toast.error("Failed to add income, Please add proper income.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleOpenModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ title: "", amount: "", category: "", description: "" });
    setCustomCategory("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Income Card */}
      <div
        onClick={() => navigate("/incomepage")}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-gradient-to-br from-green-100 via-white to-white text-black rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100 transform transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:cursor-pointer"
      >
        <div className="flex justify-between items-start">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-green-700">
            Income
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenModal();
            }}
            className="p-2 bg-green-200 hover:bg-green-300 rounded-full transition"
            title="Add Income"
          >
            <MoreVertical className="text-green-700" size={18} />
          </button>
        </div>
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 mt-4 truncate max-w-full">
          ₹ {total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </div>
        <p className="text-sm text-gray-500 mt-1">Total income</p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-2 sm:px-4">
          <div className="bg-white w-full max-w-md sm:max-w-lg p-4 sm:p-6 rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] transform scale-95 opacity-0 animate-fadeInModal relative">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-green-700">Add Income</h2>

            <input
              ref={titleRef}
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full p-3 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 mb-4"
            />

            <input
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="w-full p-3 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 mb-4"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 mb-4"
            >
              <option value="" disabled>Select Category</option>
              <option>Salary</option>
              <option>Business</option>
              <option>Investments</option>
              <option>Freelancing</option>
              <option>Others</option>
            </select>

            {formData.category === "Others" && (
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter your custom category"
                className="w-full p-3 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 mb-4"
                required
              />
            )}

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description (optional)"
              className="w-full p-3 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 mb-4"
              rows={3}
            />

            <div className="flex justify-end gap-2 mt-2 flex-wrap sm:flex-nowrap">
              <button
                onClick={handleCloseModal}
                className="w-full sm:w-auto px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
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

export default IncomeCard;
