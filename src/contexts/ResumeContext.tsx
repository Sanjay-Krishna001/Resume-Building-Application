
import React, { createContext, useContext, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface Contact {
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
  website: string;
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  templateId: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    jobTitle: string;
    summary: string;
    contact: Contact;
  };
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  colors: string[];
}

interface ResumeContextType {
  resumes: Resume[];
  currentResume: Resume | null;
  templates: ResumeTemplate[];
  selectedTemplate: ResumeTemplate | null;
  getResumeById: (id: string) => Resume | null;
  createResume: (templateId: string) => Promise<Resume>;
  updateResume: (resume: Resume) => Promise<void>;
  deleteResume: (id: string) => Promise<void>;
  setCurrentResume: (resume: Resume | null) => void;
  selectTemplate: (template: ResumeTemplate) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

// Sample templates
const sampleTemplates: ResumeTemplate[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'A clean, modern template with a sidebar for your information',
    thumbnail: '/templates/modern.png',
    colors: ['#3B82F6', '#1E40AF', '#F3F4F6'],
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'A traditional, professional layout ideal for corporate positions',
    thumbnail: '/templates/professional.png',
    colors: ['#6B7280', '#111827', '#F9FAFB'],
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'A bold, colorful template that stands out for creative roles',
    thumbnail: '/templates/creative.png',
    colors: ['#EC4899', '#4F46E5', '#FFFBEB'],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'A minimalist design with a focus on content and readability',
    thumbnail: '/templates/minimal.png',
    colors: ['#64748B', '#334155', '#F8FAFC'],
  },
];

// Empty resume template
const emptyResume = (id: string, userId: string, templateId: string): Resume => ({
  id,
  userId,
  title: 'Untitled Resume',
  createdAt: new Date(),
  updatedAt: new Date(),
  templateId,
  personalInfo: {
    firstName: '',
    lastName: '',
    jobTitle: '',
    summary: '',
    contact: {
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      github: '',
      website: '',
    },
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
});

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate | null>(null);
  const { toast } = useToast();

  const getResumeById = (id: string): Resume | null => {
    return resumes.find(resume => resume.id === id) || null;
  };

  const createResume = async (templateId: string): Promise<Resume> => {
    // In a real app, this would be an API call
    const newId = `resume_${Date.now()}`;
    const userId = '1'; // Mock user ID - would come from auth context in a real app
    
    const newResume = emptyResume(newId, userId, templateId);
    
    setResumes(prev => [...prev, newResume]);
    setCurrentResume(newResume);
    
    toast({
      title: "Resume created",
      description: "Your new resume has been created successfully",
    });
    
    return newResume;
  };

  const updateResume = async (resume: Resume): Promise<void> => {
    // In a real app, this would be an API call
    const updatedResume = {
      ...resume,
      updatedAt: new Date(),
    };
    
    setResumes(prev => 
      prev.map(r => r.id === resume.id ? updatedResume : r)
    );
    
    if (currentResume?.id === resume.id) {
      setCurrentResume(updatedResume);
    }
    
    toast({
      title: "Resume updated",
      description: "Your changes have been saved",
    });
  };

  const deleteResume = async (id: string): Promise<void> => {
    // In a real app, this would be an API call
    setResumes(prev => prev.filter(resume => resume.id !== id));
    
    if (currentResume?.id === id) {
      setCurrentResume(null);
    }
    
    toast({
      title: "Resume deleted",
      description: "Your resume has been deleted",
    });
  };

  const selectTemplate = (template: ResumeTemplate) => {
    setSelectedTemplate(template);
  };

  return (
    <ResumeContext.Provider value={{
      resumes,
      currentResume,
      templates: sampleTemplates,
      selectedTemplate,
      getResumeById,
      createResume,
      updateResume,
      deleteResume,
      setCurrentResume,
      selectTemplate,
    }}>
      {children}
    </ResumeContext.Provider>
  );
};
