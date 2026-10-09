import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
    const[formData,setFormData]=useState({
        username:"",
        password:"",
    })
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const response = await api.post("/users/login", formData);
            console.log(response.data);
            const token = response.data.access_token;
            localStorage.setItem("access_token", token);
            setMessage("Login successful!");
            const redirectTo = location.state?.redirectTo || "/";
            navigate(redirectTo);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.detail);
            } else {
                setError("Unable to connect to server");
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <Navbar />

            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Welcome Back
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Login to use the calculator
                        </p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 text-left">
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder="Enter username"
                                value={formData.username}
                                onChange={(e) => setFormData({...formData,username:e.target.value})}
                                required
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 text-left">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData,password:e.target.value})}
                                required
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            />
                        </div>

                        {/* Login button */}
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition active:scale-[0.99] cursor-pointer"
                        >
                            Login
                        </button>
                    </form>

                    {/* Success */}
                    {message && (
                        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-sm">
                            {message}
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;