import React, { useState } from 'react'
import { toast } from "react-toastify";

export default function AddTransactionForm({ closeModal }) {
    const token = localStorage.getItem("token");
    const today = new Date().toISOString().split("T")[0];
    const [form, setForm] = useState({
        type: "income",
        amount: "",
        category: "",
        description: "",
        date: today
    })
    const [error, setError] = useState("");

    const setType = (value) => {
        setForm({
            ...form,
            type: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        if (!form.category || !form.amount) {
            return setError("Category aur Amount required hai");
        }
        if (form.amount <= 0) {
            return setError("Amount should be greater than 0");
        }
        try {
            const response = await fetch("http://localhost:5000/api/transaction/add-transaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ ...form, amount: Number(form.amount) })
            }
            );
            const data = await response.json();
            if (!response.ok) {
                return setError(data.message);
            }
            closeModal();
            toast.success(data.message);
            setForm({
                type: "income",
                amount: "",
                category: "",
                description: "",
                date: today
            });
        } catch (error) {
            console.error(error.message);
            toast.error(error.message)
        }

    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <div className="absolute inset-0 bg-black/40 flex justify-center items-center">

            <div className="bg-white p-6 rounded-xl w-96 shadow-lg">

                <h2 className="text-xl text-center font-semibold mb-4">
                    Add Transaction
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {error && <p className="text-red-500 text-center mb-1">{error}</p>}

                    <div className="flex bg-gray-200 rounded-lg p-1">

                        <button
                            type="button"
                            onClick={() => setType("income")}
                            className={`flex-1 p-2 rounded-lg ${form.type === "income"
                                ? "bg-green-500 text-white"
                                : ""
                                }`}
                        >
                            Income
                        </button>
                        <button
                            type="button"
                            onClick={() => setType("expense")}
                            className={`flex-1 p-2 rounded-lg ${form.type === "expense"
                                ? "bg-red-500 text-white"
                                : ""
                                }`}
                        >
                            Expense
                        </button>

                    </div>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    >
                        <option value="">Select Category</option>

                        {form.type === "expense" ?
                            <>
                                <option value="food">Food & Dining</option>
                                <option value="transportation">Transporation</option>
                                <option value="shopping">Shopping</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="Bills">Bills & Utilities</option>
                                <option value="healthcare">Healthcare</option>
                            </>
                            :
                            <>
                                <option value="salary">Salary</option>
                                <option value="freelance">Freelance</option>
                                <option value="business">Business</option>
                                <option value="investment">Investment</option>
                            </>
                        }

                    </select>

                    <input type="number"
                        name='amount'
                        placeholder='0.00'
                        value={form.amount}
                        min="1"
                        onChange={handleChange}
                        className='border p-2 rounded'
                    />
                    <textarea
                        name="description"
                        placeholder="What was this for?"
                        value={form.description}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input type="date"
                        name='date'
                        value={form.date}
                        onChange={handleChange}
                        className='border p-2 rounded'
                    />


                    <div className="flex justify-end gap-2 mt-3">

                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-3 py-1 bg-gray-400 text-white rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-3 py-1 bg-amber-500 text-white rounded"
                        >
                            Save
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}
