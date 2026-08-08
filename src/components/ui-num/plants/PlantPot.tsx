type PlantPotProps = {
  x: number;
  y: number;
  w?: number;
  h?: number;
  potGradId: string;
};

export default function PlantPot({
  x,
  y,
  w = 22,
  h = 10,
  potGradId,
}: PlantPotProps) {
  return (
    <g>
      <path
        d={`M${x + 2} ${y} h${w - 4} l2 ${h} h${-(w)} z`}
        fill={`url(#${potGradId})`}
      />
      <rect x={x} y={y - 2.5} width={w} height={3.5} rx={1} fill="#c45a22" />
      <rect
        x={x + 1}
        y={y - 1.5}
        width={w - 2}
        height={1.2}
        rx={0.5}
        fill="#ffb37a"
        opacity={0.35}
      />
    </g>
  );
}
