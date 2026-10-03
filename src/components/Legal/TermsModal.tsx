import React from 'react';
import { X, FileText, CheckCircle2, AlertCircle, Scale, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../../utils/soundEffects';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
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
              <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  Terms & Conditions
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
              aria-label="Close Terms and Conditions"
              className="glass-item p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs">
              <p className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                Engineering Verification Disclaimer:
              </p>
              <p className="mt-1">
                CFD aerodynamic outputs are numerical approximations. Physical wind tunnel testing or certified structural validation is required before flight vehicle construction or critical mission deployment.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                1. Acceptance of Terms
              </h3>
              <p>
                By accessing this CFD Platform, you agree to these Terms. If you do not agree, please discontinue using the solver environment and workbench tools.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-500" />
                2. Intellectual Property & Attribution
              </h3>
              <p>
                This platform is owned by <strong>RIM</strong>. All engineering development, software architecture, numerical simulation pipelines, and user interface designs are created and engineered by <strong>Akhil.A</strong>. All development credits belong to Akhil.A.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-teal-500" />
                3. OpenFOAM & Open-Source Components
              </h3>
              <p>
                OpenFOAM is a registered trademark of OpenCFD Limited. This application provides an interactive engineering workbench bridge for mesh inspection, case setup, and result visualization.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-500" />
                4. Contact & Inquiries
              </h3>
              <p>
                For licensing questions, academic research collaborations, or support, please reach out to lead developer <strong>Akhil.A</strong>:
              </p>
              <p className="font-mono font-semibold text-teal-600 dark:text-teal-400">
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
              I Accept the Terms
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
