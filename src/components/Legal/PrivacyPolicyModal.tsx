import React from 'react';
import { X, Shield, Lock, Database, EyeOff, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../../utils/soundEffects';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl max-h-[85vh] glass-surface rounded-3xl shadow-2xl border border-white/60 dark:border-slate-800 flex flex-col z-10 overflow-hidden bg-white/95 dark:bg-slate-900/95"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  Privacy Policy & Data Security
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  CFD Platform · Owner: RIM · Developer: Akhil.A
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              aria-label="Close Privacy Policy"
              className="glass-item p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-200 text-xs">
              <p className="font-bold">Summary Notice:</p>
              <p className="mt-1">
                We believe in zero surveillance engineering. We do not sell your personal information, inject third-party ad pixels, or track your CFD experiments across the web.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-sky-500" />
                1. Information We Process
              </h3>
              <p>
                When you use the CFD Platform, numerical boundary configurations, mesh parameters, uploaded CAD/STL geometries, and solver logs are processed strictly to perform aerodynamic calculations (simpleFoam and surrogate physics engines).
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-sky-500" />
                2. In-Memory Security & Authentication
              </h3>
              <p>
                User accounts, two-factor authentication (TOTP RFC 6238), and session tokens are protected with bcrypt password hashing and rotating JWTs with HTTP-only cookies. Tokens are held in-memory to prevent XSS credential harvesting.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-sky-500" />
                3. Cookies & Local Storage
              </h3>
              <p>
                We only use essential functional cookies (such as double-submit CSRF prevention tokens and theme/sound preferences) to preserve workbench UI state. You may decline non-essential cookies via our Cookie Preferences banner.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-500" />
                4. Ownership, Attribution & Inquiries
              </h3>
              <p>
                This website is owned by <strong>RIM</strong> and developed by <strong>Akhil.A</strong>. For questions, data erasure requests, or compliance inquiries, please contact:
              </p>
              <p className="font-mono font-semibold text-sky-600 dark:text-sky-400">
                <a href="mailto:akkedu01@gmail.com" className="hover:underline">
                  akkedu01@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              I Understand & Accept
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
