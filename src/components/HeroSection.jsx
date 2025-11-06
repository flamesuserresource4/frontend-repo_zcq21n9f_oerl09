import React from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

const FloatingStar = ({ x, y, delay = 0 }) => (
  <motion.div
    className="absolute bg-white/80 rounded-full shadow"
    style={{ left: x, top: y, width: 2, height: 2 }}
    initial={{ opacity: 0.2 }}
    animate={{ opacity: [0.2, 1, 0.2] }}
    transition={{ duration: 2.5, repeat: Infinity, delay }}
  />
);

const FloatingPlanet = ({ size = 14, color = '#39FF14', y = '60%', delay = 0 }) => (
  <motion.div
    className="absolute rounded-full"
    style={{ width: size, height: size, background: color, top: y }}
    initial={{ x: '-10%' }}
    animate={{ x: ['-10%', '110%'] }}
    transition={{ duration: 45, repeat: Infinity, ease: 'linear', delay }}
  />
);

const UFO = ({ y = '30%', delay = 0 }) => (
  <motion.div
    className="absolute"
    style={{ top: y }}
    initial={{ x: '-20%' }}
    animate={{ x: ['-20%', '120%'] }}
    transition={{ duration: 35, repeat: Infinity, ease: 'linear', delay }}
  >
    <div className="relative">
      <div className="w-12 h-4 bg-gray-300 rounded-full mx-auto blur-[0.5px]" />
      <div className="w-16 h-6 bg-gray-500 rounded-full -mt-3 mx-auto" />
      <div className="w-10 h-5 bg-[#39FF14] rounded-full -mt-5 mx-auto" />
      <div className="w-3 h-3 bg-blue-400 rounded-full -mt-6 mx-auto" />
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-1 h-10 bg-green-400/20 blur-sm" />
    </div>
  </motion.div>
);

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] bg-black overflow-hidden rounded-2xl border border-gray-800">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/OG17yM2eUIs8MUmA/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />

      {Array.from({ length: 60 }).map((_, i) => (
        <FloatingStar key={i} x={`${Math.random() * 100}%`} y={`${Math.random() * 100}%`} delay={Math.random() * 2} />
      ))}

      <FloatingPlanet size={10} color="#6EE7B7" y="25%" delay={0} />
      <FloatingPlanet size={18} color="#22D3EE" y="70%" delay={12} />

      <UFO y="35%" delay={0} />
      <UFO y="55%" delay={8} />

      {['15%', '50%', '80%'].map((left, idx) => (
        <motion.div
          key={idx}
          className="absolute text-4xl"
          style={{ left, bottom: '8%' }}
          initial={{ y: 10, opacity: 0.6 }}
          animate={{ y: [10, -2, 10], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3 + idx, repeat: Infinity }}
        >
          <span role="img" aria-label="alien" className="drop-shadow-[0_0_12px_#39FF14]">👽</span>
        </motion.div>
      ))}

      <div className="relative z-10 px-6 py-10 sm:py-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Staff Attendance System
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-300">
            Admin-only control with a playful, futuristic alien space vibe. Manage staff, log attendance, and view monthly recaps.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-[#39FF14]">
            <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
            <span className="uppercase text-xs tracking-widest">Live Space Scene</span>
          </div>
        </div>
      </div>
    </section>
  );
}
