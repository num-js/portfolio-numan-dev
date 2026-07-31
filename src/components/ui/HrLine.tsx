export default function HrLine({ direction = "left" }: { direction?: "left" | "right" }) {
  const directionClass = direction === "left" ? "bg-linear-to-r from-accent-orange-soft/60 to-transparent" : "bg-linear-to-l from-accent-orange-soft/60 to-transparent";
  return (
    <div
      aria-hidden="true"
      className={`my-2 block h-px w-full bg-linear-to-r ${directionClass} `}
    ></div>
  )
}
