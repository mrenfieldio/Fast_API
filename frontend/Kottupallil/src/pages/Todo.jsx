import { useEffect, useState } from "react";
import BaseURL from "../api/axios";
import Navbar from "../components/Navbar";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "medium",
        status: "pending",
    });
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);
    const [updating, setUpdating] = useState(false);
    const getTodos = async () => {
        try {
            const response = await BaseURL.get("/todo/");
            console.log("Todo response:", response.data);
            setTodos(response.data);
        } catch (error) {
            console.log("Error fetching todos:", error);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({...formData,[name]: value,});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            return;
        }

        try {
            setLoading(true);

            await BaseURL.post("/todo/", formData);
            setFormData({
                title: "",
                description: "",
                priority: "medium",
                status: "pending",
            });

            setShowForm(false);
            getTodos();

        } catch (error) {
            console.log("Error creating todo:", error);

        } finally {
            setLoading(false);
        }
    };


    const handleEdit = (todo) => {
        setEditingTodo({
            id: todo.id,
            title: todo.title,
            description: todo.description || "",
            priority: todo.priority,
            status: todo.status,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    const handleEditChange = (e) => {
        const { name, value } = e.target;

        setEditingTodo({
            ...editingTodo,
            [name]: value,
        });
    };


    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!editingTodo.title.trim()) {
            return;
        }

        try {
            setUpdating(true);

            await BaseURL.put(`/todo/${editingTodo.id}`,
                {
                    title: editingTodo.title,
                    description: editingTodo.description,
                    priority: editingTodo.priority,
                    status: editingTodo.status,
                }
            );

            setEditingTodo(null);

            getTodos();

        } catch (error) {
            console.log("Error updating todo:", error);

        } finally {
            setUpdating(false);
        }
    };


    const totalTodos = todos.length;

    const completedTodos = todos.filter(
        (todo) => todo.status === "completed"
    ).length;

    const pendingTodos = todos.filter(
        (todo) => todo.status === "pending"
    ).length;

    const highPriorityTodos = todos.filter(
        (todo) => todo.priority === "high"
    ).length;

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 py-12">
                <section className="text-center max-w-3xl mx-auto">
                    <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
                        Task Manager
                    </p>
                    <h1 className="mt-3 text-4xl md:text-5xl font-bold text-white">
                        Manage Your
                        <span className="text-indigo-400">
                            {" "}Todos
                        </span>
                    </h1>
                    <p className="mt-5 text-gray-400 text-lg leading-relaxed">
                        Create, organize and track your daily tasks
                        in one simple place.
                    </p>
                </section>
                <section className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">

                        <p className="text-sm text-gray-400">
                            Total Tasks
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-white">
                            {totalTodos}
                        </h2>

                    </div>
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
                        <p className="text-sm text-gray-400">
                            Pending
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-yellow-400">
                            {pendingTodos}
                        </h2>
                    </div>
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">

                        <p className="text-sm text-gray-400">
                            Completed
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-green-400">
                            {completedTodos}
                        </h2>

                    </div>

                    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">

                        <p className="text-sm text-gray-400">
                            High Priority
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-red-400">
                            {highPriorityTodos}
                        </h2>

                    </div>

                </section>
                <div className="mt-10 flex justify-center">
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition"
                    >
                        {showForm
                            ? "Close Form"
                            : "+ Add New Todo"
                        }

                    </button>

                </div>
                {showForm && (
                    <section className="mt-8 max-w-3xl mx-auto">
                        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-7 shadow-lg">
                            {/* Form Header */}
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-white">
                                    Create New Todo
                                </h2>
                                <p className="mt-1 text-sm text-gray-400">
                                    Add a task to your todo list.
                                </p>

                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-5">

                                    <label className="block mb-2 text-sm font-medium text-gray-300">
                                        Task Title
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Enter task title"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                    />

                                </div>

                                <div className="mb-5">

                                    <label className="block mb-2 text-sm font-medium text-gray-300">
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Describe your task..."
                                        className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 outline-none resize-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                    />

                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>

                                        <label className="block mb-2 text-sm font-medium text-gray-300">
                                            Priority
                                        </label>

                                        <select
                                            name="priority"
                                            value={formData.priority}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white outline-none focus:border-indigo-500"
                                        >

                                            <option value="low">
                                                Low
                                            </option>

                                            <option value="medium">
                                                Medium
                                            </option>

                                            <option value="high">
                                                High
                                            </option>

                                        </select>

                                    </div>
                                    <div>

                                        <label className="block mb-2 text-sm font-medium text-gray-300">
                                            Status
                                        </label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white outline-none focus:border-indigo-500"
                                        >

                                            <option value="pending">
                                                Pending
                                            </option>

                                            <option value="completed">
                                                Completed
                                            </option>

                                        </select>

                                    </div>

                                </div>
                                <div className="mt-7 flex justify-end gap-3">

                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="px-5 py-2.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-50"
                                    >
                                        {loading
                                            ? "Creating..."
                                            : "Create Todo"
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                )}

                {editingTodo && (
                    <section className="mt-8 max-w-3xl mx-auto">
                        <div className="bg-gray-800 border border-indigo-500/50 rounded-2xl p-7 shadow-lg">
                            <div className="mb-6">
                               <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
                                            Editing Task #{editingTodo.id}
                                        </p>
                                        <h2 className="mt-2 text-2xl font-semibold text-white">
                                            Edit Todo
                                        </h2>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setEditingTodo(null)}
                                        className="text-gray-400 hover:text-white text-2xl"
                                    >
                                        ×
                                    </button>
                                </div>
                                <p className="mt-2 text-sm text-gray-400">
                                    Update the task details or change its status.
                                </p>
                            </div>

                            <form onSubmit={handleUpdate}>
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium text-gray-300">
                                        Task Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={editingTodo.title}
                                        onChange={handleEditChange}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                    />
                                </div>

                                <div className="mb-5">

                                    <label className="block mb-2 text-sm font-medium text-gray-300">
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        value={editingTodo.description}
                                        onChange={handleEditChange}
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white outline-none resize-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                    />

                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-300">
                                            Priority
                                        </label>
                                        <select
                                            name="priority"
                                            value={editingTodo.priority}
                                            onChange={handleEditChange}
                                            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white outline-none focus:border-indigo-500"
                                        >
                                            <option value="low">
                                                Low
                                            </option>
                                            <option value="medium">
                                                Medium
                                            </option>
                                            <option value="high">
                                                High
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-300">
                                            Status
                                        </label>
                                        <select
                                            name="status"
                                            value={editingTodo.status}
                                            onChange={handleEditChange}
                                            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white outline-none focus:border-indigo-500"
                                        >
                                            <option value="pending">
                                                Pending
                                            </option>
                                            <option value="completed">
                                                Completed
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-7 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setEditingTodo(null)}
                                        className="px-5 py-2.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={updating}
                                        className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-50"
                                    >
                                        {updating
                                            ? "Updating..."
                                            : "Update Todo"
                                        }

                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                )}

                <section className="mt-14">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                Your Tasks
                            </h2>
                            <p className="mt-1 text-sm text-gray-400">
                                Keep track of your current tasks.
                            </p>

                        </div>
                        <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-sm text-gray-400">
                            {totalTodos} tasks
                        </span>
                    </div>

                    {todos.length === 0 ? (
                        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-12 text-center">
                            <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-900/40 flex items-center justify-center text-indigo-400 text-3xl">
                                ✓
                            </div>
                            <h3 className="mt-5 text-xl font-semibold text-white">
                                No todos yet
                            </h3>
                            <p className="mt-2 text-gray-400">
                                Create your first todo and start organizing
                                your tasks.
                            </p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
                            >
                                + Create Todo
                            </button>
                        </div>
                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {todos.map((todo) => (
                                <div
                                    key={todo.id}
                                    className="group bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-sm hover:border-indigo-500 hover:shadow-lg transition"
                                >

                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-white">
                                                {todo.title}
                                            </h3>
                                            <p className="mt-2 text-gray-400 leading-relaxed">
                                                {todo.description ||
                                                    "No description provided."
                                                }
                                            </p>

                                        </div>
                                        <span
                                            className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${
                                                todo.status === "completed"
                                                    ? "bg-green-900/40 text-green-400"
                                                    : "bg-yellow-900/40 text-yellow-400"
                                            }`}
                                        >
                                            {todo.status}
                                        </span>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-gray-700 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-500">
                                                Priority
                                            </span>
                                            <span
                                                className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                                                    todo.priority === "high"
                                                        ? "bg-red-900/40 text-red-400"
                                                        : todo.priority === "medium"
                                                        ? "bg-orange-900/40 text-orange-400"
                                                        : "bg-indigo-900/40 text-indigo-400"
                                                }`}
                                            >
                                                {todo.priority}
                                            </span>

                                        </div>

                                        <button
                                            onClick={() => handleEdit(todo)}
                                            className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 text-sm font-medium hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </section>
            </main>
            <footer className="border-t border-gray-800 mt-16">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
                    © 2026 CalcPro. Built with React and FastAPI.
                </div>
            </footer>
        </div>
    );
}
export default Todo;