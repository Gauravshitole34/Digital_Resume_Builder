import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useResumeStore } from "@/store/resumeStore";
import { Check } from "lucide-react";
import crimsonPreview from "@/assets/templates/crimson-preview.jpg";
import modernPreview from "@/assets/templates/modern-preview.jpg";
import classicPreview from "@/assets/templates/classic-preview.jpg";

interface TemplateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const templates = [
  {
    id: 'crimson',
    name: 'Crimson Text',
    description: 'Classic serif with elegant red headings and professional styling',
    preview: crimsonPreview
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean sans-serif with bold blue headers and generous spacing',
    preview: modernPreview
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional gray layout with subtle separators and timeless design',
    preview: classicPreview
  }
] as const;

export function TemplateModal({ open, onOpenChange }: TemplateModalProps) {
  const { template, setTemplate } = useResumeStore();

  const handleTemplateSelect = (templateId: typeof template) => {
    setTemplate(templateId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-gradient-card border-0 shadow-large">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Choose Template
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {templates.map((templateOption) => (
            <Card 
              key={templateOption.id}
              className={`relative cursor-pointer transition-smooth hover:scale-105 hover:shadow-glow border-2 ${
                template === templateOption.id 
                  ? 'border-primary bg-gradient-primary/10' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleTemplateSelect(templateOption.id)}
            >
              <div className="p-4">
                <div className="aspect-[4/5] mb-4 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={templateOption.preview as string}
                    alt={`Resume template preview - ${templateOption.name}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{templateOption.name}</h3>
                    {template === templateOption.id && (
                      <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{templateOption.description}</p>
                </div>
                
                <Button 
                  variant={template === templateOption.id ? "default" : "outline"}
                  className="w-full mt-4"
                  onClick={() => handleTemplateSelect(templateOption.id)}
                >
                  {template === templateOption.id ? "Selected" : "Select Template"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}