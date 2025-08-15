import React from "react";
import Particles from "../UI/Particles";
import { motion } from "motion/react";

const HeroSection = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-br to-blue-900 via-blue-800 from-blue-700">
      <div className="absolute h-screen flex items-center justify-center flex-col w-full">
        <h1
          className="mt-8 bg-gradient-to-br from-[#efebea] to-[#b3adac]
          via-[#cbc4c2] py-4 bg-clip-text text-center text-4xl font-medium
          tracking-tight text-transparent md:text-7xl"
        >
          {" "}
          Stop Fighting Your Tools.
          <br /> Start Flowing.
        </h1>
        <div className="text-xl text-gray-300 w-[45%] text-center leading-tight mt-4 tracking-tight">
          AI command center that ends tool chaos, cuts distractions, and turns
          scattered work into focused productivity.
        </div>
        <button
          // onClick={onClick}
          className="px-10 py-3 rounded-full border-2 border-white text-white font-medium backdrop-blur-2xl bg-slate-900
                       shadow-[inset_0_0_120px_rgba(255,255,255,0.05)]
                       transition-all duration-500 ease-in-out
                       hover:shadow-[0_0_20px_#62748e,inset_0_0_20px_rgba(255,255,255,0.08)]
                       hover:border-[#FFD9C2] hover:scale-105 z-50 cursor-pointer mt-8"
        >
          Watch Demo
        </button>
      </div>
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={300}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
        className="opacity-50"
      />
    </div>
  );
};

export default HeroSection;
