import { Card } from "@/components/ui/card";

interface StatsDisplayProps {
  points: number;
  pointsPerSecond: number;
  pointsPerClick: number;
}

export const StatsDisplay = ({ points, pointsPerSecond, pointsPerClick }: StatsDisplayProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full animate-fade-in">
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6 text-center">
        <div className="text-sm text-muted-foreground mb-1">Calculations</div>
        <div className="text-4xl font-bold text-primary animate-pulse-glow">
          {points.toLocaleString()}
        </div>
      </Card>
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6 text-center">
        <div className="text-sm text-muted-foreground mb-1">Per Second</div>
        <div className="text-2xl font-bold text-secondary">
          +{pointsPerSecond.toLocaleString()}/s
        </div>
      </Card>
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6 text-center">
        <div className="text-sm text-muted-foreground mb-1">Per Click</div>
        <div className="text-2xl font-bold text-secondary">
          +{pointsPerClick.toLocaleString()}
        </div>
      </Card>
    </div>
  );
};