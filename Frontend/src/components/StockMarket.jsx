import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";


const StockMarket = () => {
  const [input, setInput] = useState("");
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStocksFromBackend = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/stock`, {
        credentials: "include",
      });
      const data = await res.json();

      if (data?.stocks?.length > 0) {
        const symbols = data.stocks;

        const prices = await Promise.all(
          symbols.map(async (symbol) => {
            const res = await fetch(
              `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`
            );
            const data = await res.json();
            return {
              symbol,
              price: data.c,
              change: (data.c - data.pc).toFixed(2),
              percent: (((data.c - data.pc) / data.pc) * 100).toFixed(2),
            };
          })
        );

        setStockData(prices);
      } else {
        setStockData([]);
      }
    } catch (err) {
      toast.error("Error fetching stocks:", err);
    }
  };

  const addStock = async () => {
    if (!input.trim()) return;
    const symbol = input.toUpperCase();

    try {
      setLoading(true);

      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`
      );
      const data = await res.json();

      if (!data.c || data.c === 0) {
        toast.error("Invalid or inactive stock symbol");
        return;
      }

      const saveRes = await fetch(`${import.meta.env.VITE_API_URL}/api/stock`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stocks: [symbol] }),
      });

      if (saveRes.ok) {
        setInput("");
        await fetchStocksFromBackend();
      } else {
        const err = await saveRes.json();
        toast.error(err.message);
      }
    } catch (err) {
      toast.error("Error adding stock:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteStock = async (symbol) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/stock/${symbol}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        const updatedStocks = await res.json();
        setStockData((prev) =>
          prev.filter((stock) => updatedStocks.includes(stock.symbol))
        );
      }
    } catch (err) {
      toast.error("Error deleting stock:", err);
    }
  };

  useEffect(() => {
    fetchStocksFromBackend();
  }, []);

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Add Input */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4 mt-2 px-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter stock symbol"
          className="w-full sm:max-w-xs px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addStock}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-6 px-4 pb-6 w-full max-w-full">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : stockData.length === 0 ? (
          <p className="text-center text-gray-400">No stocks tracked yet.</p>
        ) : (
          stockData.map((stock) => (
            <div
              key={stock.symbol}
              className="relative w-full bg-white border border-gray-200 rounded-xl p-5 shadow-md text-center overflow-hidden"
            >
              <button
                onClick={() => deleteStock(stock.symbol)}
                title="Remove"
                className="absolute top-2 right-2 text-gray-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-200 p-1 rounded-full"
              >
                <Trash2 size={18} strokeWidth={2} />
              </button>

              <h2 className="text-xl font-bold text-gray-800">
                {stock.symbol}
              </h2>
              <p className="text-3xl font-extrabold text-blue-600 mt-2">
                $ {stock.price.toFixed(2)}
              </p>
              <p
                className={`mt-1 text-sm ${
                  stock.change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stock.change >= 0 ? "▲" : "▼"} {stock.change} ({stock.percent}
                %)
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StockMarket;
