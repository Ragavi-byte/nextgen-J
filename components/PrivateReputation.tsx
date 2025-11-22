
import React, { useEffect, useState } from 'react';
import { Lock, Shield, Star, TrendingUp, EyeOff, Info } from 'lucide-react';
import { generateReputationAnalysis } from '../services/aiServices';
import { UserProfile, ReputationAnalysis } from '../types';
import { MOCK_PROFILE } from '../constants';

export const PrivateReputation: React.FC = () => {
  const [analysis, setAnalysis] = useState<ReputationAnalysis | null>(null);

  useEffect(() => {
    const fetchReputation = async () => {
      // In a real app, we would fetch fresh data. Here we mock using the service
      const result = await generateReputationAnalysis(MOCK_PROFILE);
      setAnalysis(result);
    };
    fetchReputation();
  }, []);

  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <Shield className="text-slate-300 mb-4" size={48} />
          <p className="text-slate-400 font-medium">Calculating secure score...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Lock className="text-slate-400" size={24} />
            Private Reputation
          </h2>
          <p className="text-slate-500 text-sm">
            Your confidential professional credit score. Visible only to you.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
          <EyeOff size={14} />
          Encrypted & Private
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Score Card */}
        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden flex flex-col items-center justify-center text-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
          
          <div className="relative z-10 mb-4">
            <div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
              {analysis.score}
            </div>
            <div className="text-sm text-slate-400 font-medium mt-1">out of 1000</div>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
            <Star size={14} className="text-yellow-400" fill="currentColor" />
            {analysis.level}
          </div>
          
          <p className="text-xs text-slate-400 mt-6">
            Top {100 - analysis.percentile}% of professionals in your field
          </p>
        </div>

        {/* Breakdown */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full">
            <h3 className="font-bold text-slate-900 mb-6">Reputation Dimensions</h3>
            <div className="space-y-6">
              {analysis.dimensions.map((dim, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-bold text-slate-700 text-sm">{dim.name}</span>
                    <span className="text-slate-900 font-bold">{dim.score}/100</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000" 
                      style={{ width: `${dim.score}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-500">{dim.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Summary & Tips */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
         <div className="bg-blue-100 p-3 rounded-xl h-fit flex-shrink-0">
           <Info className="text-blue-700" size={24} />
         </div>
         <div>
           <h4 className="font-bold text-blue-900 mb-2">Analysis Summary</h4>
           <p className="text-blue-800 text-sm leading-relaxed">
             {analysis.summary}
           </p>
           <button className="mt-4 text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1">
             View detailed report <TrendingUp size={12} />
           </button>
         </div>
      </div>
    </div>
  );
};
