import React from 'react';

export const PageSkeleton: React.FC = () => (
  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6" aria-label="Loading page content" role="status">
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800 pb-5">
        <div className="space-y-2.5">
          <div className="h-3 w-28 animate-pulse rounded-full bg-sky-200/70 dark:bg-sky-900/60" />
          <div className="h-7 w-64 animate-pulse rounded-xl bg-slate-200/80 dark:bg-slate-800" />
          <div className="h-3.5 w-80 max-w-[70vw] animate-pulse rounded-md bg-slate-200/60 dark:bg-slate-800/60" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-28 animate-pulse rounded-xl bg-slate-200/80 dark:bg-slate-800" />
          <div className="h-9 w-32 animate-pulse rounded-xl bg-sky-300/80 dark:bg-sky-800" />
        </div>
      </div>

      {/* Metric Cards Skeleton Grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="glass-surface rounded-2xl p-5 space-y-3.5 border border-white/60 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div className="h-3 w-20 animate-pulse rounded bg-slate-300/70 dark:bg-slate-700" />
              <div className="h-4 w-4 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-8 w-28 animate-pulse rounded-lg bg-slate-300/80 dark:bg-slate-700/80" />
            <div className="h-2.5 w-full animate-pulse rounded bg-slate-200/80 dark:bg-slate-800/80" />
          </div>
        ))}
      </div>

      {/* Main Viewport / Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-surface rounded-3xl p-6 min-h-[320px] flex flex-col justify-between border border-white/60 dark:border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-3">
            <div className="h-4 w-36 animate-pulse rounded bg-slate-300/70 dark:bg-slate-700" />
            <div className="h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="flex-1 my-4 flex items-center justify-center">
            <div className="w-full h-44 rounded-2xl bg-slate-200/50 dark:bg-slate-800/40 animate-pulse flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-slate-300/40 dark:bg-slate-700/40 animate-ping" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="h-3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        <div className="glass-surface rounded-3xl p-6 space-y-4 border border-white/60 dark:border-slate-800">
          <div className="h-4 w-28 animate-pulse rounded bg-slate-300/70 dark:bg-slate-700" />
          <div className="space-y-3 pt-2">
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/50">
                <div className="h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-16 animate-pulse rounded bg-slate-300/70 dark:bg-slate-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <span className="sr-only">Loading page content</span>
  </div>
);

export default PageSkeleton;
