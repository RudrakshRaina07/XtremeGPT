
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const Register = () => {
    const { register, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: ""
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
        setError("");

        try {
            await register(formData);
            navigate("/login");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#212121] flex items-center justify-center text-white">
            <form
                onSubmit={handleSubmit}
                className="bg-[#171717] p-8 rounded-xl w-full max-w-md"
            >
                <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                <p className="text-gray-400 mb-6">
                    Join XtremeGPT today
                </p>

                {error && (
                    <p className="text-red-500 mb-4">{error}</p>
                )}

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded-lg bg-[#303030] outline-none"
                    required
                />

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded-lg bg-[#303030] outline-none"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded-lg bg-[#303030] outline-none"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 mb-6 rounded-lg bg-[#303030] outline-none"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#303030] text-black py-3 rounded-lg font-semibold cursor-pointer disabled:opacity-50"
                >
                    {loading ? "Creating Account..." : "Register"}
                </button>

                <p className="text-gray-400 text-center mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-white underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
