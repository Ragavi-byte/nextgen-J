import { UserProfile, CareerRoadmap, SalaryInsight, ReputationAnalysis, SkillQuestion } from "../types";

// --- API SERVICE LAYER ---
// architecture: Frontend -> API Client -> [Simulated Backend]
// This service handles all data exchanges with the backend system.
// Currently configured to use a mock implementation for the resume portfolio demo.

const API_BASE_URL = "https://api.nextgen-connect.internal/v1";

/**
 * Simulates a network request to a backend service with realistic latency.
 * This mimics the behavior of an asynchronous fetch/axios call in a production environment.
 */
const simulateNetworkRequest = async (method: string, endpoint: string, payload?: any) => {
  console.log(`[API Client] ${method} ${API_BASE_URL}${endpoint}`, payload ? payload : '');
  
  // Simulate network latency (jitter between 400ms - 1200ms)
  const latency = Math.floor(Math.random() * 800) + 400;
  await new Promise(resolve => setTimeout(resolve, latency));
  
  console.log(`[API Client] 200 OK ${endpoint} - ${latency}ms`);
};

// --- MOCK DATA FACTORIES ---

const getFormattedResume = (notes: string) => {
  return `## Professional Profile
Results-driven software engineer with a strong foundation in full-stack development and system architecture. Proven ability to translate complex business requirements into scalable technical solutions.

## Core Competencies
- **Backend Development:** Java, Spring Boot, NodeJS, PostgreSQL
- **Frontend Engineering:** React, TypeScript, TailwindCSS, Next.js
- **DevOps & Tools:** Docker, Kubernetes, AWS, CI/CD Pipelines

## Professional Experience

**Senior Software Engineer | TechFlow Systems**
*2022 - Present*
- Architected and implemented a high-throughput payment processing service using Java Spring Boot.
- Reduced API latency by 40% through aggressive caching strategies (Redis) and query optimization.
- Mentored junior developers and established code quality standards for the team.

**Full Stack Developer | StartupInc**
*2020 - 2022*
- Developed responsive user interfaces for a SaaS platform using React and Redux.
- Integrated third-party REST APIs for payment gateways and user authentication.
- Collaborated with product managers to define roadmap features and sprint deliverables.

## Education
**B.S. Computer Science**
University of Technology, 2019

## Additional Notes (Processed)
"${notes.substring(0, 150)}..."
`;
};

const getRoadmapData = (role: string): CareerRoadmap => ({
  targetRole: role || "Principal Software Architect",
  matchScore: 82,
  summary: "Our career engine has analyzed your profile against 50,000+ successful career trajectories. The data suggests a strong alignment with architecture roles. Key focus areas should be distributed systems and technical leadership.",
  skillGaps: [
    { skill: "System Design", priority: "High", reason: "Critical for architectural roles." },
    { skill: "Cloud Infrastructure", priority: "Medium", reason: "Required for modern scalability." },
    { skill: "Team Leadership", priority: "Low", reason: "Will develop with tenure." }
  ],
  milestones: [
    { title: "Lead a Major Migration", duration: "6 months", description: "Transition a legacy monolith to a microservices architecture." },
    { title: "Technical Specifications", duration: "Ongoing", description: "Author RFCs for core platform initiatives." },
    { title: "Staff Engineering", duration: "2 years", description: "Achieve promotion to Staff level through impact." }
  ],
  learningPlan: [
    { title: "Advanced Distributed Systems", type: "Course", description: "Master CAP theorem, consistency models, and consensus algorithms." },
    { title: "AWS Certified Solutions Architect", type: "Certification", description: "Professional level validation of cloud skills." },
    { title: "Open Source Maintainer", type: "Project", description: "Contribute significantly to a widely used library." }
  ]
});

const getSalaryData = (role: string, location: string): SalaryInsight => ({
  role: role || "Senior Software Engineer",
  location: location || "San Francisco, CA",
  currency: "USD",
  ranges: {
    min: 150000,
    median: 195000,
    max: 245000
  },
  marketTrend: "Up",
  topPayingSkills: [
    { skill: "Distributed Systems", premium: "+18%" },
    { skill: "Rust", premium: "+15%" },
    { skill: "Kubernetes", premium: "+12%" }
  ],
  actionableTip: "Professionals in this bracket typically negotiate equity packages 20% higher than the baseline. Focus on total compensation."
});

// --- PUBLIC API METHODS ---

export const generateResumeFromNotes = async (notes: string): Promise<string> => {
  await simulateNetworkRequest('POST', '/resume/build', { notes });
  return getFormattedResume(notes);
};

export const generateSkillTest = async (skill: string): Promise<SkillQuestion[]> => {
  await simulateNetworkRequest('GET', `/assessments/generate?skill=${skill}`);
  
  // Return standardized assessment questions from the "database"
  return [
    {
      question: `Which design pattern is most appropriate for ${skill} when managing global state?`,
      options: ["Singleton Pattern", "Factory Pattern", "Observer Pattern", "Decorator Pattern"],
      correctIndex: 0,
      explanation: "The Singleton pattern ensures a class has only one instance and provides a global point of access to it."
    },
    {
      question: "What is the primary purpose of a RESTful API?",
      options: ["To force strict XML formatting", "To provide a stateless, cacheable communication protocol", "To maintain a persistent connection", "To encrypt all database transactions"],
      correctIndex: 1,
      explanation: "REST represents state via resources and relies on a stateless, client-server, cacheable communications protocol."
    },
    {
      question: "In Big O notation, what represents constant time complexity?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
      correctIndex: 2,
      explanation: "O(1) denotes that the algorithm takes the same amount of time to execute regardless of the input size."
    },
    {
      question: "What is the key difference between TCP and UDP?",
      options: ["TCP is connection-oriented and reliable; UDP is connectionless and faster.", "UDP is reliable; TCP is faster.", "They are identical protocols.", "TCP is only for web traffic; UDP is for emails."],
      correctIndex: 0,
      explanation: "TCP guarantees delivery and order of packets, whereas UDP sends packets without establishing a connection, prioritizing speed."
    }
  ];
};

export const generateCareerRoadmap = async (profile: UserProfile, targetRole?: string): Promise<CareerRoadmap | null> => {
  await simulateNetworkRequest('POST', '/career/roadmap/analyze', { profileId: 'u_123', target: targetRole });
  return getRoadmapData(targetRole || "Principal Engineer");
};

export const generateSalaryInsights = async (role: string, location: string): Promise<SalaryInsight | null> => {
  await simulateNetworkRequest('GET', `/market/salary?role=${role}&loc=${location}`);
  return getSalaryData(role, location);
};

export const generateReputationAnalysis = async (profile: UserProfile): Promise<ReputationAnalysis | null> => {
  await simulateNetworkRequest('POST', '/reputation/calculate', { profileId: 'u_123' });
  return {
    score: 842,
    level: "Expert",
    percentile: 94,
    dimensions: [
      { name: "Code Quality", score: 92, description: "Static analysis indicates high adherence to SOLID principles." },
      { name: "Velocity", score: 88, description: "Consistent sprint completion rate above 95%." },
      { name: "Collaboration", score: 85, description: "Positive peer feedback in 360 reviews." }
    ],
    summary: "Your professional index indicates a high-performing engineer. The system highlights your consistency in code quality and delivery speed as key differentiators."
  };
};