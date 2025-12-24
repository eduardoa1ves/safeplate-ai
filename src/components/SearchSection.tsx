import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FilterChips from "./FilterChips";

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilters: string[];
  onFilterToggle: (filter: string) => void;
  onSearch: () => void;
}

const SearchSection = ({ 
  searchQuery, 
  onSearchChange, 
  activeFilters, 
  onFilterToggle,
  onSearch
}: SearchSectionProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <section className="py-10 md:py-16 bg-gradient-to-b from-primary-soft/50 to-background">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Eat safely, anywhere.
          </h1>
          <p className="mb-8 text-muted-foreground">
            AI-powered restaurant safety analysis for your dietary needs
          </p>

          {/* Search Bar */}
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Where do you want to eat safely?"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-14 pl-12 pr-4 text-base rounded-xl border-border bg-card shadow-card focus:shadow-card-hover focus:border-primary transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <button className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-sm text-secondary-foreground hover:bg-secondary/80 transition-colors">
                  <MapPin className="h-4 w-4" />
                  <span>Near me</span>
                </button>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="h-14 px-8 rounded-xl"
              onClick={onSearch}
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>

          {/* Filter Chips */}
          <FilterChips 
            activeFilters={activeFilters} 
            onFilterToggle={onFilterToggle} 
          />
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
