
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
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
            <h1 className="text-2xl font-bold text-resume-secondary">ResumeBuilder</h1>
          </div>
          <nav className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="default" className="bg-resume-primary hover:bg-resume-secondary text-white">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-resume-primary text-resume-primary hover:bg-resume-primary hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" className="bg-resume-primary hover:bg-resume-secondary text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 flex-grow flex items-center bg-resume-background">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold text-resume-neutral">
              Create a professional resume in minutes
            </h1>
            <p className="text-xl text-gray-600">
              Stand out with a modern resume template. Easy to customize, export to PDF, and share with employers.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to={isAuthenticated ? "/templates" : "/register"}>
                <Button size="lg" className="w-full sm:w-auto bg-resume-primary hover:bg-resume-secondary text-white">
                  {isAuthenticated ? "Create Resume" : "Get Started"}
                </Button>
              </Link>
              <Link to="/templates">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-resume-primary text-resume-primary hover:bg-resume-primary hover:text-white">
                  View Templates
                </Button>
              </Link>
            </div>
            <div className="text-gray-600 flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-resume-accent"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Free PDF downloads</span>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-resume-primary rounded-lg transform rotate-3 -translate-y-3 translate-x-3 opacity-20"></div>
            <div className="absolute inset-0 bg-resume-secondary rounded-lg transform -rotate-3 translate-y-3 -translate-x-3 opacity-20"></div>
            <div className="relative rounded-lg shadow-2xl overflow-hidden border border-gray-200">
              <img 
                src="/placeholder.svg" 
                alt="Resume preview" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-resume-neutral">Why use ResumeBuilder?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-resume-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-resume-neutral">Professional Templates</h3>
              <p className="text-gray-600">
                Choose from a variety of professionally designed templates that are proven to get results.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-resume-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-resume-neutral">Easy Customization</h3>
              <p className="text-gray-600">
                Simple and intuitive editor lets you create your perfect resume without any design skills.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-resume-neutral">Export to PDF</h3>
              <p className="text-gray-600">
                Download your resume as a professional PDF file ready to be sent to employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-resume-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-resume-neutral">Ready to build your resume?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have successfully landed their dream jobs with resumes created on our platform.
          </p>
          <Link to={isAuthenticated ? "/templates" : "/register"}>
            <Button size="lg" className="bg-resume-primary hover:bg-resume-secondary text-white">
              {isAuthenticated ? "Create Resume" : "Get Started for Free"}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-resume-neutral text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ResumeBuilder</h3>
              <p className="text-gray-300">
                Create professional resumes easily with our intuitive builder.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Resume Templates</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Career Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Resume Tips</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Feedback</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} ResumeBuilder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
