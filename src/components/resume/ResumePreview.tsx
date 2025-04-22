
import React from 'react';
import { Resume } from '@/contexts/ResumeContext';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

interface ResumePreviewProps {
  resume: Resume;
  scale?: number;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resume, scale = 0.6 }) => {
  const renderTemplate = () => {
    switch (resume.templateId) {
      case 'modern':
        return <ModernTemplate resume={resume} />;
      case 'professional':
        return <ProfessionalTemplate resume={resume} />;
      case 'creative':
        return <CreativeTemplate resume={resume} />;
      case 'minimal':
        return <MinimalTemplate resume={resume} />;
      default:
        return <ModernTemplate resume={resume} />;
    }
  };

  return (
    <div className="bg-white overflow-hidden" style={{ 
      transform: `scale(${scale})`, 
      transformOrigin: 'top center',
      height: `${scale * 100}%`,
    }}>
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;
