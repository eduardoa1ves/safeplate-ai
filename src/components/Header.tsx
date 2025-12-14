import { useState } from "react";
import { Shield, User, Crown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./AuthModal";
import UpgradeModal from "./UpgradeModal";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              SafePlate Navigator
            </span>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {user?.plan === "free" && (
                  <Button 
                    variant="premium" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => setShowUpgradeModal(true)}
                  >
                    <Crown className="h-4 w-4 text-premium" />
                    <span>Upgrade</span>
                  </Button>
                )}
                
                {user?.plan === "premium" && (
                  <Badge className="bg-premium text-premium-foreground">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-border hover:ring-primary/50 transition-all">
                      <AvatarImage src="" alt="User" />
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {user?.email?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user?.email}</span>
                        <span className="text-xs text-muted-foreground capitalize">
                          Plano {user?.plan}
                          {user?.plan === "free" && (user?.freeTrialUsed ? " (usado)" : " (1 busca)")}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {user?.plan === "free" && (
                      <DropdownMenuItem onClick={() => setShowUpgradeModal(true)}>
                        <Crown className="h-4 w-4 mr-2 text-premium" />
                        Upgrade para Premium
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={logout} className="text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                >
                  Entrar
                </Button>
                <Button 
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                >
                  Cadastrar
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {}}
      />
      
      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)}
      />
    </>
  );
};

export default Header;
