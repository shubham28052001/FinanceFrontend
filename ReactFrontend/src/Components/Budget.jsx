import React, { useState } from 'react'
import AddBudgetForm from "../Components/AddBudgetForm"
import Showbudget from './Showbudget';

export default function Budget() {
    const [openModal, setOpenModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    return (
        <div className="p-1">

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-5xl font-bold">
                        Budgets
                    </h1>
                    <p className="text-gray-600 mt-1">Track your spending limits by category</p>
                </div>

                <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition"
                    onClick={() => setOpenModal(openModal => !openModal)}
                >
                    + Add Budget
                </button>
            </div>

            <Showbudget refresh={refresh}/>


            {openModal && (<AddBudgetForm setRefresh={setRefresh} closeModal={() => setOpenModal(openModal => !openModal)}></AddBudgetForm>)}

        </div>
    )
}
