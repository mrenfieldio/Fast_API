import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/login");
    };
    return (
        <nav className="w-full sticky top-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link
                    to={token ? "/calculator" : "/"}
                    className="text-2xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400 hover:opacity-90 transition"
                >
                    CalcPro
                </Link>

                <div className="flex items-center gap-3 sm:gap-4">
                    {token ? (
                        <>
                            {/* <Link
                                to="/calculator"
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg transition"
                            >
                                Calculator
                            </Link> */}

                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm hover:shadow transition active:scale-[0.98] cursor-pointer"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm hover:shadow transition active:scale-[0.98]"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;