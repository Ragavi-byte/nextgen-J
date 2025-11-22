
import React from 'react';
import { MapPin, Briefcase, Code, Trophy, Star } from 'lucide-react';
import { MOCK_PROFILE } from '../constants';

export const Profile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
                <img 
                  src="https://picsum.photos/seed/alex/200/200" 
                  alt="Profile" 
                  className="w-full h-full rounded-xl object-cover"
                />
              </div>
            </div>
            <div className="flex gap-3">
               <button className="px-4 py-2 bg-slate-100 text-slate-700 font-medium text-sm rounded-lg hover:bg-slate-200 transition-colors">
                 Edit Profile
               </button>
               <button className="px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-colors">
                 Share
               </button>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">{MOCK_PROFILE.name}</h1>
            <p className="text-slate-600 font-medium mb-2">{MOCK_PROFILE.title}</p>
            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
              <span className="flex items-center gap-1"><MapPin size={14}/> San Francisco, CA</span>
              <span className="flex items-center gap-1"><Briefcase size={14}/> Open to work</span>
            </div>
            <p className="text-slate-700 max-w-2xl leading-relaxed">
              {MOCK_PROFILE.bio}
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column - Stats & Skills */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Star className="text-yellow-500" size={20} fill="currentColor" />
                Reputation
              </h3>
              <span className="text-2xl font-bold text-slate-900">{MOCK_PROFILE.reputationScore}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="text-xs text-slate-500">Top 5% of developers in your area</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Code size={18} className="text-blue-600" />
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {MOCK_PROFILE.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-slate-50 text-slate-700 text-xs font-medium rounded-lg border border-slate-100">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Experience & Projects */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
               <Briefcase size={18} className="text-blue-600" />
               Experience
             </h3>
             <div className="space-y-6">
               {/* Mock Experience Items */}
               <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                   <span className="font-bold text-blue-600 text-xs">TC</span>
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900">Senior Developer</h4>
                   <p className="text-sm text-slate-600">TechCorp • 2021 - Present</p>
                   <p className="text-sm text-slate-500 mt-2">Led development of microservices architecture.</p>
                 </div>
               </div>
               <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                   <span className="font-bold text-indigo-600 text-xs">SX</span>
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900">Frontend Lead</h4>
                   <p className="text-sm text-slate-600">StartupX • 2019 - 2021</p>
                   <p className="text-sm text-slate-500 mt-2">Built core product from scratch using React.</p>
                 </div>
               </div>
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
               <Trophy size={18} className="text-blue-600" />
               Verified Achievements
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="border border-slate-100 bg-slate-50 p-4 rounded-lg">
                 <h4 className="font-semibold text-slate-800 text-sm">React Expert</h4>
                 <p className="text-xs text-slate-500 mt-1">Passed skill verification test (Top 1%)</p>
               </div>
               <div className="border border-slate-100 bg-slate-50 p-4 rounded-lg">
                 <h4 className="font-semibold text-slate-800 text-sm">Project Completion</h4>
                 <p className="text-xs text-slate-500 mt-1">Successfully delivered 5 paid test projects</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
