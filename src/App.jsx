import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import Section2 from './components/Section2.jsx';
import Section3 from './components/Section3.jsx';
import Section4 from './components/Section4.jsx';
import Section5 from './components/Section5.jsx';
import Section6 from './components/Section6.jsx';
import Section7 from './components/Section7.jsx';
import Section8 from './components/Section8.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import ServicePage from './pages/ServicePage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import serviceList from './data/services.js';
import './App.css';

function HomePage() {
  return (
    <div className="App">
      <HeroSection />
      <ProjectsSection />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      <Section8 />
      <Footer hideServices />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {serviceList.map((service) => (
          <Route key={service.path} path={service.path} element={<ServicePage service={service} />} />
        ))}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;