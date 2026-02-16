import { useIntl } from "react-intl";
import { Link } from "react-router";

const STATS = [
  { key: "home.stats.members", value: "250+" },
  { key: "home.stats.coaches", value: "7" },
  { key: "home.stats.hours", value: "40" },
  { key: "home.stats.years", value: "90" },
] as const;

const PROGRAMS = [
  { key: "eveil", icon: "🌱" },
  { key: "babygym", icon: "🤸" },
  { key: "decouverte", icon: "⭐" },
  { key: "competition", icon: "🏅" },
  { key: "gaf", icon: "🎀" },
  { key: "gam", icon: "💪" },
] as const;

const VALUES = ["1", "2", "3", "4"] as const;

export default function HomePage() {
  const { formatMessage: t } = useIntl();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-gray-900 to-purple-900/30" />
        <div className="relative max-w-5xl mx-auto px-4 py-24 sm:py-32 text-center">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {t({ id: "home.title" })}
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-indigo-200 font-medium mb-6">
            {t({ id: "home.hero.subtitle" })}
          </p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t({ id: "home.hero.description" })}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#programs"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors shadow-lg shadow-indigo-500/25"
            >
              {t({ id: "home.hero.cta" })}
            </a>
            <a
              href="#contact"
              className="border border-gray-600 hover:border-gray-400 text-gray-200 hover:text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              {t({ id: "home.hero.cta.contact" })}
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-800 border-y border-gray-700">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {STATS.map(({ key, value }) => (
              <div key={key}>
                <div className="text-3xl sm:text-4xl font-bold text-indigo-400">
                  {value}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {t({ id: key })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              {t({ id: "home.about.title" })}
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              {t({ id: "home.about.description" })}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-indigo-400 mb-4">
              {t({ id: "home.about.values.title" })}
            </h3>
            <ul className="space-y-3">
              {VALUES.map((n) => (
                <li key={n} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-indigo-500 shrink-0" />
                  <span className="text-gray-300">
                    {t({ id: `home.about.values.${n}` })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="bg-gray-800/50 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 py-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            {t({ id: "home.programs.title" })}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map(({ key, icon }) => (
              <div
                key={key}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-indigo-500/50 transition-colors"
              >
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-xl font-bold mb-1">
                  {t({ id: `home.programs.${key}.title` })}
                </h3>
                <p className="text-sm text-indigo-400 mb-3">
                  {t({ id: `home.programs.${key}.age` })}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t({ id: `home.programs.${key}.description` })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 py-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            {t({ id: "home.contact.title" })}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 space-y-5">
              <div>
                <h3 className="text-lg font-bold text-indigo-400 mb-1">
                  {t({ id: "home.contact.gym" })}
                </h3>
                <p className="text-gray-300">
                  {t({ id: "home.contact.address" })}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-300 flex items-center gap-2">
                  <span className="text-gray-500">Tel.</span>
                  <a
                    href="tel:0981499653"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {t({ id: "home.contact.phone" })}
                  </a>
                </p>
                <p className="text-xs text-gray-500">
                  {t({ id: "home.contact.phoneNote" })}
                </p>
                <p className="text-gray-300 flex items-center gap-2">
                  <span className="text-gray-500">Email</span>
                  <a
                    href="mailto:gymart.sgs91@gmail.com"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {t({ id: "home.contact.email" })}
                  </a>
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <a
                  href="https://www.sgsgym.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  {t({ id: "home.contact.website" })} &rarr;
                </a>
                <a
                  href="https://sgsgymart.monclub.app/app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  {t({ id: "home.contact.registration" })} &rarr;
                </a>
              </div>
              <div className="mt-8">
                <Link
                  to="/signup"
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full text-center"
                >
                  {t({ id: "nav.signup" })}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} SGS Gymnastique Artistique &mdash;
          Sainte-Genevi&egrave;ve-des-Bois (91)
        </div>
      </footer>
    </div>
  );
}
