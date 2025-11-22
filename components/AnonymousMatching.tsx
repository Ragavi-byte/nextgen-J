
import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Briefcase, Lock, UserCheck, CheckCircle2, Award } from 'lucide-react';
import { Job } from '../types';

// Mock jobs for anonymous matching
const MATCHED_JOBS: (Job & { matchScore: number })[] = [
  {
    id: 'am1',
    title: 'Senior React Developer',
    company: 'Stealth Startup',
    logo: 'https://picsum.photos/seed/stealth/100/100',
    location: 'Remote',
    salary: '$160k - $200k',
    description: 'Looking for a high-performance frontend engineer.',
    skills: ['React', 'TypeScript', 'Performance'],
    postedAt: '1h ago',
    type: 'Full-time',
    matchScore: 98
  },
  {
    id: 'am2',
    title: 'Backend Architect',
    company: 'FinTech Corp',
    logo: 'https://picsum.photos/seed/fin/100/100',
    location: 'New York, NY',
    salary: '$180k - $240k',
    description: 'Scale our payment infrastructure.',
    skills: ['Node.js', 'AWS', 'System Design'],
    postedAt: '3h ago',
    type: 'Full-time',
    matchScore: 94
  }
];

export const AnonymousMatching: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <div className="max-w-5xl mx-auto pb-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
            <Shield size={28} />
          </div>
          <div>
             <h2 className="text-2xl font-bold text-slate-900">Anonymous Job Matching</h2>
             <p className="text-slate-500 text-sm">Bias-free hiring based purely on merit.</p>
          </div>
        </div>
        <p className="text-slate-600 max-w-3xl leading-relaxed">
          Hide your personal identity (Name, Photo, Age, Gender) from recruiters until you decide to reveal it. 
          This forces companies to evaluate you solely on your skills, test scores, and verified achievements.
        </p>
      </div>

      {/* Toggle Section */}
      <div className={`p-6 rounded-xl border ${isEnabled ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-200'} shadow-sm mb-8 transition-colors duration-300`}>
        <div className="flex items-center justify-between">
            <div>
                <h3 className={`font-bold text-lg ${isEnabled ? 'text-indigo-900' : 'text-slate-900'}`}>
                    Anonymous Mode
                </h3>
                <p className={`text-sm mt-1 ${isEnabled ? 'text-indigo-700' : 'text-slate-500'}`}>
                    {isEnabled 
                        ? "Active: Recruiters will only see your skills and achievements." 
                        : "Inactive: Recruiters can see your full profile including name and photo."}
                </p>
            </div>
            <button 
                onClick={() => setIsEnabled(!isEnabled)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isEnabled ? 'bg-indigo-600' : 'bg-slate-300'}`}
            >
                <span className={`${isEnabled ? 'translate-x-7' : 'translate-x-1'} inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-sm`} />
            </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Preview Section */}
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Eye size={18} className="text-slate-500" /> Recruiter View
                </h3>
                {isEnabled && <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Anonymized</span>}
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative overflow-hidden transition-all duration-500">
                {isEnabled && (
                    <div className="absolute top-0 left-0 right-0 bg-indigo-600 text-white text-[10px] font-bold py-1 text-center tracking-widest uppercase">
                        Hidden Identity Profile
                    </div>
                )}
                
                <div className="flex items-center gap-4 mb-6 mt-4">
                    {isEnabled ? (
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-inner ring-4 ring-indigo-50">
                            <Lock size={24} />
                        </div>
                    ) : (
                        <div className="relative">
                           <img src="https://picsum.photos/seed/alex/200/200" className="w-16 h-16 rounded-full object-cover ring-4 ring-slate-50" alt="Profile" />
                           <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                    )}
                    <div>
                        <h4 className="font-bold text-lg text-slate-900 transition-all duration-300">
                            {isEnabled ? "Candidate #8X92" : "Alex Morgan"}
                        </h4>
                        <p className="text-slate-500 text-sm font-medium">
                            {isEnabled ? "Experienced Full Stack Developer" : "Full Stack Developer"}
                        </p>
                        {isEnabled && (
                            <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200 shadow-sm animate-pulse">
                                <Award size={14} className="text-amber-600" /> Verified Skills Badge
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-5">
                    <div>
                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Work History</h5>
                        {isEnabled ? (
                            <ul className="text-sm text-slate-700 space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 mt-1.5 bg-slate-300 rounded-full shrink-0"></div>
                                    <div>
                                        <span className="font-medium">Senior Developer</span> at <span className="italic text-slate-500 bg-slate-100 px-1 rounded">Major Tech Company</span>
                                        <div className="text-xs text-slate-500 mt-0.5">3 years • FinTech Industry</div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 mt-1.5 bg-slate-300 rounded-full shrink-0"></div>
                                    <div>
                                        <span className="font-medium">Frontend Lead</span> at <span className="italic text-slate-500 bg-slate-100 px-1 rounded">High-Growth Startup</span>
                                        <div className="text-xs text-slate-500 mt-0.5">2 years • SaaS</div>
                                    </div>
                                </li>
                            </ul>
                        ) : (
                             <ul className="text-sm text-slate-700 space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 mt-1.5 bg-blue-500 rounded-full shrink-0"></div>
                                    <div>
                                        <span className="font-medium">Senior Developer</span> at TechCorp
                                        <div className="text-xs text-slate-500 mt-0.5">2021 - Present</div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 mt-1.5 bg-blue-500 rounded-full shrink-0"></div>
                                    <div>
                                        <span className="font-medium">Frontend Lead</span> at StartupX
                                        <div className="text-xs text-slate-500 mt-0.5">2019 - 2021</div>
                                    </div>
                                </li>
                            </ul>
                        )}
                    </div>

                    <div>
                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Top Skills</h5>
                        <div className="flex flex-wrap gap-2">
                             {['React', 'Node.js', 'AWS', 'System Design'].map(s => (
                                 <span key={s} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-md border border-slate-200">
                                     {s}
                                 </span>
                             ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Matches Section */}
        <div className="space-y-4">
             <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Briefcase size={18} className="text-slate-500" /> 
                {isEnabled ? "Matches for your Skills" : "Enable to see Skill Matches"}
            </h3>

            {isEnabled ? (
                <div className="space-y-4 animate-fade-in">
                    {MATCHED_JOBS.map(job => (
                        <div key={job.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{job.title}</h4>
                                    <p className="text-sm text-slate-500">{job.company}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center gap-1 text-indigo-600">
                                        <span className="text-xl font-bold">{job.matchScore}%</span>
                                    </div>
                                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Match</span>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mb-3 line-clamp-1">{job.description}</p>
                            <div className="flex gap-2 mb-4">
                                {job.skills.slice(0,3).map(s => (
                                    <span key={s} className="text-[10px] font-medium bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
                                        {s}
                                    </span>
                                ))}
                            </div>
                            <button className="w-full py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                                <UserCheck size={16} />
                                Apply Anonymously
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center h-[400px] transition-all">
                    <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                        <EyeOff size={32} className="text-slate-400" />
                    </div>
                    <h4 className="font-bold text-slate-700 mb-2">Matches Hidden</h4>
                    <p className="text-slate-500 text-sm font-medium max-w-xs mx-auto">
                        Enable Anonymous Mode to see jobs matched purely on your verified skills, shielding you from unconscious bias.
                    </p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
