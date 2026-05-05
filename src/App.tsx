import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import { ContentProvider } from "./contexts/ContentContext";

const About = lazy(() => import("./components/About").then(m => ({ default: m.About })));
const Skills = lazy(() => import("./components/Skills").then(m => ({ default: m.Skills })));
const Projects = lazy(() => import("./components/Projects").then(m => ({ default: m.Projects })));
const Experience = lazy(() => import("./components/Experience").then(m => ({ default: m.Experience })));
const Contact = lazy(() => import("./components/Contact").then(m => ({ default: m.Contact })));
const Footer = lazy(() => import("./components/Footer").then(m => ({ default: m.Footer })));
const Chatbot = lazy(() => import("./components/Chatbot").then(m => ({ default: m.Chatbot })));
const CustomCursor = lazy(() => import("./components/CustomCursor").then(m => ({ default: m.CustomCursor })));
const Admin = lazy(() => import("./pages/Admin").then(m => ({ default: m.Admin })));
const ScrollProgress = lazy(() => import("./components/ui/ScrollProgress").then(m => ({ default: m.ScrollProgress })));

function Portfolio() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div className="py-24 text-center text-gray-500">Loading...</div>}>
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <Chatbot />
        <ScrollProgress />
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <BrowserRouter>
          <Suspense fallback={null}>
            <CustomCursor />
          </Suspense>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/admin" element={
              <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center text-gray-500">Loading Admin...</div>}>
                <Admin />
              </Suspense>
            } />
          </Routes>
        </BrowserRouter>
      </ContentProvider>
    </AuthProvider>
  );
}
