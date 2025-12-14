import { Search, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FilterChips from "./FilterChips";

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilters: string[];
  onFilterToggle: (filter: string) => void;
  onSearch: () => void;
  isSearching?: boolean;
}

const SearchSection = ({ 
  searchQuery, 
  onSearchChange, 
  activeFilters, 
  onFilterToggle,
  onSearch,
  isSearching = false,
}: SearchSectionProps) => {
  return (
    <section className="py-10 md:py-16 bg-gradient-to-b from-primary-soft/50 to-background">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Coma com segurança, em qualquer lugar.
          </h1>
          <p className="mb-8 text-muted-foreground">
            Análise de segurança alimentar com IA para suas necessidades dietéticas
          </p>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Onde você quer comer com segurança?"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-14 pl-12 pr-32 text-base rounded-xl border-border bg-card shadow-card focus:shadow-card-hover focus:border-primary transition-all"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-sm text-secondary-foreground hover:bg-secondary/80 transition-colors">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Perto</span>
              </button>
            </div>
          </div>

          {/* Filter Chips */}
          <FilterChips 
            activeFilters={activeFilters} 
            onFilterToggle={onFilterToggle} 
          />

          {/* Search Button */}
          <Button 
            onClick={onSearch} 
            size="lg" 
            className="mt-6 px-8"
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Analisando com IA...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Buscar Restaurantes Seguros
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
