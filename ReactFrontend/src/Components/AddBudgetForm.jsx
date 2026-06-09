import React, { useState } from "react";
import { fetchWithAuth } from "../Hooks/fetchWithAuth";
import { toast } from "react-toastify";

export default function AddBudgetForm({ closeModal,setRefresh }) {

  const [formData, setFormData] = useState({
    category: "",
    limit: "",
    type: "monthly"
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    if (!formData.category) {
      setError("Please select a category");
      return;
    }
    if (!formData.limit) {
      setError("Please enter budget limit");
      return;
    }
    if (Number(formData.limit) <= 100) {
      setError("Budget limit must be greater than 100");
      return;
    }
    try {

      const response = await fetchWithAuth(
        "http://localhost:5000/api/budget/create-budget",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to add budget");
        return;
      }

      toast.success("Budget added successfully");

      closeModal();

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Budget</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <p className="text-red-500 text-center mb-1">{error}</p>}
          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">select</option>
            <option value="food">Food & Dining</option>
            <option value="transportation">Transporation</option>
            <option value="shopping">Shopping</option>
            <option value="entertainment">Entertainment</option>
            <option value="Bills">Bills & Utilities</option>
            <option value="healthcare">Healthcare</option>
          </select>

          {/* Limit */}
          <input
            type="number"
            name="limit"
            placeholder="Budget Limit"
            value={formData.limit}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          {/* Type */}
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          <button
            type="submit"
            className="bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-600"
          >
            Add Budget
          </button>

        </form>

      </div>

    </div>
  );
}