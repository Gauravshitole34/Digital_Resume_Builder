import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Code2, Star } from "lucide-react";
import { useResumeStore, Skill } from "@/store/resumeStore";

export function SkillsStep() {
  const { skills, addSkill, removeSkill } = useResumeStore();
  const [newSkill, setNewSkill] = useState<Skill>({
    name: '',
    level: 'Intermediate',
    category: 'Technical',
  });

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      addSkill(newSkill);
      setNewSkill({
        name: '',
        level: 'Intermediate',
        category: 'Technical',
      });
    }
  };

  const skillCategories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const getLevelColor = (level: Skill['level']) => {
    switch (level) {
      case 'Beginner': return 'bg-accent text-accent-foreground';
      case 'Intermediate': return 'bg-secondary text-secondary-foreground';
      case 'Advanced': return 'bg-primary text-primary-foreground';
      case 'Expert': return 'bg-gradient-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryIcon = (category: Skill['category']) => {
    switch (category) {
      case 'Technical': return <Code2 className="w-4 h-4" />;
      case 'Soft': return <Star className="w-4 h-4" />;
      case 'Language': return <span className="w-4 h-4 text-center text-xs">🌐</span>;
      case 'Tool': return <span className="w-4 h-4 text-center text-xs">🔧</span>;
      default: return <Code2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Skill Form */}
      <Card className="bg-gradient-card border-border p-4 shadow-soft">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-primary" />
          Add Skill
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skillName" className="text-sm font-medium">
              Skill Name *
            </Label>
            <Input
              id="skillName"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              placeholder="React, JavaScript, Communication..."
              className="bg-background-secondary border-border focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Category</Label>
              <Select
                value={newSkill.category}
                onValueChange={(value: Skill['category']) => 
                  setNewSkill({ ...newSkill, category: value })
                }
              >
                <SelectTrigger className="bg-background-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technical">💻 Technical</SelectItem>
                  <SelectItem value="Soft">⭐ Soft Skills</SelectItem>
                  <SelectItem value="Language">🌐 Language</SelectItem>
                  <SelectItem value="Tool">🔧 Tools</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Proficiency Level</Label>
              <Select
                value={newSkill.level}
                onValueChange={(value: Skill['level']) => 
                  setNewSkill({ ...newSkill, level: value })
                }
              >
                <SelectTrigger className="bg-background-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">🟡 Beginner</SelectItem>
                  <SelectItem value="Intermediate">🟠 Intermediate</SelectItem>
                  <SelectItem value="Advanced">🟢 Advanced</SelectItem>
                  <SelectItem value="Expert">🔥 Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleAddSkill}
            variant="secondary"
            className="w-full"
            disabled={!newSkill.name.trim()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </div>
      </Card>

      {/* Skills by Category */}
      {Object.keys(skillCategories).length > 0 ? (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Your Skills</h3>
          
          {Object.entries(skillCategories).map(([category, categorySkills]) => (
            <Card key={category} className="bg-card border-border p-4 shadow-soft">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                {getCategoryIcon(category as Skill['category'])}
                {category} ({categorySkills.length})
              </h4>
              
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill, index) => {
                  const skillIndex = skills.findIndex(s => s === skill);
                  return (
                    <div key={`${skill.name}-${index}`} className="group relative">
                      <Badge 
                        variant="secondary" 
                        className={`${getLevelColor(skill.level)} transition-smooth hover:scale-105 pr-8`}
                      >
                        <span className="font-medium">{skill.name}</span>
                        <span className="ml-2 text-xs opacity-75">
                          {skill.level}
                        </span>
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill(skillIndex)}
                        className="absolute -top-1 -right-1 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <Code2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No skills added yet. Add your first skill above!</p>
        </div>
      )}

      {/* Skill Suggestions */}
      <Card className="bg-muted/30 border-border p-4">
        <h4 className="font-medium mb-2 text-sm text-muted-foreground">💡 Popular Skills by Category</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <p className="font-medium mb-1">💻 Technical:</p>
            <p className="text-muted-foreground">React, JavaScript, Python, TypeScript, Node.js, SQL, Git</p>
          </div>
          <div>
            <p className="font-medium mb-1">⭐ Soft Skills:</p>
            <p className="text-muted-foreground">Communication, Leadership, Problem Solving, Teamwork</p>
          </div>
        </div>
      </Card>
    </div>
  );
}