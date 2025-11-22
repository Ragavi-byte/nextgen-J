import React, { useState } from 'react';
import { BrainCircuit, Target, TrendingUp, BookOpen, Map, CheckSquare, ArrowRight, Sparkles, AlertCircle, RotateCcw } from 'lucide-react';
import { generateCareerRoadmap } from '../services/aiServices';
import { MOCK_PROFILE } from '../constants';
import { CareerRoadmap } from '../types';

export const CareerPathing: React.FC = () => {
  const [targetRole, setTargetRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null);

  const handleGenerate = async (customRole?: string) => {
    setIsLoading(true);
    setRoadmap(null);
    try {
      const result = await generateCareerRoadmap(MOCK_PROFILE, customRole || targetRole);
      setRoadmap(result);
    } catch (error) {
      console.error("Failed to generate roadmap");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
          <BrainCircuit size={64} className="text-purple-600 animate-bounce" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Analyzing Career Trajectory</h3>
        <p className="text-slate-500 max-w-md">
          Our system is evaluating your profile against market trends, identifying skill gaps, and building your personalized roadmap...
        </p>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-purple-100 text-purple-600 rounded-xl mb-4">
            <Map size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Career Roadmap Engine</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Stop guessing. Let our algorithmic recommendation engine analyze your skills and build a step-by-step roadmap to your dream job.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Auto Suggest */}
          <div 
            onClick={() => handleGenerate()}
            className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all cursor-pointer group text-center"
          >
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Sparkles size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Suggest Best Path</h3>
            <p className="text-slate-500 text-sm mb-6">
              Let the system analyze your current profile and suggest the most logical high-value career step based on market data.
            </p>
            <button className="text-purple-600 font-bold text-sm flex items-center justify-center gap-2 mx-auto">
              Analyze Profile <ArrowRight size={16} />
            </button>
          </div>

          {/* Custom Target */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center flex flex-col">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">I Have a Goal</h3>
            <p className="text-slate-500 text-sm mb-6">
              Enter your dream role, and we'll show you exactly how to get there from where you are now.
            </p>
            <div className="mt-auto flex gap-2">
              <input 
                type="text" 
                placeholder="e.g. CTO, Product Manager"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-purple-500"
              />
              <button 
                disabled={!targetRole}
                onClick={() => handleGenerate(targetRole)}
                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-slate-800 transition-colors"
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
           <div className="flex items-center gap-2 text-purple-600 font-bold text-sm mb-1">
             <Sparkles size={16} /> System Recommended Path
           </div>
           <h2 className="text-3xl font-bold text-slate-900">
             {MOCK_PROFILE.title} <span className="text-slate-400 mx-2">→</span> {roadmap.targetRole}
           </h2>
        </div>
        <button 
          onClick={() => setRoadmap(null)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium bg-white border border-slate-200 px-4 py-2 rounded-lg transition-colors"
        >
          <RotateCcw size={14} /> Start Over
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
           <div className="relative w-24 h-24 mb-4">
             <svg className="w-full h-full transform -rotate-90">
               <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
               <circle 
                 cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" 
                 className={roadmap.matchScore > 70 ? "text-emerald-500" : "text-yellow-500"}
                 strokeDasharray={251.2}
                 strokeDashoffset={251.2 * (1 - roadmap.matchScore / 100)}
               />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-slate-800">
               {roadmap.matchScore}%
             </div>
           </div>
           <h4 className="font-bold text-slate-900">Match Score</h4>
           <p className="text-xs text-slate-500">Based on current skills</p>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <BrainCircuit size={20} className="text-purple-600" />
            Path Analysis
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            {roadmap.summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {roadmap.skillGaps.map((gap, i) => (
              <div key={i} className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 border ${
                gap.priority === 'High' 
                  ? 'bg-red-50 text-red-700 border-red-100' 
                  : gap.priority === 'Medium' 
                    ? 'bg-yellow-50 text-yellow-700 border-yellow-100' 
                    : 'bg-blue-50 text-blue-700 border-blue-100'
              }`}>
                {gap.priority === 'High' && <AlertCircle size={12} />}
                {gap.skill}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Timeline */}
        <div className="lg:col-span-2 space-y-6">
           <h3 className="font-bold text-xl text-slate-900 flex items-center gap-2">
             <TrendingUp className="text-purple-600" /> Implementation Roadmap
           </h3>
           
           <div className="relative border-l-2 border-slate-200 ml-3 space-y-8 pb-4">
             {roadmap.milestones.map((milestone, i) => (
               <div key={i} className="relative pl-8">
                 <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-purple-600"></div>
                 <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                   <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded mb-2 inline-block">
                     {milestone.duration}
                   </span>
                   <h4 className="font-bold text-slate-900 text-lg mb-1">{milestone.title}</h4>
                   <p className="text-slate-600 text-sm">{milestone.description}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Learning Plan */}
        <div>
           <h3 className="font-bold text-xl text-slate-900 flex items-center gap-2 mb-6">
             <BookOpen className="text-blue-600" /> Action Plan
           </h3>
           
           <div className="space-y-4">
             {roadmap.learningPlan.map((item, i) => (
               <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors group cursor-pointer">
                 <div className="flex items-start gap-3">
                   <div className={`p-2 rounded-lg flex-shrink-0 ${
                     item.type === 'Course' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                   }`}>
                     {item.type === 'Course' ? <BookOpen size={18} /> : <CheckSquare size={18} />}
                   </div>
                   <div>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                       {item.type}
                     </span>
                     <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                       {item.title}
                     </h4>
                     <p className="text-xs text-slate-500 line-clamp-2">
                       {item.description}
                     </p>
                   </div>
                 </div>
               </div>
             ))}
             
             <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-xl mt-6">
               <h4 className="font-bold mb-2">Track Progress</h4>
               <p className="text-sm text-slate-300 mb-4">
                 As you complete these items, your roadmap will automatically update.
               </p>
               <button className="w-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2 rounded-lg transition-colors">
                 Sync with Profile
               </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
