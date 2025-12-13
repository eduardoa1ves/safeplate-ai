import { X, Star, DollarSign, MapPin, Phone, Clock, Lock, Sparkles, ShieldCheck, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import SafetyScoreBadge from "./SafetyScoreBadge";
import { Restaurant } from "./RestaurantCard";

interface RestaurantDetailDrawerProps {
  restaurant: Restaurant | null;
  isOpen: boolean;
  onClose: () => void;
}

const RestaurantDetailDrawer = ({ restaurant, isOpen, onClose }: RestaurantDetailDrawerProps) => {
  if (!restaurant) return null;

  const riskLevel = restaurant.safetyScore >= 90 ? "Low" : restaurant.safetyScore >= 70 ? "Medium" : "High";
  const riskColor = restaurant.safetyScore >= 90 ? "text-primary" : restaurant.safetyScore >= 70 ? "text-warning" : "text-danger";
  const riskProgress = 100 - (restaurant.safetyScore >= 90 ? 15 : restaurant.safetyScore >= 70 ? 45 : 75);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto p-0">
        {/* Hero Image */}
        <div className="relative h-48">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 rounded-full bg-card/90 flex items-center justify-center hover:bg-card transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-xl font-bold text-primary-foreground mb-1">{restaurant.name}</h2>
            <div className="flex items-center gap-3 text-sm text-primary-foreground/80">
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
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Safety Score Section */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Safety Analysis
              </h3>
              <SafetyScoreBadge
                score={restaurant.safetyScore}
                label={restaurant.safetyLabel}
                size="md"
              />
            </div>

            {/* Risk Assessment */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Cross-Contamination Risk</span>
                <span className={`font-medium ${riskColor}`}>{riskLevel}</span>
              </div>
              <Progress value={riskProgress} className="h-2" />
            </div>

            {/* AI Insights */}
            <div className="mt-4 p-3 rounded-lg bg-primary-soft/50 border border-primary/10">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-primary mb-1">AI Insights</p>
                  <p className="text-xs text-foreground/80 leading-relaxed">
                    {restaurant.aiInsight}
                  </p>
                </div>
              </div>
            </div>

            {/* Safety Highlights */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-foreground/80">Dedicated allergen-free prep area</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-foreground/80">Staff trained on cross-contamination</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-foreground/80">Shared fryer - ask before ordering fried items</span>
              </div>
            </div>
          </div>

          {/* Menu Analysis - Premium Teaser */}
          <div className="relative rounded-xl border border-border bg-card p-4 overflow-hidden">
            <div className="absolute inset-0 backdrop-blur-sm bg-card/80 flex flex-col items-center justify-center z-10">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center mb-3">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">Premium Feature</p>
              <p className="text-xs text-muted-foreground text-center max-w-[200px] mb-3">
                Upgrade to view AI-analyzed menu items safe for your diet
              </p>
              <Button variant="premium" size="sm">
                Unlock Menu Analysis
              </Button>
            </div>
            
            {/* Blurred preview content */}
            <div className="opacity-30">
              <h3 className="font-semibold text-foreground mb-3">Menu Analysis</h3>
              <div className="space-y-2">
                <div className="h-12 bg-secondary rounded-lg" />
                <div className="h-12 bg-secondary rounded-lg" />
                <div className="h-12 bg-secondary rounded-lg" />
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>123 Main St, Downtown • {restaurant.distance}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Open until 10:00 PM</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1" size="lg">
              Get Directions
            </Button>
            <Button variant="outline" size="lg">
              Call
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default RestaurantDetailDrawer;
