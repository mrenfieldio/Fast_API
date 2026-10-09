import { useState, useEffect } from "react";
import BaseURL from "../api/axios";
import Navbar from "../components/Navbar";

function Calculator() {
const[calculation,setCalculation]=useState({
    number1:"",
    number2:"",
    operation:"add"
})
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    try {
      const response = await BaseURL.get("/calculator/calculations");

      setHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    setResult(null);
    setError("");
    try {
      const response = await BaseURL.post("/calculator/calculate", calculation);

      setResult(response.data.result);
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
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Calculator
          </h1>

          <p className="text-center text-gray-500 dark:text-gray-400 mt-2 mb-8">
            Perform your calculation
          </p>

          <form onSubmit={handleCalculate} className="space-y-5">
            {/* Number 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number 1
              </label>

              <input
                type="number"
                value={calculation.number1}
                onChange={(e) => setCalculation({...calculation,number1: e.target.value})}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter first number"
              />
            </div>

            {/* Number 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number 2
              </label>

              <input
                type="number"
                value={calculation.number2}
                onChange={(e) => setCalculation({...calculation,number2: e.target.value})}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter second number"
              />
            </div>

            {/* Operation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Operation
              </label>

              <select
                value={calculation.operation}
                onChange={(e) => setCalculation({...calculation,operation: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="add">Addition (+)</option>
                <option value="subtract">Subtraction (-)</option>
                <option value="multiply">Multiplication (×)</option>
                <option value="divide">Division (÷)</option>
              </select>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
            >
              Calculate
            </button>
          </form>

          {/* Result */}
          {result !== null && (
            <div className="mt-6 p-5 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-center">
              <p className="text-sm text-green-600 dark:text-green-400">
                Result
              </p>

              <p className="text-3xl font-bold text-green-700 dark:text-green-300 mt-1">
                {result}
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-300 text-sm">
              {error}
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 mx-64">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Calculation History
        </h2>

        {history.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No calculations yet.
          </p>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
              >
                <p className="text-gray-900 dark:text-white font-medium">
                  {item.number1} {item.operation === "add" && "+"}
                  {item.operation === "subtract" && "-"}
                  {item.operation === "multiply" && "×"}
                  {item.operation === "divide" && "÷"} {item.number2}
                  {" = "}
                  {item.result}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Calculator;
