import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Code, 
  FolderOpen, 
  Award, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Download,
  Palette,
  Share
} from "lucide-react";
import { PersonalInfoStep } from "./resume-steps/PersonalInfoStep";
import { EducationStep } from "./resume-steps/EducationStep";
import { ExperienceStep } from "./resume-steps/ExperienceStep";
import { SkillsStep } from "./resume-steps/SkillsStep";
import { PreviewStep } from "./resume-steps/PreviewStep";
import { ResumePreview } from "./ResumePreview";
import { TemplateModal } from "./TemplateModal";
import { FontDropdown } from "./FontDropdown";
import { ShareModal } from "./ShareModal";
import { useResumeStore } from "@/store/resumeStore";
import { downloadResumeAsPDF, autoSaveToLocalStorage } from "@/utils/pdfExport";
import { toast } from "@/hooks/use-toast";

const steps = [
  { id: 1, title: "Personal Info", icon: User, component: PersonalInfoStep },
  { id: 2, title: "Education", icon: GraduationCap, component: EducationStep },
  { id: 3, title: "Experience", icon: Briefcase, component: ExperienceStep },
  { id: 4, title: "Skills", icon: Code, component: SkillsStep },
  { id: 5, title: "Preview", icon: Eye, component: PreviewStep },
];

export function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const { template, setTemplate, personalInfo, education, experience, skills } = useResumeStore();
  
  const currentStepData = steps.find(step => step.id === currentStep);
  const CurrentStepComponent = currentStepData?.component;
  
  const progress = (currentStep / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepId: number) => {
    setCurrentStep(stepId);
  };

  // Auto-save functionality
  useEffect(() => {
    const resumeData = { personalInfo, education, experience, skills, template };
    autoSaveToLocalStorage(resumeData);
  }, [personalInfo, education, experience, skills, template]);

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

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header with Progress Bar */}
      <div className="bg-card shadow-soft border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              GS ResumeBuilder
            </h1>
            
            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setTemplateModalOpen(true)}
                className="hover:scale-105 transition-smooth"
              >
                <Palette className="w-4 h-4" />
                Template
              </Button>
              
              <FontDropdown />
              
              <Button 
                variant="accent" 
                size="sm"
                onClick={handleDownloadPDF}
                className="hover:scale-105 transition-smooth"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
              
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setShareModalOpen(true)}
                className="hover:scale-105 transition-smooth"
              >
                <Share className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-primary h-2 rounded-full progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Step Navigation */}
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              
              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(step.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ${
                    isActive 
                      ? 'bg-gradient-primary text-primary-foreground shadow-glow' 
                      : isCompleted
                      ? 'bg-gradient-secondary text-secondary-foreground hover:scale-105'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm hidden sm:block">{step.title}</span>
                  <span className="font-medium text-sm sm:hidden">{step.id}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-medium border-0 p-6">
              <div className="fade-in">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  {currentStepData && <currentStepData.icon className="w-6 h-6 text-primary" />}
                  {currentStepData?.title}
                </h2>
                
                {CurrentStepComponent && <CurrentStepComponent />}
              </div>
            </Card>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <Button 
                variant="wizard" 
                onClick={nextStep}
                disabled={currentStep === steps.length}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8">
            <Card className="bg-card shadow-large border-0 p-6 h-fit">
              <h3 className="text-lg font-semibold mb-4 text-center">Live Preview</h3>
              <div className="transform scale-75 origin-top">
                <ResumePreview />
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TemplateModal 
        open={templateModalOpen} 
        onOpenChange={setTemplateModalOpen} 
      />
      <ShareModal 
        open={shareModalOpen} 
        onOpenChange={setShareModalOpen} 
      />
    </div>
  );
}