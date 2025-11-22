import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { JobCard } from './components/JobCard';
import { ResumeBuilder } from './components/ResumeBuilder';
import { Profile } from './components/Profile';
import { ExploreMap } from './components/ExploreMap';
import { ExclusiveFeatures } from './components/ExclusiveFeatures';
import { AnonymousMatching } from './components/AnonymousMatching';
import { SkillVerification } from './components/SkillVerification';
import { PaidProjects } from './components/PaidProjects';
import { CareerPathing } from './components/CareerPathing';
import { SalaryInsights } from './components/SalaryInsights';
import { PrivateReputation } from './components/PrivateReputation';
import { MOCK_JOBS } from './constants';
import { ViewState } from './types';
import { LogIn, ArrowRight, Search } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setView('feed');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('login');
  };

  const handleApply = (jobId: string) => {
    alert(`Application started for job ID: ${jobId}. In a real app, this would open a modal.`);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white flex flex-col lg:flex-row">
        {/* Login Left Side - Branding */}
        <div className="lg:w-1/2 bg-blue-600 p-12 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-8">
              <span className="text-blue-600 font-bold text-2xl">N</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Build a career,<br />not just a resume.
            </h1>
            <p className="text-blue-100 text-lg max-w-md">
              The next-generation professional network. Skill-based, anonymous matching, and data-driven growth.
            </p>
          </div>
          <div className="relative z-10 mt-12">
            <div className="flex items-center gap-4 text-sm font-medium text-blue-200">
              <span>Bias-free Hiring</span>
              <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
              <span>Skill Verification</span>
              <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
              <span>Paid Test Projects</span>
            </div>
          </div>
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/50 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/50 rounded-full blur-3xl -ml-10 -mb-10"></div>
        </div>

        {/* Login Right Side - Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-24">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h2>
            <p className="text-slate-500 mb-8">Please enter your details to sign in.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
              <button 
                onClick={handleLogin}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 mt-2"
              >
                Sign In <LogIn size={20} />
              </button>
            </div>

            <div className="mt-8 text-center text-sm text-slate-500">
              Don't have an account? <a href="#" className="text-blue-600 font-bold hover:underline">Sign up for free</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      <Navigation currentView={view} onNavigate={setView} onLogout={handleLogout} />

      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen no-scrollbar">
        <div className="max-w-5xl mx-auto">
          {/* Header for all pages */}
          <header className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 capitalize">
                {view.replace(/-/g, ' ')}
              </h2>
              <p className="text-slate-500 text-sm">
                {view === 'feed' && 'Explore the latest opportunities matched for you.'}
                {view === 'jobs-near-me' && 'Discover companies hiring in your vicinity.'}
                {view === 'resume-builder' && 'Create a standout resume in seconds with our intelligent system.'}
                {view === 'profile' && 'Manage your professional identity.'}
                {view === 'exclusive' && 'Accelerate your career with premium tools.'}
                {view === 'anonymous-matching' && 'Eliminate bias and get hired for what you know.'}
                {view === 'skill-verification' && 'Prove your expertise with dynamic assessments.'}
                {view === 'paid-projects' && 'Complete real projects, earn money, and build your portfolio.'}
                {view === 'career-pathing' && 'Visualize and plan your future career trajectory.'}
                {view === 'salary-insights' && 'Analyze compensation trends and maximize your worth.'}
                {view === 'private-reputation' && 'View your confidential professional score.'}
              </p>
            </div>
            {view === 'feed' && (
              <div className="hidden sm:flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm">
                <Search size={18} className="text-slate-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search jobs, skills..." 
                  className="outline-none text-sm text-slate-700 w-48 lg:w-64"
                />
              </div>
            )}
          </header>

          {/* Main Content Area */}
          <div className="animate-fade-in">
            {view === 'feed' && (
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {MOCK_JOBS.map(job => (
                    <JobCard key={job.id} job={job} onApply={handleApply} />
                  ))}
                </div>
                {/* Sidebar Ad / Stats */}
                <div className="hidden lg:block">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg mb-6 sticky top-8">
                    <h3 className="font-bold text-lg mb-2">Upgrade to Pro</h3>
                    <p className="text-blue-100 text-sm mb-4">Get 3x more visibility and see who viewed your profile.</p>
                    <button className="w-full bg-white text-blue-600 font-bold py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                      Try Free for 7 Days <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {view === 'jobs-near-me' && <ExploreMap />}
            
            {view === 'resume-builder' && <ResumeBuilder />}
            
            {view === 'profile' && <Profile />}
            
            {view === 'exclusive' && <ExclusiveFeatures onNavigate={setView} />}
            
            {view === 'anonymous-matching' && <AnonymousMatching />}

            {view === 'skill-verification' && <SkillVerification />}
            
            {view === 'paid-projects' && <PaidProjects />}
            
            {view === 'career-pathing' && <CareerPathing />}

            {view === 'salary-insights' && <SalaryInsights />}

            {view === 'private-reputation' && <PrivateReputation />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
