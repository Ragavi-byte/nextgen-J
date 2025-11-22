
import React, { useState, useEffect } from 'react';
import { TrendingUp, MapPin, Search, DollarSign, ArrowRight, Briefcase, Loader2 } from 'lucide-react';
import { generateSalaryInsights } from '../services/aiServices';
import { SalaryInsight } from '../types';
import { MOCK_PROFILE } from '../constants';

export const SalaryInsights: React.FC = () => {
  const [role, setRole] = useState(MOCK_PROFILE.title);
  const [location, setLocation] = useState('San Francisco, CA');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<SalaryInsight | null>(null);

  const handleAnalyze = async () => {
    if (!role || !location) return;
    setIsLoading(true);
    try {
      const result = await generateSalaryInsights(role, location);
      setData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    handleAnalyze();
  }, []);

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-100 text-emerald-600 rounded-xl mb-4">
          <TrendingUp size={32} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Salary Insights</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Know your worth. Get real-time market data, salary benchmarks, and actionable tips to increase your earning potential.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            placeholder="Job Title"
          />
        </div>
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            placeholder="Location"
          />
        </div>
        <button 
          onClick={handleAnalyze}
          disabled={isLoading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70"
        >
          {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
          Analyze
        </button>
      </div>

      {isLoading && !data && (
        <div className="text-center py-20">
          <Loader2 className="animate-spin mx-auto text-emerald-600 mb-4" size={48} />
          <p className="text-slate-500">Analyzing market data...</p>
        </div>
      )}

      {data && (
        <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
          {/* Main Stats */}
          <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{data.role}</h3>
                <p className="text-slate-500 flex items-center gap-1 text-sm">
                  <MapPin size={14} /> {data.location}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                data.marketTrend === 'Up' ? 'bg-emerald-50 text-emerald-700' : 
                data.marketTrend === 'Down' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-600'
              }`}>
                Market Trend: {data.marketTrend}
                {data.marketTrend === 'Up' && <TrendingUp size={14} />}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
                <span>Min</span>
                <span>Median</span>
                <span>Max</span>
              </div>
              <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
                <div className="absolute top-0 bottom-0 bg-emerald-200 left-[20%] right-[20%]"></div>
                <div className="absolute top-0 bottom-0 w-1 bg-emerald-600 left-[50%]"></div>
              </div>
              <div className="flex justify-between text-lg font-bold text-slate-900 mt-2">
                <span>${(data.ranges.min / 1000).toFixed(0)}k</span>
                <span className="text-emerald-600">${(data.ranges.median / 1000).toFixed(0)}k</span>
                <span>${(data.ranges.max / 1000).toFixed(0)}k</span>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex gap-4">
              <div className="bg-emerald-100 p-2 rounded-lg h-fit">
                <DollarSign className="text-emerald-700" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-emerald-900 text-sm mb-1">Actionable Insight</h4>
                <p className="text-emerald-800 text-sm leading-relaxed">
                  {data.actionableTip}
                </p>
              </div>
            </div>
          </div>

          {/* Skill Premium */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="text-blue-600" size={20} />
              Skill Premiums
            </h3>
            <p className="text-xs text-slate-500 mb-4">Adding these skills can boost your base salary.</p>
            
            <div className="space-y-3">
              {data.topPayingSkills.map((skill, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-sm font-medium text-slate-700">{skill.skill}</span>
                  <span className="text-sm font-bold text-emerald-600">{skill.premium}</span>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 text-blue-600 text-sm font-bold flex items-center justify-center gap-1 hover:bg-blue-50 py-2 rounded-lg transition-colors">
              View Learning Path <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
