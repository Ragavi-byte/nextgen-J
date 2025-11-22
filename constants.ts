
import { Job, Company, Mentor, PaidProject, UserProfile } from './types';

export const MOCK_PROFILE: UserProfile = {
  name: 'Alex Morgan',
  title: 'Full Stack Developer',
  bio: 'Passionate about building scalable web applications and intuitive user experiences. Specializing in React and Node.js ecosystems.',
  skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL', 'Tailwind CSS'],
  experience: ['Senior Dev at TechCorp', 'Frontend Lead at StartupX'],
  projects: ['E-commerce Dashboard', 'Real-time Chat App', 'AI Content Generator'],
  reputationScore: 850
};

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'TechFlow Systems',
    logo: 'https://picsum.photos/seed/techflow/100/100',
    location: 'San Francisco, CA (Hybrid)',
    salary: '$140k - $180k',
    description: 'We are looking for a React expert to lead our core product team. You will be responsible for architectural decisions and mentoring junior developers.',
    skills: ['React', 'TypeScript', 'Tailwind', 'GraphQL'],
    postedAt: '2h ago',
    type: 'Full-time'
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Creative Pulse',
    logo: 'https://picsum.photos/seed/creative/100/100',
    location: 'Remote',
    salary: '$110k - $150k',
    description: 'Join our design team to shape the future of digital creativity. Experience with Figma and design systems is a must.',
    skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
    postedAt: '5h ago',
    type: 'Remote'
  },
  {
    id: '3',
    title: 'AI Research Scientist',
    company: 'Nebula AI',
    logo: 'https://picsum.photos/seed/nebula/100/100',
    location: 'New York, NY',
    salary: '$200k - $280k',
    description: 'Push the boundaries of Generative AI. Working on LLM optimization and multimodal models.',
    skills: ['Python', 'PyTorch', 'Machine Learning', 'NLP'],
    postedAt: '1d ago',
    type: 'Full-time'
  },
  {
    id: '4',
    title: 'Full Stack Developer',
    company: 'Growth Rocket',
    logo: 'https://picsum.photos/seed/growth/100/100',
    location: 'Austin, TX',
    salary: '$120k - $160k',
    description: 'Build scalable web applications for high-growth startups. Node.js backend, React frontend.',
    skills: ['Node.js', 'React', 'PostgreSQL', 'AWS'],
    postedAt: '2d ago',
    type: 'Full-time'
  }
];

export const MOCK_COMPANIES: Company[] = [
  {
    id: 'c1',
    name: 'Apex Innovations',
    industry: 'FinTech',
    location: 'Downtown, 1.2 miles away',
    distance: '1.2 mi',
    logo: 'https://picsum.photos/seed/apex/100/100',
    openRoles: 12
  },
  {
    id: 'c2',
    name: 'GreenLeaf Energy',
    industry: 'CleanTech',
    location: 'Westside, 3.5 miles away',
    distance: '3.5 mi',
    logo: 'https://picsum.photos/seed/green/100/100',
    openRoles: 5
  },
  {
    id: 'c3',
    name: 'Urban Logistics',
    industry: 'Supply Chain',
    location: 'North Hills, 5.0 miles away',
    distance: '5.0 mi',
    logo: 'https://picsum.photos/seed/urban/100/100',
    openRoles: 8
  }
];

export const MOCK_MENTORS: Mentor[] = [
  {
    id: 'm1',
    name: 'Sarah Jenkins',
    role: 'Staff Engineer',
    company: 'Google',
    image: 'https://picsum.photos/seed/sarah/200/200',
    expertise: ['System Design', 'Career Growth'],
    hourlyRate: '$150/hr'
  },
  {
    id: 'm2',
    name: 'David Chen',
    role: 'VP of Product',
    company: 'Spotify',
    image: 'https://picsum.photos/seed/david/200/200',
    expertise: ['Product Strategy', 'Leadership'],
    hourlyRate: '$200/hr'
  }
];

export const MOCK_PROJECTS: PaidProject[] = [
  {
    id: 'p1',
    title: 'Refactor Auth Component',
    company: 'SecurePay Inc.',
    logo: 'https://picsum.photos/seed/securepay/100/100',
    description: 'We have a legacy class-based React auth component that needs to be converted to functional components with Hooks. Must support JWT handling.',
    budget: '$150',
    difficulty: 'Intermediate',
    skills: ['React', 'Hooks', 'TypeScript'],
    estimatedTime: '3-5 hours',
    deliverables: ['Source code PR', 'Unit tests coverage > 80%']
  },
  {
    id: 'p2',
    title: 'Design Mobile Login Flow',
    company: 'HealthTrack',
    logo: 'https://picsum.photos/seed/health/100/100',
    description: 'Create a high-fidelity Figma prototype for our new mobile app login and onboarding flow. Focus on accessibility and clean UI.',
    budget: '$300',
    difficulty: 'Intermediate',
    skills: ['Figma', 'UI/UX', 'Mobile Design'],
    estimatedTime: '6-8 hours',
    deliverables: ['Figma File', 'Interactive Prototype', 'Asset Export']
  },
  {
    id: 'p3',
    title: 'Fix CSV Parsing Bug',
    company: 'DataDash',
    logo: 'https://picsum.photos/seed/data/100/100',
    description: 'Our Node.js CSV parser fails when encountering specific UTF-8 characters in the header row. Debug the issue and provide a fix.',
    budget: '$75',
    difficulty: 'Beginner',
    skills: ['Node.js', 'Debugging', 'Data Parsing'],
    estimatedTime: '1-2 hours',
    deliverables: ['Patched Script', 'Reproduction Test Case']
  },
  {
    id: 'p4',
    title: 'Optimize Landing Page',
    company: 'SpeedySaaS',
    logo: 'https://picsum.photos/seed/speedy/100/100',
    description: 'Analyze our current landing page and implement performance optimizations to improve Core Web Vitals (LCP & CLS).',
    budget: '$500',
    difficulty: 'Advanced',
    skills: ['Performance', 'Next.js', 'CSS'],
    estimatedTime: '10-15 hours',
    deliverables: ['Optimized Codebase', 'Lighthouse Report > 95']
  }
];
