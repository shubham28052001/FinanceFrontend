import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams, useNavigate } from "react-router";
import useForm from "../Hooks/useForm";
export default function ResetPassword() {
    const { form, handleChange, error, setError, loading, setLoading, resetForm } = useForm({
        password: ""
    });

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password } = form;
        if (!password.trim()) {
            return setError("Enter password");
        }
        if (password.length < 6) {
            return setError("Password must be 6+ characters");
        }
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/users/reset-password/${token}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ password })
                }
            );
            const data = await response.json();
            if (!response.ok) {
                return toast.error(data.message)
            }
            resetForm();
            toast.success(data.message);
            navigate("/")
        
        } catch (error) {
            console.error(error.message);
            toast.error(error.message || "Something went wrong");
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-96"
            >

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Reset Password
                </h2>
                {error && <p className="text-red-500 text-center mb-1">{error}</p>}
                <input
                    type="password"
                    placeholder="New Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg mb-4"
                />

                <button
                    disabled={loading}
                    className="w-full bg-blue-500 text-white p-2 rounded-lg"
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>

            </form>
        </div>
    )
}
