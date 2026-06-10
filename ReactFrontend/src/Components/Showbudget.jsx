import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../Hooks/fetchWithAuth";
import { toast } from "react-toastify";
import BudgetChart from "./BudgetChart";

export default function Showbudget() {

    const [budgets, setBudgets] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);

                const budgetRes = await fetchWithAuth(
                    `${import.meta.env.VITE_API_URL}/api/budget/all-budgets`
                );

                const budgetData = await budgetRes.json();

                if (!budgetRes.ok) {
                    toast.error(budgetData.message || "Failed to fetch budgets");
                    return;
                }

                const txnRes = await fetchWithAuth(
                    "http://localhost:5000/api/transaction/transaction"
                );

                const txnData = await txnRes.json();

                if (!txnRes.ok) {
                    toast.error(txnData.message || "Failed to fetch transactions");
                    return;
                }

                setBudgets(budgetData.budgets);
                setTransactions(txnData.transactions);

            } catch (error) {
                console.error(error);
                toast.error("Something went wrong");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!budgets.length) {
        return <p className="text-center mt-5">No budgets found</p>;
    }

    return (
<>
          <BudgetChart
      budgets={budgets}
      transactions={transactions}
    />
        <div className="grid grid-cols-3 gap-6 mt-6">

            {budgets.map((budget) => {

                const spent = transactions
                    .filter(
                        (txn) =>
                            txn.category.toLowerCase() === budget.category.toLowerCase() &&
                            txn.type === "expense"
                    )
                    .reduce((total, txn) => total + txn.amount, 0);

                const percent = (spent / budget.limit) * 100;

                return (

                    <div
                        key={budget._id}
                        className="bg-white p-5 rounded-xl shadow"
                    >

                        <div className="flex justify-between items-center mb-3">
                            <h3 className="uppercase text-sm text-gray-500 font-semibold">
                                {budget.category}
                            </h3>
                            🐷
                        </div>

                        <div className="flex justify-between items-center mb-3">
                            <span className="text-3xl font-bold">
                                ₹{spent}
                            </span>

                            <span className="text-gray-500">
                                of ₹{budget.limit}
                            </span>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className={`h-3 rounded-full ${percent > 100 ? "bg-red-500" : "bg-green-500"
                                    }`}
                                style={{ width: `${Math.min(percent, 100)}%` }}
                            ></div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between mt-3 text-sm">
                            <span className="text-gray-500">{budget.type}</span>

                            <span
                                className={`font-semibold ${percent > 100 ? "text-red-500" : "text-green-600"
                                    }`}
                            >
                                {Math.round(percent)}% used
                            </span>
                        </div>

                    </div>

                );
            })}
        </div>
        </>
    );
}