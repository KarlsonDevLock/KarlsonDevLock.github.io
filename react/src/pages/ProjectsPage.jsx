import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ProjectShowcase from "../components/ProjectShowcase.jsx";
import { projectCategories } from "../data/projects.js";

export default function ProjectsPage({ category }) {
  const data = projectCategories[category];

  return (
    <div className="min-h-screen bg-[#111] text-light">
      <Header variant="projects" active={category} />

      <main
        className="pt-[126px] max-[640px]:pt-[148px]"
        style={{
          background:
            "radial-gradient(circle at 15% 4%, rgba(255,255,255,0.045), transparent 28%), #111",
        }}
      >
        <div className="section-shell py-[100px] pb-[82px] max-[640px]:pb-[56px] max-[640px]:pt-[74px]">
          {data.eyebrow && (
            <p className="text-[0.74rem] font-bold uppercase tracking-[0.14em]">{data.eyebrow}</p>
          )}
          <h1 className="mt-2 text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
            {data.title}
          </h1>
        </div>

        {data.items.map((project, index) => (
          <ProjectShowcase
            key={project.id}
            project={project}
            index={index}
            reverse={index % 2 === 1}
          />
        ))}
      </main>

      <Footer compact />
    </div>
  );
}
