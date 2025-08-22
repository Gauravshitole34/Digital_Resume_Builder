import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Briefcase, Calendar } from "lucide-react";
import { useResumeStore, Experience } from "@/store/resumeStore";

export function ExperienceStep() {
  const { experience, addExperience, updateExperience, removeExperience } = useResumeStore();
  const [newExperience, setNewExperience] = useState<Omit<Experience, 'id'>>({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: [''],
  });

  const handleAddExperience = () => {
    if (newExperience.company && newExperience.position) {
      const filteredDescription = newExperience.description.filter(desc => desc.trim() !== '');
      addExperience({
        ...newExperience,
        description: filteredDescription.length > 0 ? filteredDescription : [''],
      });
      setNewExperience({
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: [''],
      });
    }
  };

  const addDescriptionPoint = () => {
    setNewExperience({
      ...newExperience,
      description: [...newExperience.description, ''],
    });
  };

  const updateDescriptionPoint = (index: number, value: string) => {
    const updatedDescription = [...newExperience.description];
    updatedDescription[index] = value;
    setNewExperience({
      ...newExperience,
      description: updatedDescription,
    });
  };

  const removeDescriptionPoint = (index: number) => {
    if (newExperience.description.length > 1) {
      const updatedDescription = newExperience.description.filter((_, i) => i !== index);
      setNewExperience({
        ...newExperience,
        description: updatedDescription,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Experience Form */}
      <Card className="bg-gradient-card border-border p-4 shadow-soft">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-primary" />
          Add Work Experience
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium">
                Company *
              </Label>
              <Input
                id="company"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                placeholder="Google Inc."
                className="bg-background-secondary border-border focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position" className="text-sm font-medium">
                Position *
              </Label>
              <Input
                id="position"
                value={newExperience.position}
                onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                placeholder="Software Engineer"
                className="bg-background-secondary border-border focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">
                Location
              </Label>
              <Input
                id="location"
                value={newExperience.location}
                onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                placeholder="Mountain View, CA"
                className="bg-background-secondary border-border focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm font-medium">
                Start Date
              </Label>
              <Input
                id="startDate"
                type="month"
                value={newExperience.startDate}
                onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                className="bg-background-secondary border-border focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-sm font-medium">
                End Date
              </Label>
              <Input
                id="endDate"
                type="month"
                value={newExperience.endDate}
                onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                disabled={newExperience.current}
                className="bg-background-secondary border-border focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="current"
              checked={newExperience.current}
              onCheckedChange={(checked) => 
                setNewExperience({ 
                  ...newExperience, 
                  current: checked as boolean,
                  endDate: checked ? '' : newExperience.endDate
                })
              }
            />
            <Label htmlFor="current" className="text-sm">
              I currently work here
            </Label>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Job Description
            </Label>
            {newExperience.description.map((desc, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  value={desc}
                  onChange={(e) => updateDescriptionPoint(index, e.target.value)}
                  placeholder="• Describe your responsibilities and achievements..."
                  rows={2}
                  className="bg-background-secondary border-border focus:ring-primary resize-none"
                />
                {newExperience.description.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDescriptionPoint(index)}
                    className="mt-1 text-destructive hover:text-destructive-foreground hover:bg-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={addDescriptionPoint}
              className="mt-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Point
            </Button>
          </div>

          <Button 
            onClick={handleAddExperience}
            variant="secondary"
            className="w-full"
            disabled={!newExperience.company || !newExperience.position}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        </div>
      </Card>

      {/* Existing Experience List */}
      {experience.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Your Experience</h3>
          {experience.map((exp) => (
            <Card key={exp.id} className="bg-card border-border p-4 shadow-soft">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{exp.position}</h4>
                  <p className="text-muted-foreground font-medium">{exp.company}</p>
                  {exp.location && (
                    <p className="text-sm text-muted-foreground">{exp.location}</p>
                  )}
                  {exp.startDate && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                      {exp.current ? ' Present' : 
                        exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''
                      }
                    </p>
                  )}
                  {exp.description.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.description.map((desc, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {desc}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                  className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {experience.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No work experience added yet. Add your first job above!</p>
        </div>
      )}
    </div>
  );
}
