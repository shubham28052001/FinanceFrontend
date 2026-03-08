import React, { useState } from "react";
import AddTransactionForm from "./AddTransactionForm";

export default function MainContent() {
      const [openModal, setOpenModal] = useState(false);
    return (
        <div className="p-8">

             <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Welcome to Dashboard
                </h1>

                <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition"
                onClick={()=>setOpenModal(openModal=>!openModal)}
                >
                    + Add Transaction
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
                <p>Your Data Will Show Here</p>
            </div>

            {openModal && (<AddTransactionForm closeModal={()=>setOpenModal(openModal=>!openModal)}></AddTransactionForm>)}

        </div>
    );
}