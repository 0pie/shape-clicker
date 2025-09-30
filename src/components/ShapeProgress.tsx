import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Shape {
  name: string;
  type: "circle" | "square" | "triangle" | "hexagon" | "icosahedron";
  cost: number;
  icon: string;
}

interface ShapeProgressProps {
  currentShape: Shape;
  nextShape: Shape | null;
  currentPoints: number;
  onPurchase: () => void;
}

export const ShapeProgress = ({ currentShape, nextShape, currentPoints, onPurchase }: ShapeProgressProps) => {
  if (!nextShape) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-primary/50 p-6 text-center animate-fade-in">
        <div className="text-2xl font-bold text-primary mb-2">🎉 Maximum Evolution Reached!</div>
        <div className="text-sm text-muted-foreground">
          You've unlocked the {currentShape.icon} {currentShape.name}
        </div>
      </Card>
    );
  }

  const progress = Math.min((currentPoints / nextShape.cost) * 100, 100);
  const canAfford = currentPoints >= nextShape.cost;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Current Shape</div>
          <div className="text-xl font-bold text-foreground">
            {currentShape.icon} {currentShape.name}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Next Shape</div>
          <div className="text-xl font-bold text-primary">
            {nextShape.icon} {nextShape.name}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Progress value={progress} className="h-3" />
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {currentPoints.toLocaleString()} / {nextShape.cost.toLocaleString()}
          </span>
          {canAfford && (
            <button
              onClick={onPurchase}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Evolve Shape!
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};