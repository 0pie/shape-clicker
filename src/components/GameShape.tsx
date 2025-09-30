import { cn } from "@/lib/utils";

interface GameShapeProps {
  type: "circle" | "square" | "triangle" | "hexagon" | "icosahedron";
  onClick: () => void;
  isClicking: boolean;
  className?: string;
}

export const GameShape = ({ type, onClick, isClicking, className }: GameShapeProps) => {
  const baseClasses = "transition-all duration-300 fill-primary/20 stroke-primary stroke-2";
  const glowClasses = isClicking ? "drop-shadow-[0_0_20px_rgba(35,181,211,0.8)]" : "drop-shadow-[0_0_10px_rgba(35,181,211,0.4)]";
  
  const renderShape = () => {

    switch (type) {
      case "circle":
        return (
          <circle
            cx="150"
            cy="150"
            r="100"
            className={baseClasses}
          />
        );
      case "square":
        return (
          <rect
            x="50"
            y="50"
            width="200"
            height="200"
            rx="10"
            className={baseClasses}
          />
        );
      case "triangle":
        return (
          <polygon
            points="150,40 260,240 40,240"
            className={baseClasses}
          />
        );
      case "hexagon":
        return (
          <polygon
            points="150,30 240,85 240,185 150,240 60,185 60,85"
            className={baseClasses}
          />
        );
      case "icosahedron":
        return (
          <g>
            <polygon
              points="150,30 120,90 180,90"
              className={baseClasses}
            />
            <polygon
              points="150,30 180,90 210,60"
              className={baseClasses}
            />
            <polygon
              points="150,30 210,60 200,20"
              className={baseClasses}
            />
            <polygon
              points="120,90 150,150 180,90"
              className={baseClasses}
            />
            <polygon
              points="120,90 90,120 150,150"
              className={baseClasses}
            />
            <polygon
              points="180,90 150,150 210,120"
              className={baseClasses}
            />
            <polygon
              points="150,150 120,210 180,210"
              className={baseClasses}
            />
            <polygon
              points="150,270 120,210 180,210"
              className={baseClasses}
            />
          </g>
        );
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative cursor-pointer select-none transition-transform active:scale-95",
        isClicking && "animate-click-bounce",
        className
      )}
      aria-label={`Click ${type} to earn points`}
    >
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        className={cn("transition-all duration-300", glowClasses)}
      >
        {renderShape()}
      </svg>
    </button>
  );
};
