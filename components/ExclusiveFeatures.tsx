import React from 'react';
import { ShieldCheck, BrainCircuit, Briefcase, UserCheck, TrendingUp, Lock } from 'lucide-react';
import { MOCK_MENTORS } from '../constants';
import { ViewState } from '../types';

interface ExclusiveFeaturesProps {
  onNavigate: (view: ViewState) => void;
}

export const ExclusiveFeatures: React.FC<ExclusiveFeaturesProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Career Superpowers</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Unlock tools that traditional networks ignore. Verify skills, prove your worth, and get mentored by the best.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <FeatureCard 
          icon={UserCheck} 
          title="Bias-Free Matching" 
          description="Apply anonymously. Companies see your skills and test results first, your face and name second."
          onClick={() => onNavigate('anonymous-matching')}
          highlight
        />
        <FeatureCard 
          icon={ShieldCheck} 
          title="Skill Verification" 
          description="Take short, adaptive tests to earn skill badges that guarantee your expertise to recruiters."
          onClick={() => onNavigate('skill-verification')}
          highlight
        />
        <FeatureCard 
          icon={Briefcase} 
          title="Paid Test Projects" 
          description="Don't just interview. Do paid, short-term projects to prove you can do the job before you sign."
          onClick={() => onNavigate('paid-projects')}
          highlight
        />
        <FeatureCard 
          icon={BrainCircuit} 
          title="Strategic Career Roadmap" 
          description="Get personalized milestones and learning resources to reach your dream role faster using our data engine."
          onClick={() => onNavigate('career-pathing')}
          highlight
        />
        <FeatureCard 
          icon={Lock} 
          title="Private Reputation" 
          description="You control your data. Your reputation score travels with you, but you decide who sees the details."
          onClick={() => onNavigate('private-reputation')}
        />
        <FeatureCard 
          icon={TrendingUp} 
          title="Salary Insights" 
          description="Real-time, verified salary data for your specific role, skills, and location."
          onClick={() => onNavigate('salary-insights')}
        />
      </div>

      {/* Mentorship Section */}
      <div className="bg-slate-900 rounded-2xl p-8 text-white overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <UserCheck className="text-blue-400" />
            Instant Mentor Booking
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {MOCK_MENTORS.map(mentor => (
              <div key={mentor.id} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                <div className="flex gap-4">
                  <img src={mentor.image} alt={mentor.name} className="w-16 h-16 rounded-full border-2 border-blue-400" />
                  <div>
                    <h4 className="font-bold text-lg">{mentor.name}</h4>
                    <p className="text-blue-200 text-sm">{mentor.role} at {mentor.company}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {mentor.expertise.map(exp => (
                        <span key={exp} className="text-[10px] bg-black/30 px-2 py-1 rounded-full">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="ml-auto flex flex-col items-end justify-between">
                    <span className="text-sm font-bold text-emerald-400">{mentor.hourlyRate}</span>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Decorative background blob */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ 
  icon: React.ElementType, 
  title: string, 
  description: string,
  onClick?: () => void,
  highlight?: boolean
}> = ({ icon: Icon, title, description, onClick, highlight }) => (
  <div 
    onClick={onClick}
    className={`bg-white p-6 rounded-xl border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group ${
      onClick ? 'cursor-pointer' : ''
    } ${
      highlight ? 'border-blue-200 ring-2 ring-blue-50' : 'border-slate-200'
    }`}
  >
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${
      highlight ? 'bg-blue-100' : 'bg-blue-50 group-hover:bg-blue-600'
    }`}>
      <Icon className={`transition-colors ${
        highlight ? 'text-blue-700' : 'text-blue-600 group-hover:text-white'
      }`} size={24} />
    </div>
    <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    {onClick && (
      <div className="mt-4 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
        Try Feature →
      </div>
    )}
  </div>
);