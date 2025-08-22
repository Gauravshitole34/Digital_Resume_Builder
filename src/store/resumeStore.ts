import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  summary: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Technical' | 'Soft' | 'Language' | 'Tool';
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  template: 'crimson' | 'modern' | 'classic';
  theme: 'light' | 'dark';
  font: 'inter' | 'roboto' | 'crimson' | 'montserrat';
}

interface ResumeStore extends ResumeData {
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (index: number, skill: Skill) => void;
  removeSkill: (index: number) => void;
  setTemplate: (template: ResumeData['template']) => void;
  setTheme: (theme: ResumeData['theme']) => void;
  setFont: (font: ResumeData['font']) => void;
  resetForm: () => void;
}

const initialState: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
  template: 'crimson',
  theme: 'light',
  font: 'inter',
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      updatePersonalInfo: (info) =>
        set((state) => ({
          personalInfo: { ...state.personalInfo, ...info },
        })),
      
      addEducation: (education) =>
        set((state) => ({
          education: [...state.education, { ...education, id: Date.now().toString() }],
        })),
      
      updateEducation: (id, updates) =>
        set((state) => ({
          education: state.education.map((edu) =>
            edu.id === id ? { ...edu, ...updates } : edu
          ),
        })),
      
      removeEducation: (id) =>
        set((state) => ({
          education: state.education.filter((edu) => edu.id !== id),
        })),
      
      addExperience: (experience) =>
        set((state) => ({
          experience: [...state.experience, { ...experience, id: Date.now().toString() }],
        })),
      
      updateExperience: (id, updates) =>
        set((state) => ({
          experience: state.experience.map((exp) =>
            exp.id === id ? { ...exp, ...updates } : exp
          ),
        })),
      
      removeExperience: (id) =>
        set((state) => ({
          experience: state.experience.filter((exp) => exp.id !== id),
        })),
      
      addSkill: (skill) =>
        set((state) => ({
          skills: [...state.skills, skill],
        })),
      
      updateSkill: (index, skill) =>
        set((state) => ({
          skills: state.skills.map((s, i) => (i === index ? skill : s)),
        })),
      
      removeSkill: (index) =>
        set((state) => ({
          skills: state.skills.filter((_, i) => i !== index),
        })),
      
      setTemplate: (template) => set({ template }),
      setTheme: (theme) => set({ theme }),
      setFont: (font) => set({ font }),
      
      resetForm: () => set(initialState),
    }),
    {
      name: 'resume-builder-store',
    }
  )
);