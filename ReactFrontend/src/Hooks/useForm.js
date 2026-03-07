import { useState } from "react";
export default function useForm(initialValues) {
    const [form, setForm] = useState(initialValues);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const resetForm = () => {
        setForm(initialValues);
    };

    return {
        form,
        setForm,
        error,
        setError,
        loading,
        setLoading,
        handleChange,
        resetForm
    };
}