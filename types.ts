
export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  salary: string;
  description: string;
  skills: string[];
  postedAt: string;
  type: 'Full-time' | 'Contract' | 'Remote';
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  distance: string;
  logo: string;
  openRoles: number;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  expertise: string[];
  hourlyRate: string;
}

export interface UserProfile {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  experience: string[];
  projects: string[];
  reputationScore: number;
}

export interface PaidProject {
  id: string;
  title: string;
  company: string;
  description: string;
  budget: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  skills: string[];
  estimatedTime: string;
  deliverables: string[];
  logo: string;
}

export interface CareerRoadmap {
  targetRole: string;
  matchScore: number;
  summary: string;
  skillGaps: {
    skill: string;
    priority: 'High' | 'Medium' | 'Low';
    reason: string;
  }[];
  milestones: {
    title: string;
    duration: string;
    description: string;
  }[];
  learningPlan: {
    title: string;
    type: 'Course' | 'Project' | 'Certification';
    description: string;
  }[];
}

export interface SalaryInsight {
  role: string;
  location: string;
  currency: string;
  ranges: {
    min: number;
    median: number;
    max: number;
  };
  marketTrend: 'Up' | 'Stable' | 'Down';
  topPayingSkills: { skill: string; premium: string }[];
  actionableTip: string;
}

export interface ReputationAnalysis {
  score: number;
  level: string;
  percentile: number;
  dimensions: {
    name: string;
    score: number; // 0-100
    description: string;
  }[];
  summary: string;
}

export interface SkillQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type ViewState = 
  | 'login' 
  | 'feed' 
  | 'jobs-near-me' 
  | 'resume-builder' 
  | 'profile' 
  | 'exclusive' 
  | 'anonymous-matching' 
  | 'skill-verification' 
  | 'paid-projects' 
  | 'career-pathing'
  | 'salary-insights'
  | 'private-reputation';