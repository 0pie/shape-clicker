import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface UpgradeCardProps {
  title: string;
  description: string;
  cost: number;
  currentPoints: number;
  onPurchase: () => void;
  level: number;
  icon: string;
}

export const UpgradeCard = ({
  title,
  description,
  cost,
  currentPoints,
  onPurchase,
  level,
  icon,
}: UpgradeCardProps) => {
  const canAfford = currentPoints >= cost;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-4 transition-all hover:border-primary/50 animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="text-3xl">{icon}</div>
        <div className="flex-1 space-y-2">
          <div>
            <h3 className="font-bold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Level {level}</span>
              <span className={cn(
                "text-sm font-semibold",
                canAfford ? "text-primary" : "text-muted-foreground"
              )}>
                {cost.toLocaleString()} pts
              </span>
            </div>
            <Button
              onClick={onPurchase}
              disabled={!canAfford}
              size="sm"
              className={cn(
                "bg-primary text-primary-foreground hover:bg-primary/90",
                !canAfford && "opacity-50 cursor-not-allowed"
              )}
            >
              Buy
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};