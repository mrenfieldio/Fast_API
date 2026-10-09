import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function LandingPage() {
    const navigate = useNavigate();

    const handleCardClick = (path) => {
        const token = localStorage.getItem("access_token");

        if (token) {
            // User is already logged in
            navigate(path);
        } else {
            // User is not logged in
            navigate("/login", {
                state: {
                    redirectTo: path,
                },
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />

            <main>

                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-6 py-20">

                    <div className="max-w-3xl mx-auto text-center">

                        <p className="text-indigo-400 font-semibold text-sm uppercase tracking-wider">
                            Welcome to CalcPro
                        </p>

                        <h1 className="mt-4 text-5xl md:text-6xl font-bold text-white leading-tight">
                            Simple tools.
                            <span className="text-indigo-400">
                                {" "}One place.
                            </span>
                        </h1>

                        <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                            Calculate numbers, manage your tasks, and keep
                            everything organized in one simple application.
                        </p>

                    </div>


                    {/* Application Cards */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                        {/* Calculator Card */}
                        <div
                            onClick={() => handleCardClick("/calculator")}
                            className="group cursor-pointer rounded-2xl bg-gray-800 border border-gray-700 p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:border-indigo-500 hover:shadow-indigo-500/10"
                        >

                            <div className="flex items-center justify-between">

                                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-indigo-900/40 text-indigo-400 text-3xl">
                                    +
                                </div>

                                <span className="text-gray-500 group-hover:text-indigo-400 transition text-2xl">
                                    →
                                </span>

                            </div>

                            <h2 className="mt-7 text-2xl font-bold text-white">
                                Calculator
                            </h2>

                            <p className="mt-3 text-gray-400 leading-relaxed">
                                Perform addition, subtraction, multiplication,
                                and division quickly and easily.
                            </p>

                            <div className="mt-6">
                                <span className="text-sm font-semibold text-indigo-400">
                                    Open Calculator →
                                </span>
                            </div>

                        </div>


                        {/* Todo Card */}
                        <div
                            onClick={() => handleCardClick("/todo")}
                            className="group cursor-pointer rounded-2xl bg-gray-800 border border-gray-700 p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-emerald-500/10"
                        >

                            <div className="flex items-center justify-between">

                                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-emerald-900/40 text-emerald-400 text-3xl">
                                    ✓
                                </div>

                                <span className="text-gray-500 group-hover:text-emerald-400 transition text-2xl">
                                    →
                                </span>

                            </div>

                            <h2 className="mt-7 text-2xl font-bold text-white">
                                Todo Manager
                            </h2>

                            <p className="mt-3 text-gray-400 leading-relaxed">
                                Create, organize, and manage your daily tasks
                                with priorities and status.
                            </p>

                            <div className="mt-6">
                                <span className="text-sm font-semibold text-emerald-400">
                                    Open Todo Manager →
                                </span>
                            </div>

                        </div>

                    </div>

                </section>


                {/* Features */}
                <section className="max-w-6xl mx-auto px-6 pb-20">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-900/40 text-indigo-400 text-xl">
                                🔐
                            </div>

                            <h3 className="mt-5 text-xl font-semibold text-white">
                                Secure Authentication
                            </h3>

                            <p className="mt-2 text-gray-400">
                                Secure login using password hashing and
                                JWT authentication.
                            </p>
                        </div>


                        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-900/40 text-emerald-400 text-xl">
                                ✓
                            </div>

                            <h3 className="mt-5 text-xl font-semibold text-white">
                                Personal Data
                            </h3>

                            <p className="mt-2 text-gray-400">
                                Your calculator history and todos are
                                associated with your account.
                            </p>
                        </div>


                        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-900/40 text-blue-400 text-xl">
                                ⚡
                            </div>

                            <h3 className="mt-5 text-xl font-semibold text-white">
                                Fast & Simple
                            </h3>

                            <p className="mt-2 text-gray-400">
                                React frontend connected to a FastAPI
                                backend for a smooth experience.
                            </p>
                        </div>

                    </div>

                </section>

            </main>


            {/* Footer */}
            <footer className="border-t border-gray-700">

                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
                    © 2026 CalcPro. Built with React and FastAPI.
                </div>

            </footer>

        </div>
    );
}

export default LandingPage;