import React from 'react'
import { toast } from "react-toastify";
import { Link } from "react-router"
import useForm from '../Hooks/useForm';
import { useNavigate } from "react-router";


export default function Signup() {
    const { form, handleChange, error, setError, loading, setLoading, resetForm } = useForm({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setError("");
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        const name = form.name.trim();
        const email = form.email.trim().toLowerCase();
        const password = form.password.trim();

        if (!name || !email || !password) {
            return setError("All fields are required");
        }

        if (name.length < 3) {
            return setError("Name must be at least 3 characters");
        }

        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(name)) {
            return setError("Name can only contain letters");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return setError("Invalid email format");
        }

        if (password.length < 6) {
            return setError("Password must be at least 6 characters");
        }

        try {
            setLoading(true);

            const response = await fetch("http://localhost:5000/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await response.json();
            if (!response.ok) {
                return setError(data.message || "Signup failed");
            }
            resetForm();
            toast.success(data.message, {
                onClose: () => navigate("/")
            });
            console.log(data);
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

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Signup
                </h2>
                {error && <p className="text-red-500 text-center mb-1">{error}</p>}
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded-lg"
                />

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
                    {loading ? "Registering..." : "Register"}
                </button>
                <p className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <Link
                        to="/"
                        className="text-blue-500 hover:underline font-medium"
                    >
                        Login
                    </Link>
                </p>
            </form>

        </div>
    )
}