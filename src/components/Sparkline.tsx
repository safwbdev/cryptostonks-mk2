interface SparklineProps {
  data: number[];
  positive: boolean;
  width?: number;
  height?: number;
}

function Sparkline({ data, positive, width = 80, height = 32 }: SparklineProps) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;
  const w = width - pad * 2;
  const h = height - pad * 2;

  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * w;
    const y = pad + h - ((v - min) / range) * h;
    return `${x},${y}`;
  });

  const polyline = points.join(" ");
  const first = points[0];
  const last = points[points.length - 1];

  const fillPath = `M${first} L${points.slice(1).join(" L")} L${last.split(",")[0]},${height} L${pad},${height} Z`;

  const color = positive ? "#10B981" : "#F87171";
  const fillId = `fill-${Math.random().toString(36).slice(2)}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill={`url(#${fillId})`} />
      <polyline points={polyline} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default Sparkline