import { Star, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import SafetyScoreBadge from "./SafetyScoreBadge";
import AIInsightBox from "./AIInsightBox";
import { cn } from "@/lib/utils";

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  priceLevel: number;
  safetyScore: number;
  safetyLabel: string;
  aiInsight: string;
  cuisine: string;
  distance: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
  isLoading?: boolean;
}

const RestaurantCard = ({ restaurant, onClick, isLoading }: RestaurantCardProps) => {
  if (isLoading) {
    return (
      <Card className="overflow-hidden bg-card shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-40 h-32 sm:h-auto skeleton-shimmer" />
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="h-5 w-40 rounded skeleton-shimmer" />
                <div className="h-4 w-24 rounded skeleton-shimmer" />
                <div className="h-4 w-32 rounded skeleton-shimmer" />
              </div>
              <div className="h-8 w-32 rounded-lg skeleton-shimmer" />
            </div>
            <div className="mt-3 rounded-lg bg-muted p-3">
              <div className="space-y-2">
                <div className="h-3 w-full rounded skeleton-shimmer" />
                <div className="h-3 w-3/4 rounded skeleton-shimmer" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className="overflow-hidden bg-card shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group animate-fade-in"
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative w-full sm:w-40 h-32 sm:h-auto overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {restaurant.name}
              </h3>
              
              {/* Meta info */}
              <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-premium text-premium" />
                  {restaurant.rating}
                </span>
                <span className="flex items-center">
                  {Array.from({ length: restaurant.priceLevel }).map((_, i) => (
                    <DollarSign key={i} className="h-3.5 w-3.5" />
                  ))}
                </span>
                <span>{restaurant.cuisine}</span>
                <span className="text-xs">•</span>
                <span className="text-xs">{restaurant.distance}</span>
              </div>
            </div>

            {/* Safety Score */}
            <SafetyScoreBadge
              score={restaurant.safetyScore}
              label={restaurant.safetyLabel}
              size="md"
            />
          </div>

          {/* AI Insight */}
          <AIInsightBox insight={restaurant.aiInsight} />
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;
