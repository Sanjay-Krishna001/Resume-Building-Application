
import React from 'react';
import { Resume } from '@/contexts/ResumeContext';

interface ModernTemplateProps {
  resume: Resume;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ resume }) => {
  const { personalInfo, education, experience, skills, projects } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;

  return (
    <div className="w-[8.5in] h-[11in] mx-auto bg-white shadow-lg flex">
      {/* Sidebar */}
      <div className="w-1/3 bg-[#3B82F6] text-white p-6">
        <div className="mb-8">
          <div className="w-32 h-32 rounded-full bg-white mx-auto mb-4 flex items-center justify-center text-[#3B82F6] text-4xl font-bold">
            {personalInfo.firstName.charAt(0)}{personalInfo.lastName.charAt(0)}
          </div>
          <h1 className="text-2xl font-bold text-center">{fullName}</h1>
          <p className="text-center opacity-90">{personalInfo.jobTitle}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-white/50 pb-1 mb-3">Contact</h2>
          <ul className="space-y-2 text-sm">
            {personalInfo.contact.email && (
              <li className="flex items-start">
                <span className="mr-2">✉️</span>
                <span>{personalInfo.contact.email}</span>
              </li>
            )}
            {personalInfo.contact.phone && (
              <li className="flex items-start">
                <span className="mr-2">📱</span>
                <span>{personalInfo.contact.phone}</span>
              </li>
            )}
            {personalInfo.contact.address && (
              <li className="flex items-start">
                <span className="mr-2">🏠</span>
                <span>{personalInfo.contact.address}</span>
              </li>
            )}
            {personalInfo.contact.linkedin && (
              <li className="flex items-start">
                <span className="mr-2">🔗</span>
                <span>{personalInfo.contact.linkedin}</span>
              </li>
            )}
            {personalInfo.contact.github && (
              <li className="flex items-start">
                <span className="mr-2">💻</span>
                <span>{personalInfo.contact.github}</span>
              </li>
            )}
            {personalInfo.contact.website && (
              <li className="flex items-start">
                <span className="mr-2">🌐</span>
                <span>{personalInfo.contact.website}</span>
              </li>
            )}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-white/50 pb-1 mb-3">Skills</h2>
          <ul className="space-y-3">
            {skills.map((skill) => (
              <li key={skill.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-xs">{skill.level}/5</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-1.5">
                  <div 
                    className="bg-white h-1.5 rounded-full" 
                    style={{ width: `${(skill.level / 5) * 100}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-white/50 pb-1 mb-3">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <p className="font-semibold">{edu.institution}</p>
                <p className="text-sm opacity-90">{edu.degree} in {edu.field}</p>
                <p className="text-xs opacity-80">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-6">
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#1E40AF] border-b-2 border-[#3B82F6] pb-1 mb-3">Professional Summary</h2>
            <p className="text-gray-700">{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#1E40AF] border-b-2 border-[#3B82F6] pb-1 mb-3">Work Experience</h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-800">{exp.position}</h3>
                      <p className="text-[#3B82F6] font-medium">{exp.company}, {exp.location}</p>
                    </div>
                    <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <p className="mt-2 text-gray-700 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#1E40AF] border-b-2 border-[#3B82F6] pb-1 mb-3">Projects</h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800">{project.name}</h3>
                    {project.link && (
                      <a href={project.link} className="text-[#3B82F6] text-sm underline">
                        View Project
                      </a>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Technologies:</span> {project.technologies}
                    </p>
                  )}
                  <p className="mt-2 text-gray-700 text-sm">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;
