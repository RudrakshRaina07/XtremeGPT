
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const Login = () => {
    const { login, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const isEmail = identifier.includes("@");

            const formData = {
                username: isEmail ? "" : identifier,
                email: isEmail ? identifier : "",
                password
            };

            await login(formData);
            navigate("/");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#212121] flex items-center justify-center text-white">
            <form
                onSubmit={handleSubmit}
                className="bg-[#171717] p-8 rounded-xl w-full max-w-md"
            >
                <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                <p className="text-gray-400 mb-6">
                    Login to your XtremeGPT account
                </p>

                {error && (
                    <p className="text-red-500 mb-4">{error}</p>
                )}

                <input
                    type="text"
                    placeholder="Username or Email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full p-3 mb-4 rounded-lg bg-[#303030] outline-none"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-6 rounded-lg bg-[#303030] outline-none"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#303030] text-black py-3 rounded-lg font-semibold cursor-pointer disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-gray-400 text-center mt-6">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-white underline">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
