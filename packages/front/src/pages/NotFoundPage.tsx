import { Link } from "react-router";
import { FormattedMessage } from "react-intl";

export default function NotFoundPage() {
  return (
    <div className="max-w-md mx-auto p-8 text-center">
      <h1 className="text-6xl font-bold text-gray-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">
        <FormattedMessage id="error.notFound.title" />
      </h2>
      <p className="text-gray-400 mb-6">
        <FormattedMessage id="error.notFound.message" />
      </p>
      <Link
        to="/"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
      >
        <FormattedMessage id="error.notFound.back" />
      </Link>
    </div>
  );
}
