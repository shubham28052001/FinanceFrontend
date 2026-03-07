import React, { useState } from 'react'
import { toast } from "react-toastify"
import { useNavigate } from 'react-router';
import useForm from '../Hooks/useForm';
export default function ForgotPassword() {
    const { form, handleChange, error, setError, loading, setLoading, resetForm } = useForm({
        email: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email } = form;
        if (!email.trim()) {
            return setError("Enter email");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return setError("Invalid email format");
        }

        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/users/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (!response.ok) {
                return setError(data.message)
            }
            resetForm();
            toast.success(data.message, {
                onClose: () => navigate("/")
            });
        } catch (error) {
            console.error(error.message)
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-96"
            >

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Forgot Password
                </h2>
                {error && <p className="text-red-500 text-center mb-1">{error}</p>}
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg mb-4"
                />

                <button
                    disabled={loading}
                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>

            </form>
        </div>
    )
}
