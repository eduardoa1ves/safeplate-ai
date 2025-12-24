import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SearchSection from "@/components/SearchSection";
import RestaurantList from "@/components/RestaurantList";
import RestaurantDetailDrawer from "@/components/RestaurantDetailDrawer";
import AuthModal from "@/components/AuthModal";
import CreditsModal from "@/components/CreditsModal";
import { Restaurant } from "@/components/RestaurantCard";
import { mockRestaurants } from "@/data/mockRestaurants";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>(["celiac"]);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
  
  const { isAuthenticated, useCredit, user } = useAuth();
  const { toast } = useToast();

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setRestaurants(mockRestaurants);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterToggle = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const handleSearch = () => {
    // Check if user is logged in
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please sign in to search for restaurants.",
        variant: "destructive",
      });
      setIsAuthModalOpen(true);
      return;
    }

    // Check if user has credits (or is premium)
    if (!user?.isPremium && (user?.credits || 0) <= 0) {
      toast({
        title: "No credits remaining",
        description: "Purchase more credits to continue searching.",
        variant: "destructive",
      });
      setIsCreditsModalOpen(true);
      return;
    }

    // Use a credit for the search
    const success = useCredit();
    if (success) {
      setHasSearched(true);
      setIsLoading(true);
      
      // Simulate search loading
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Search complete",
          description: `Found ${filteredRestaurants.length} restaurants matching your criteria.`,
        });
      }, 1000);
    }
  };

  // Filter restaurants based on search query
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show restaurants only if user has searched (or show all initially before any search attempt)
  const displayedRestaurants = hasSearched || !isAuthenticated ? filteredRestaurants : filteredRestaurants;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onOpenAuth={() => setIsAuthModalOpen(true)} 
        onOpenCredits={() => setIsCreditsModalOpen(true)} 
      />
      
      <main>
        <SearchSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilters={activeFilters}
          onFilterToggle={handleFilterToggle}
          onSearch={handleSearch}
        />

        <RestaurantList
          restaurants={displayedRestaurants}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onRestaurantClick={setSelectedRestaurant}
          isLoading={isLoading}
        />
      </main>

      <RestaurantDetailDrawer
        restaurant={selectedRestaurant}
        isOpen={!!selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      <CreditsModal 
        isOpen={isCreditsModalOpen} 
        onClose={() => setIsCreditsModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
