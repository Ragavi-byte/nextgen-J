import React from 'react';
import { MapPin, Navigation as NavIcon, Building2 } from 'lucide-react';
import { MOCK_COMPANIES } from '../constants';

export const ExploreMap: React.FC = () => {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6">
      {/* List View */}
      <div className="w-full md:w-1/3 flex flex-col gap-4 overflow-y-auto no-scrollbar pb-20">
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-2">Jobs Near You</h2>
          <p className="text-blue-100 text-sm">Found {MOCK_COMPANIES.length} hiring companies within 5 miles.</p>
          <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 w-fit">
            <NavIcon size={16} />
            Use Current Location
          </button>
        </div>

        {MOCK_COMPANIES.map((company) => (
          <div key={company.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <img src={company.logo} alt={company.name} className="w-12 h-12 rounded-lg object-cover bg-slate-100" />
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{company.name}</h3>
                <p className="text-xs text-slate-500">{company.industry}</p>
              </div>
              <div className="text-right">
                <span className="block font-bold text-blue-600 text-lg">{company.openRoles}</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Open Roles</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2 rounded-lg">
              <MapPin size={14} className="text-slate-400" />
              {company.location}
            </div>
          </div>
        ))}
      </div>

      {/* Mock Map View */}
      <div className="hidden md:block flex-1 bg-slate-200 rounded-xl overflow-hidden relative shadow-inner border border-slate-300">
        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-122.40,37.78,12,0/800x600?access_token=placeholder')] bg-cover bg-center opacity-50" />
        
        {/* Simulated Map Pins */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <div className="relative">
             <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg z-10 relative animate-pulse"></div>
             <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping"></div>
           </div>
        </div>

        {/* Floating Company Markers */}
        <div className="absolute top-1/3 left-1/3 bg-white p-2 rounded-lg shadow-lg flex items-center gap-2 transform hover:scale-110 transition-transform cursor-pointer">
          <img src={MOCK_COMPANIES[0].logo} className="w-6 h-6 rounded-full" />
          <span className="text-xs font-bold text-slate-700">{MOCK_COMPANIES[0].name}</span>
        </div>

        <div className="absolute bottom-1/3 right-1/3 bg-white p-2 rounded-lg shadow-lg flex items-center gap-2 transform hover:scale-110 transition-transform cursor-pointer">
          <img src={MOCK_COMPANIES[1].logo} className="w-6 h-6 rounded-full" />
          <span className="text-xs font-bold text-slate-700">{MOCK_COMPANIES[1].name}</span>
        </div>
        
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-xs font-medium text-slate-600 shadow-sm">
          Map view interactive mock
        </div>
      </div>
    </div>
  );
};
