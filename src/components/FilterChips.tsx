import { Wheat, Leaf, AlertTriangle, Milk } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterChipsProps {
  activeFilters: string[];
  onFilterToggle: (filter: string) => void;
}

const filters = [
  { id: "celiac", label: "Celiac Friendly", icon: Wheat },
  { id: "keto", label: "Keto", icon: Leaf },
  { id: "no-peanuts", label: "No Peanuts", icon: AlertTriangle },
  { id: "dairy-free", label: "Dairy Free", icon: Milk },
];

const FilterChips = ({ activeFilters, onFilterToggle }: FilterChipsProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = activeFilters.includes(filter.id);
        
        return (
          <Button
            key={filter.id}
            variant="filter"
            size="chip"
            data-active={isActive}
            onClick={() => onFilterToggle(filter.id)}
            className="gap-1.5"
          >
            <Icon className="h-3.5 w-3.5" />
            {filter.label}
          </Button>
        );
      })}
    </div>
  );
};

export default FilterChips;
