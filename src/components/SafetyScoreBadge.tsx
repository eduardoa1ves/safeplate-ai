import { cn } from "@/lib/utils";

interface SafetyScoreBadgeProps {
  score: number;
  label: string;
  size?: "sm" | "md" | "lg";
}

const SafetyScoreBadge = ({ score, label, size = "md" }: SafetyScoreBadgeProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "safety-gradient-high";
    if (score >= 70) return "safety-gradient-medium";
    return "safety-gradient-low";
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <div
      className={cn(
        "rounded-lg font-semibold text-primary-foreground shadow-sm",
        getScoreColor(score),
        sizeClasses[size]
      )}
    >
      <span className="font-bold">{score}%</span>
      <span className="ml-1 font-medium opacity-90">{label}</span>
    </div>
  );
};

export default SafetyScoreBadge;
