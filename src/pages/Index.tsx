import { useState, useEffect } from "react";
import { GameShape } from "@/components/GameShape";
import { UpgradeCard } from "@/components/UpgradeCard";
import { StatsDisplay } from "@/components/StatsDisplay";
import { ShapeProgress } from "@/components/ShapeProgress";
import { toast } from "sonner";

interface Shape {
  name: string;
  type: "circle" | "square" | "triangle" | "hexagon" | "icosahedron";
  cost: number;
  icon: string;
}

const SHAPES: Shape[] = [
  { name: "Cercle", type: "circle", cost: 0, icon: "⭕" },
  { name: "Carré", type: "square", cost: 100, icon: "🔷" },
  { name: "Triangle", type: "triangle", cost: 500, icon: "🔺" },
  { name: "Hexagon", type: "hexagon", cost: 2000, icon: "⬡" },
  { name: "Icosahedron", type: "icosahedron", cost: 10000, icon: "💎" },
];

const Index = () => {
  const [points, setPoints] = useState(0);
  const [calculatorLevel, setCalculatorLevel] = useState(0);
  const [rulerLevel, setRulerLevel] = useState(0);
  const [superCalculatorLevel, setSuperCalculatorLevel] = useState(0);
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const [isClicking, setIsClicking] = useState(false);

  const currentShape = SHAPES[currentShapeIndex];
  const nextShape = currentShapeIndex < SHAPES.length - 1 ? SHAPES[currentShapeIndex + 1] : null;

  // Calculate multipliers
  const clickMultiplier = 1 + rulerLevel * 5;
  const autoMultiplier = calculatorLevel * 2;
  const superMultiplier = superCalculatorLevel > 0 ? Math.pow(2, superCalculatorLevel) : 1;

  const pointsPerClick = clickMultiplier * superMultiplier;
  const pointsPerSecond = autoMultiplier * superMultiplier;

  // Auto-generate points
  useEffect(() => {
    if (pointsPerSecond <= 0) return;

    const interval = setInterval(() => {
      setPoints((prev) => prev + pointsPerSecond);
    }, 1000);

    return () => clearInterval(interval);
  }, [pointsPerSecond]);

  const handleClick = () => {
    setPoints((prev) => prev + pointsPerClick);
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 150);
  };

  const handlePurchaseCalculator = () => {
    const cost = 50 + calculatorLevel * 75;
    if (points >= cost) {
      setPoints((prev) => prev - cost);
      setCalculatorLevel((prev) => prev + 1);
      toast.success("Calculatrice améliorée!", {
        description: `+${2 * superMultiplier} calculs par seconde`,
      });
    }
  };

  const handlePurchaseRuler = () => {
    const cost = 100 + rulerLevel * 150;
    if (points >= cost) {
      setPoints((prev) => prev - cost);
      setRulerLevel((prev) => prev + 1);
      toast.success("Processeur amélioré!", {
        description: `+5 calculs par clic`,
      });
    }
  };

  const handlePurchaseSuperCalculator = () => {
    const cost = 5000 + superCalculatorLevel * 10000;
    if (points >= cost) {
      setPoints((prev) => prev - cost);
      setSuperCalculatorLevel((prev) => prev + 1);
      toast.success("🌟 Super Calculatrice Activée! 🌟", {
        description: `Toute la production est doublée!`,
      });
    }
  };

  const handleEvolveShape = () => {
    if (nextShape && points >= nextShape.cost) {
      setPoints((prev) => prev - nextShape.cost);
      setCurrentShapeIndex((prev) => prev + 1);
      toast.success(`Forme évoluée en ${nextShape.name}!`, {
        description: "Votre maitrise de la géométrie augmente!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-5xl font-bold text-primary">Shape Clicker</h1>
          <p className="text-muted-foreground">Cliquez, Gagnez, Evoluez.</p>
        </div>

        {/* Stats */}
        <StatsDisplay
          points={points}
          pointsPerSecond={pointsPerSecond}
          pointsPerClick={pointsPerClick}
        />

        {/* Shape Progress */}
        <ShapeProgress
          currentShape={currentShape}
          nextShape={nextShape}
          currentPoints={points}
          onPurchase={handleEvolveShape}
        />

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Shape */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
              <GameShape
                type={currentShape.type}
                onClick={handleClick}
                isClicking={isClicking}
                className="animate-float"
              />
            </div>
          </div>

          {/* Upgrades */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-4">Upgrades</h2>
            <UpgradeCard
              title="Calculatrice"
              description="Calculs automatiques chaque seconde"
              cost={50 + calculatorLevel * 75}
              currentPoints={points}
              onPurchase={handlePurchaseCalculator}
              level={calculatorLevel}
              icon="📟"
            />
            <UpgradeCard
              title="Processeur"
              description="Plus de calculs par clic"
              cost={100 + rulerLevel * 150}
              currentPoints={points}
              onPurchase={handlePurchaseRuler}
              level={rulerLevel}
              icon="🔳"
            />
            <UpgradeCard
              title="Super Calculatrice"
              description="Doubles toute la production!"
              cost={5000 + superCalculatorLevel * 10000}
              currentPoints={points}
              onPurchase={handlePurchaseSuperCalculator}
              level={superCalculatorLevel}
              icon="⚡"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
