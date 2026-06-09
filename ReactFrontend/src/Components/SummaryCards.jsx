import React, { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../Hooks/fetchWithAuth";
import Charts from "../Components/Charts";

export default function SummaryCards({ refresh }) {
    const [summary, setSummary] = useState({
        balance: 0,
        totalIncome: 0,
        totalExpense: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTransaction() {
            try {
                setLoading(true);

              
                const response = await fetchWithAuth("http://localhost:5000/api/transaction/dashboard");
                const data = await response.json();

                if (!response.ok) {
                    toast.error(data.message || "Failed to fetch summary");
                    return;
                }

                setSummary(data);
            } catch (error) {
                console.error(error);
                toast.error(error.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        }

        fetchTransaction();
    }, [refresh]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-gray-100 p-6 rounded-lg shadow-xl">
                <div className="flex justify-between items-center text-lg text-gray-600">
                    <h3>Total Balance</h3>
                    <FaDollarSign className="text-gray-400 text-xl" />
                </div>
                <p className="text-3xl font-bold">₹{summary.balance}</p>
                <p className="text-gray-600">
                    {summary.balance >= 0 ? "You are in green" : "You are in red"}
                </p>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
                <div className="bg-gray-100 p-4 rounded-lg shadow-xl flex-1">
                    <div className="flex justify-between items-center text-lg text-gray-600">
                        <h3>Total Income</h3>
                        <FaArrowTrendUp className="text-green-600 text-xl" />
                    </div>
                    <p className="text-xl font-bold text-green-600">₹{summary.totalIncome}</p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-xl flex-1">
                    <div className="flex justify-between items-center text-lg text-gray-600">
                        <h3>Total Expenses</h3>
                        <FaArrowTrendDown className="text-red-600 text-xl" />
                    </div>
                    <p className="text-xl font-bold text-red-600">₹{summary.totalExpense}</p>
                </div>
            </div>

            <Charts summary={summary} />
        </>
    );
}