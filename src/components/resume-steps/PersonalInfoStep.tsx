import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeStore } from "@/store/resumeStore";

export function PersonalInfoStep() {
  const { personalInfo, updatePersonalInfo } = useResumeStore();

  const handleInputChange = (field: string, value: string) => {
    updatePersonalInfo({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
            Full Name *
          </Label>
          <Input
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder="John Doe"
            className="bg-background-secondary border-border focus:ring-primary transition-smooth"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="john@example.com"
            className="bg-background-secondary border-border focus:ring-primary transition-smooth"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-foreground">
            Phone Number
          </Label>
          <Input
            id="phone"
            value={personalInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="bg-background-secondary border-border focus:ring-primary transition-smooth"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium text-foreground">
            Location
          </Label>
          <Input
            id="location"
            value={personalInfo.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="San Francisco, CA"
            className="bg-background-secondary border-border focus:ring-primary transition-smooth"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkedin" className="text-sm font-medium text-foreground">
            LinkedIn URL
          </Label>
          <Input
            id="linkedin"
            value={personalInfo.linkedin}
            onChange={(e) => handleInputChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
            className="bg-background-secondary border-border focus:ring-primary transition-smooth"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="github" className="text-sm font-medium text-foreground">
            GitHub URL
          </Label>
          <Input
            id="github"
            value={personalInfo.github}
            onChange={(e) => handleInputChange('github', e.target.value)}
            placeholder="github.com/johndoe"
            className="bg-background-secondary border-border focus:ring-primary transition-smooth"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="portfolio" className="text-sm font-medium text-foreground">
            Portfolio URL
          </Label>
          <Input
            id="portfolio"
            value={personalInfo.portfolio}
            onChange={(e) => handleInputChange('portfolio', e.target.value)}
            placeholder="johndoe.com"
            className="bg-background-secondary border-border focus:ring-primary transition-smooth"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary" className="text-sm font-medium text-foreground">
          Professional Summary
        </Label>
        <Textarea
          id="summary"
          value={personalInfo.summary}
          onChange={(e) => handleInputChange('summary', e.target.value)}
          placeholder="A brief summary of your professional background, skills, and career objectives..."
          rows={4}
          className="bg-background-secondary border-border focus:ring-primary transition-smooth resize-none"
        />
        <p className="text-xs text-muted-foreground">
          Write a compelling 2-3 sentence summary highlighting your key strengths and experience.
        </p>
      </div>
    </div>
  );
}