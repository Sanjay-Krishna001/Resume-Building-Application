
import React from 'react';
import { Resume } from '@/contexts/ResumeContext';

interface ProfessionalTemplateProps {
  resume: Resume;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ resume }) => {
  const { personalInfo, education, experience, skills, projects } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;

  return (
    <div className="w-[8.5in] h-[11in] mx-auto bg-white shadow-lg p-8">
      {/* Header */}
      <div className="text-center mb-6 border-b-2 border-gray-300 pb-4">
        <h1 className="text-3xl font-bold text-gray-800">{fullName}</h1>
        {personalInfo.jobTitle && (
          <p className="text-xl text-gray-600 mt-1">{personalInfo.jobTitle}</p>
        )}
        
        {/* Contact info */}
        <div className="mt-3 flex flex-wrap justify-center gap-x-4 text-sm text-gray-600">
          {personalInfo.contact.email && (
            <span className="flex items-center">
              <span className="mr-1">✉️</span>
              {personalInfo.contact.email}
            </span>
          )}
          {personalInfo.contact.phone && (
            <span className="flex items-center">
              <span className="mr-1">📱</span>
              {personalInfo.contact.phone}
            </span>
          )}
          {personalInfo.contact.linkedin && (
            <span className="flex items-center">
              <span className="mr-1">🔗</span>
              {personalInfo.contact.linkedin}
            </span>
          )}
          {personalInfo.contact.github && (
            <span className="flex items-center">
              <span className="mr-1">💻</span>
              {personalInfo.contact.github}
            </span>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex gap-6">
        {/* Left column */}
        <div className="w-2/3">
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
              <p className="text-gray-700">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">Work Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-gray-800">{exp.position}</h3>
                    <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <p className="text-gray-700 italic">{exp.company}, {exp.location}</p>
                  <p className="mt-2 text-gray-700 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">Projects</h2>
              {projects.map((project) => (
                <div key={project.id} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-gray-800">{project.name}</h3>
                    {project.link && (
                      <a href={project.link} className="text-blue-600 text-sm underline">
                        View Project
                      </a>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Technologies:</span> {project.technologies}
                    </p>
                  )}
                  <p className="mt-1 text-gray-700 text-sm">{project.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="w-1/3">
          {/* Education */}
          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <p className="font-semibold text-gray-800">{edu.institution}</p>
                  <p className="text-gray-700">{edu.degree} in {edu.field}</p>
                  <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
                  {edu.description && <p className="text-sm text-gray-600 mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill.id} 
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact details (if not all fit in header) */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">Contact Details</h2>
            <ul className="space-y-2 text-sm">
              {personalInfo.contact.address && (
                <li className="flex">
                  <span className="mr-2 text-gray-600">🏠</span>
                  <span>{personalInfo.contact.address}</span>
                </li>
              )}
              {personalInfo.contact.website && (
                <li className="flex">
                  <span className="mr-2 text-gray-600">🌐</span>
                  <span>{personalInfo.contact.website}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
