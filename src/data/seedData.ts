import { EvaluationParameter, Judge, ProblemStatement, Team, Evaluation, EventConfig } from '../types';

export const DEFAULT_PARAMETERS: EvaluationParameter[] = [
  {
    id: 'creativity',
    name: 'Creativity',
    maxScore: 5,
    description: 'Originality of thought, creative problem-framing, and uniqueness of solution.'
  },
  {
    id: 'technicalImplementation',
    name: 'Technical Implementation',
    maxScore: 5,
    description: 'Code quality, architectural soundness, effective tech choices, and working prototype completeness.'
  },
  {
    id: 'innovation',
    name: 'Innovation',
    maxScore: 5,
    description: 'Novel technological approach, intellectual property potential, or breakout domain advantage.'
  },
  {
    id: 'feasibility',
    name: 'Feasibility',
    maxScore: 5,
    description: 'Real-world viability, scalability, business sustainability, and implementation readiness.'
  },
  {
    id: 'presentation',
    name: 'Presentation & Impact',
    maxScore: 5,
    description: 'Clarity of pitch, demo execution, user empathy, and measurable social or market impact.'
  }
];

export const INITIAL_JUDGES: Judge[] = [
  {
    id: 'judge-1',
    name: 'Judge 1',
    title: 'Dr. Aris Thorne',
    expertise: 'AI Systems Architect & Research Director',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'judge-2',
    name: 'Judge 2',
    title: 'Maya Patel',
    expertise: 'VP of Product Design & Human-Centered AI',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'judge-3',
    name: 'Judge 3',
    title: 'Elena Rostova',
    expertise: 'Distributed Cloud & Zero-Trust Security Fellow',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'judge-4',
    name: 'Judge 4',
    title: 'Marcus Vance',
    expertise: 'FinTech Principal & Web3 Infrastructure Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'judge-5',
    name: 'Judge 5',
    title: 'Sofia Chen',
    expertise: 'Embedded IoT & Autonomous Robotics Lead',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'judge-6',
    name: 'Judge 6',
    title: 'David Al-Khatib',
    expertise: 'Data Engineering & Real-Time MLOps Lead',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'judge-7',
    name: 'Judge 7',
    title: 'Rachel Green',
    expertise: 'Full-Stack Principal & Developer Ecosystems Lead',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'judge-8',
    name: 'Judge 8',
    title: 'Nathan Ross',
    expertise: 'HealthTech Venture Partner & Biomedical Engineer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_PROBLEM_STATEMENTS: ProblemStatement[] = [
  {
    id: 'PS-01',
    code: 'PS-01',
    title: 'Multimodal Misinformation Verification',
    category: 'Media & Information Integrity',
    description: 'AI-powered detection, verification, and cross-source fact-checking system for synthetic media, deepfakes, and manipulated multimodal information.',
    teamIds: ['team-01', 'team-02'],
    lab: 'Lab 414'
  },
  {
    id: 'PS-02',
    code: 'PS-02',
    title: 'Early Identification of Student Academic Risk',
    category: 'Education & Learning Analytics',
    description: 'Predictive early-warning modeling and proactive intervention system identifying at-risk students before disengagement occurs.',
    teamIds: ['team-03', 'team-04'],
    lab: 'Lab 414'
  },
  {
    id: 'PS-03',
    code: 'PS-03',
    title: 'Emergency Healthcare Capacity Coordination',
    category: 'Healthcare & Emergency Response',
    description: 'Dynamic hospital and ICU bed coordination system optimizing patient flow and critical resource routing during surge crises.',
    teamIds: ['team-05', 'team-06'],
    lab: 'Lab 414'
  },
  {
    id: 'PS-04',
    code: 'PS-04',
    title: 'Dynamic Disaster Resource Allocation',
    category: 'Disaster Management & Logistics',
    description: 'Real-time routing, supply matching, and inventory allocation network for first responders and disaster management agencies.',
    teamIds: ['team-07', 'team-08'],
    lab: 'Lab 414'
  },
  {
    id: 'PS-05',
    code: 'PS-05',
    title: 'Student Learning Gap Mapping',
    category: 'Adaptive Learning & EdTech',
    description: 'Diagnostic knowledge graph mapping conceptual deficits and generating personalized mastery pathways for students.',
    teamIds: ['team-09', 'team-10'],
    lab: 'Lab 413'
  },
  {
    id: 'PS-06',
    code: 'PS-06',
    title: 'Unified Civic Issue Management',
    category: 'Smart Cities & Civic Tech',
    description: 'Automated citizen grievance triage, deduplication, municipal routing, and resolution transparency platform.',
    teamIds: ['team-11', 'team-12'],
    lab: 'Lab 413'
  },
  {
    id: 'PS-07',
    code: 'PS-07',
    title: 'Personalized Environmental Impact Reduction',
    category: 'Sustainability & Climate Tech',
    description: 'Behavioral carbon accounting, smart consumption auditing, and gamified eco-habit recommendations for individuals and businesses.',
    teamIds: ['team-13', 'team-14'],
    lab: 'Lab 413'
  },
  {
    id: 'PS-08',
    code: 'PS-08',
    title: 'Emergency Blood Donor Coordination',
    category: 'Life Support & Urgent Healthcare',
    description: 'Geo-fenced real-time donor matching, rare blood type mobilization, and cold-chain inventory monitoring during critical emergencies.',
    teamIds: ['team-15', 'team-16'],
    lab: 'Lab 413'
  },
  {
    id: 'PS-09',
    code: 'PS-09',
    title: 'Personalized Nutrition Planning Under Real-World Constraints',
    category: 'Health & Nutrition AI',
    description: 'Constraint-aware algorithmic dietary optimizer balancing budget, cultural food choices, local ingredient availability, and medical conditions.',
    teamIds: ['team-17', 'team-18'],
    lab: 'Lab 412'
  },
  {
    id: 'PS-10',
    code: 'PS-10',
    title: 'Real-Time Digital Payment Fraud Detection',
    category: 'Fintech & Cybersecurity',
    description: 'Low-latency behavioral anomaly detection, synthetic identity fraud screening, and graph-based money-mule tracking for instant payment rails.',
    teamIds: ['team-19', 'team-20'],
    lab: 'Lab 412'
  },
  {
    id: 'PS-11',
    code: 'PS-11',
    title: 'Women\'s Safety and Support Access',
    category: 'Public Safety & Social Impact',
    description: 'Discreet situational awareness, emergency SOS dispatch, verified safe-route navigation, and trauma-informed legal and psychological support network.',
    teamIds: ['team-21', 'team-22'],
    lab: 'Lab 412'
  },
  {
    id: 'PS-12',
    code: 'PS-12',
    title: 'Accessible Navigation of Government Services',
    category: 'GovTech & Citizen Access',
    description: 'Multilingual, voice-first AI assistant demystifying citizen eligibility, automating bureaucratic forms, and navigating public welfare schemes.',
    teamIds: ['team-23', 'team-24'],
    lab: 'Lab 412'
  },
  {
    id: 'PS-13',
    code: 'PS-13',
    title: 'Missing Person Identification and Matching',
    category: 'Public Welfare & Computer Vision',
    description: 'Facial recognition with age progression, cross-shelter database harmonization, and crowd-sourced tip verification for missing person tracing.',
    teamIds: ['team-25', 'team-26'],
    lab: 'Lab 411'
  },
  {
    id: 'PS-14',
    code: 'PS-14',
    title: 'Counterfeit Product Detection',
    category: 'Supply Chain & Anti-Counterfeiting',
    description: 'Micro-texture visual analysis, tamper-evident cryptographic QR verification, and supply chain provenance tracking against fake goods.',
    teamIds: ['team-27', 'team-28'],
    lab: 'Lab 411'
  },
  {
    id: 'PS-15',
    code: 'PS-15',
    title: 'Dynamic Food Surplus Redistribution',
    category: 'Food Security & Logistics',
    description: 'Hyperlocal perishable food matching between restaurants, event venues, and community food banks with dynamic route-optimization and expiry tracking.',
    teamIds: ['team-29', 'team-30'],
    lab: 'Lab 411'
  }
];

export const INITIAL_TEAMS: Team[] = [
  // PS-01 (Lab 414)
  {
    id: 'team-01',
    teamNumber: 1,
    teamName: 'Sike-Nova',
    problemStatementId: 'PS-01',
    projectTitle: 'Multimodal Misinformation Verification Engine',
    description: 'Deepfake detection, claim provenance tracking, and cross-modal audio-visual tampering verification.',
    members: ['Alex Rivera', 'Priya Sharma', 'Chen Wei'],
    techStack: ['Python', 'Vision Transformers', 'FastAPI', 'Next.js'],
    lab: 'Lab 414',
    teamRole: 'Team A'
  },
  {
    id: 'team-02',
    teamNumber: 2,
    teamName: 'GoAutomata',
    problemStatementId: 'PS-01',
    projectTitle: 'Automated Fact-Checking & Credibility Mesh',
    description: 'Synthetic artifact analysis, contextual claim triangulation, and automated veracity scoring.',
    members: ['Liam O\'Connor', 'Fatima Zahra', 'Kenji Sato'],
    techStack: ['PyTorch', 'CLIP', 'gRPC', 'React'],
    lab: 'Lab 414',
    teamRole: 'Team B'
  },

  // PS-02 (Lab 414)
  {
    id: 'team-03',
    teamNumber: 3,
    teamName: 'Code buddies',
    problemStatementId: 'PS-02',
    projectTitle: 'Academic Risk Sentinel & Early Support',
    description: 'Predictive dropout modeling, formative assessment tracking, and personalized intervention workflows.',
    members: ['Carlos Mendez', 'Aisha Bello', 'Lucas Meyer'],
    techStack: ['Scikit-learn', 'XGBoost', 'Express', 'Tailwind'],
    lab: 'Lab 414',
    teamRole: 'Team A'
  },
  {
    id: 'team-04',
    teamNumber: 4,
    teamName: 'B1 Elite',
    problemStatementId: 'PS-02',
    projectTitle: 'Student Success Predictive Analytics Platform',
    description: 'Early academic trajectory modeling, engagement radar, and student advisor collaborative dashboards.',
    members: ['Sophia Taylor', 'Dmitri Volkov', 'Ananya Roy'],
    techStack: ['TensorFlow', 'PostgreSQL', 'Python', 'Vue.js'],
    lab: 'Lab 414',
    teamRole: 'Team B'
  },

  // PS-03 (Lab 414)
  {
    id: 'team-05',
    teamNumber: 5,
    teamName: 'Elitecoders',
    problemStatementId: 'PS-03',
    projectTitle: 'Critical Care ICU & Bed Coordination Grid',
    description: 'Real-time multi-hospital surge telemetry, bed status dispatch, and emergency transfer routing.',
    members: ['Omar Farooq', 'Elena Gomez', 'Jin Woo'],
    techStack: ['HL7 FHIR', 'Node.js', 'Redis', 'WebSockets'],
    lab: 'Lab 414',
    teamRole: 'Team A'
  },
  {
    id: 'team-06',
    teamNumber: 6,
    teamName: 'DevGuruZ',
    problemStatementId: 'PS-03',
    projectTitle: 'Emergency Capacity Allocation Hub',
    description: 'Autonomous patient triage prioritization, ventilator availability tracking, and inter-facility coordination.',
    members: ['Chloe Dupont', 'Tariq Mansour', 'Nia Williams'],
    techStack: ['Go', 'FHIR API', 'PostGIS', 'React'],
    lab: 'Lab 414',
    teamRole: 'Team B'
  },

  // PS-04 (Lab 414)
  {
    id: 'team-07',
    teamNumber: 7,
    teamName: 'Thirdwave',
    problemStatementId: 'PS-04',
    projectTitle: 'Dynamic Disaster Relief Supply Logistics',
    description: 'First-responder supply allocation, bottleneck prediction, and multimodal relief convoy routing.',
    members: ['Noah Becker', 'Zara Qureshi', 'Mateo Silva'],
    techStack: ['Python', 'OpenStreetMap', 'FastAPI', 'Leaflet'],
    lab: 'Lab 414',
    teamRole: 'Team A'
  },
  {
    id: 'team-08',
    teamNumber: 8,
    teamName: 'A2I',
    problemStatementId: 'PS-04',
    projectTitle: 'Disaster Incident & Asset Allocation Network',
    description: 'Satellite damage overlay matching, inventory depletion forecasting, and rescue team equipment distribution.',
    members: ['Grace Hopper', 'Alan Turing', 'Ada Lovelace'],
    techStack: ['GeoPandas', 'Rust', 'GraphQL', 'TypeScript'],
    lab: 'Lab 414',
    teamRole: 'Team B'
  },

  // PS-05 (Lab 413)
  {
    id: 'team-09',
    teamNumber: 9,
    teamName: 'The triforce',
    problemStatementId: 'PS-05',
    projectTitle: 'Cognitive Knowledge Gap Diagnostic Graph',
    description: 'Subject prerequisite dependency mapping, misconception pinpointing, and remediation roadmaps.',
    members: ['Leo Vance', 'Kavita Joshi', 'Felix Novak'],
    techStack: ['Neo4j', 'FastAPI', 'D3.js', 'Next.js'],
    lab: 'Lab 413',
    teamRole: 'Team A'
  },
  {
    id: 'team-10',
    teamNumber: 10,
    teamName: 'TEAM SUPERNOVA',
    problemStatementId: 'PS-05',
    projectTitle: 'Supernova Adaptive Learning & Gap Navigator',
    description: 'Dynamic concept mastery tracking, continuous diagnostic quizzes, and targeted micro-learning units.',
    members: ['Hana Tanaka', 'Marcus Brody', 'Rina Das'],
    techStack: ['Python', 'Knowledge Tracing', 'React', 'Tailwind'],
    lab: 'Lab 413',
    teamRole: 'Team B'
  },

  // PS-06 (Lab 413)
  {
    id: 'team-11',
    teamNumber: 11,
    teamName: 'RoboNova',
    problemStatementId: 'PS-06',
    projectTitle: 'Unified Municipal Civic Issue Dispatch',
    description: 'Automated civic ticket categorization, duplicate clustering, geospatial heatmaps, and resolution auditing.',
    members: ['Benjamin Scott', 'Mira Nair', 'Julian Ortiz'],
    techStack: ['NLP Classification', 'PostGIS', 'Node.js', 'Mapbox'],
    lab: 'Lab 413',
    teamRole: 'Team A'
  },
  {
    id: 'team-12',
    teamNumber: 12,
    teamName: 'Team X',
    problemStatementId: 'PS-06',
    projectTitle: 'CivicX Smart Citizen Grievance Portal',
    description: 'Citizen photo grievance submission, Department SLA tracking, and public civic accountability boards.',
    members: ['Oscar Wilde', 'Samira Khan', 'Viktor Hansen'],
    techStack: ['Next.js', 'Python', 'FastAPI', 'TailwindCSS'],
    lab: 'Lab 413',
    teamRole: 'Team B'
  },

  // PS-07 (Lab 413)
  {
    id: 'team-13',
    teamNumber: 13,
    teamName: 'UltimateBuilders',
    problemStatementId: 'PS-07',
    projectTitle: 'EcoImpact Personal Carbon Accounting',
    description: 'Automated receipt-based carbon auditing, sustainable commute gamification, and domestic energy optimization.',
    members: ['Ethan Hall', 'Leila Mahmoud', 'Gabriel Rossi'],
    techStack: ['Plaid API', 'Python', 'React Native', 'Firebase'],
    lab: 'Lab 413',
    teamRole: 'Team A'
  },
  {
    id: 'team-14',
    teamNumber: 14,
    teamName: 'Dynamic Duo',
    problemStatementId: 'PS-07',
    projectTitle: 'Dynamic Climate Action & Habit Assistant',
    description: 'Smart consumer habit nudges, low-carbon alternative recommendations, and localized green incentives.',
    members: ['Maya Lin', 'Arthur Pendelton'],
    techStack: ['FastAPI', 'TypeScript', 'Tailwind', 'Chart.js'],
    lab: 'Lab 413',
    teamRole: 'Team B'
  },

  // PS-08 (Lab 413)
  {
    id: 'team-15',
    teamNumber: 15,
    teamName: 'The Unbothered 3',
    problemStatementId: 'PS-08',
    projectTitle: 'Emergency Blood Donor Geo-Coordination',
    description: 'Low-latency proximity donor notifications, rare blood inventory alerts, and recipient verification.',
    members: ['Brandon Lee', 'Zoya Akhtar', 'Elijah Ward'],
    techStack: ['WebSockets', 'Go', 'Redis Geospatial', 'React'],
    lab: 'Lab 413',
    teamRole: 'Team A'
  },
  {
    id: 'team-16',
    teamNumber: 16,
    teamName: 'Team 404: Brains Not Found',
    problemStatementId: 'PS-08',
    projectTitle: 'LifeLink Blood Donor Network & Cold-Chain',
    description: 'Hospital blood bank integration, donor eligibility tracking, and emergency courier coordination.',
    members: ['Devon Clark', 'Amina Idris', 'Sora Takahashi'],
    techStack: ['Node.js', 'Express', 'Twilio API', 'React'],
    lab: 'Lab 413',
    teamRole: 'Team B'
  },

  // PS-09 (Lab 412)
  {
    id: 'team-17',
    teamNumber: 17,
    teamName: 'AlphaQ',
    problemStatementId: 'PS-09',
    projectTitle: 'Constraint-Aware Algorithmic Diet Planner',
    description: 'Linear programming diet optimization accounting for budget limits, allergies, cultural preferences, and seasonal grocery pricing.',
    members: ['Quinn Roberts', 'Aditi Rao', 'Patrick Murphy'],
    techStack: ['Python', 'SciPy Optimization', 'FastAPI', 'Next.js'],
    lab: 'Lab 412',
    teamRole: 'Team A'
  },
  {
    id: 'team-18',
    teamNumber: 18,
    teamName: 'Team GENZ',
    problemStatementId: 'PS-09',
    projectTitle: 'GEN-Z Budget & Nutrition Optimizer',
    description: 'Student and budget-friendly meal preparation optimizer, grocery basket matching, and nutrient bioavailability tracking.',
    members: ['Jordan Hayes', 'Sana Mir', 'Dante Alighieri'],
    techStack: ['Node.js', 'USDA FoodData', 'Vue', 'Tailwind'],
    lab: 'Lab 412',
    teamRole: 'Team B'
  },

  // PS-10 (Lab 412)
  {
    id: 'team-19',
    teamNumber: 19,
    teamName: 'ZephyrWin',
    problemStatementId: 'PS-10',
    projectTitle: 'Real-Time Payment Anomaly & Fraud Sentinel',
    description: 'Sub-50ms transaction fraud scoring, synthetic identity detection, and velocity-rule engine for digital wallets.',
    members: ['Victor Vance', 'Mei-Ling Zhou', 'Aaron Carter'],
    techStack: ['Rust', 'Apache Kafka', 'Graph Neural Networks', 'React'],
    lab: 'Lab 412',
    teamRole: 'Team A'
  },
  {
    id: 'team-20',
    teamNumber: 20,
    teamName: 'Bug-A-Boo',
    problemStatementId: 'PS-10',
    projectTitle: 'Money-Mule Graph Defense & Payment Shield',
    description: 'Graph-based money-mule circle detection, device fingerprinting, and behavioral transaction analysis.',
    members: ['Brooke Watson', 'Farhan Ali', 'Sergei Popov'],
    techStack: ['Python', 'NetworkX', 'FastAPI', 'Chart.js'],
    lab: 'Lab 412',
    teamRole: 'Team B'
  },

  // PS-11 (Lab 412)
  {
    id: 'team-21',
    teamNumber: 21,
    teamName: 'CodeInvictus',
    problemStatementId: 'PS-11',
    projectTitle: 'SafeShield Women\'s Crisis & SOS Mesh',
    description: 'Discreet gesture SOS, safe transit routing through lighted streets, verified community safe-havens, and legal support directory.',
    members: ['Nadia Petrova', 'Devansh Mehta', 'Clara Schumann'],
    techStack: ['WebRTC', 'React Native', 'Node.js', 'OpenStreetMap'],
    lab: 'Lab 412',
    teamRole: 'Team A'
  },
  {
    id: 'team-22',
    teamNumber: 22,
    teamName: 'Code & Chaos',
    problemStatementId: 'PS-11',
    projectTitle: 'EmpowerSafe Incident & Safety Companion',
    description: 'Automated guardian check-ins, offline panic sirens, safe taxi route monitoring, and crisis counselor helpline integration.',
    members: ['Rachel Adams', 'Tariq Siddiqui', 'Oliver Queen'],
    techStack: ['Flutter', 'Firebase', 'Google Maps API', 'TypeScript'],
    lab: 'Lab 412',
    teamRole: 'Team B'
  },

  // PS-12 (Lab 412)
  {
    id: 'team-23',
    teamNumber: 23,
    teamName: 'LLM - Lazy Learner Men',
    problemStatementId: 'PS-12',
    projectTitle: 'Multilingual Public Services Navigator',
    description: 'Voice-driven citizen assistance, eligibility auto-checking for welfare programs, and simplified application form submission.',
    members: ['Harish Kumar', 'Manish Gupta', 'Rohan Verma'],
    techStack: ['Whisper AI', 'RAG LLM', 'FastAPI', 'Tailwind'],
    lab: 'Lab 412',
    teamRole: 'Team A'
  },
  {
    id: 'team-24',
    teamNumber: 24,
    teamName: 'Code_Masters',
    problemStatementId: 'PS-12',
    projectTitle: 'GovEase Bureaucratic Copilot',
    description: 'Document extraction, citizen grievance redressal roadmap, and interactive eligibility checklist for government subsidies.',
    members: ['Simon Fraser', 'Deepa Nair', 'George Washington'],
    techStack: ['OCR Tesseract', 'Python', 'React', 'PostgreSQL'],
    lab: 'Lab 412',
    teamRole: 'Team B'
  },

  // PS-13 (Lab 411)
  {
    id: 'team-25',
    teamNumber: 25,
    teamName: 'TRINOVA',
    problemStatementId: 'PS-13',
    projectTitle: 'ReuniteAI Missing Persons Facial Search',
    description: 'Age-progressed facial recognition, shelter intake database cross-matching, and verified public tip submission.',
    members: ['Maya Angelou', 'Karthik Raja', 'Tobias Wolff'],
    techStack: ['InsightFace', 'PyTorch', 'FastAPI', 'React'],
    lab: 'Lab 411',
    teamRole: 'Team A'
  },
  {
    id: 'team-26',
    teamNumber: 26,
    teamName: 'Byte Breakers',
    problemStatementId: 'PS-13',
    projectTitle: 'Missing Child & Adult Identification Grid',
    description: 'Multi-camera matching, demographic similarity search, and coordinated search-and-rescue dispatch portal.',
    members: ['Nate Diaz', 'Sonia Gandhi', 'Conor McGregor'],
    techStack: ['OpenCV', 'FaceNet', 'Node.js', 'TailwindCSS'],
    lab: 'Lab 411',
    teamRole: 'Team B'
  },

  // PS-14 (Lab 411)
  {
    id: 'team-27',
    teamNumber: 27,
    teamName: 'Delta Duo',
    problemStatementId: 'PS-14',
    projectTitle: 'AuthentiScan Physical Anti-Counterfeit Verifier',
    description: 'Micro-packaging texture analysis, tamper-proof cryptographic QR certificates, and retail product validation.',
    members: ['Luke Skywalker', 'Leia Organa'],
    techStack: ['Computer Vision', 'Solidity', 'FastAPI', 'React'],
    lab: 'Lab 411',
    teamRole: 'Team A'
  },
  {
    id: 'team-28',
    teamNumber: 28,
    teamName: 'Hawkeye',
    problemStatementId: 'PS-14',
    projectTitle: 'Hawkeye Supply Chain Brand Protection',
    description: 'E-commerce listing scraping, physical barcode tamper detection, and pharmaceutical provenance tracking.',
    members: ['Clint Barton', 'Natasha Romanoff', 'Steve Rogers'],
    techStack: ['Python Scrapy', 'YOLOv8', 'TypeScript', 'Tailwind'],
    lab: 'Lab 411',
    teamRole: 'Team B'
  },

  // PS-15 (Lab 411)
  {
    id: 'team-29',
    teamNumber: 29,
    teamName: 'Team VibeCoders',
    problemStatementId: 'PS-15',
    projectTitle: 'FeedForward Surplus Food Logistics',
    description: 'Automated donor-to-pantry matching based on shelf-life, food safety temperature logging, and optimized driver pickup routes.',
    members: ['Ashwin Sundaram', 'Pooja Hegde', 'Nikhil Chinapa'],
    techStack: ['Google Maps Routing', 'Express', 'React', 'Tailwind'],
    lab: 'Lab 411',
    teamRole: 'Team A'
  },
  {
    id: 'team-30',
    teamNumber: 30,
    teamName: 'Tech Titans',
    problemStatementId: 'PS-15',
    projectTitle: 'ZeroWaste Dynamic Surplus Redistribution',
    description: 'Commercial kitchen surplus posting, automated non-profit matching, and real-time meal rescue impact metrics.',
    members: ['Bruce Wayne', 'Diana Prince', 'Clark Kent'],
    techStack: ['FastAPI', 'PostGIS', 'Vue.js', 'Chart.js'],
    lab: 'Lab 411',
    teamRole: 'Team B'
  }
];

export const INITIAL_EVENT_CONFIG: EventConfig = {
  eventName: 'BvB Evaluation // Build vs Break',
  minRequiredJudges: 3,
  evaluationLockMode: 'strict',
  showIncompleteTeams: true,
  parameters: DEFAULT_PARAMETERS
};

export const SEED_DEMO_EVALUATIONS: Evaluation[] = [];
