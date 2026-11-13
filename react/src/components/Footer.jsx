import { Link, useLocation } from "react-router-dom";
import { asset } from "../lib/asset.js";
import { socialLinks } from "../data/projects.js";

export default function Footer({ compact = false }) {
  const location = useLocation();

  const backToTop = (event) => {
    event.preventDefault();
    if (location.pathname === "/") {
      document.getElementById("home")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className={`bg-[#101010] pb-6 text-light ${compact ? "pt-7" : "pt-[70px]"}`}>
      {!compact && (
        <div className="section-shell grid grid-cols-2 items-center gap-10 max-[900px]:grid-cols-1">
          <Link to="/" onClick={backToTop} aria-label="Back to top" className="w-[min(260px,62vw)]">
            <img
              src={asset("assets/images/LogoTransparent.png")}
              alt="KarlDev logo"
              className="max-h-[150px] w-full object-contain object-left"
            />
          </Link>

          <div className="min-w-[min(100%,310px)] justify-self-end text-right max-[900px]:justify-self-start max-[900px]:text-left">
            <p className="text-[0.74rem] font-bold uppercase tracking-[0.14em]">
              Follow / Contact me
            </p>
            <div className="mt-[18px] flex flex-wrap justify-end gap-2.5">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="grid h-[50px] w-[50px] place-items-center rounded-full border border-white/[0.18] bg-white/[0.04] transition duration-200 hover:-translate-y-0.5 hover:bg-paper focus-visible:-translate-y-0.5 focus-visible:bg-paper focus-visible:outline-none"
                >
                  <img src={asset(link.icon)} alt="" className="h-5 w-5 object-contain" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <div
        className={`section-shell flex justify-between gap-6 border-t border-white/[0.12] pt-[18px] text-[0.78rem] text-[#aaa69f] max-[640px]:flex-col max-[640px]:gap-2 ${
          compact ? "mt-0" : "mt-[58px]"
        }`}
      >
        <span>© 2026 KarlDev</span>
        <a
          href="#home"
          onClick={backToTop}
          className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
        >
          {compact ? "Home ↗" : "Back to top ↑"}
        </a>
      </div>
    </footer>
  );
}
