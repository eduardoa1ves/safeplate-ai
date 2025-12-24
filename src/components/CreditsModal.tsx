import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Check, Sparkles, Zap, Crown, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const creditPackages = [
  {
    id: "starter",
    name: "Starter Pack",
    credits: 10,
    price: 4.99,
    popular: false,
    icon: Zap,
  },
  {
    id: "explorer",
    name: "Explorer Pack",
    credits: 30,
    price: 9.99,
    popular: true,
    icon: Sparkles,
  },
  {
    id: "foodie",
    name: "Foodie Pack",
    credits: 100,
    price: 24.99,
    popular: false,
    icon: CreditCard,
  },
];

const premiumPlan = {
  name: "Premium Monthly",
  price: 14.99,
  features: [
    "Unlimited restaurant searches",
    "Full AI-analyzed menu access",
    "Cross-contamination risk reports",
    "Priority customer support",
    "Early access to new features",
  ],
};

const CreditsModal: React.FC<CreditsModalProps> = ({ isOpen, onClose }) => {
  const { user, addCredits, upgradeToPremium } = useAuth();
  const { toast } = useToast();

  const handleBuyCredits = (packageId: string, credits: number, price: number) => {
    // Mock purchase - in real app, this would integrate with Stripe
    addCredits(credits);
    toast({
      title: "Credits purchased!",
      description: `You received ${credits} credits. Your balance: ${(user?.credits || 0) + credits} credits.`,
    });
    onClose();
  };

  const handleSubscribe = () => {
    // Mock subscription - in real app, this would integrate with Stripe
    upgradeToPremium();
    toast({
      title: "Welcome to Premium!",
      description: "You now have unlimited access to all features.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Crown className="h-6 w-6 text-premium" />
            Get More Credits
          </DialogTitle>
          <DialogDescription>
            {user && (
              <span className="text-foreground font-medium">
                Current balance: {user.credits} credits
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Premium Subscription */}
        <div className="relative p-6 rounded-xl border-2 border-premium bg-gradient-to-br from-premium/5 to-premium/10 mb-6">
          <div className="absolute -top-3 left-4 px-3 py-1 bg-premium text-primary-foreground text-xs font-semibold rounded-full">
            BEST VALUE
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Crown className="h-5 w-5 text-premium" />
                {premiumPlan.name}
              </h3>
              <p className="text-2xl font-bold mt-1">
                ${premiumPlan.price}
                <span className="text-sm font-normal text-muted-foreground">/month</span>
              </p>
            </div>
            
            <Button 
              variant="premium" 
              size="lg" 
              onClick={handleSubscribe}
              disabled={user?.isPremium}
            >
              {user?.isPremium ? "Current Plan" : "Subscribe Now"}
            </Button>
          </div>
          
          <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            {premiumPlan.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Credit Packages */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Or buy credits individually
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {creditPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative p-4 rounded-xl border-2 transition-all hover:shadow-card-hover ${
                  pkg.popular
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    POPULAR
                  </div>
                )}
                
                <div className="flex flex-col items-center text-center">
                  <div className={`p-2 rounded-full ${pkg.popular ? "bg-primary/10" : "bg-muted"}`}>
                    <pkg.icon className={`h-6 w-6 ${pkg.popular ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  
                  <h4 className="font-semibold mt-2">{pkg.name}</h4>
                  <p className="text-2xl font-bold">{pkg.credits}</p>
                  <p className="text-xs text-muted-foreground">credits</p>
                  
                  <p className="text-lg font-semibold mt-2">${pkg.price}</p>
                  <p className="text-xs text-muted-foreground">
                    ${(pkg.price / pkg.credits).toFixed(2)} per credit
                  </p>
                  
                  <Button
                    variant={pkg.popular ? "default" : "outline"}
                    className="w-full mt-3"
                    onClick={() => handleBuyCredits(pkg.id, pkg.credits, pkg.price)}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-4">
          Payments are securely processed. Credits never expire.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default CreditsModal;
