import { useIntl } from "react-intl";
import { Link } from "react-router";

const STATS = [
  { key: "home.stats.members", value: "250+" },
  { key: "home.stats.coaches", value: "7" },
  { key: "home.stats.hours", value: "40" },
  { key: "home.stats.years", value: "90" },
] as const;

const PHILOSOPHY = [
  { key: "performance", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { key: "passion", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  { key: "community", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
] as const;

const PROGRAMS = [
  { key: "eveil" },
  { key: "babygym" },
  { key: "decouverte" },
  { key: "competition" },
  { key: "gaf" },
  { key: "gam" },
] as const;

export default function HomePage() {
  const { formatMessage: t } = useIntl();

  return (
    <div className="bg-white text-sgs-dark">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-sgs-darker overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sgs-dark via-sgs-darker to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(183,28,28,0.15),transparent_70%)]" />
        <div className="relative max-w-6xl mx-auto px-6 sm:px-10 py-20 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-12 bg-sgs-red" />
              <span className="text-sgs-red font-semibold tracking-[0.3em] text-sm uppercase">
                Sainte-Geneviève-des-Bois
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white uppercase tracking-tight leading-[1.1] mb-8">
              {t({ id: "home.hero.headline" })}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-xl leading-relaxed">
              {t({ id: "home.hero.subtitle" })}
            </p>
            <a
              href="#disciplines"
              className="inline-block bg-sgs-red hover:bg-sgs-red-dark text-white px-10 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-sgs-red/25 hover:-translate-y-0.5"
            >
              {t({ id: "home.hero.cta" })}
            </a>
          </div>
        </div>
      </section>

      {/* Philosophy Section — White background */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-sgs-dark uppercase tracking-wide mb-16">
            {t({ id: "home.philosophy.title" })}
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {PHILOSOPHY.map(({ key, icon }) => (
              <div key={key} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sgs-red/10 mb-6">
                  <svg
                    className="w-8 h-8 text-sgs-red"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-sgs-red uppercase tracking-wide mb-3">
                  {t({ id: `home.philosophy.${key}.title` })}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t({ id: `home.philosophy.${key}.description` })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar — Dark */}
      <section className="bg-sgs-dark py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 text-center">
            {STATS.map(({ key, value }) => (
              <div key={key}>
                <div className="text-4xl sm:text-5xl font-extrabold text-sgs-red">
                  {value}
                </div>
                <div className="text-sm text-gray-400 mt-2 uppercase tracking-wider font-medium">
                  {t({ id: key })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs / Disciplines Section */}
      <section id="disciplines" className="bg-sgs-light py-24 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-sgs-dark uppercase tracking-wide mb-4">
            {t({ id: "home.programs.title" })}
          </h2>
          <div className="w-16 h-1 bg-sgs-red mx-auto mb-16 rounded-full" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROGRAMS.map(({ key }) => (
              <div
                key={key}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
              >
                <div className="w-10 h-1 bg-sgs-red rounded-full mb-5 group-hover:w-16 transition-all" />
                <h3 className="text-lg font-bold text-sgs-dark uppercase tracking-wide mb-1">
                  {t({ id: `home.programs.${key}.title` })}
                </h3>
                <p className="text-sm text-sgs-red font-semibold mb-4">
                  {t({ id: `home.programs.${key}.age` })}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t({ id: `home.programs.${key}.description` })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-24 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-sgs-dark uppercase tracking-wide mb-4">
            {t({ id: "home.contact.title" })}
          </h2>
          <div className="w-16 h-1 bg-sgs-red mx-auto mb-16 rounded-full" />
          <div className="grid md:grid-cols-2 gap-8">
            {/* Info card */}
            <div className="bg-sgs-light rounded-2xl p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-sgs-dark mb-1">
                  {t({ id: "home.contact.gym" })}
                </h3>
                <p className="text-gray-600">
                  {t({ id: "home.contact.address" })}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-sgs-red shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  <div>
                    <a
                      href="tel:0981499653"
                      className="text-sgs-dark hover:text-sgs-red transition-colors font-medium"
                    >
                      {t({ id: "home.contact.phone" })}
                    </a>
                    <p className="text-xs text-gray-400">
                      {t({ id: "home.contact.phoneNote" })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-sgs-red shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <a
                    href="mailto:gymart.sgs91@gmail.com"
                    className="text-sgs-dark hover:text-sgs-red transition-colors font-medium"
                  >
                    {t({ id: "home.contact.email" })}
                  </a>
                </div>
              </div>
            </div>

            {/* Links card */}
            <div className="bg-sgs-light rounded-2xl p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <a
                  href="https://www.sgsgym.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sgs-dark hover:text-sgs-red transition-colors font-medium group"
                >
                  <span>{t({ id: "home.contact.website" })}</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </a>
                <hr className="border-gray-200" />
                <a
                  href="https://sgsgymart.monclub.app/app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sgs-dark hover:text-sgs-red transition-colors font-medium group"
                >
                  <span>{t({ id: "home.contact.registration" })}</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </a>
              </div>
              <div className="mt-8">
                <Link
                  to="/signup"
                  className="inline-block bg-sgs-red hover:bg-sgs-red-dark text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all w-full text-center hover:-translate-y-0.5"
                >
                  {t({ id: "nav.signup" })}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer — Full red */}
      <section className="bg-sgs-red py-20">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wide mb-6">
            {t({ id: "home.cta.title" })}
          </h2>
          <p className="text-white/80 text-lg mb-10 leading-relaxed">
            {t({ id: "home.cta.subtitle" })}
          </p>
          <a
            href="https://sgsgymart.monclub.app/app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-sgs-red px-10 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-gray-100 transition-colors hover:-translate-y-0.5"
          >
            {t({ id: "home.cta.button" })}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sgs-darker py-8">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} SGS Gymnastique Artistique &mdash;
          Sainte-Genevi&egrave;ve-des-Bois (91)
        </div>
      </footer>
    </div>
  );
}
