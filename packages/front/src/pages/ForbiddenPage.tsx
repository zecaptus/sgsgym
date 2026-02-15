import { Link } from "react-router";
import { useIntl } from "react-intl";

export default function ForbiddenPage() {
  const { formatMessage } = useIntl();

  return (
    <div className="max-w-md mx-auto p-8 text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-2">
        {formatMessage({ id: "error.forbidden.title" })}
      </h2>
      <p className="text-gray-400 mb-6">
        {formatMessage({ id: "error.forbidden.message" })}
      </p>
      <Link
        to="/"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
      >
        {formatMessage({ id: "error.forbidden.back" })}
      </Link>
    </div>
  );
}
