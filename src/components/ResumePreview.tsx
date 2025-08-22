import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Globe,
  Calendar,
  GraduationCap,
  Briefcase
} from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";

export function ResumePreview() {
  const { personalInfo, education, experience, skills, template, font } = useResumeStore();

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const fontClass = font === 'roboto' ? 'font-roboto' : font === 'montserrat' ? 'font-montserrat' : font === 'crimson' ? 'font-serif' : 'font-sans';
  
  // Template-specific styling
  const getTemplateStyles = () => {
    switch (template) {
      case 'crimson':
        return {
          headerClass: 'bg-gradient-to-r from-red-800 to-red-900 text-white p-6',
          contentSpacing: 'space-y-6',
          sectionTitle: 'text-xl font-serif font-bold text-red-800 mb-3 border-b-2 border-red-200 pb-2 flex items-center gap-2',
          nameStyle: 'text-4xl font-serif font-bold mb-2',
          companyStyle: 'font-serif font-medium text-red-600',
          descriptionStyle: 'text-gray-700 leading-relaxed font-serif'
        };
      case 'modern':
        return {
          headerClass: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8',
          contentSpacing: 'space-y-8',
          sectionTitle: 'uppercase tracking-wider text-sm font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2 flex items-center gap-2',
          nameStyle: 'text-3xl font-sans font-light mb-3',
          companyStyle: 'font-semibold text-blue-600',
          descriptionStyle: 'text-gray-600 leading-relaxed'
        };
      case 'classic':
        return {
          headerClass: 'bg-gray-50 text-gray-900 p-6 border-b-2 border-gray-300',
          contentSpacing: 'space-y-5',
          sectionTitle: 'text-lg font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1 flex items-center gap-2',
          nameStyle: 'text-3xl font-sans font-bold mb-2 text-gray-800',
          companyStyle: 'font-medium text-gray-700',
          descriptionStyle: 'text-gray-600 leading-normal'
        };
      default:
        return {
          headerClass: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6',
          contentSpacing: 'space-y-6',
          sectionTitle: 'text-xl font-bold text-gray-800 mb-3 border-b-2 border-blue-200 pb-1 flex items-center gap-2',
          nameStyle: 'text-3xl font-bold mb-2',
          companyStyle: 'font-medium text-blue-600',
          descriptionStyle: 'text-gray-700 leading-relaxed'
        };
    }
  };

  const templateStyles = getTemplateStyles();

  return (
    <div 
      className={`w-full max-w-[8.5in] mx-auto bg-white text-gray-900 shadow-large rounded-lg overflow-hidden print:shadow-none print:max-w-none ${fontClass}`}
      data-resume-preview
      data-has-content={(Boolean(personalInfo.fullName || personalInfo.summary || education.length || experience.length || skills.length)).toString()}
      style={{ 
        fontSize: '14px',
        lineHeight: '1.6',
        color: '#111827',
        backgroundColor: '#ffffff',
        minHeight: '11in',
        position: 'relative'
      }}
    >
      {/* Header Section */}
      <div className={templateStyles.headerClass}>
        <div className="text-center">
          <h1 className={templateStyles.nameStyle}>
            {personalInfo.fullName || "Your Name"}
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {personalInfo.phone}
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {personalInfo.location}
              </div>
            )}
          </div>
          
          {(personalInfo.linkedin || personalInfo.github || personalInfo.portfolio) && (
            <div className="flex flex-wrap justify-center gap-4 text-sm mt-2">
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-1">
                  <Github className="w-4 h-4" />
                  GitHub
                </div>
              )}
              {personalInfo.portfolio && (
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  Portfolio
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={`p-6 ${templateStyles.contentSpacing}`}>
        {/* Professional Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className={templateStyles.sectionTitle}>
              Professional Summary
            </h2>
            <p className={templateStyles.descriptionStyle}>{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <section>
            <h2 className={templateStyles.sectionTitle}>
              <Briefcase className="w-5 h-5" />
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{exp.position}</h3>
                      <p className={templateStyles.companyStyle}>{exp.company}</p>
                      {exp.location && (
                        <p className="text-sm text-gray-600">{exp.location}</p>
                      )}
                    </div>
                    {exp.startDate && (
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(exp.startDate)} - 
                        {exp.current ? ' Present' : formatDate(exp.endDate)}
                      </div>
                    )}
                  </div>
                  {exp.description.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      {exp.description.map((desc, index) => (
                        <li key={index} className={`text-sm ${templateStyles.descriptionStyle}`}>{desc}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section>
            <h2 className={templateStyles.sectionTitle}>
              <GraduationCap className="w-5 h-5" />
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    <p className={templateStyles.companyStyle}>{edu.institution}</p>
                    {edu.field && (
                      <p className="text-sm text-gray-600">Major: {edu.field}</p>
                    )}
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  {edu.startDate && edu.endDate && (
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <section>
            <h2 className={templateStyles.sectionTitle}>
              Skills
            </h2>
            <div className="space-y-3">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category}>
                  <h3 className="font-medium text-gray-700 mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill, index) => {
                      const getSkillColor = () => {
                        const baseColors = {
                          Expert: template === 'crimson' ? 'bg-red-100 text-red-800' : 'bg-purple-100 text-purple-800',
                          Advanced: template === 'crimson' ? 'bg-red-50 text-red-700' : 'bg-blue-100 text-blue-800',
                          Intermediate: 'bg-green-100 text-green-800',
                          Beginner: 'bg-gray-100 text-gray-800'
                        };
                        return baseColors[skill.level] || baseColors.Beginner;
                      };
                      
                      return (
                        <span 
                          key={index}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getSkillColor()}`}
                        >
                          {skill.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!personalInfo.fullName && experience.length === 0 && education.length === 0 && skills.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-medium mb-2">Your Resume Preview</h3>
            <p>Fill out the form to see your resume come to life!</p>
          </div>
        )}
      </div>
    </div>
  );
}