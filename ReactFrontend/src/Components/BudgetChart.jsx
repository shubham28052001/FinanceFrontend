import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#ef4444", "#f59e0b", "#8b5cf6", "#ec4899"];

export default function BudgetChart({ budgets, transactions }) {

  const chartData = budgets
    .map((budget) => {
      const spent = transactions
        .filter(
          (txn) =>
            txn.category.toLowerCase() === budget.category.toLowerCase() &&
            txn.type === "expense"
        )
        .reduce((total, txn) => total + txn.amount, 0);

      return {
        name: budget.category,
        value: spent
      };
    })
    .filter((item) => item.value > 0); // zero values remove

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all">

      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Expense by Category
        </h2>

        <span className="text-sm text-gray-500">
          Overview
        </span>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              innerRadius={50}  
              paddingAngle={4}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [`₹${value}`, "Spent"]}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}