import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { asset } from "../lib/asset.js";

const pill =
  "inline-flex items-center justify-center rounded-full border min-h-10 px-4 text-[0.84rem] transition-colors duration-200 max-[640px]:min-h-9 max-[640px]:px-[11px] max-[640px]:text-[0.72rem]";
const pillIdle =
  "border-white/[0.18] text-[#d5d2cc] hover:border-white/75 hover:bg-[#f2f0eb] hover:text-[#141414] focus-visible:border-white/75 focus-visible:bg-[#f2f0eb] focus-visible:text-[#141414] focus-visible:outline-none";
const pillActive = "border-white/75 bg-[#f2f0eb] text-[#141414]";
const tab =
  "inline-flex min-h-[34px] items-center justify-center rounded-full border px-[13px] text-[0.77rem] transition-colors duration-200 max-[640px]:min-h-[34px] max-[640px]:px-[13px] max-[640px]:text-[0.77rem]";

const projectLinks = [
  { to: "/projects/games", label: "Games" },
  { to: "/projects/web", label: "Website" },
  { to: "/projects/mobile", label: "Mobile" },
];

/**
 * Header copied from the original site.
 * variant "home"     -> single row, Projects is a dropdown
 * variant "projects" -> second row of category tabs
 */
export default function Header({ variant = "home", active = "home" }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!open) return undefined;

    const onDocumentClick = (event) => {
      if (!wrapRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocumentClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const goToSection = (id) => {
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  const isProjectsPage = variant === "projects";

  return (
    <header
      className={
        isProjectsPage
          ? "fixed inset-x-0 top-0 z-50 flex min-h-[126px] flex-wrap content-center items-center gap-x-6 gap-y-[10px] border-b border-white/[0.12] bg-[rgba(10,10,10,0.82)] px-[max(24px,calc((100vw-1180px)/2))] py-[10px] text-light backdrop-blur-[16px] max-[900px]:px-4 max-[640px]:min-h-[148px]"
          : "fixed inset-x-0 top-0 z-50 flex h-[78px] items-center gap-6 border-b border-white/[0.12] bg-[rgba(10,10,10,0.82)] px-[max(24px,calc((100vw-1180px)/2))] text-light backdrop-blur-[16px] max-[900px]:h-[70px] max-[900px]:px-4 max-[640px]:gap-[10px]"
      }
    >
      <Link
        to="/"
        aria-label="KarlDev home"
        className={`mr-auto inline-flex items-center ${
          isProjectsPage ? "max-[640px]:flex-1" : ""
        }`}
      >
        <img
          src={asset("assets/images/KarlsonDevWORD.png")}
          alt="KarlsonDevLock"
          className="h-[38px] w-[185px] object-contain object-left max-[900px]:w-[148px] max-[640px]:h-[31px] max-[640px]:w-[118px]"
        />
      </Link>

      <nav
        aria-label="Primary navigation"
        className={
          isProjectsPage
            ? "flex items-center gap-2 max-[640px]:order-2 max-[640px]:w-full max-[640px]:justify-end max-[640px]:gap-[5px]"
            : "flex items-center gap-2 max-[640px]:gap-[5px]"
        }
      >
        <Link
          to="/"
          onClick={(event) => {
            event.preventDefault();
            goToSection("home");
          }}
          className={`${pill} ${active === "home" ? pillActive : pillIdle}`}
        >
          Home
        </Link>

        <div ref={wrapRef} className="relative">
          <button
            ref={buttonRef}
            type="button"
            aria-haspopup="true"
            aria-expanded={open}
            onClick={(event) => {
              event.stopPropagation();
              setOpen((value) => !value);
            }}
            className={`${pill} ${pillIdle} cursor-pointer bg-transparent`}
          >
            Projects
            <span
              aria-hidden="true"
              className={`ml-1 inline-block text-[0.6em] transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {open && (
            <ul
              role="menu"
              className="absolute left-0 top-[calc(100%+8px)] z-10 min-w-[180px] rounded-2xl border border-white/[0.18] bg-[rgba(10,10,10,0.92)] py-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.3)] backdrop-blur-[16px] max-[640px]:min-w-[150px]"
            >
              {projectLinks.map((link, index) => (
                <li key={link.to} role="none">
                  <Link
                    role="menuitem"
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`block whitespace-nowrap px-5 py-2.5 text-[0.84rem] text-[#d5d2cc] transition-colors duration-200 hover:bg-[#f2f0eb] hover:text-[#141414] focus-visible:bg-[#f2f0eb] focus-visible:text-[#141414] focus-visible:outline-none max-[640px]:px-4 max-[640px]:py-2 max-[640px]:text-[0.72rem] ${
                      index === 0 ? "rounded-t-2xl" : ""
                    } ${index === projectLinks.length - 1 ? "rounded-b-2xl" : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link
          to="/"
          onClick={(event) => {
            event.preventDefault();
            goToSection("about");
          }}
          className={`${pill} ${pillIdle}`}
        >
          About
        </Link>
      </nav>

      {isProjectsPage && (
        <nav
          aria-label="Project categories"
          className="flex basis-full items-center justify-end gap-2 max-[640px]:order-3 max-[640px]:justify-start max-[640px]:overflow-x-auto max-[640px]:pb-0.5"
        >
          {[
            { to: "/projects/games", label: "Games", key: "games" },
            { to: "/projects/mobile", label: "Mobile", key: "mobile" },
            { to: "/projects/web", label: "Website", key: "web" },
          ].map((tabLink) => (
            <Link
              key={tabLink.to}
              to={tabLink.to}
              className={`${tab} ${active === tabLink.key ? pillActive : pillIdle}`}
            >
              {tabLink.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
