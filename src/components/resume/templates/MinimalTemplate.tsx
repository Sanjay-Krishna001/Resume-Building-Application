
import React from 'react';
import { Resume } from '@/contexts/ResumeContext';

interface MinimalTemplateProps {
  resume: Resume;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ resume }) => {
  const { personalInfo, education, experience, skills, projects } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;

  return (
    <div className="w-[8.5in] h-[11in] mx-auto bg-white shadow-lg p-8 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{fullName}</h1>
        {personalInfo.jobTitle && (
          <p className="text-lg text-gray-600 mt-1">{personalInfo.jobTitle}</p>
        )}
        
        {/* Contact info - horizontal list */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-600">
          {personalInfo.contact.email && (
            <span>{personalInfo.contact.email}</span>
          )}
          {personalInfo.contact.phone && (
            <>
              <span className="hidden sm:block">•</span>
              <span>{personalInfo.contact.phone}</span>
            </>
          )}
          {personalInfo.contact.linkedin && (
            <>
              <span className="hidden sm:block">•</span>
              <span>{personalInfo.contact.linkedin}</span>
            </>
          )}
          {personalInfo.contact.github && (
            <>
              <span className="hidden sm:block">•</span>
              <span>{personalInfo.contact.github}</span>
            </>
          )}
          {personalInfo.contact.website && (
            <>
              <span className="hidden sm:block">•</span>
              <span>{personalInfo.contact.website}</span>
            </>
          )}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-200 mb-6" />

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Summary</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
              </div>
              <p className="text-gray-600">{exp.company}, {exp.location}</p>
              <p className="mt-2 text-gray-700 text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h3 className="font-semibold text-gray-800">{edu.institution}</h3>
                <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
              </div>
              <p className="text-gray-600">{edu.degree} in {edu.field}</p>
              {edu.description && <p className="text-sm text-gray-600 mt-1">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-y-1">
            {skills.map((skill, index) => (
              <React.Fragment key={skill.id}>
                <span className="text-gray-800">{skill.name}</span>
                {index < skills.length - 1 && <span className="mx-2 text-gray-400">|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h3 className="font-semibold text-gray-800">{project.name}</h3>
                {project.link && (
                  <a href={project.link} className="text-gray-600 text-sm">
                    {project.link}
                  </a>
                )}
              </div>
              {project.technologies && (
                <p className="text-gray-600">
                  <span className="italic">Technologies:</span> {project.technologies}
                </p>
              )}
              <p className="mt-1 text-gray-700 text-sm">{project.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-6 left-8 right-8">
        <hr className="border-gray-200 mb-2" />
        <p className="text-xs text-center text-gray-500">{fullName} • Resume • {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default MinimalTemplate;
