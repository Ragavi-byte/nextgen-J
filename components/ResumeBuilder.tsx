import React, { useState } from 'react';
import { Wand2, Download, Copy, AlertCircle, FileText, Server } from 'lucide-react';
import { generateResumeFromNotes } from '../services/aiServices';

export const ResumeBuilder: React.FC = () => {
  const [notes, setNotes] = useState('');
  const [generatedResume, setGeneratedResume] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!notes.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    try {
      const result = await generateResumeFromNotes(notes);
      setGeneratedResume(result);
    } catch (err) {
      setError("Failed to generate resume. Backend service unavailable.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Wand2 className="text-blue-600" />
          Smart Resume Generator
        </h2>
        <p className="text-slate-600 mt-2">
          Describe your experience, projects, and skills loosely below. Our system will format it into a professional resume using industry standard templates.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="flex flex-col gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Your Notes & Experience
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Worked at TechCorp for 2 years as a dev. Built a React dashboard that increased sales by 20%. Used TypeScript, Redux..."
              className="w-full h-64 p-3 text-sm text-slate-800 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none bg-slate-50 placeholder:text-slate-400"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !notes.trim()}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-all ${
                  isGenerating || !notes.trim()
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Server size={16} />
                    Generate Resume
                  </>
                )}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-[600px] overflow-y-auto relative">
          {generatedResume ? (
            <>
              <div className="absolute top-4 right-4 flex gap-2">
                 <button 
                   className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                   title="Copy to Clipboard"
                   onClick={() => navigator.clipboard.writeText(generatedResume)}
                 >
                   <Copy size={18} />
                 </button>
              </div>
              <div className="prose prose-sm prose-slate max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 leading-relaxed">
                  {generatedResume}
                </pre>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center px-6">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <FileText size={32} className="text-slate-300" />
              </div>
              <p className="text-sm font-medium">Your generated resume will appear here</p>
              <p className="text-xs mt-1">Ready to be copied or exported</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
