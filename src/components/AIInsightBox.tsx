import { Sparkles } from "lucide-react";

interface AIInsightBoxProps {
  insight: string;
  isLoading?: boolean;
}

const AIInsightBox = ({ insight, isLoading }: AIInsightBoxProps) => {
  if (isLoading) {
    return (
      <div className="mt-3 rounded-lg bg-primary-soft/50 p-3 border border-primary/10">
        <div className="flex items-start gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 ai-pulse">
            <Sparkles className="h-3 w-3 text-primary" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-3 w-24 rounded skeleton-shimmer" />
            <div className="h-3 w-full rounded skeleton-shimmer" />
            <div className="h-3 w-3/4 rounded skeleton-shimmer" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 rounded-lg bg-primary-soft/50 p-3 border border-primary/10">
      <div className="flex items-start gap-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 shrink-0">
          <Sparkles className="h-3 w-3 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium text-primary mb-0.5">AI Analysis</p>
          <p className="text-xs text-foreground/80 leading-relaxed">{insight}</p>
        </div>
      </div>
    </div>
  );
};

export default AIInsightBox;
