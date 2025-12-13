import { List, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import RestaurantCard, { Restaurant } from "./RestaurantCard";

interface RestaurantListProps {
  restaurants: Restaurant[];
  viewMode: "list" | "map";
  onViewModeChange: (mode: "list" | "map") => void;
  onRestaurantClick: (restaurant: Restaurant) => void;
  isLoading?: boolean;
}

const RestaurantList = ({
  restaurants,
  viewMode,
  onViewModeChange,
  onRestaurantClick,
  isLoading,
}: RestaurantListProps) => {
  return (
    <section className="py-8">
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Safe restaurants near you
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {restaurants.length} restaurants analyzed by AI
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 rounded-lg bg-secondary p-1">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("list")}
              className="gap-1.5"
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("map")}
              className="gap-1.5"
            >
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Map</span>
            </Button>
          </div>
        </div>

        {/* Restaurant Cards */}
        {viewMode === "list" ? (
          <div className="space-y-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <RestaurantCard
                  key={i}
                  restaurant={{} as Restaurant}
                  onClick={() => {}}
                  isLoading
                />
              ))
            ) : (
              restaurants.map((restaurant, index) => (
                <div
                  key={restaurant.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <RestaurantCard
                    restaurant={restaurant}
                    onClick={() => onRestaurantClick(restaurant)}
                  />
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-secondary/50 h-96 flex items-center justify-center">
            <div className="text-center">
              <Map className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">Map View</p>
              <p className="text-sm text-muted-foreground/70">
                Interactive map coming soon
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RestaurantList;
