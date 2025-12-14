import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SearchSection from "@/components/SearchSection";
import RestaurantList from "@/components/RestaurantList";
import RestaurantDetailDrawer from "@/components/RestaurantDetailDrawer";
import { Restaurant } from "@/components/RestaurantCard";
import { mockRestaurants } from "@/data/mockRestaurants";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>(["celiac"]);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

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

  // Filter restaurants based on search query
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <SearchSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilters={activeFilters}
          onFilterToggle={handleFilterToggle}
        />

        <RestaurantList
          restaurants={filteredRestaurants}
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
    </div>
  );
};

export default Index;
