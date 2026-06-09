import React, { useState } from 'react'
import AddTransactionForm from "./AddTransactionForm";
import Transactions from "./Transactions";

export default function Expenses() {
    const [openModal, setOpenModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [filter, setFilter] = useState("all");
    return (
        <div className="p-1">

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-5xl font-bold">
                        Transactions
                    </h1>
                    <p className="text-gray-600 mt-1">Manage your income and expenses</p>
                </div>

                <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition"
                    onClick={() => setOpenModal(openModal => !openModal)}
                >
                    + Add Transaction
                </button>
            </div>
            <div className="flex gap-3 mb-4">
                <button
                    className={`px-3 py-1 rounded-lg font-semibold ${filter === "all" ? "bg-amber-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setFilter("all")}
                >
                    All
                </button>
                <button
                    className={`px-3 py-1 rounded-lg font-semibold ${filter === "income" ? "bg-green-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setFilter("income")}
                >
                    Income
                </button>
                <button
                    className={`px-3 py-1 rounded-lg font-semibold ${filter === "expense" ? "bg-red-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setFilter("expense")}
                >
                    Expense
                </button>
            </div>


            <Transactions refresh={refresh} filter={filter} showDelete={true}/>


            {openModal && (<AddTransactionForm setRefresh={setRefresh} closeModal={() => setOpenModal(openModal => !openModal)}></AddTransactionForm>)}

        </div>
    )
}
