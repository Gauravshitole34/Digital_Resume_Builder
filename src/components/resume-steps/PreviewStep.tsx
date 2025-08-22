import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, FileText, CheckCircle } from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";
import { ShareModal } from "@/components/ShareModal";
import { downloadResumeAsPDF } from "@/utils/pdfExport";
import { toast } from "@/hooks/use-toast";

export function PreviewStep() {
  const { personalInfo, education, experience, skills } = useResumeStore();
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const handleDownloadPDF = async () => {
    try {
      await downloadResumeAsPDF();
      toast({
        title: "✅ Resume downloaded successfully!",
        description: "Your resume has been saved as resume.pdf",
      });
    } catch (error) {
      toast({
        title: "❌ Download failed",
        description: "There was an error generating your resume PDF",
        variant: "destructive",
      });
    }
  };

  const handleShare = () => {
    setShareModalOpen(true);
  };

  // Calculate completion percentage
  const completionChecks = [
    { label: "Personal Information", completed: personalInfo.fullName && personalInfo.email },
    { label: "Professional Summary", completed: personalInfo.summary.length > 50 },
    { label: "Education", completed: education.length > 0 },
    { label: "Work Experience", completed: experience.length > 0 },
    { label: "Skills", completed: skills.length > 0 },
  ];

  const completedCount = completionChecks.filter(check => check.completed).length;
  const completionPercentage = (completedCount / completionChecks.length) * 100;

  const getCompletionColor = () => {
    if (completionPercentage >= 80) return "text-success";
    if (completionPercentage >= 60) return "text-accent";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      {/* Resume Strength Meter */}
      <Card className="bg-gradient-card border-border p-6 shadow-soft">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-primary" />
          Resume Strength
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Completion</span>
            <span className={`text-2xl font-bold ${getCompletionColor()}`}>
              {Math.round(completionPercentage)}%
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-gradient-primary h-3 rounded-full progress-fill"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          <div className="space-y-2">
            {completionChecks.map((check, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  {check.completed ? (
                    <CheckCircle className="w-4 h-4 text-success" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-muted" />
                  )}
                  {check.label}
                </span>
                <Badge variant={check.completed ? "default" : "secondary"} className="text-xs">
                  {check.completed ? "Complete" : "Pending"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border p-4 text-center shadow-soft">
          <div className="text-2xl font-bold text-primary">{education.length}</div>
          <div className="text-sm text-muted-foreground">Education</div>
        </Card>
        
        <Card className="bg-card border-border p-4 text-center shadow-soft">
          <div className="text-2xl font-bold text-secondary">{experience.length}</div>
          <div className="text-sm text-muted-foreground">Experience</div>
        </Card>
        
        <Card className="bg-card border-border p-4 text-center shadow-soft">
          <div className="text-2xl font-bold text-accent">{skills.length}</div>
          <div className="text-sm text-muted-foreground">Skills</div>
        </Card>
        
        <Card className="bg-card border-border p-4 text-center shadow-soft">
          <div className="text-2xl font-bold text-success">
            {personalInfo.linkedin && personalInfo.github ? '2' : 
             personalInfo.linkedin || personalInfo.github ? '1' : '0'}
          </div>
          <div className="text-sm text-muted-foreground">Links</div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <Card className="bg-gradient-card border-border p-6 shadow-soft">
          <h3 className="text-lg font-semibold mb-4">Export Options</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button 
              onClick={handleDownloadPDF}
              variant="default"
              size="lg"
              className="h-14 flex-col gap-2 hover:scale-105 transition-smooth"
            >
              <Download className="w-6 h-6" />
              <span className="text-sm sm:text-base">Download PDF</span>
            </Button>
            
            <Button 
              onClick={handleShare}
              variant="secondary"
              size="lg"
              className="h-14 flex-col gap-2 hover:scale-105 transition-smooth"
            >
              <Share2 className="w-6 h-6" />
              <span className="text-sm sm:text-base">Share Resume</span>
            </Button>
          </div>
        </Card>

        {/* Tips for Improvement */}
        {completionPercentage < 100 && (
          <Card className="bg-accent/10 border-accent/20 p-4">
            <h4 className="font-medium mb-2 text-accent">💡 Tips to Improve Your Resume</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {!personalInfo.summary && (
                <li>• Add a compelling professional summary to stand out</li>
              )}
              {education.length === 0 && (
                <li>• Include your educational background</li>
              )}
              {experience.length === 0 && (
                <li>• Add your work experience with quantifiable achievements</li>
              )}
              {skills.length < 5 && (
                <li>• Add more relevant skills to showcase your abilities</li>
              )}
              {!personalInfo.linkedin && !personalInfo.github && (
                <li>• Include professional social media links</li>
              )}
            </ul>
          </Card>
        )}

        {/* Success Message */}
        {completionPercentage === 100 && (
          <Card className="bg-success/10 border-success/20 p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-success" />
              <div>
                <h4 className="font-medium text-success">🎉 Excellent Work!</h4>
                <p className="text-sm text-muted-foreground">
                  Your resume is complete and ready to impress employers.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Share Modal */}
      <ShareModal 
        open={shareModalOpen} 
        onOpenChange={setShareModalOpen} 
      />
    </div>
  );
}