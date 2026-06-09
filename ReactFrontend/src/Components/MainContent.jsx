import React, { useState } from "react";
import AddTransactionForm from "./AddTransactionForm";
import SummaryCards from "./SummaryCards";
import Transactions from "./Transactions";

export default function MainContent() {
    const [openModal, setOpenModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    return (
        <div className="p-2">

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-5xl font-bold">
                        Dashboard
                    </h1>
                    <p className="text-gray-600 mt-1">Welcome back! Here's your financial overview.</p>
                </div>

                <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition"
                    onClick={() => setOpenModal(openModal => !openModal)}
                >
                    + Add Transaction
                </button>
            </div>

            <SummaryCards refresh={refresh} />
            <Transactions refresh={refresh} filter = "all" showDelete={false}/>

            {openModal && (<AddTransactionForm setRefresh={setRefresh} closeModal={() => setOpenModal(openModal => !openModal)}></AddTransactionForm>)}

        </div>
    );
}