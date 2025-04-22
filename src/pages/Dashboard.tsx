
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useResume } from '@/contexts/ResumeContext';
import MainLayout from '@/components/layouts/MainLayout';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Dashboard = () => {
  const { user } = useAuth();
  const { resumes, deleteResume } = useResume();
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);
  const [newResumeName, setNewResumeName] = useState('');

  const confirmDelete = (id: string) => {
    setResumeToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (resumeToDelete) {
      await deleteResume(resumeToDelete);
      setOpenDeleteDialog(false);
      setResumeToDelete(null);
    }
  };

  return (
    <MainLayout>
      <div className="container px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-resume-neutral">Welcome, {user?.name}</h1>
            <p className="text-gray-600 mt-1">Manage your resumes or create a new one</p>
          </div>
          <Link to="/templates">
            <Button className="mt-4 md:mt-0 bg-resume-primary hover:bg-resume-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create New Resume
            </Button>
          </Link>
        </div>

        {resumes.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300 bg-transparent">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-resume-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-resume-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-resume-neutral">No resumes yet</h3>
              <p className="text-gray-600 mb-6 max-w-md">Create your first resume by selecting a template and filling in your information.</p>
              <Link to="/templates">
                <Button className="bg-resume-primary hover:bg-resume-secondary">
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <Card key={resume.id} className="relative overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-semibold text-resume-neutral truncate">
                      {resume.title}
                    </CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/editor/${resume.id}`)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/preview/${resume.id}`)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => confirmDelete(resume.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="text-sm text-gray-500">
                    Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Template:</span> {resume.templateId.charAt(0).toUpperCase() + resume.templateId.slice(1)}
                  </div>
                  <div className="mt-2 truncate text-sm text-gray-600">
                    {resume.personalInfo.firstName 
                      ? `${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`
                      : 'Incomplete profile'}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <Button 
                    variant="outline" 
                    className="text-resume-primary border-resume-primary hover:bg-resume-primary hover:text-white"
                    onClick={() => navigate(`/editor/${resume.id}`)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-resume-secondary border-resume-secondary hover:bg-resume-secondary hover:text-white"
                    onClick={() => navigate(`/preview/${resume.id}`)}
                  >
                    Preview
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your resume.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Dashboard;
