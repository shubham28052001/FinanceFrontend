import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#22c55e","#3b82f6","#ef4444","#f59e0b","#8b5cf6","#ec4899"];

export default function ExpenseChart({ transactions }) {

  // sirf expenses lo
  const expenses = transactions.filter(
    (txn) => txn.type === "expense"
  );

  // category wise group karo
  const categoryTotals = {};

  expenses.forEach((txn) => {
    if (!categoryTotals[txn.category]) {
      categoryTotals[txn.category] = 0;
    }
    categoryTotals[txn.category] += txn.amount;
  });

  const chartData = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category]
  }));

  return (
    <div className="bg-gray-200 rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        Expense Distribution
      </h2>

      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              innerRadius={60}
              paddingAngle={4}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip/>

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}