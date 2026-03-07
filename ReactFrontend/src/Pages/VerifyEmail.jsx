import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams, useNavigate } from "react-router";

export default function VerifyEmail() {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [searchParams] = useSearchParams();
    const [showResend, setShowResend] = useState(false);
    const [resendEmail, setResendEmail] = useState("");
    const [resendLoading, setResendLoading] = useState(false);
    const navigate = useNavigate();

    const token = searchParams.get("token");

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setMessage("Verification token missing");
                toast.error("Verification token missing");
                setLoading(false);
                setShowResend(true);
                return;
            }
            try {

                const response = await fetch(`http://localhost:5000/api/users/verify-email?token=${token}`);
                const data = await response.json();

                if (!response.ok) {
                    setMessage(data.message);
                    setShowResend(true);
                    toast.error(data.message);
                    return;
                }
                setMessage(data.message);
                toast.success(data.message, {
                    onClose: () => navigate("/")
                });

            } catch (error) {
                setMessage("Verification failed");
                console.error(error);
                setShowResend(true);
                toast.error(error.message || "Verification failed");
            } finally {
                setLoading(false);
            }
        };
        verifyEmail();
    }, [token, navigate])


    const handleResend = async () => {

        if (!resendEmail.trim()) {
            return toast.error("Enter email");
        }

        try {
            setResendLoading(true);

            const res = await fetch(
                "http://localhost:5000/api/users/resend-verification",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: resendEmail
                    })
                }
            );

            const data = await res.json();

            if (!res.ok) {
                if (data.message === "Email already verified") {
                    toast.success("Email already verified ✅ Redirecting to login...", {
                        onClose: () => navigate("/login")
                    });
                    return;
                }

                return toast.error(data.message || "Resend failed");
            }

            toast.success("Verification email sent!");

        } catch (error) {
            toast.error("Failed to resend email");
        } finally {
            setResendLoading(false);
        }
    };



    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-xl font-bold">
                {loading ? "Verifying Email..." : message}
            </h2>
            {showResend && (
                <div className="mt-6 flex flex-col gap-3 w-80">

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={resendEmail}
                        onChange={(e) => setResendEmail(e.target.value)}
                        className="border p-2 rounded-lg"
                    />

                    <button
                        onClick={handleResend}
                        disabled={resendLoading}
                        className="bg-blue-500 text-white p-2 rounded-lg"
                    >
                        {resendLoading ? "Sending..." : "Resend Verification Email"}
                    </button>

                </div>
            )}
        </div>
    )
}
