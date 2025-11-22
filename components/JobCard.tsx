import React from 'react';
import { MapPin, DollarSign, Briefcase, CheckCircle } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onApply: (jobId: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApply }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow duration-200 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <img 
            src={job.logo} 
            alt={`${job.company} logo`} 
            className="w-12 h-12 rounded-lg object-cover border border-slate-100"
          />
          <div>
            <h3 className="font-bold text-lg text-slate-900">{job.title}</h3>
            <p className="text-slate-600 font-medium">{job.company}</p>
            <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <MapPin size={12} /> {job.location}
              </div>
              <div className="flex items-center gap-1">
                <Briefcase size={12} /> {job.type}
              </div>
              <div className="flex items-center gap-1">
                <DollarSign size={12} /> {job.salary}
              </div>
            </div>
          </div>
        </div>
        <span className="text-xs font-medium text-slate-400 whitespace-nowrap">{job.postedAt}</span>
      </div>

      <div className="mt-4 text-slate-700 text-sm leading-relaxed">
        {job.description}
      </div>

      <div className="mt-4">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Required Skills</h4>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span 
              key={skill} 
              className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium border border-slate-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
        <button 
          onClick={() => onApply(job.id)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
        >
          Apply Now
          <CheckCircle size={16} />
        </button>
      </div>
    </div>
  );
};
