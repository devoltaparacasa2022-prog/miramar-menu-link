const StatusBadge = () => (
  <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-background/40 px-4 py-1.5 text-xs font-medium text-foreground backdrop-blur">
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
    </span>
    Aberto agora
    <span className="text-muted-foreground">· Até 00h</span>
  </div>
);

export default StatusBadge;
