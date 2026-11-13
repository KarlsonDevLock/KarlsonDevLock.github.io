import { asset } from "../lib/asset.js";
import { tools } from "../data/projects.js";

export default function ProjectShowcase({ project, index, reverse }) {
  const mediaOrder = reverse ? "order-2 max-[900px]:order-1" : "";
  const panelOrder = reverse ? "order-1 max-[900px]:order-2" : "";

  return (
    <section className="section-shell mb-11 grid grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)] items-stretch gap-[clamp(28px,6vw,76px)] rounded-[30px] border border-white/[0.12] bg-white/[0.045] p-[34px] backdrop-blur-[18px] max-[900px]:grid-cols-1 max-[640px]:rounded-[22px] max-[640px]:p-[14px]">
      <div className={`relative min-h-[460px] overflow-hidden rounded-card border border-white/[0.11] bg-[#171717] max-[640px]:min-h-[390px] ${mediaOrder}`}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src={asset(project.video)}
        />
        <div className="absolute inset-x-4 bottom-4 flex min-h-[104px] items-center gap-[18px] rounded-[18px] border border-white/[0.16] bg-[rgba(12,12,12,0.58)] px-[18px] py-[14px] backdrop-blur-[16px] max-[640px]:inset-x-[10px] max-[640px]:bottom-[10px] max-[640px]:gap-3 max-[640px]:p-3">
          <img
            src={asset(project.logo)}
            alt={`${project.title} logo`}
            className="h-[52px] w-[88px] rounded-[10px] object-contain max-[640px]:h-11 max-[640px]:w-[68px]"
          />
          <div>
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#aaa69f]">
              {project.type}
            </span>
            <h2 className="mt-[3px] text-[clamp(1.05rem,2vw,1.55rem)] font-medium tracking-[-0.025em]">
              {project.title}
            </h2>
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col justify-center p-[clamp(10px,2vw,26px)] max-[900px]:p-[10px_4px_4px] ${panelOrder}`}
      >
        <p className="text-[0.74rem] font-bold uppercase tracking-[0.14em]">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mb-4 mt-3 text-[clamp(1.8rem,3vw,3rem)] font-medium leading-none tracking-[-0.045em]">
          {project.heading}
        </h3>
        <p className="text-[#b9b5ae]">{project.description}</p>

        <div className="mt-[34px] border-t border-white/[0.11] pt-[22px]">
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#aaa69f]">
            Tools
          </span>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {project.tools.map((toolKey) => {
              const tool = tools[toolKey];
              return (
                <img
                  key={toolKey}
                  src={asset(tool.src)}
                  alt={tool.label}
                  title={tool.label}
                  className="h-[52px] w-[52px] rounded-[14px] border border-white/[0.12] bg-[#efede8] object-contain"
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
