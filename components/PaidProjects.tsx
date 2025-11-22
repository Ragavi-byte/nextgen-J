
import React, { useState } from 'react';
import { DollarSign, Clock, Briefcase, ChevronRight, CheckCircle2, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { PaidProject } from '../types';
import { MOCK_PROJECTS } from '../constants';

export const PaidProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<PaidProject | null>(null);
  const [filter, setFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');

  const filteredProjects = filter === 'All' 
    ? MOCK_PROJECTS 
    : MOCK_PROJECTS.filter(p => p.difficulty === filter);

  if (selectedProject) {
    return (
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => setSelectedProject(null)}
          className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium"
        >
          <ArrowLeft size={18} /> Back to Projects
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                    {selectedProject.difficulty}
                  </span>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm flex items-center gap-1">
                    <Clock size={12} /> {selectedProject.estimatedTime}
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-2">{selectedProject.title}</h1>
                <p className="text-emerald-100 font-medium flex items-center gap-2">
                  <Briefcase size={16} /> {selectedProject.company}
                </p>
              </div>
              <div className="bg-white text-emerald-700 px-6 py-4 rounded-xl text-center shadow-lg">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600/70">Project Budget</p>
                <p className="text-3xl font-extrabold">{selectedProject.budget}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 p-4 rounded-lg mb-8">
              <Lock className="text-blue-600 mt-1 flex-shrink-0" size={18} />
              <div>
                <h4 className="font-bold text-blue-800 text-sm">Secure Escrow Payment</h4>
                <p className="text-blue-600 text-sm leading-relaxed">
                  The budget for this project has already been deposited by {selectedProject.company}. 
                  Funds will be released to your wallet immediately upon approval of your deliverables.
                </p>
              </div>
            </div>

            <h3 className="font-bold text-slate-900 text-lg mb-3">Project Description</h3>
            <p className="text-slate-600 leading-relaxed mb-8">
              {selectedProject.description}
            </p>

            <h3 className="font-bold text-slate-900 text-lg mb-3">Deliverables</h3>
            <ul className="space-y-3 mb-8">
              {selectedProject.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-700">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="font-bold text-slate-900 text-lg mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedProject.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg font-medium text-sm">
                  {skill}
                </span>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-8 flex justify-end">
              <button 
                onClick={() => alert("Project started! In a real app, this would open your workspace.")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Start Project
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-2">
          <DollarSign className="bg-emerald-100 text-emerald-600 rounded-full p-1" size={36} />
          Paid Test Projects
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Don't just interview—get paid to prove your skills. Complete real-world tasks from top companies, earn money, and build your verified portfolio.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 inline-flex">
          {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                filter === level
                  ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div 
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3">
                <img src={project.logo} alt={project.company} className="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">{project.title}</h3>
                  <p className="text-sm text-slate-500">{project.company}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block font-bold text-emerald-600 text-lg">{project.budget}</span>
              </div>
            </div>

            <p className="text-slate-600 text-sm mb-4 line-clamp-2 h-10">
              {project.description}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                project.difficulty === 'Advanced' ? 'bg-red-50 text-red-700' :
                project.difficulty === 'Intermediate' ? 'bg-blue-50 text-blue-700' :
                'bg-green-50 text-green-700'
              }`}>
                {project.difficulty}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock size={12} /> {project.estimatedTime}
              </span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex -space-x-2 overflow-hidden">
                {project.skills.slice(0, 3).map((skill, i) => (
                  <div key={i} className="bg-slate-100 text-[10px] font-medium text-slate-600 px-2 py-1 rounded-md border border-white relative z-10" style={{ marginLeft: i > 0 ? '0.5rem' : 0 }}>
                    {skill}
                  </div>
                ))}
              </div>
              <span className="text-emerald-600 text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Details <ChevronRight size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <AlertCircle className="mx-auto text-slate-400 mb-2" size={32} />
          <p className="text-slate-500 font-medium">No projects found for this difficulty level.</p>
        </div>
      )}
    </div>
  );
};
