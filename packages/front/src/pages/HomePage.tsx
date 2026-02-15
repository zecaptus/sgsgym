import { FormattedMessage } from "react-intl";

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto p-8 text-center">
      <h1 className="text-5xl font-bold mb-4">
        <FormattedMessage id="home.title" />
      </h1>
      <p className="text-lg text-gray-400">
        <FormattedMessage id="home.subtitle" />
      </p>
    </div>
  );
}
