import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ProfileFrame from "../components/ProfileFrame.jsx";
import ProjectCarousel from "../components/ProjectCarousel.jsx";
import { asset } from "../lib/asset.js";
import { tools } from "../data/projects.js";

const aboutTools = ["unity", "blender", "flutter", "vscode", "vscode22", "system"];
const skills = [
  "Beginner 3D modeller",
  "Game development",
  "Responsive web design",
  "Mobile UI development",
];

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return undefined;
    const timer = window.setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
    return () => window.clearTimeout(timer);
  }, [location]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-paper">
      <Header variant="home" active="home" />

      <main>
        <section
          id="home"
          className="relative isolate grid min-h-[100svh] place-items-center bg-dark text-light"
        >
          <video
            className="absolute inset-0 z-[-3] h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            src={asset("assets/videos/PortfolioVid.mp4")}
          />
          <div
            className="absolute inset-0 z-[-2]"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.28), rgba(0,0,0,0.68)), radial-gradient(circle at center, transparent 15%, rgba(0,0,0,0.36) 100%)",
            }}
          />

          <div className="section-shell pt-[78px] text-center max-[900px]:pt-[70px]">
            <h1 className="mx-auto mt-4 max-w-[980px] text-[clamp(2.9rem,7vw,7rem)] font-medium leading-[0.94] tracking-[-0.065em]">
              Hi, I am karl{" "}
              <span className="whitespace-nowrap text-[#bdb8af] max-[640px]:mt-2 max-[640px]:block max-[640px]:whitespace-normal">
                (KarlDev)
              </span>
            </h1>
            <div className="mx-auto mb-6 mt-[34px] h-px w-[min(460px,72vw)] bg-white/80" />
            <p className="mx-auto max-w-[660px] text-[clamp(1rem,1.6vw,1.24rem)] text-[#d3d0ca]">
              I'm a Game Dev and, a part-time Web and Mobile Dev.
            </p>
            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="mt-[34px] inline-flex gap-2.5 border-b border-white/40 pb-1 text-[0.88rem] transition-colors hover:border-white focus-visible:border-white focus-visible:outline-none"
            >
              My Selected Work{" "}
              <span aria-hidden="true">↓</span>
            </button>
          </div>
        </section>

        <ProjectCarousel />

        <section id="about" className="bg-paper py-[120px] pb-[132px] max-[640px]:py-[86px]">
          <div className="section-shell">
            <div className="mb-[46px]">
              <p className="text-[0.74rem] font-bold uppercase tracking-[0.14em]">A little context</p>
              <h2 className="mt-2 text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
                About me
              </h2>
            </div>

            <div className="grid grid-cols-[minmax(240px,0.8fr)_1.55fr] items-center gap-[clamp(48px,8vw,110px)] max-[900px]:grid-cols-1 max-[900px]:gap-12">
              <ProfileFrame />

              <div>
                <p className="max-w-[720px] text-[clamp(1.25rem,2.4vw,2.05rem)] leading-[1.42] tracking-[-0.025em]">
                  I'm Karl, a developer passionate about bringing ideas to life through games,
                  websites, and mobile apps. Game development is my main focus, but I'm versatile
                  enough to adapt, solve problems, and deliver quality work across different
                  development projects.
                </p>

                <div className="mt-[54px] grid grid-cols-[1.2fr_1fr] gap-[34px] border-t border-line pt-[30px] max-[640px]:grid-cols-1">
                  <div>
                    <p className="mb-4 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-ink-soft">
                      Tools I use
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {aboutTools.map((toolKey) => {
                        const tool = tools[toolKey];
                        return (
                          <img
                            key={toolKey}
                            src={asset(tool.src)}
                            alt={tool.label}
                            title={tool.label}
                            className="h-[52px] w-[52px] rounded-[14px] border border-line bg-paper-strong object-contain"
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="mb-4 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-ink-soft">
                      Skills
                    </p>
                    <ul className="grid list-disc gap-2 pl-[18px] text-[#3f3d39]">
                      {skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
