import React from 'react';
import { usePlatform } from '../context/PlatformContext';
import { Compass, ArrowLeft, PlayCircle, BookOpen, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { sound } from '../utils/soundEffects';

export const NotFoundPage: React.FC = () => {
  const { setPage, activeThemeConfig } = usePlatform();

  const handleGo = (target: 'dashboard' | 'runner' | 'docs' | 'landing') => {
    sound.playClick();
    setPage(target);
  };

  return (
    <div className="flex-1 overflow-y-auto select-none p-4 sm:p-8 flex items-center justify-center min-h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="max-w-xl w-full glass-surface rounded-3xl p-6 sm:p-10 text-center flex flex-col items-center gap-6 shadow-2xl border border-white/60 dark:border-slate-800"
      >
        {/* Animated Radar / Wake Scanner */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-slate-900 border-2 border-sky-400/40 flex items-center justify-center overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0%,transparent_70%)]" />
          
          {/* Radar Grid Circles */}
          <div className="absolute w-20 h-20 rounded-full border border-sky-500/20" />
          <div className="absolute w-10 h-10 rounded-full border border-sky-500/30" />
          
          {/* Crosshairs */}
          <div className="absolute h-full w-[1px] bg-sky-500/20" />
          <div className="absolute w-full h-[1px] bg-sky-500/20" />

          {/* Sweeping Radar Needle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
            className="absolute inset-0 origin-center flex items-start justify-center"
          >
            <div className="w-[2px] h-1/2 bg-gradient-to-t from-sky-400 via-cyan-300 to-transparent shadow-[0_0_8px_#38bdf8]" />
          </motion.div>

          <Compass className="w-8 h-8 text-sky-400 relative z-10 animate-pulse" />
        </div>

        {/* 404 Header & Aerospace Diagnostics */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold tracking-wider uppercase">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>ERROR 404 · BOUNDARY LAYER SEPARATION</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Lost in the Turbulent Wake
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
            The requested aerodynamic coordinate or page does not exist in domain boundaries. Numerical convergence diverged from this waypoint.
          </p>
        </div>

        {/* Diagnostic Telemetry Chip */}
        <div className="w-full p-3 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-left font-mono text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
          <p><span className="text-sky-600 dark:text-sky-400 font-bold">[domain]</span> Computational mesh bounded: 0.0 &le; x &le; 10.0</p>
          <p><span className="text-sky-600 dark:text-sky-400 font-bold">[status]</span> Path coordinates out-of-bounds (Re &rarr; &infin;)</p>
          <p><span className="text-sky-600 dark:text-sky-400 font-bold">[action]</span> Re-trim angle of attack and navigate to flight deck</p>
        </div>

        {/* Navigation Recovery Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full pt-2">
          <button
            onClick={() => handleGo('dashboard')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer min-h-[42px]"
            style={{ backgroundColor: activeThemeConfig.accentColor }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Flight Deck (Dashboard)</span>
          </button>

          <button
            onClick={() => handleGo('runner')}
            className="flex-1 sm:flex-none glass-item inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer min-h-[42px]"
          >
            <PlayCircle className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Simulation Runner</span>
          </button>

          <button
            onClick={() => handleGo('landing')}
            className="glass-item inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer min-h-[42px]"
          >
            <BookOpen className="w-4 h-4" />
            <span>Home</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
