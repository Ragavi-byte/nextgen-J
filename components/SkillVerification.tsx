import React, { useState } from 'react';
import { ShieldCheck, Play, CheckCircle2, XCircle, AlertCircle, Loader2, Award, ChevronRight } from 'lucide-react';
import { generateSkillTest } from '../services/aiServices';
import { SkillQuestion } from '../types';

const POPULAR_SKILLS = [
  { id: 'react', name: 'React', icon: '⚛️', color: 'bg-blue-50 text-blue-600' },
  { id: 'python', name: 'Python', icon: '🐍', color: 'bg-yellow-50 text-yellow-600' },
  { id: 'uiux', name: 'UI/UX Design', icon: '🎨', color: 'bg-purple-50 text-purple-600' },
  { id: 'node', name: 'Node.js', icon: '🟢', color: 'bg-green-50 text-green-600' },
  { id: 'marketing', name: 'Digital Marketing', icon: '📈', color: 'bg-red-50 text-red-600' },
  { id: 'pm', name: 'Product Mgmt', icon: '📋', color: 'bg-slate-50 text-slate-600' },
];

export const SkillVerification: React.FC = () => {
  const [viewState, setViewState] = useState<'menu' | 'loading' | 'test' | 'results'>('menu');
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [questions, setQuestions] = useState<SkillQuestion[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  
  const startTest = async (skillName: string) => {
    setSelectedSkill(skillName);
    setViewState('loading');
    try {
      const generatedQuestions = await generateSkillTest(skillName);
      setQuestions(generatedQuestions);
      setCurrentQuestionIdx(0);
      setUserAnswers(new Array(generatedQuestions.length).fill(-1));
      setViewState('test');
    } catch (e) {
      console.error(e);
      setViewState('menu');
      alert("Failed to generate test. Please try again.");
    }
  };

  const handleAnswer = (optionIdx: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIdx] = optionIdx;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setViewState('results');
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (q.correctIndex === userAnswers[idx]) correct++;
    });
    return Math.round((correct / questions.length) * 100);
  };

  if (viewState === 'menu') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 text-emerald-600 rounded-xl mb-4">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Verify Your Skills</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Stand out to recruiters by proving what you know. Take a short, system-generated scenario test to earn a Verified Badge.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_SKILLS.map((skill) => (
            <div 
              key={skill.id}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group cursor-pointer"
              onClick={() => startTest(skill.name)}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4 ${skill.color}`}>
                {skill.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">{skill.name}</h3>
              <p className="text-xs text-slate-500 mb-4">Intermediate Level • ~5 mins</p>
              <button className="w-full py-2 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-lg group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-colors flex items-center justify-center gap-2">
                Start Test <Play size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-slate-50 border border-slate-200 rounded-xl p-6 flex items-start gap-4">
          <AlertCircle className="text-slate-400 flex-shrink-0" />
          <div>
             <h4 className="font-bold text-slate-800 text-sm">How it works</h4>
             <p className="text-slate-600 text-sm mt-1">
               Our engine generates unique, scenario-based questions every time from our verified database. No memorizing answers. 
               Pass with 70% or higher to get the badge. Tests are anonymous and unbiased.
             </p>
          </div>
        </div>
      </div>
    );
  }

  if (viewState === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <Loader2 className="text-emerald-600 animate-spin mb-4" size={48} />
        <h3 className="text-xl font-bold text-slate-900">Loading Assessment Module</h3>
        <p className="text-slate-500 mt-2">Retrieving unique scenarios for {selectedSkill}...</p>
      </div>
    );
  }

  if (viewState === 'test') {
    const question = questions[currentQuestionIdx];
    const isLastQuestion = currentQuestionIdx === questions.length - 1;
    const hasAnswered = userAnswers[currentQuestionIdx] !== -1;

    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="text-sm font-bold text-slate-500">
            Question {currentQuestionIdx + 1} of {questions.length}
          </div>
          <div className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            {selectedSkill} Assessment
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-2 mb-8">
          <div 
            className="bg-emerald-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6 leading-relaxed">
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                  userAnswers[currentQuestionIdx] === idx
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                    : 'border-slate-100 hover:border-emerald-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  userAnswers[currentQuestionIdx] === idx 
                    ? 'border-emerald-600' 
                    : 'border-slate-300'
                }`}>
                  {userAnswers[currentQuestionIdx] === idx && (
                    <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full" />
                  )}
                </div>
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={nextQuestion}
            disabled={!hasAnswered}
            className={`px-8 py-3 rounded-xl font-bold text-white transition-all flex items-center gap-2 ${
              hasAnswered
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl'
                : 'bg-slate-300 cursor-not-allowed'
            }`}
          >
            {isLastQuestion ? 'Submit Test' : 'Next Question'}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  if (viewState === 'results') {
    const score = calculateScore();
    const passed = score >= 70;

    return (
      <div className="max-w-2xl mx-auto text-center pt-10">
        <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6 ${
          passed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
        }`}>
          {passed ? <Award size={64} /> : <XCircle size={64} />}
        </div>

        <h2 className="text-4xl font-bold text-slate-900 mb-2">
          {passed ? 'Congratulations!' : 'Keep Practicing'}
        </h2>
        <p className="text-xl text-slate-600 mb-8">
          You scored <span className="font-bold text-slate-900">{score}%</span> on the {selectedSkill} assessment.
        </p>

        {passed ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-lg mb-2">
              <CheckCircle2 /> Badge Earned
            </div>
            <p className="text-emerald-700">
              Your "{selectedSkill} Verified" badge has been added to your anonymous profile. 
              Recruiters will now see this skill as verified.
            </p>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
            <p className="text-slate-600">
              You need 70% to earn the verification badge. Review the key concepts and try again in 24 hours.
            </p>
          </div>
        )}

        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setViewState('menu')}
            className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
          >
            Back to Skills
          </button>
          {passed && (
            <button 
              onClick={() => alert("Added to profile!")}
              className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-md"
            >
              View Profile
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
};