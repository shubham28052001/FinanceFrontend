import React, { useState, useContext } from 'react';
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../Context/AuthContext";
import useForm from '../Hooks/useForm';

export default function Login() {
    const { loginUser } = useContext(UserContext);
    const { form, handleChange, error, setError, loading, setLoading, resetForm } = useForm({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = form;

        if (!email || !password) {
            return setError("Email and password are required");
        }

        try {
            setLoading(true);

            const res = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                return setError(data.message || "Login failed");
            }
            loginUser({
                email: data.email,
                accessToken: data.accessToken
            });
            resetForm();
            toast.success(data.message);
            navigate("/dashboard")


        } catch (error) {
            console.error(error.message);
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
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 text-center mb-1">{error}</p>}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded-lg"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded-lg"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-center text-sm mt-4">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Signup
                    </Link>
                </p>

                <p className="text-center text-sm mt-2">
                    <Link to="/forgot-password" className="text-blue-500 hover:underline">
                        Forgot Password?
                    </Link>
                </p>
            </form>
        </div>
    )
}