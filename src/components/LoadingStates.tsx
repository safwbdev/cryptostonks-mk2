import { Icon, faTriangleExclamation, faArrowsRotate } from "./Icon";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`bg-white/5 rounded-lg animate-pulse ${className}`}
    />
  );
}

// Table row skeletons

export function TableRowSkeleton({ cols = 8 }: { cols?: number }) {
  return (
    <tr className="border-b border-white/4">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

export function TableSkeleton({ rows = 8, cols = 8 }: { rows?: number; cols?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRowSkeleton key={i} cols={cols} />
      ))}
    </>
  );
}

// Card skeleton

export function CardSkeleton({ className = "" }: SkeletonProps) {
  return (
    <div className={`bg-[#0D1424] border border-white/7 rounded-2xl p-5 space-y-3 ${className}`}>
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

// Full-page spinner

export function Spinner({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
    >
      <circle
        cx="12" cy="12" r="10"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="3"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="#10B981"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PageSpinner() {
  return (
    <div className="flex items-center justify-center py-24">
      <Spinner size={32} />
    </div>
  );
}

// Error message

interface ErrorBoxProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorBox({ message, onRetry }: ErrorBoxProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center px-4">
      <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
        <Icon icon={faTriangleExclamation} className="text-red-400 text-xl" />
      </div>
      <div>
        <p className="text-white font-semibold text-sm mb-1">Failed to load data</p>
        <p className="text-slate-500 text-xs max-w-xs leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-1.5"
        >
          <Icon icon={faArrowsRotate} className="text-xs" /> Try again
        </button>
      )}
    </div>
  );
}

// Inline refresh indicator

export function LiveIndicator({ lastUpdated }: { lastUpdated: Date | null }) {
  if (!lastUpdated) return null;
  const secs = Math.floor((Date.now() - lastUpdated.getTime()) / 1000);
  const label = secs < 10 ? "just now" : `${secs}s ago`;
  return (
    <div className="flex items-center gap-1.5 text-xs text-slate-600">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      Updated {label}
    </div>
  );
}
