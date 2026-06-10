import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../Hooks/fetchWithAuth";
import { toast } from "react-toastify";
import { FaReceipt, FaTrash } from "react-icons/fa";
import ExpenseChart from "./ExpenseCharts";

export default function Transactions({ refresh, filter, showDelete = false }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setLoading(true);

        const response = await fetchWithAuth("http://localhost:5000/api/transaction/transaction");
        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message || "Failed to fetch transactions");
          return;
        }

        setTransactions(data.transactions);
      } catch (error) {
        console.error(error);
        toast.error(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, [refresh]);

  const filteredTransactions = transactions.filter(txn =>
    filter === "all" ? true : txn.type === filter
  );


  async function handleDelete(id) {

    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/api/transaction/transaction/${id}`,
        { method: "DELETE" }
      )

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to delete transaction");
        return;
      }

      toast.success("Transaction deleted");

      setTransactions(prev => prev.filter(txn => txn._id !== id));

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }


  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!filteredTransactions.length) {
    return <p className="text-center mt-4 text-gray-600">No transactions found.</p>;
  }

  return (
    <div className="mt-6 bg-white p-5 rounded-2xl">
        <ExpenseChart transactions={transactions} />
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-4">Transaction History({filteredTransactions.length})</h2>
        <FaReceipt className="text-gray-500 text-2xl" />
      </div>
      <div className="space-y-4">
        {filteredTransactions.map((txn) => (
          <div
            key={txn._id}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-lg hover:bg-gray-200"
          >
            <div>
              <h3 className="font-semibold">{txn.title}</h3>
              <p className="text-lg capitalize text-gray-900">{txn.category}</p>
              <p className="text-sm text-gray-500">{txn.description} {new Date(txn.date).toLocaleDateString()}</p>
            </div>
            <div className={`font-bold flex gap-4 text-lg ${txn.type === "income" ? "text-green-600" : "text-red-600"}`}>
              {txn.type === "income" ? "+" : "-"}₹{txn.amount}
              {showDelete && (
                <button
                  onClick={() => handleDelete(txn._id)}
                  className="text-black hover:bg-red-400 p-2 rounded-xl"
                >
                  <FaTrash />
                </button>
              )}
            </div>


          </div>
        ))}
      </div>
    </div>
  );
}