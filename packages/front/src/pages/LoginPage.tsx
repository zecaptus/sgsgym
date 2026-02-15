import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useIntl } from "react-intl";
import { useLoginMutation } from "../services/auth.js";

export default function LoginPage() {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login({ email, password }).unwrap();
      navigate("/");
    } catch (err) {
      const apiErr = err as { data?: { error?: string } };
      setError(apiErr.data?.error ?? formatMessage({ id: "error.generic" }));
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {formatMessage({ id: "login.title" })}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 rounded-lg p-3 text-sm">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            {formatMessage({ id: "login.email" })}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            {formatMessage({ id: "login.password" })}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-2 rounded-lg transition-colors"
        >
          {formatMessage({ id: "login.submit" })}
        </button>
      </form>
      <p className="mt-4 text-center text-gray-400 text-sm">
        {formatMessage({ id: "login.noAccount" })}{" "}
        <Link to="/signup" className="text-indigo-400 hover:underline">
          {formatMessage({ id: "login.signupLink" })}
        </Link>
      </p>
    </div>
  );
}
