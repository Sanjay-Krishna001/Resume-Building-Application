
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-resume-background">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-resume-primary" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            <h1 className="text-xl font-bold text-resume-secondary">ResumeBuilder</h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-gray-700 hover:text-resume-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/templates" className="text-gray-700 hover:text-resume-primary transition-colors">
              Templates
            </Link>
            <a href="#" className="text-gray-700 hover:text-resume-primary transition-colors">
              Help
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" alt={user?.name} />
                    <AvatarFallback className="bg-resume-primary text-white">
                      {user?.name?.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/templates')}>
                  Templates
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      <div className="md:hidden bg-white border-b">
        <div className="container mx-auto px-4 py-2 flex justify-between">
          <Link to="/dashboard" className="flex-1 text-center py-2 text-gray-700 hover:text-resume-primary transition-colors">
            Dashboard
          </Link>
          <div className="border-l border-r border-gray-200 flex-1 text-center">
            <Link to="/templates" className="py-2 block text-gray-700 hover:text-resume-primary transition-colors">
              Templates
            </Link>
          </div>
          <a href="#" className="flex-1 text-center py-2 text-gray-700 hover:text-resume-primary transition-colors">
            Help
          </a>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} ResumeBuilder. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <a href="#" className="hover:text-resume-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-resume-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-resume-primary transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
