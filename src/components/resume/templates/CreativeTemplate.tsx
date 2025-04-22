
import React from 'react';
import { Resume } from '@/contexts/ResumeContext';

interface CreativeTemplateProps {
  resume: Resume;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ resume }) => {
  const { personalInfo, education, experience, skills, projects } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;

  return (
    <div className="w-[8.5in] h-[11in] mx-auto bg-white shadow-lg">
      {/* Header - colorful band */}
      <div className="h-16 bg-gradient-to-r from-[#EC4899] to-[#4F46E5]"></div>
      
      {/* Main content with padding */}
      <div className="p-8">
        {/* Name and title section */}
        <div className="flex justify-between items-end mb-8 border-b-2 border-[#4F46E5] pb-4">
          <div>
            <h1 className="text-4xl font-bold text-[#4F46E5]">{fullName}</h1>
            {personalInfo.jobTitle && (
              <p className="text-xl text-[#EC4899] mt-1">{personalInfo.jobTitle}</p>
            )}
          </div>
          <div className="text-right text-sm">
            {personalInfo.contact.email && (
              <p className="mb-1">{personalInfo.contact.email}</p>
            )}
            {personalInfo.contact.phone && (
              <p className="mb-1">{personalInfo.contact.phone}</p>
            )}
            {personalInfo.contact.website && (
              <p className="mb-1">{personalInfo.contact.website}</p>
            )}
          </div>
        </div>

        {/* 2-column layout for main content */}
        <div className="flex gap-8">
          {/* Left column */}
          <div className="w-2/3">
            {/* Summary */}
            {personalInfo.summary && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-[#4F46E5] border-b border-[#EC4899] pb-1 mb-3 inline-block">About Me</h2>
                <p className="text-gray-800">{personalInfo.summary}</p>
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-[#4F46E5] border-b border-[#EC4899] pb-1 mb-3 inline-block">Experience</h2>
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <div key={exp.id} className="relative pl-8">
                      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#EC4899] to-[#4F46E5]"></div>
                      <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[#EC4899]"></div>
                      <div>
                        <div className="flex justify-between">
                          <h3 className="font-bold text-gray-800">{exp.position}</h3>
                          <p className="text-sm text-[#4F46E5]">{exp.startDate} - {exp.endDate}</p>
                        </div>
                        <p className="text-[#EC4899] font-medium">{exp.company}, {exp.location}</p>
                        <p className="mt-2 text-gray-700 text-sm">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-[#4F46E5] border-b border-[#EC4899] pb-1 mb-3 inline-block">Projects</h2>
                <div className="grid grid-cols-1 gap-4">
                  {projects.map((project) => (
                    <div key={project.id} className="p-4 border border-gray-200 rounded-lg hover:border-[#EC4899] transition-colors">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-gray-800">{project.name}</h3>
                        {project.link && (
                          <a href={project.link} className="text-[#4F46E5] text-sm underline">
                            View Project
                          </a>
                        )}
                      </div>
                      {project.technologies && (
                        <p className="text-sm text-[#EC4899] mt-1">
                          {project.technologies}
                        </p>
                      )}
                      <p className="mt-2 text-gray-700 text-sm">{project.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="w-1/3">
            {/* Contact Information */}
            <div className="mb-8 bg-[#FFFBEB] p-4 rounded-lg">
              <h2 className="text-lg font-bold text-[#4F46E5] border-b border-[#EC4899] pb-1 mb-3 inline-block">Connect</h2>
              <ul className="space-y-2">
                {personalInfo.contact.address && (
                  <li className="flex">
                    <span className="mr-2">🏠</span>
                    <span className="text-sm">{personalInfo.contact.address}</span>
                  </li>
                )}
                {personalInfo.contact.linkedin && (
                  <li className="flex">
                    <span className="mr-2">🔗</span>
                    <span className="text-sm">{personalInfo.contact.linkedin}</span>
                  </li>
                )}
                {personalInfo.contact.github && (
                  <li className="flex">
                    <span className="mr-2">💻</span>
                    <span className="text-sm">{personalInfo.contact.github}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Education */}
            {education.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-[#4F46E5] border-b border-[#EC4899] pb-1 mb-3 inline-block">Education</h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="mb-3">
                      <p className="font-semibold text-gray-800">{edu.institution}</p>
                      <p className="text-gray-700">{edu.degree} in {edu.field}</p>
                      <p className="text-sm text-[#4F46E5]">{edu.startDate} - {edu.endDate}</p>
                      {edu.description && <p className="text-sm text-gray-600 mt-1">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-[#4F46E5] border-b border-[#EC4899] pb-1 mb-3 inline-block">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span 
                      key={skill.id} 
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ 
                        backgroundColor: `rgba(236, 72, 153, ${0.1 + (skill.level / 10)})`,
                        color: '#4F46E5'
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
