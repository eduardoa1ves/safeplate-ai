import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown, Check, Sparkles, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpgradeModal = ({ isOpen, onClose }: UpgradeModalProps) => {
  const { upgradeToPremium } = useAuth();

  const handleUpgrade = () => {
    // Simulate payment - in production, integrate with Stripe
    upgradeToPremium();
    toast.success("Upgrade realizado com sucesso! Aproveite o plano Premium!");
    onClose();
  };

  const features = [
    "Buscas ilimitadas com IA",
    "Análise detalhada de cardápios",
    "Alertas personalizados de segurança",
    "Histórico de restaurantes visitados",
    "Suporte prioritário",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full premium-gradient">
            <Crown className="h-8 w-8 text-primary-foreground" />
          </div>
          <DialogTitle className="text-2xl font-bold">
            Upgrade para Premium
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Você usou sua busca gratuita. Faça upgrade para buscas ilimitadas!
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Free Trial Used Notice */}
          <div className="rounded-lg bg-warning-soft p-4 text-center">
            <Sparkles className="mx-auto h-5 w-5 text-warning mb-2" />
            <p className="text-sm font-medium text-warning-foreground">
              Sua busca gratuita foi utilizada
            </p>
          </div>

          {/* Plan Comparison */}
          <div className="grid gap-4">
            {/* Free Plan */}
            <div className="rounded-lg border border-border p-4 opacity-60">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Plano Gratuito</h3>
                <span className="text-sm text-muted-foreground">R$ 0</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  1 busca com análise de IA
                </li>
                <li className="flex items-center gap-2 line-through">
                  Análise de cardápio
                </li>
              </ul>
            </div>

            {/* Premium Plan */}
            <div className="rounded-lg premium-border p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-premium text-premium-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg">
                RECOMENDADO
              </div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Crown className="h-4 w-4 text-premium" />
                  Plano Premium
                </h3>
                <div className="text-right">
                  <span className="text-lg font-bold">R$ 19,90</span>
                  <span className="text-sm text-muted-foreground">/mês</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <Button onClick={handleUpgrade} className="w-full" size="lg">
            <Zap className="h-4 w-4 mr-2" />
            Assinar Premium - R$ 19,90/mês
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Cancele a qualquer momento • Garantia de 7 dias
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeModal;
