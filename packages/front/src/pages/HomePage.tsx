import { useIntl } from "react-intl";
import { Link } from "react-router";

const STATS = [
  { key: "home.stats.members", value: "250+" },
  { key: "home.stats.coaches", value: "7" },
  { key: "home.stats.hours", value: "40" },
  { key: "home.stats.years", value: "90" },
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
    <div className="bg-white text-sgs-dark font-['Montserrat',sans-serif]">
      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO (Plein écran, sombre + diagonale rouge)
          ═══════════════════════════════════════════ */}
      <section className="hero-diagonal relative min-h-[80vh] flex items-center overflow-hidden bg-sgs-darker">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80 z-[1]" />
        {/* Placeholder image area — solid dark with subtle texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,rgba(200,16,46,0.08),transparent_60%)]" />

        <div className="relative z-[2] w-full max-w-6xl mx-auto px-6 sm:px-10 py-20">
          <h1 className="text-[3rem] sm:text-[4.5rem] lg:text-[6rem] font-black text-white uppercase leading-[1.05] tracking-tight">
            {t({ id: "home.hero.title.line1" })}
            <br />
            <span className="text-sgs-red">
              {t({ id: "home.hero.title.line2" })}
            </span>
          </h1>
          <div className="mt-10">
            <a
              href="#disciplines"
              className="inline-block bg-sgs-red hover:bg-sgs-red-dark text-white px-10 py-4 rounded-full font-bold uppercase tracking-[0.15em] text-sm transition-all shadow-lg shadow-sgs-red/30 hover:-translate-y-0.5"
            >
              {t({ id: "home.hero.cta" })}
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — PASSION & MOUVEMENT (Fond blanc, éditorial)
          ═══════════════════════════════════════════ */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          {/* Petits liens nav éditoriaux */}
          <div className="flex justify-end gap-6 text-xs text-gray-400 uppercase tracking-widest mb-10">
            <a href="#about" className="hover:text-sgs-red transition-colors">
              {t({ id: "home.passion.links.about" })}
            </a>
            <a href="#contact" className="hover:text-sgs-red transition-colors">
              {t({ id: "home.passion.links.contact" })}
            </a>
            <a href="#disciplines" className="hover:text-sgs-red transition-colors">
              {t({ id: "home.passion.links.events" })}
            </a>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Texte */}
            <div>
              <h2 className="text-[2.5rem] sm:text-[3.5rem] font-black uppercase leading-[1.1] mb-8">
                {t({ id: "home.passion.title.line1" })}
                <br />
                <span className="text-sgs-red">
                  {t({ id: "home.passion.title.line2" })}
                </span>
              </h2>
              <p className="text-sgs-grey leading-relaxed text-lg mb-10">
                {t({ id: "home.passion.description" })}
              </p>
              <a
                href="https://sgsgymart.monclub.app/app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-sgs-red hover:bg-sgs-red-dark text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-[0.15em] text-sm transition-all shadow-lg shadow-sgs-red/20"
              >
                {t({ id: "home.passion.cta" })}
              </a>
            </div>

            {/* Image placeholder — barres parallèles */}
            <div className="rounded-lg overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 aspect-[4/3] flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg
                  className="w-16 h-16 mx-auto mb-3 opacity-40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                  />
                </svg>
                <p className="text-sm font-medium">Photo gymnaste</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — LE CLUB QUI BOUGE (Sombre + coin géométrique rouge)
          ═══════════════════════════════════════════ */}
      <section className="geo-red-corner relative h-[50vh] min-h-[350px] flex items-center overflow-hidden bg-sgs-darker">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sgs-dark to-black/90" />
        <div className="relative z-[2] max-w-6xl mx-auto px-6 sm:px-10 w-full">
          <h2 className="text-[2.5rem] sm:text-[4rem] lg:text-[5rem] font-black text-white uppercase leading-[1.05] max-w-[55%]">
            {t({ id: "home.club.title.line1" })}
            <br />
            {t({ id: "home.club.title.line2" })}
          </h2>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — STATS BAR (Fond sombre, chiffres rouges)
          ═══════════════════════════════════════════ */}
      <section className="bg-sgs-dark py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 text-center">
            {STATS.map(({ key, value }) => (
              <div key={key}>
                <div className="text-4xl sm:text-5xl font-black text-sgs-red">
                  {value}
                </div>
                <div className="text-xs text-gray-500 mt-2 uppercase tracking-[0.2em] font-semibold">
                  {t({ id: key })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — L'ART DU GESTE (Image + texte, fond blanc)
          ═══════════════════════════════════════════ */}
      <section id="about" className="bg-white scroll-mt-16">
        <div className="grid lg:grid-cols-2">
          {/* Image placeholder — mains magnésie */}
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 min-h-[300px] lg:min-h-[500px] flex items-center justify-center">
            <div className="text-center text-gray-400">
              <svg
                className="w-16 h-16 mx-auto mb-3 opacity-40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                />
              </svg>
              <p className="text-sm font-medium">Photo mains &amp; magn&eacute;sie</p>
            </div>
          </div>
          {/* Texte */}
          <div className="flex items-center px-6 sm:px-12 lg:px-16 py-16">
            <div>
              <h2 className="text-[2.5rem] sm:text-[3.5rem] font-black uppercase leading-[1.1] mb-6">
                <span className="text-sgs-red">
                  {t({ id: "home.art.title.line1" })}
                </span>
                <br />
                {t({ id: "home.art.title.line2" })}
              </h2>
              <p className="text-sgs-grey leading-relaxed text-lg">
                {t({ id: "home.art.description" })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — NOS DISCIPLINES (Cartes, fond clair)
          ═══════════════════════════════════════════ */}
      <section id="disciplines" className="bg-sgs-light py-24 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <h2 className="text-3xl sm:text-4xl font-black text-center text-sgs-dark uppercase tracking-wide mb-4">
            {t({ id: "home.programs.title" })}
          </h2>
          <div className="w-16 h-1 bg-sgs-red mx-auto mb-16 rounded-full" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map(({ key }) => (
              <div
                key={key}
                className="bg-white rounded-xl p-7 border border-gray-100 hover:border-sgs-red/30 transition-all hover:shadow-lg hover:shadow-sgs-red/5 group"
              >
                <div className="w-8 h-1 bg-sgs-red rounded-full mb-5 group-hover:w-14 transition-all duration-300" />
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

      {/* ═══════════════════════════════════════════
          SECTION 7 — CONTACT (Fond blanc)
          ═══════════════════════════════════════════ */}
      <section id="contact" className="bg-white py-24 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <h2 className="text-3xl sm:text-4xl font-black text-center text-sgs-dark uppercase tracking-wide mb-4">
            {t({ id: "home.contact.title" })}
          </h2>
          <div className="w-16 h-1 bg-sgs-red mx-auto mb-16 rounded-full" />

          <div className="grid md:grid-cols-2 gap-8">
            {/* Info */}
            <div className="bg-sgs-light rounded-xl p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-sgs-dark mb-1">
                  {t({ id: "home.contact.gym" })}
                </h3>
                <p className="text-sgs-grey">
                  {t({ id: "home.contact.address" })}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-sgs-red/10 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-sgs-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <a href="tel:0981499653" className="text-sgs-dark hover:text-sgs-red transition-colors font-semibold">
                      {t({ id: "home.contact.phone" })}
                    </a>
                    <p className="text-xs text-gray-400">{t({ id: "home.contact.phoneNote" })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-sgs-red/10 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-sgs-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <a href="mailto:gymart.sgs91@gmail.com" className="text-sgs-dark hover:text-sgs-red transition-colors font-semibold">
                    {t({ id: "home.contact.email" })}
                  </a>
                </div>
              </div>
            </div>

            {/* Liens */}
            <div className="bg-sgs-light rounded-xl p-8 flex flex-col justify-between">
              <div className="space-y-5">
                <a
                  href="https://www.sgsgym.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sgs-dark hover:text-sgs-red transition-colors font-semibold group"
                >
                  <span>{t({ id: "home.contact.website" })}</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <hr className="border-gray-200" />
                <a
                  href="https://sgsgymart.monclub.app/app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sgs-dark hover:text-sgs-red transition-colors font-semibold group"
                >
                  <span>{t({ id: "home.contact.registration" })}</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
              <div className="mt-8">
                <Link
                  to="/signup"
                  className="inline-block bg-sgs-red hover:bg-sgs-red-dark text-white px-6 py-3.5 rounded-full font-bold uppercase tracking-[0.15em] text-sm transition-all w-full text-center shadow-lg shadow-sgs-red/20"
                >
                  {t({ id: "nav.signup" })}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8 — CTA FOOTER (Fond rouge plein)
          ═══════════════════════════════════════════ */}
      <section className="bg-sgs-red py-20">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-wide mb-6">
            {t({ id: "home.cta.title" })}
          </h2>
          <p className="text-white/80 text-lg mb-10 leading-relaxed">
            {t({ id: "home.cta.subtitle" })}
          </p>
          <a
            href="https://sgsgymart.monclub.app/app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-sgs-red px-10 py-4 rounded-full font-bold uppercase tracking-[0.15em] text-sm hover:bg-gray-100 transition-colors shadow-lg"
          >
            {t({ id: "home.cta.button" })}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sgs-darker py-8">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} SGS Gymnastique &mdash;
          Sainte-Genevi&egrave;ve-des-Bois (91)
        </div>
      </footer>
    </div>
  );
}
