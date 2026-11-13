import { useState } from "react";
import { Link } from "react-router-dom";
import { asset } from "../lib/asset.js";
import { homeSlides } from "../data/projects.js";

export default function ProjectCarousel() {
  const [index, setIndex] = useState(0);
  const total = homeSlides.length;

  const previous = () => setIndex((value) => (value - 1 + total) % total);
  const next = () => setIndex((value) => (value + 1) % total);

  return (
    <section
      id="projects"
      className="min-h-[100svh] py-[110px] text-light transition-[background] duration-[420ms] max-[640px]:py-[86px]"
      style={{ background: homeSlides[index].gradient }}
    >
      <div className="section-shell flex flex-col">
      <div className="mb-[46px] grid grid-cols-[1fr_minmax(260px,420px)] items-end gap-10 max-[900px]:grid-cols-1 max-[900px]:gap-[18px]">
        <div>
          <p className="text-[0.74rem] font-bold uppercase tracking-[0.14em]">My Selected work</p>
          <h2 className="mt-2 text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
            Projects
          </h2>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-card border border-white/[0.18] bg-white/[0.04] shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
        <div
          className="flex w-[300%] transition-transform duration-[520ms]"
          style={{
            transform: `translateX(-${index * 33.333333}%)`,
            transitionTimingFunction: "cubic-bezier(.2,.75,.25,1)",
          }}
        >
          {homeSlides.map((slide, slideIndex) => (
            <article
              key={slide.id}
              className="relative aspect-[16/8.4] flex-[0_0_33.3333%] overflow-hidden bg-[#191919] max-[900px]:aspect-[4/3] max-[640px]:aspect-auto max-[640px]:min-h-[430px]"
              aria-hidden={slideIndex !== index}
            >
              <img src={asset(slide.image)} alt={`${slide.title} placeholder`} className="h-full w-full object-cover" />
              <div className="absolute inset-x-[18px] bottom-[18px] flex min-h-[112px] items-center justify-between gap-6 rounded-[18px] border border-white/[0.18] bg-[rgba(10,10,10,0.54)] px-6 py-5 backdrop-blur-[18px] max-[640px]:inset-x-3 max-[640px]:bottom-3 max-[640px]:min-h-[98px] max-[640px]:p-4">
                <div>
                  <span className="text-[0.74rem] uppercase tracking-[0.12em] text-white/[0.63]">
                    {slide.type}
                  </span>
                  <h3 className="mt-1 text-[clamp(1.25rem,3vw,2.2rem)] font-medium tracking-[-0.035em]">
                    {slide.title}
                  </h3>
                </div>
                <span className="text-[0.74rem] uppercase tracking-[0.12em] text-white/[0.63] max-[640px]:hidden">
                  {`0${slideIndex + 1} / 0${total}`}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-[18px] top-1/2 flex -translate-y-1/2 justify-between max-[640px]:inset-x-[10px]">
          <button
            type="button"
            aria-label="Previous project"
            onClick={previous}
            className="pointer-events-auto grid h-[52px] w-[52px] place-items-center rounded-full border border-white/[0.24] bg-[rgba(8,8,8,0.58)] text-white backdrop-blur-[12px] transition duration-200 hover:scale-105 hover:bg-[rgba(8,8,8,0.86)] focus-visible:scale-105 focus-visible:bg-[rgba(8,8,8,0.86)] focus-visible:outline-none max-[640px]:h-11 max-[640px]:w-11"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next project"
            onClick={next}
            className="pointer-events-auto grid h-[52px] w-[52px] place-items-center rounded-full border border-white/[0.24] bg-[rgba(8,8,8,0.58)] text-white backdrop-blur-[12px] transition duration-200 hover:scale-105 hover:bg-[rgba(8,8,8,0.86)] focus-visible:scale-105 focus-visible:bg-[rgba(8,8,8,0.86)] focus-visible:outline-none max-[640px]:h-11 max-[640px]:w-11"
          >
            →
          </button>
        </div>
      </div>

      <Link
        to="/projects/games"
        className="mt-9 inline-flex items-center gap-3 self-center rounded-full border border-white/30 bg-white/[0.08] px-5 py-[14px] text-[0.86rem] text-light transition-colors duration-200 hover:bg-light hover:text-ink focus-visible:bg-light focus-visible:text-ink focus-visible:outline-none"
      >
        View more Projects
        <span aria-hidden="true">↗</span>
      </Link>
      </div>
    </section>
  );
}
