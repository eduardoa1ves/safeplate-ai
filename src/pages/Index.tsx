import { useState } from "react";
import Header from "@/components/Header";
import SearchSection from "@/components/SearchSection";
import RestaurantList from "@/components/RestaurantList";
import RestaurantDetailDrawer from "@/components/RestaurantDetailDrawer";
import AuthModal from "@/components/AuthModal";
import UpgradeModal from "@/components/UpgradeModal";
import { Restaurant } from "@/components/RestaurantCard";
import { mockRestaurants } from "@/data/mockRestaurants";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>(["celiac"]);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  const { isAuthenticated, user, useFreeTrialSearch } = useAuth();

  const handleFilterToggle = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const handleSearch = () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    // Check if user can search (premium or free trial not used)
    if (user?.plan === "free" && user?.freeTrialUsed) {
      setShowUpgradeModal(true);
      return;
    }

    // Use free trial if on free plan
    if (user?.plan === "free") {
      const canSearch = useFreeTrialSearch();
      if (!canSearch) {
        setShowUpgradeModal(true);
        return;
      }
      toast.info("Você usou sua busca gratuita. Próxima busca requer upgrade!");
    }

    // Perform search
    setIsSearching(true);
    setHasSearched(true);

    // Simulate AI analysis
    setTimeout(() => {
      const filtered = mockRestaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        searchQuery === ""
      );
      setRestaurants(filtered);
      setIsSearching(false);
      toast.success(`${filtered.length} restaurantes encontrados!`);
    }, 2000);
  };

  const handleAuthSuccess = () => {
    // After successful auth, trigger search
    handleSearch();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <SearchSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilters={activeFilters}
          onFilterToggle={handleFilterToggle}
          onSearch={handleSearch}
          isSearching={isSearching}
        />

        {hasSearched && (
          <RestaurantList
            restaurants={restaurants}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onRestaurantClick={setSelectedRestaurant}
            isLoading={isSearching}
          />
        )}

        {!hasSearched && (
          <div className="container py-16 text-center">
            <p className="text-muted-foreground">
              Selecione seus filtros e clique em "Buscar" para encontrar restaurantes seguros
            </p>
          </div>
        )}
      </main>

      <RestaurantDetailDrawer
        restaurant={selectedRestaurant}
        isOpen={!!selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
      />

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />

      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)}
      />
    </div>
  );
};

export default Index;
