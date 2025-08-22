import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Calendar } from "lucide-react";
import { useResumeStore, Education } from "@/store/resumeStore";

export function EducationStep() {
  const { education, addEducation, updateEducation, removeEducation } = useResumeStore();
  const [newEducation, setNewEducation] = useState<Omit<Education, 'id'>>({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: '',
    achievements: [],
  });

  const handleAddEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      addEducation(newEducation);
      setNewEducation({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
        achievements: [],
      });
    }
  };

  const handleUpdateEducation = (id: string, field: keyof Education, value: string) => {
    updateEducation(id, { [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Add New Education Form */}
      <Card className="bg-gradient-card border-border p-4 shadow-soft">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-primary" />
          Add Education
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="institution" className="text-sm font-medium">
                Institution *
              </Label>
              <Input
                id="institution"
                value={newEducation.institution}
                onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                placeholder="University of California, Berkeley"
                className="bg-background-secondary border-border focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="degree" className="text-sm font-medium">
                Degree *
              </Label>
              <Input
                id="degree"
                value={newEducation.degree}
                onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                placeholder="Bachelor of Science"
                className="bg-background-secondary border-border focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="field" className="text-sm font-medium">
                Field of Study
              </Label>
              <Input
                id="field"
                value={newEducation.field}
                onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
                placeholder="Computer Science"
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
                value={newEducation.startDate}
                onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
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
                value={newEducation.endDate}
                onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                className="bg-background-secondary border-border focus:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gpa" className="text-sm font-medium">
              GPA (Optional)
            </Label>
            <Input
              id="gpa"
              value={newEducation.gpa}
              onChange={(e) => setNewEducation({ ...newEducation, gpa: e.target.value })}
              placeholder="3.8/4.0"
              className="bg-background-secondary border-border focus:ring-primary w-32"
            />
          </div>

          <Button 
            onClick={handleAddEducation}
            variant="secondary"
            className="w-full"
            disabled={!newEducation.institution || !newEducation.degree}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </div>
      </Card>

      {/* Existing Education List */}
      {education.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Your Education</h3>
          {education.map((edu) => (
            <Card key={edu.id} className="bg-card border-border p-4 shadow-soft">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{edu.institution}</h4>
                  <p className="text-muted-foreground">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </p>
                  {edu.startDate && edu.endDate && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                      {new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  )}
                  {edu.gpa && (
                    <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                  className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {education.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No education added yet. Add your first education above!</p>
        </div>
      )}
    </div>
  );
}
