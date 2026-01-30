export default function DangerPill({ children, width = 'fit-content' }) {
  return (
    <span className="min-w-20 flex items-center justify-center bg-red-500/15 text-red-800 font-bold rounded-full text-[12px] py-1">
      {children}
    </span>
  );
}
