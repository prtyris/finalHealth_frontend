import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Team from "../components/Team";
import Journey from "../components/Journey";
import Values from "../components/Values";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  useEffect(() => {
    const darkmode = async () => {
      const savedDarkMode = localStorage.getItem("darkMode") === "enabled";
      setDarkMode(savedDarkMode);
    };
    darkmode();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "disabled");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };
  const closeAuthModal = () => setShowAuthModal(false);
  const switchAuthMode = (mode) => setAuthMode(mode);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "dark:bg-gray-900 dark:text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        openAuthModal={openAuthModal}
      />
      <Hero />
      <About />
      <Team />
      <Journey />
      <Values />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />

      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={closeAuthModal}
          onSwitchMode={switchAuthMode}
        />
      )}
    </div>
  );
}
