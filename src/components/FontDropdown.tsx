import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useResumeStore } from "@/store/resumeStore";

const fonts = [
  { id: 'inter', name: 'Inter', class: 'font-sans' },
  { id: 'roboto', name: 'Roboto', class: 'font-roboto' },
  { id: 'crimson', name: 'Crimson Text', class: 'font-serif' },
  { id: 'montserrat', name: 'Montserrat', class: 'font-montserrat' }
] as const;

export function FontDropdown() {
  const { font, setFont } = useResumeStore();
  const currentFont = fonts.find(f => f.id === font);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <span className="text-sm">{currentFont?.name}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-card border-border shadow-large"
      >
        {fonts.map((fontOption) => (
          <DropdownMenuItem
            key={fontOption.id}
            onClick={() => setFont(fontOption.id)}
            className="flex items-center justify-between cursor-pointer hover:bg-muted"
          >
            <span className={`${fontOption.class} text-sm`}>
              {fontOption.name}
            </span>
            {font === fontOption.id && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}