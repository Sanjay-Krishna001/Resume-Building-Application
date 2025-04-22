
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useResume } from '@/contexts/ResumeContext';
import MainLayout from '@/components/layouts/MainLayout';

const Templates = () => {
  const { templates, createResume } = useResume();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  const handleSelectTemplate = async (templateId: string) => {
    setSelectedTemplateId(templateId);
    setIsCreating(true);
    
    try {
      const newResume = await createResume(templateId);
      navigate(`/editor/${newResume.id}`);
    } catch (error) {
      console.error('Error creating resume:', error);
    } finally {
      setIsCreating(false);
      setSelectedTemplateId(null);
    }
  };

  // Fallback images for each template style
  const fallbackImages = {
    modern: "https://via.placeholder.com/400x600/3B82F6/FFFFFF?text=Modern+Template",
    professional: "https://via.placeholder.com/400x600/6B7280/FFFFFF?text=Professional+Template",
    creative: "https://via.placeholder.com/400x600/EC4899/FFFFFF?text=Creative+Template",
    minimal: "https://via.placeholder.com/400x600/64748B/FFFFFF?text=Minimal+Template"
  };

  return (
    <MainLayout>
      <div className="container px-4 py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-bold text-resume-neutral mb-4">Choose a Template</h1>
          <p className="text-gray-600">
            Select a template that best fits your style and professional needs. 
            You can customize the colors and content after selecting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow border-2 hover:border-resume-primary">
              <div className="aspect-w-8 aspect-h-11 bg-gray-100 relative">
                <img 
                  src={fallbackImages[template.id as keyof typeof fallbackImages] || "/placeholder.svg"} 
                  alt={template.name} 
                  className="object-cover w-full h-56"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                  <Button 
                    onClick={() => handleSelectTemplate(template.id)}
                    className="bg-resume-primary hover:bg-resume-secondary text-white"
                    disabled={isCreating}
                  >
                    {isCreating && selectedTemplateId === template.id ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </div>
                    ) : 'Use This Template'}
                  </Button>
                </div>
              </div>
              <CardContent className="pt-4">
                <h3 className="text-lg font-semibold text-resume-neutral">{template.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{template.description}</p>
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Colors:</span>
                  <div className="flex space-x-1">
                    {template.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Templates;
