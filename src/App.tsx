import React from 'react';
import { PlatformProvider, usePlatform } from './context/PlatformContext';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/Auth/AuthModal';
import { Navbar } from './components/Navigation/Navbar';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { GeometryPage } from './pages/GeometryPage';
import { SimulationSetupPage } from './pages/SimulationSetupPage';
import { SimulationRunnerPage } from './pages/SimulationRunnerPage';
import { CfdWorkbenchView } from './components/CfdWorkbenchView';
import { AIAnalysisPage } from './pages/AIAnalysisPage';
import { ReportingPage } from './pages/ReportingPage';
import { ParametricSweepsPage } from './pages/ParametricSweepsPage';
import { DocumentationPage } from './pages/DocumentationPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SimulationQueueDrawer } from './components/SimulationQueue/SimulationQueueDrawer';
import { OpenFoamExportModal } from './components/common/OpenFoamExportModal';
import { PageSkeleton } from './components/common/PageSkeleton';
import { CircularAiBot } from './components/AiAssistant/CircularAiBot';
import { CookieConsentBanner } from './components/common/CookieConsentBanner';
import { PrivacyPolicyModal } from './components/Legal/PrivacyPolicyModal';
import { TermsModal } from './components/Legal/TermsModal';
import { CloudShader } from './components/ui/cloud-shader';
import { motion, AnimatePresence } from 'motion/react';

const AppContent: React.FC = () => {
  const {
    page,
    themeMode,
    lightTheme,
    activeThemeConfig,
    isQueueOpen,
    setIsQueueOpen,
    isOpenFoamModalOpen,
    setIsOpenFoamModalOpen,
    geometries,
    currentGeometryId,
    simConfig,
    projects,
    currentProjectId,
  } = usePlatform();

  const [isPageLoading, setIsPageLoading] = React.useState(true);
  const [isPrivacyOpen, setIsPrivacyOpen] = React.useState(false);
  const [isTermsOpen, setIsTermsOpen] = React.useState(false);

  // Dynamic Page Title Synchronization
  React.useEffect(() => {
    const titles: Record<string, string> = {
      landing: 'CFD Platform — Aerodynamics & AI Simulation Engine',
      dashboard: 'Dashboard · Aerodynamics Telemetry — CFD Platform',
      projects: 'Projects & CFD Cases — CFD Platform',
      geometry: 'Geometry & Mesh Inspector — CFD Platform',
      setup: 'OpenFOAM Physics & Solver Setup — CFD Platform',
      runner: 'Live Solver Runner · OpenFOAM v2606 — CFD Platform',
      sweeps: 'Parametric Sweeps & Polars — CFD Platform',
      results: '3D Flowfield Workbench — CFD Platform',
      ai: 'AI Aerodynamics Co-Pilot — CFD Platform',
      reporting: 'Compliance & PDF Reports — CFD Platform',
      docs: 'Documentation & Equations — CFD Platform',
      notfound: '404 · Boundary Layer Lost — CFD Platform',
    };
    document.title = titles[page] || 'CFD Platform — Aerodynamics & AI Simulation Engine';
  }, [page]);

  React.useEffect(() => {
    setIsPageLoading(true);
    const timeout = window.setTimeout(() => setIsPageLoading(false), 160);
    return () => window.clearTimeout(timeout);
  }, [page]);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--theme-accent', activeThemeConfig.accentColor);
    document.documentElement.style.setProperty('--theme-glow', activeThemeConfig.glowColor);
  }, [activeThemeConfig]);

  const currentGeom = geometries.find((g) => g.id === currentGeometryId) || geometries[0];
  const currentProj = projects.find((p) => p.projectId === currentProjectId) || projects[0];

  const themeBgClass = themeMode === 'dark' ? 'bg-[#020617] text-slate-100' : `theme-bg-${lightTheme} text-slate-900`;

  return (
    <div className={`flex flex-col lg:flex-row min-h-[100dvh] h-[100dvh] w-full max-w-[100vw] ${themeBgClass} font-sans antialiased overflow-hidden select-none relative transition-colors duration-300`}>
      {/* Dynamic Atmospheric Cloud Shader */}
      <CloudShader
        className="fixed inset-0 h-full w-full z-0 pointer-events-none"
      />

      {/* Left-Side Navigation Bar */}
      <Navbar />

      {/* Main Workspace Area (Content + Footer) */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10 min-w-0 h-full">
        {/* Main Screen Container with Fluid Animated Transitions */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="flex-1 flex flex-col overflow-hidden h-full w-full"
            >
              {isPageLoading ? <PageSkeleton /> : (
                <>
                  {page === 'landing' && <LandingPage />}
                  {page === 'dashboard' && <DashboardPage />}
                  {page === 'projects' && <ProjectsPage />}
                  {page === 'geometry' && <GeometryPage />}
                  {page === 'setup' && <SimulationSetupPage />}
                  {page === 'runner' && <SimulationRunnerPage />}
                  {page === 'sweeps' && <ParametricSweepsPage />}
                  {page === 'results' && <CfdWorkbenchView />}
                  {page === 'ai' && <AIAnalysisPage />}
                  {page === 'reporting' && <ReportingPage />}
                  {page === 'docs' && <DocumentationPage />}
                  {page === 'notfound' && <NotFoundPage />}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Global Application Footer with Clickable Email, Owner/Dev Credits, and Legal Links */}
        <footer className="glass-surface bg-white/95 dark:bg-slate-950/95 py-2 sm:py-0 sm:h-7 px-3 sm:px-4 flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] text-slate-700 dark:text-slate-300 z-20 shrink-0 select-none pb-safe border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span className="font-mono text-[10px] whitespace-nowrap">OpenFOAM v2606 Engine Status: Ready</span>
            <span className="hidden md:inline text-slate-400">·</span>
            <span className="hidden md:inline text-[10px] text-slate-500 dark:text-slate-400">Owner: <strong className="text-slate-800 dark:text-slate-200">RIM</strong></span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 text-[10px] sm:text-[11px]">
            <span className="font-medium tracking-wide">
              DEVELOPED by <strong className="text-slate-900 dark:text-white">Akhil.A</strong> · Gmail:{' '}
              <a
                href="mailto:akkedu01@gmail.com"
                className="text-sky-600 dark:text-sky-400 font-mono hover:underline font-semibold"
                title="Send email to developer Akhil.A"
              >
                akkedu01@gmail.com
              </a>
            </span>
            <span className="text-slate-400">·</span>
            <button
              type="button"
              onClick={() => setIsPrivacyOpen(true)}
              className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 hover:underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-400">·</span>
            <button
              type="button"
              onClick={() => setIsTermsOpen(true)}
              className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 hover:underline cursor-pointer"
            >
              Terms
            </button>
          </div>
        </footer>
      </div>

      {/* Floating Circular AI Chat Bot */}
      <CircularAiBot />

      {/* Cookie Consent Banner */}
      <CookieConsentBanner
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
      />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Terms and Conditions Modal */}
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      {/* Authentication & Security Modal */}
      <AuthModal />

      {/* Simulation Queue Drawer */}
      <SimulationQueueDrawer
        isOpen={isQueueOpen}
        onClose={() => setIsQueueOpen(false)}
        onOpenOpenFoamModal={() => {
          setIsQueueOpen(false);
          setIsOpenFoamModalOpen(true);
        }}
      />

      {/* Full OpenFOAM Case ZIP Exporter Modal */}
      {currentGeom && (
        <OpenFoamExportModal
          isOpen={isOpenFoamModalOpen}
          onClose={() => setIsOpenFoamModalOpen(false)}
          geometry={currentGeom}
          simConfig={simConfig}
          projectName={currentProj?.name || currentGeom.name}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <PlatformProvider>
        <AppContent />
      </PlatformProvider>
    </AuthProvider>
  );
}
