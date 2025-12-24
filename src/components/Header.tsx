import { Shield, User, Crown, LogOut, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  onOpenAuth: () => void;
  onOpenCredits: () => void;
}

const Header = ({ onOpenAuth, onOpenCredits }: HeaderProps) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
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
              {/* Credits Display */}
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={onOpenCredits}
              >
                <CreditCard className="h-4 w-4 text-primary" />
                <span>{user?.isPremium ? "Premium" : `${user?.credits} credits`}</span>
              </Button>

              {!user?.isPremium && (
                <Button variant="premium" size="sm" className="gap-2" onClick={onOpenCredits}>
                  <Crown className="h-4 w-4 text-premium" />
                  <span>Go Premium</span>
                </Button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-border hover:ring-primary/50 transition-all">
                    <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {user?.name?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onOpenCredits}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Buy Credits
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-danger">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={onOpenAuth}>
                Sign In
              </Button>
              <Button variant="premium" size="sm" className="gap-2" onClick={onOpenAuth}>
                <Crown className="h-4 w-4 text-premium" />
                <span>Go Premium</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
