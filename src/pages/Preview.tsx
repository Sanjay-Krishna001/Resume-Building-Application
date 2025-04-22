
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useResume, Resume } from '@/contexts/ResumeContext';
import MainLayout from '@/components/layouts/MainLayout';
import ResumePreview from '@/components/resume/ResumePreview';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Preview = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const { getResumeById } = useResume();
  const [resume, setResume] = useState<Resume | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (resumeId) {
      const foundResume = getResumeById(resumeId);
      if (foundResume) {
        setResume(foundResume);
      } else {
        navigate('/dashboard');
        toast({
          title: "Resume not found",
          description: "The resume you're trying to preview doesn't exist",
          variant: "destructive",
        });
      }
    }
  }, [resumeId, getResumeById, navigate, toast]);

  const handleEdit = () => {
    if (resumeId) {
      navigate(`/editor/${resumeId}`);
    }
  };

  const exportToPdf = async () => {
    if (!resumeRef.current) return;
    
    setIsGenerating(true);
    
    try {
      // Notify user that PDF generation has started
      toast({
        title: "Generating PDF",
        description: "Please wait while we generate your PDF",
      });
      
      // Temporarily remove any scale transformation for capturing
      const element = resumeRef.current;
      const originalStyle = element.style.transform;
      element.style.transform = 'scale(1)';
      
      // Capture the resume as canvas
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        allowTaint: true,
      });
      
      // Restore original style
      element.style.transform = originalStyle;
      
      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      
      // Calculate the PDF dimensions to maintain the aspect ratio
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Save the PDF
      const fileName = `${resume?.personalInfo.firstName}_${resume?.personalInfo.lastName}_Resume.pdf`;
      pdf.save(fileName);
      
      toast({
        title: "PDF Generated",
        description: "Your resume has been exported as a PDF",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error generating PDF",
        description: "There was a problem creating your PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
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
            <h1 className="text-2xl font-bold text-resume-neutral">Preview Your Resume</h1>
            <p className="text-gray-600">Review your resume and make any final changes before exporting</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Button variant="outline" onClick={handleEdit}>
              Edit Resume
            </Button>
            <Button 
              onClick={exportToPdf} 
              className="bg-resume-primary hover:bg-resume-secondary"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating PDF
                </div>
              ) : (
                'Export PDF'
              )}
            </Button>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-6 flex justify-center">
          <div className="shadow-xl" ref={resumeRef}>
            <ResumePreview resume={resume} scale={1} />
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm mb-3">
            This is how your resume will appear when exported as a PDF.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={handleEdit}>
              Make Changes
            </Button>
            <Button 
              onClick={exportToPdf} 
              className="bg-resume-primary hover:bg-resume-secondary"
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Download PDF'}
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Preview;
