import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";

function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (!state?.scrollTo) window.scrollTo(0, 0);
  }, [pathname, state]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/games" element={<ProjectsPage category="games" />} />
        <Route path="/projects/web" element={<ProjectsPage category="web" />} />
        <Route path="/projects/mobile" element={<ProjectsPage category="mobile" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
