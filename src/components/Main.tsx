"use client";
import { motion } from "framer-motion";
import React from "react";
import { FaDiscord, FaLinkedin, FaGithub, FaSearch } from "react-icons/fa";
import MagicButton from "./ui/Button/MagicButton";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const Main = () => {
  const StartSearch = () => {
    window.location.href = "/";
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-zinc-950 text-white">
      <header className="flex justify-between items-center p-4 px-8 md:px-16 lg:px-24">
        <div className="text-2xl font-bold">E-gest</div>
        <div className="flex gap-6">
          <a
            href="https://www.linkedin.com/in/guilherme-faccin-5b71a5172/"
            className="text-white hover:text-gray-300"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://discord.gg/mbutknu88T"
            className="text-white hover:text-gray-300"
          >
            <FaDiscord size={24} />
          </a>
          <a
            href="https://github.com/Faccin27"
            className="text-white hover:text-gray-300"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div
          id="dot-grid"
          className="relative flex w-full h-full items-center justify-center bg-zinc-900 bg-dot-white/[0.15]"
        >
          <div
            id="radial-gradient"
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"
          ></div>
          <div className="relative z-10">
            <div className="flex max-w-[89vw] flex-col items-center justify-center gap-3 md:max-w-2xl lg:max-w-[60vw] lg:gap-4 xl:gap-6">
              <motion.p
                className="text-center font-secondary text-xs uppercase tracking-widest text-gray-400 md:text-sm lg:text-base xl:text-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                Empowering Your Data Journey
              </motion.p>

              <TextGenerateEffect
                words="Unlock the Power of Data Insights"
                className="text-center text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
                highlighted={["Power", "Data"]}
                highlightedClassName="text-blue-500"
              ></TextGenerateEffect>

              <motion.p
                className="mb-4 text-center font-secondary text-xs text-gray-300 md:text-base md:tracking-wider lg:text-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                Explore and Analyze Data Like Never Before
              </motion.p>

              <div className="flex gap-4">
                <MagicButton handleClick={StartSearch}>
                  Start Searching
                </MagicButton>
                <MagicButton>Login</MagicButton>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
