// frontend/src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSignInAlt, FaCode, FaUsers, FaRocket, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const features = [
  {
    icon: <FaCode className="text-indigo-500 w-10 h-10" />,
    title: "Collaborate",
    description: "Work with developers worldwide on exciting projects.",
  },
  {
    icon: <FaUsers className="text-indigo-500 w-10 h-10" />,
    title: "Network",
    description: "Build meaningful professional connections.",
  },
  {
    icon: <FaRocket className="text-indigo-500 w-10 h-10" />,
    title: "Grow",
    description: "Learn new skills and advance your career.",
  },
];

// Typing effect hook for tagline
function useTypingEffect(words, speed = 150, pause = 1500) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    let timeout;

    if (!deleting) {
      timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, displayed.length + 1));
        if (displayed.length + 1 === currentWord.length) {
          setDeleting(true);
          setTimeout(() => {}, pause);
        }
      }, speed);
    } else {
      timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setDeleting(false);
          setWordIndex((prev) => prev + 1);
        }
      }, speed / 2);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIndex, words, speed, pause]);

  return displayed;
}

const Home = () => {
  const navigate = useNavigate();
  const typingText = useTypingEffect([
    "Connect.",
    "Collaborate.",
    "Grow.",
    "Innovate.",
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6">
      {/* Hero Section */}
      <main className="flex flex-col flex-grow justify-center items-center max-w-4xl mx-auto text-center space-y-8 py-20 sm:py-32">
        <h1 className="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-md">
          DevConnect
        </h1>
        <p className="text-2xl sm:text-3xl font-light max-w-xl mx-auto leading-relaxed text-indigo-600 dark:text-indigo-400 min-h-[3rem]">
          {typingText}
          <span className="inline-block animate-pulse">|</span>
        </p>

        <p className="text-lg sm:text-xl max-w-2xl font-normal text-gray-700 dark:text-gray-300">
          Your vibrant community to connect, collaborate, and grow as a developer.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8 w-full max-w-sm sm:max-w-md mx-auto">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center justify-center w-full sm:w-auto px-14 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg text-white font-semibold tracking-wide transition duration-300"
            aria-label="Login"
          >
            <FaSignInAlt className="mr-3 text-lg" />
            Login
          </button>

         <button
  onClick={() => navigate("/register")}
  className="
    flex items-center justify-center w-full sm:w-auto px-14 py-3
    bg-indigo-600 hover:bg-indigo-700
    rounded-xl shadow-lg text-white font-semibold tracking-wide
    transition duration-300
  "
  aria-label="Register"
>
  <FaUser className="mr-3 text-lg" />
  Register
</button>

        </div>
      </main>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-20">
        <h2 className="text-center text-3xl font-bold mb-12 tracking-tight text-gray-900 dark:text-gray-100">
          Why Join DevConnect?
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {features.map(({ icon, title, description }) => (
            <div
              key={title}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg flex flex-col items-center text-center hover:scale-[1.03] transform transition-transform duration-300"
            >
              {icon}
              <h3 className="mt-6 mb-3 text-xl font-semibold">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-300 dark:border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} DevConnect. All rights reserved.
          </p>
          <div className="flex space-x-6 text-gray-600 dark:text-gray-400">
            <a
              href="https://github.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
