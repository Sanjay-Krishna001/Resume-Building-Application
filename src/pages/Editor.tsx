
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useResume, Resume, Education, Experience, Skill, Project } from '@/contexts/ResumeContext';
import MainLayout from '@/components/layouts/MainLayout';
import ResumePreview from '@/components/resume/ResumePreview';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, Trash2 } from 'lucide-react';

const Editor = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const { getResumeById, updateResume } = useResume();
  const [resume, setResume] = useState<Resume | null>(null);
  const [activeTab, setActiveTab] = useState('personal');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (resumeId) {
      const foundResume = getResumeById(resumeId);
      if (foundResume) {
        setResume(foundResume);
      } else {
        navigate('/dashboard');
        toast({
          title: "Resume not found",
          description: "The resume you're trying to edit doesn't exist",
          variant: "destructive",
        });
      }
    }
  }, [resumeId, getResumeById, navigate, toast]);

  const handleSave = async () => {
    if (resume) {
      try {
        await updateResume(resume);
        toast({
          title: "Changes saved",
          description: "Your resume has been updated successfully",
        });
      } catch (error) {
        toast({
          title: "Error saving changes",
          description: "There was a problem saving your changes",
          variant: "destructive",
        });
      }
    }
  };

  const handlePreview = () => {
    if (resumeId) {
      navigate(`/preview/${resumeId}`);
    }
  };

  const handleInputChange = (
    section: keyof Resume,
    field: string,
    value: string,
    nestedField?: string
  ) => {
    if (!resume) return;

    if (nestedField) {
      setResume({
        ...resume,
        [section]: {
          ...resume[section] as object,
          [field]: {
            ...(resume[section] as any)[field],
            [nestedField]: value
          }
        }
      });
    } else {
      setResume({
        ...resume,
        [section]: {
          ...resume[section] as object,
          [field]: value
        }
      });
    }
  };

  // Education section handlers
  const addEducation = () => {
    if (!resume) return;
    
    const newEducation: Education = {
      id: `edu_${Date.now()}`,
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    
    setResume({
      ...resume,
      education: [...resume.education, newEducation]
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    if (!resume) return;
    
    const updatedEducation = [...resume.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    
    setResume({
      ...resume,
      education: updatedEducation
    });
  };

  const removeEducation = (index: number) => {
    if (!resume) return;
    
    const updatedEducation = [...resume.education];
    updatedEducation.splice(index, 1);
    
    setResume({
      ...resume,
      education: updatedEducation
    });
  };

  // Experience section handlers
  const addExperience = () => {
    if (!resume) return;
    
    const newExperience: Experience = {
      id: `exp_${Date.now()}`,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    
    setResume({
      ...resume,
      experience: [...resume.experience, newExperience]
    });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string | boolean) => {
    if (!resume) return;
    
    const updatedExperience = [...resume.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    
    setResume({
      ...resume,
      experience: updatedExperience
    });
  };

  const removeExperience = (index: number) => {
    if (!resume) return;
    
    const updatedExperience = [...resume.experience];
    updatedExperience.splice(index, 1);
    
    setResume({
      ...resume,
      experience: updatedExperience
    });
  };

  // Skills section handlers
  const addSkill = () => {
    if (!resume) return;
    
    const newSkill: Skill = {
      id: `skill_${Date.now()}`,
      name: '',
      level: 3
    };
    
    setResume({
      ...resume,
      skills: [...resume.skills, newSkill]
    });
  };

  const updateSkill = (index: number, field: keyof Skill, value: string | number) => {
    if (!resume) return;
    
    const updatedSkills = [...resume.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: field === 'level' ? Number(value) : value
    };
    
    setResume({
      ...resume,
      skills: updatedSkills
    });
  };

  const removeSkill = (index: number) => {
    if (!resume) return;
    
    const updatedSkills = [...resume.skills];
    updatedSkills.splice(index, 1);
    
    setResume({
      ...resume,
      skills: updatedSkills
    });
  };

  // Projects section handlers
  const addProject = () => {
    if (!resume) return;
    
    const newProject: Project = {
      id: `proj_${Date.now()}`,
      name: '',
      description: '',
      technologies: '',
      link: ''
    };
    
    setResume({
      ...resume,
      projects: [...resume.projects, newProject]
    });
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    if (!resume) return;
    
    const updatedProjects = [...resume.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    
    setResume({
      ...resume,
      projects: updatedProjects
    });
  };

  const removeProject = (index: number) => {
    if (!resume) return;
    
    const updatedProjects = [...resume.projects];
    updatedProjects.splice(index, 1);
    
    setResume({
      ...resume,
      projects: updatedProjects
    });
  };

  if (!resume) {
    return (
      <MainLayout>
        <div className="container px-4 py-8 flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-resume-primary"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-resume-neutral">Edit Resume</h1>
            <p className="text-gray-600">Fill in your information to create your professional resume</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Button variant="outline" onClick={handlePreview}>
              Preview
            </Button>
            <Button onClick={handleSave} className="bg-resume-primary hover:bg-resume-secondary">
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Editor Panel */}
          <div className="lg:col-span-7">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>
              
              {/* Personal Information */}
              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={resume.personalInfo.firstName}
                      onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={resume.personalInfo.lastName}
                      onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={resume.personalInfo.jobTitle}
                    onChange={(e) => handleInputChange('personalInfo', 'jobTitle', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    rows={4}
                    value={resume.personalInfo.summary}
                    onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)}
                    placeholder="Briefly describe your background and strengths..."
                  />
                </div>
                
                <h3 className="text-lg font-semibold mt-6 mb-4">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={resume.personalInfo.contact.email}
                      onChange={(e) => handleInputChange('personalInfo', 'contact', e.target.value, 'email')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={resume.personalInfo.contact.phone}
                      onChange={(e) => handleInputChange('personalInfo', 'contact', e.target.value, 'phone')}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={resume.personalInfo.contact.address}
                    onChange={(e) => handleInputChange('personalInfo', 'contact', e.target.value, 'address')}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={resume.personalInfo.contact.linkedin}
                      onChange={(e) => handleInputChange('personalInfo', 'contact', e.target.value, 'linkedin')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={resume.personalInfo.contact.github}
                      onChange={(e) => handleInputChange('personalInfo', 'contact', e.target.value, 'github')}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={resume.personalInfo.contact.website}
                    onChange={(e) => handleInputChange('personalInfo', 'contact', e.target.value, 'website')}
                  />
                </div>
              </TabsContent>
              
              {/* Education */}
              <TabsContent value="education" className="space-y-6">
                {resume.education.map((edu, index) => (
                  <Card key={edu.id} className="relative">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                      onClick={() => removeEducation(index)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor={`edu-institution-${index}`}>Institution</Label>
                          <Input
                            id={`edu-institution-${index}`}
                            value={edu.institution}
                            onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`edu-degree-${index}`}>Degree</Label>
                          <Input
                            id={`edu-degree-${index}`}
                            value={edu.degree}
                            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <Label htmlFor={`edu-field-${index}`}>Field of Study</Label>
                        <Input
                          id={`edu-field-${index}`}
                          value={edu.field}
                          onChange={(e) => updateEducation(index, 'field', e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor={`edu-start-${index}`}>Start Date</Label>
                          <Input
                            id={`edu-start-${index}`}
                            value={edu.startDate}
                            onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                            placeholder="MM/YYYY"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`edu-end-${index}`}>End Date</Label>
                          <Input
                            id={`edu-end-${index}`}
                            value={edu.endDate}
                            onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                            placeholder="MM/YYYY or Present"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`edu-description-${index}`}>Description</Label>
                        <Textarea
                          id={`edu-description-${index}`}
                          rows={3}
                          value={edu.description}
                          onChange={(e) => updateEducation(index, 'description', e.target.value)}
                          placeholder="Notable achievements, GPA, relevant coursework..."
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button 
                  variant="outline" 
                  onClick={addEducation}
                  className="w-full flex items-center justify-center py-6 border-dashed"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add Education
                </Button>
              </TabsContent>
              
              {/* Experience */}
              <TabsContent value="experience" className="space-y-6">
                {resume.experience.map((exp, index) => (
                  <Card key={exp.id} className="relative">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                      onClick={() => removeExperience(index)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor={`exp-company-${index}`}>Company</Label>
                          <Input
                            id={`exp-company-${index}`}
                            value={exp.company}
                            onChange={(e) => updateExperience(index, 'company', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`exp-position-${index}`}>Position</Label>
                          <Input
                            id={`exp-position-${index}`}
                            value={exp.position}
                            onChange={(e) => updateExperience(index, 'position', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <Label htmlFor={`exp-location-${index}`}>Location</Label>
                        <Input
                          id={`exp-location-${index}`}
                          value={exp.location}
                          onChange={(e) => updateExperience(index, 'location', e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor={`exp-start-${index}`}>Start Date</Label>
                          <Input
                            id={`exp-start-${index}`}
                            value={exp.startDate}
                            onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                            placeholder="MM/YYYY"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`exp-end-${index}`}>End Date</Label>
                          <Input
                            id={`exp-end-${index}`}
                            value={exp.endDate}
                            onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                            placeholder="MM/YYYY or Present"
                            disabled={exp.current}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-4">
                        <input
                          type="checkbox"
                          id={`exp-current-${index}`}
                          checked={exp.current}
                          onChange={(e) => {
                            updateExperience(index, 'current', e.target.checked);
                            if (e.target.checked) {
                              updateExperience(index, 'endDate', 'Present');
                            }
                          }}
                          className="rounded border-gray-300 text-resume-primary focus:ring-resume-primary"
                        />
                        <Label htmlFor={`exp-current-${index}`}>I currently work here</Label>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`exp-description-${index}`}>Description</Label>
                        <Textarea
                          id={`exp-description-${index}`}
                          rows={4}
                          value={exp.description}
                          onChange={(e) => updateExperience(index, 'description', e.target.value)}
                          placeholder="Describe your responsibilities and achievements..."
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button 
                  variant="outline" 
                  onClick={addExperience}
                  className="w-full flex items-center justify-center py-6 border-dashed"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add Experience
                </Button>
              </TabsContent>
              
              {/* Skills */}
              <TabsContent value="skills" className="space-y-6">
                {resume.skills.map((skill, index) => (
                  <Card key={skill.id} className="relative">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                      onClick={() => removeSkill(index)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                    <CardContent className="pt-6 flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-grow space-y-2">
                        <Label htmlFor={`skill-name-${index}`}>Skill</Label>
                        <Input
                          id={`skill-name-${index}`}
                          value={skill.name}
                          onChange={(e) => updateSkill(index, 'name', e.target.value)}
                        />
                      </div>
                      <div className="md:w-1/3 space-y-2">
                        <Label htmlFor={`skill-level-${index}`}>Proficiency Level (1-5)</Label>
                        <Input
                          id={`skill-level-${index}`}
                          type="range"
                          min="1"
                          max="5"
                          value={skill.level}
                          onChange={(e) => updateSkill(index, 'level', e.target.value)}
                        />
                        <div className="flex justify-between text-xs">
                          <span>Beginner</span>
                          <span>Expert</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button 
                  variant="outline" 
                  onClick={addSkill}
                  className="w-full flex items-center justify-center py-6 border-dashed"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add Skill
                </Button>
              </TabsContent>
              
              {/* Projects */}
              <TabsContent value="projects" className="space-y-6">
                {resume.projects.map((project, index) => (
                  <Card key={project.id} className="relative">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                      onClick={() => removeProject(index)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                    <CardContent className="pt-6">
                      <div className="space-y-2 mb-4">
                        <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                        <Input
                          id={`project-name-${index}`}
                          value={project.name}
                          onChange={(e) => updateProject(index, 'name', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <Label htmlFor={`project-tech-${index}`}>Technologies Used</Label>
                        <Input
                          id={`project-tech-${index}`}
                          value={project.technologies}
                          onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                          placeholder="E.g., React, Node.js, MongoDB"
                        />
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <Label htmlFor={`project-link-${index}`}>Project Link</Label>
                        <Input
                          id={`project-link-${index}`}
                          value={project.link}
                          onChange={(e) => updateProject(index, 'link', e.target.value)}
                          placeholder="https://..."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`project-description-${index}`}>Description</Label>
                        <Textarea
                          id={`project-description-${index}`}
                          rows={3}
                          value={project.description}
                          onChange={(e) => updateProject(index, 'description', e.target.value)}
                          placeholder="Describe the project and your role..."
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button 
                  variant="outline" 
                  onClick={addProject}
                  className="w-full flex items-center justify-center py-6 border-dashed"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add Project
                </Button>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Preview Panel */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold mb-4 text-resume-neutral">Live Preview</h2>
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <ResumePreview resume={resume} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Editor;
