import React from "react";
import {
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell
} from "recharts";
import ExpenseChart from "./ExpenseCharts";

export default function Charts({ summary}) {

  const frequencyData = [
    { name: "Income", count: summary.totalIncome },
    { name: "Expense", count: summary.totalExpense }
  ];

  const COLORS = ["#16a34a", "#dc2626"]; // green , red

  return (
    <div className="grid w-full grid-cols-1 gap-6 mt-8">

      <div className="bg-gray-200 p-4 rounded-xl">
        <h2 className="text-lg mb-4">Transaction Frequency</h2>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={frequencyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="count">
              {frequencyData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}