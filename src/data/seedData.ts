import { EvaluationParameter, Judge, ProblemStatement, Team, Evaluation, JudgeAssignment, EventConfig } from '../types';

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
    title: 'Autonomous Clinical Triage & Real-Time Bed Allocation',
    category: 'Healthcare & Life Sciences',
    description: 'Design an intelligent edge-computing system to prioritize emergency triage patients, predict bed occupancy spikes, and streamline medical resource routing.',
    teamIds: ['team-01', 'team-02']
  },
  {
    id: 'PS-02',
    code: 'PS-02',
    title: 'Decentralized Micro-Grid Energy Balancing & Carbon Trading',
    category: 'CleanTech & Energy',
    description: 'Develop a high-throughput peer-to-peer ledger allowing residential solar prosumers to automatically trade surplus watt-hours with verifiable zero carbon footprints.',
    teamIds: ['team-03', 'team-04']
  },
  {
    id: 'PS-03',
    code: 'PS-03',
    title: 'Zero-Latency Financial Fraud Shield with Graph Neural Networks',
    category: 'FinTech & Cybersecurity',
    description: 'Construct a sub-10ms transaction anomaly detection pipeline capable of uncovering synthetic identities and layered laundering rings across instant payment rails.',
    teamIds: ['team-05', 'team-06']
  },
  {
    id: 'PS-04',
    code: 'PS-04',
    title: 'Dynamic Urban Traffic Optimization via Connected Vehicle V2X',
    category: 'Smart Cities & IoT',
    description: 'Build an adaptive signal control mesh that ingests real-time telemetry from transit fleets and municipal sensors to minimize idle emissions and transit bottlenecks.',
    teamIds: ['team-07', 'team-08']
  },
  {
    id: 'PS-05',
    code: 'PS-05',
    title: 'Generative Multimodal Learning Companion for Neurodivergent Students',
    category: 'EdTech & Accessibility',
    description: 'Create an accessible, adaptive learning platform that alters curriculum pacing, sensory modality, and visual feedback dynamically for students with ADHD and dyslexia.',
    teamIds: ['team-09', 'team-10']
  },
  {
    id: 'PS-06',
    code: 'PS-06',
    title: 'Precision Soil Carbon Sequestration & Yield Forecaster',
    category: 'AgriTech & Climate',
    description: 'Combine multispectral satellite imagery, ground-probe IoT telemetry, and ML models to give farmers actionable regenerative soil regimens and verified carbon credits.',
    teamIds: ['team-11', 'team-12']
  },
  {
    id: 'PS-07',
    code: 'PS-07',
    title: 'Automated Supply Chain Disruption Predictor & Alternate Sourcing',
    category: 'Logistics & Trade',
    description: 'Build an alert intelligence engine that models geopolitical, weather, and maritime congestion signals to recommend dynamic rerouting and supplier failover.',
    teamIds: ['team-13', 'team-14']
  },
  {
    id: 'PS-08',
    code: 'PS-08',
    title: 'Real-Time Disaster Evacuation Routing under Degraded Cellular Infrastructure',
    category: 'Civic Resilience',
    description: 'Formulate an offline-first mesh networking protocol that calculates safe pedestrian escape corridors during floods or seismic events when cellular towers fail.',
    teamIds: ['team-15', 'team-16']
  },
  {
    id: 'PS-09',
    code: 'PS-09',
    title: 'Voice Biometric & Deepfake Audio Authentication Firewall',
    category: 'Cybersecurity & Media',
    description: 'Engineer an on-device phonetic and frequency-domain verification engine that flags AI voice cloning and audio injection in customer support and banking hotlines.',
    teamIds: ['team-17', 'team-18']
  },
  {
    id: 'PS-10',
    code: 'PS-10',
    title: 'Industrial Potable Water Micro-Contaminant Sensing & Filter Mesh',
    category: 'Environmental Tech',
    description: 'Design an acoustic and optical sensor telemetry pipeline for municipal water plants that detects heavy metals and microplastics before distribution.',
    teamIds: ['team-19', 'team-20']
  },
  {
    id: 'PS-11',
    code: 'PS-11',
    title: 'Cross-Border Real-Time Settlement for Gig Workers without Exorbitant Fees',
    category: 'Financial Inclusion',
    description: 'Create a cross-currency stable settlement portal that guarantees instant payouts, automated compliance checks, and micro-savings for global freelancers.',
    teamIds: ['team-21', 'team-22']
  },
  {
    id: 'PS-12',
    code: 'PS-12',
    title: 'Verifiable Supply Chain Traceability for Rare-Earth Mineral Extraction',
    category: 'Industrial ESG',
    description: 'Develop a tamper-evident hardware-anchored audit trail tracking critical minerals from artisanal extraction points through EV battery assembly.',
    teamIds: ['team-23', 'team-24']
  },
  {
    id: 'PS-13',
    code: 'PS-13',
    title: 'Privacy-Preserving Federated Healthcare Intelligence for Rare Diseases',
    category: 'Health & Privacy',
    description: 'Enable cross-hospital oncology research using differential privacy and federated model training without exposing patient records or PHI across institutional silos.',
    teamIds: ['team-25', 'team-26']
  },
  {
    id: 'PS-14',
    code: 'PS-14',
    title: 'Autonomous Drone Swarm Wildfire Spotting & Firebreak Perimeter Mapping',
    category: 'AeroTech & Safety',
    description: 'Deploy thermal-vision drone swarm coordination algorithms that map ember spread vectors and relay tactical geofences to fire command in real time.',
    teamIds: ['team-27', 'team-28']
  },
  {
    id: 'PS-15',
    code: 'PS-15',
    title: 'Zero-Knowledge Credentialing for Displaced Persons & Refugees',
    category: 'Digital Identity',
    description: 'Build a decentralized sovereign credential wallet enabling displaced refugees to verify professional licenses, diplomas, and identity without centralized risks.',
    teamIds: ['team-29', 'team-30']
  }
];

export const INITIAL_TEAMS: Team[] = [
  // PS-01
  {
    id: 'team-01',
    teamNumber: 1,
    teamName: 'Team Alpha (MedPulse AI)',
    problemStatementId: 'PS-01',
    projectTitle: 'MedPulse: Edge Triage & Smart Bed Dispatch',
    description: 'A mobile clinical dashboard backed by computer-vision vital signs estimation and hospital bed telemetry queueing.',
    members: ['Sarah Jenkins (Lead)', 'Arjun Mehta (Backend)', 'Carlos Gomez (Mobile)', 'Liam Chen (Data Science)'],
    techStack: ['PyTorch', 'WebRTC', 'React', 'FastAPI', 'Redis']
  },
  {
    id: 'team-02',
    teamNumber: 2,
    teamName: 'Team Beta (AegisCare)',
    problemStatementId: 'PS-01',
    projectTitle: 'AegisCare: Predictive ER Influx Orchestrator',
    description: 'Time-series forecasting combined with automated SMS pre-admission questionnaires to decongest emergency departments.',
    members: ['Devin Brooks (Lead)', 'Amina Yusuf (ML)', 'Kenji Sato (Fullstack)', 'Emily Zhang (UI/UX)'],
    techStack: ['TensorFlow', 'Go', 'Next.js', 'PostgreSQL', 'Docker']
  },

  // PS-02
  {
    id: 'team-03',
    teamNumber: 3,
    teamName: 'Team Gamma (VoltExchange)',
    problemStatementId: 'PS-02',
    projectTitle: 'VoltExchange: Microgrid P2P Spot Market',
    description: 'Decentralized local energy swap protocol matching solar homeowners with battery charging stations in microsecond auctions.',
    members: ['Lucas Meyer (Lead)', 'Siddharth Rao (Smart Contracts)', 'Chloe Dubois (Frontend)', 'Hao Wu (IoT)'],
    techStack: ['Solidity', 'Rust', 'Ethers.js', 'React', 'MQTT']
  },
  {
    id: 'team-04',
    teamNumber: 4,
    teamName: 'Team Delta (EcoMesh Grid)',
    problemStatementId: 'PS-02',
    projectTitle: 'EcoMesh: Automated Battery Balancing Network',
    description: 'Smart meter gateway firmware orchestrating localized power sharing with automated carbon offset certificate minting.',
    members: ['Nadia Petrova (Lead)', 'Marcus Sterling (Firmware)', 'Tariq Hassan (Backend)', 'Zoe Martin (Analytics)'],
    techStack: ['C++', 'Python', 'InfluxDB', 'Vue.js', 'AWS IoT']
  },

  // PS-03
  {
    id: 'team-05',
    teamNumber: 5,
    teamName: 'Team Epsilon (GraphGuard)',
    problemStatementId: 'PS-03',
    projectTitle: 'GraphGuard: Sub-5ms Fraud Anomaly Radar',
    description: 'Real-time graph neural network streaming engine highlighting mule accounts and coordinated cyclic laundering patterns.',
    members: ['Alex Rivera (Lead)', 'Vikram Singh (Graph ML)', 'Jessica Taylor (Streaming)', 'Omer Kaya (Security)'],
    techStack: ['DGL', 'Apache Flink', 'Kafka', 'TypeScript', 'Neo4j']
  },
  {
    id: 'team-06',
    teamNumber: 6,
    teamName: 'Team Zeta (ZeroFraud Sentinel)',
    problemStatementId: 'PS-03',
    projectTitle: 'ZeroFraud: Behavioral Biometric Risk Engine',
    description: 'Contextual risk assessment engine analyzing swipe pressure, velocity, and session entropy to catch credential stuffing.',
    members: ['Hannah Lindqvist (Lead)', 'Dmitri Ivanov (Data)', 'Pranali Patil (Frontend)', 'Julian Bell (DevOps)'],
    techStack: ['Rust', 'Wasm', 'Scikit-learn', 'React', 'ClickHouse']
  },

  // PS-04
  {
    id: 'team-07',
    teamNumber: 7,
    teamName: 'Team Eta (UrbanWave V2X)',
    problemStatementId: 'PS-04',
    projectTitle: 'UrbanWave: Adaptive City Corridor Control',
    description: 'Simulated multi-agent reinforcement learning system optimizing traffic lights to clear priority emergency transit paths.',
    members: ['Felix Braun (Lead)', 'Sunita Nair (Robotics)', 'Mateo Rossi (Fullstack)', 'Kavya Raman (Simulation)'],
    techStack: ['SUMO', 'Ray/RLlib', 'Python', 'React', 'Mapbox GL']
  },
  {
    id: 'team-08',
    teamNumber: 8,
    teamName: 'Team Theta (CivicFlow Mesh)',
    problemStatementId: 'PS-04',
    projectTitle: 'CivicFlow: Sensor-Free Congestion Estimator',
    description: 'Computer-vision pipeline tapping into municipal public traffic cameras to calculate queue lengths without expensive induction loops.',
    members: ['George Bennett (Lead)', 'Aisha Al-Nuaimi (CV)', 'Ren Tanaka (Backend)', 'Laura Morales (Frontend)'],
    techStack: ['YOLOv10', 'OpenCV', 'FastAPI', 'Node.js', 'PostGIS']
  },

  // PS-05
  {
    id: 'team-09',
    teamNumber: 9,
    teamName: 'Team Iota (NeuroWeave)',
    problemStatementId: 'PS-05',
    projectTitle: 'NeuroWeave: Dynamic ADHD Learning Interface',
    description: 'Real-time eye-tracking and interaction pacing app that decomposes math concepts into gamified sensory micro-steps.',
    members: ['Claire Dupont (Lead)', 'Ethan Walker (UI/Accessibility)', 'Rohan Gupta (ML)', 'Selma Oz (Neuroscience)'],
    techStack: ['React', 'TensorFlow.js', 'WebAudio API', 'Tailwind CSS', 'Node.js']
  },
  {
    id: 'team-10',
    teamNumber: 10,
    teamName: 'Team Kappa (CogniLearn)',
    problemStatementId: 'PS-05',
    projectTitle: 'CogniLearn: Multi-Sensory Dyslexia Tutor',
    description: 'Phonetic color-coded typography engine that reads text aloud in sync with animated syllables and spatial word maps.',
    members: ['Benjamin Hayes (Lead)', 'Fatima Zahra (Fullstack)', 'Lucas Silva (Speech ML)', 'Megan O’Connor (Education)'],
    techStack: ['Python', 'Whisper', 'React', 'Next.js', 'HuggingFace']
  },

  // PS-06
  {
    id: 'team-11',
    teamNumber: 11,
    teamName: 'Team Lambda (TerraSense)',
    problemStatementId: 'PS-06',
    projectTitle: 'TerraSense: Satellite Soil Carbon Verifier',
    description: 'Combines Sentinel-2 optical imagery with local LoRaWAN probe data to generate verified carbon credit issuance certificates.',
    members: ['Simon Fischer (Lead)', 'Deepa Krishnan (Remote Sensing)', 'Hugo Alvarez (Hardware)', 'Ananya Roy (Frontend)'],
    techStack: ['Google Earth Engine', 'LoRaWAN', 'Python', 'React', 'FastAPI']
  },
  {
    id: 'team-12',
    teamNumber: 12,
    teamName: 'Team Mu (CropGuard AI)',
    problemStatementId: 'PS-06',
    projectTitle: 'CropGuard: Hyper-Local Yield & Blight Sentinel',
    description: 'Drone-assisted multispectral plant disease identification combined with micro-climate humidity forecasts for smallholders.',
    members: ['Gabriel Santos (Lead)', 'Mei Ling (CV)', 'Arthur Pendelton (Agronomy)', 'Tania Varma (Mobile)'],
    techStack: ['Flutter', 'PyTorch Mobile', 'Docker', 'SQLite', 'Node.js']
  },

  // PS-07
  {
    id: 'team-13',
    teamNumber: 13,
    teamName: 'Team Nu (RouteMatrix)',
    problemStatementId: 'PS-07',
    projectTitle: 'RouteMatrix: Port Congestion Reroute Protocol',
    description: 'Graph optimization engine that ingests AIS ship transponders and freight pricing to simulate multi-modal transport failover.',
    members: ['Oliver Schmidt (Lead)', 'Swati Mukherjee (Optimization)', 'Daan Van Dijk (Backend)', 'Zara Khan (Product)'],
    techStack: ['NetworkX', 'Go', 'React', 'TimescaleDB', 'GraphQL']
  },
  {
    id: 'team-14',
    teamNumber: 14,
    teamName: 'Team Xi (SupplyResilient)',
    problemStatementId: 'PS-07',
    projectTitle: 'SupplyResilient: Geopolitical Tier-3 Risk Mapper',
    description: 'NLP web-crawling system parsing tariff filings, strikes, and port strikes to alert manufacturers of upstream supply halts.',
    members: ['Leo Rossi (Lead)', 'Natasha Romanova (NLP)', 'Chen Wei (Data Mining)', 'Brianna Scott (Frontend)'],
    techStack: ['spaCy', 'BERT', 'Elasticsearch', 'React', 'Express']
  },

  // PS-08
  {
    id: 'team-15',
    teamNumber: 15,
    teamName: 'Team Omicron (ResQMesh)',
    problemStatementId: 'PS-08',
    projectTitle: 'ResQMesh: Off-Grid BLE Evacuation Beacons',
    description: 'A smartphone peer-to-peer mesh app that bounces safe routing maps through Bluetooth Low Energy when towers are destroyed.',
    members: ['Samira Khan (Lead)', 'Tobias Møller (Mesh Networking)', 'Elijah Wood (iOS/Android)', 'Pooja Iyer (GIS)'],
    techStack: ['BLE Mesh', 'C++', 'React Native', 'OpenStreetMap', 'SQLite']
  },
  {
    id: 'team-16',
    teamNumber: 16,
    teamName: 'Team Pi (SafeHaven Geo)',
    problemStatementId: 'PS-08',
    projectTitle: 'SafeHaven: Real-Time Dynamic Hazard Escape Map',
    description: 'Crowdsourced obstacle reporting verified by acoustic blast sensors to automatically compute least-danger pathing.',
    members: ['Noah Williams (Lead)', 'Ingrid Holm (Spatial Analysis)', 'Karthik Rao (Backend)', 'Maya Lin (UX)'],
    techStack: ['Turf.js', 'WebSockets', 'MapLibre GL', 'Node.js', 'PostgreSQL']
  },

  // PS-09
  {
    id: 'team-17',
    teamNumber: 17,
    teamName: 'Team Rho (VoiceShield)',
    problemStatementId: 'PS-09',
    projectTitle: 'VoiceShield: Spectral Glitch Deepfake Detector',
    description: 'Detects micro-phase discontinuities and vocoder harmonics in streaming VoIP audio to prevent CEO voice fraud.',
    members: ['David Becker (Lead)', 'Shruti Sen (Audio DSP)', 'Marco Bellini (Security)', 'Alice Cooper (Frontend)'],
    techStack: ['Librosa', 'C++', 'WebAssembly', 'Python', 'React']
  },
  {
    id: 'team-18',
    teamNumber: 18,
    teamName: 'Team Sigma (PhonoGuard)',
    problemStatementId: 'PS-09',
    projectTitle: 'PhonoGuard: Zero-Trust Voice Auth Gateway',
    description: 'Dual-layered phonetic liveness verification asking callers to repeat nonces with randomized acoustic pitch curves.',
    members: ['Grace Hopper (Lead)', 'Aditya Verma (ML)', 'Benoit Blanc (Telephony)', 'Yuki Tanaka (Cloud)'],
    techStack: ['Twilio API', 'PyTorch', 'FastAPI', 'Redis', 'Tailwind']
  },

  // PS-10
  {
    id: 'team-19',
    teamNumber: 19,
    teamName: 'Team Tau (AquaSensing)',
    problemStatementId: 'PS-10',
    projectTitle: 'AquaSensing: Acoustic Micro-Lead Sensor Grid',
    description: 'Affordable piezoelectric water pipe clamps that analyze resonant frequencies to identify heavy metal precipitation in water lines.',
    members: ['Martin Vance (Lead)', 'Sujata Bose (Signal Processing)', 'Felipe Costa (Embedded)', 'Emma Watson (UI)'],
    techStack: ['ESP32', 'C', 'MQTT', 'Python', 'React']
  },
  {
    id: 'team-20',
    teamNumber: 20,
    teamName: 'Team Upsilon (HydroTrace)',
    problemStatementId: 'PS-10',
    projectTitle: 'HydroTrace: Spectrophotometric Municipal Guard',
    description: 'Continuous optical absorption measurement device for reservoirs with automated chlorine and coagulant dosing alerts.',
    members: ['Leonid Popov (Lead)', 'Preeti Joshi (Chemical Engineering)', 'Carl Sagan (Backend)', 'Nora Al-Mansoor (Design)'],
    techStack: ['Raspberry Pi', 'OpenCV', 'FastAPI', 'Chart.js', 'PostgreSQL']
  },

  // PS-11
  {
    id: 'team-21',
    teamNumber: 21,
    teamName: 'Team Phi (PayGlobex)',
    problemStatementId: 'PS-11',
    projectTitle: 'PayGlobex: Instant Stable Settlement Rails',
    description: 'Sub-cent cross-border freelancer payout protocol with automated local tax escrow and instant currency ramps.',
    members: ['Victor Vance (Lead)', 'Anjali Sharma (FinTech)', 'Carlos Santana (Smart Contracts)', 'Diana Prince (Frontend)'],
    techStack: ['Solidity', 'Polygon', 'React', 'Node.js', 'Stripe API']
  },
  {
    id: 'team-22',
    teamNumber: 22,
    teamName: 'Team Chi (RemitFlow)',
    problemStatementId: 'PS-11',
    projectTitle: 'RemitFlow: Zero-Spread Gig Remittance Portal',
    description: 'Peer-matched liquidity pools that allow migrant developers to convert earnings directly into local utilities and mobile airtime.',
    members: ['Kenneth Clark (Lead)', 'Mona Lisa (Fullstack)', 'Arvind Kejriwal (Backend)', 'Svetlana K (Mobile)'],
    techStack: ['TypeScript', 'Flutter', 'Go', 'PostgreSQL', 'WebSockets']
  },

  // PS-12
  {
    id: 'team-23',
    teamNumber: 23,
    teamName: 'Team Psi (OreChain)',
    problemStatementId: 'PS-12',
    projectTitle: 'OreChain: Tamper-Proof Mineral Geo-Tagging',
    description: 'Hardware crypto-tags affixed to ore transport containers with GPS geofence tracking and cryptographic weight auditing.',
    members: ['Arthur Dent (Lead)', 'Ravi Shankar (Cryptography)', 'Helena Troy (Supply Chain)', 'Bruce Wayne (UI)'],
    techStack: ['Solana', 'Rust', 'Hardware Secure Enclave', 'React', 'Tailwind']
  },
  {
    id: 'team-24',
    teamNumber: 24,
    teamName: 'Team Omega (ProvenanceX)',
    problemStatementId: 'PS-12',
    projectTitle: 'ProvenanceX: Clean Cobalt Digital Passport',
    description: 'EU Battery Directive compliant passport tracking mineral custody from artisanal mines to pack assembly with QR verification.',
    members: ['Peter Parker (Lead)', 'Sunita Williams (ESG Compliance)', 'Barry Allen (Fullstack)', 'Diana Troy (Data)'],
    techStack: ['Next.js', 'IPFS', 'TypeScript', 'Node.js', 'MongoDB']
  },

  // PS-13
  {
    id: 'team-25',
    teamNumber: 25,
    teamName: 'Team Hyperion (FedOnco)',
    problemStatementId: 'PS-13',
    projectTitle: 'FedOnco: Federated Rare Tumor Detection',
    description: 'Decentralized deep-learning framework allowing 12 hospitals to train glioblastoma classifiers without sharing patient scans.',
    members: ['Walter White (Lead)', 'Radha Patel (Bioinformatics)', 'Jesse Pinkman (Frontend)', 'Skyler White (Compliance)'],
    techStack: ['PySyft', 'PyTorch', 'DICOM Viewer', 'FastAPI', 'React']
  },
  {
    id: 'team-26',
    teamNumber: 26,
    teamName: 'Team Chronos (DiffHealth)',
    problemStatementId: 'PS-13',
    projectTitle: 'DiffHealth: Privacy-Guaranteed Clinical Analytics',
    description: 'Epsilon-differential privacy querying engine for rare pediatric registries that provably prevents patient re-identification.',
    members: ['Tony Stark (Lead)', 'Pepper Potts (ML)', 'Bruce Banner (Statistics)', 'Natasha Romanoff (UI)'],
    techStack: ['Diffprivlib', 'Python', 'React', 'TypeScript', 'Docker']
  },

  // PS-14
  {
    id: 'team-27',
    teamNumber: 27,
    teamName: 'Team Vulcan (PyroSwarm)',
    problemStatementId: 'PS-14',
    projectTitle: 'PyroSwarm: Cooperative Thermal Drone Perimeter',
    description: 'Decentralized flocking algorithm for thermal drones that maintains continuous active firebreak maps in dense smoke.',
    members: ['Steve Rogers (Lead)', 'Bucky Barnes (Aeronautics)', 'Sam Wilson (Embedded)', 'Peggy Carter (Tactical GIS)'],
    techStack: ['ROS2', 'PX4 Autopilot', 'C++', 'Leaflet', 'Python']
  },
  {
    id: 'team-28',
    teamNumber: 28,
    teamName: 'Team Sol (EmberWatch AI)',
    problemStatementId: 'PS-14',
    projectTitle: 'EmberWatch: Wildfire Wind & Spread Vector Model',
    description: 'High-resolution wind CFD modeling combined with low-cost thermal watchtowers to predict wildfire speed across valleys.',
    members: ['Clark Kent (Lead)', 'Lois Lane (Frontline Ops)', 'Lex Luthor (Simulation)', 'Jimmy Olsen (Frontend)'],
    techStack: ['OpenFOAM', 'WebGL', 'Three.js', 'FastAPI', 'React']
  },

  // PS-15
  {
    id: 'team-29',
    teamNumber: 29,
    teamName: 'Team Nova (SovereignID)',
    problemStatementId: 'PS-15',
    projectTitle: 'SovereignID: Zero-Knowledge Refugee Wallet',
    description: 'Mobile credential store allowing displaced doctors and nurses to prove board certifications without revealing home country IDs.',
    members: ['Jean Grey (Lead)', 'Charles Xavier (ZKP Cryptography)', 'Scott Summers (Mobile)', 'Ororo Munroe (UI/UX)'],
    techStack: ['circom', 'snarkjs', 'React Native', 'TypeScript', 'IPFS']
  },
  {
    id: 'team-30',
    teamNumber: 30,
    teamName: 'Team Polaris (CivicPass ZK)',
    problemStatementId: 'PS-15',
    projectTitle: 'CivicPass: Tamper-Proof Decentralized Sanctuary Pass',
    description: 'Selective disclosure verifiable credentials for municipal aid, food security vouchers, and emergency shelter allocations.',
    members: ['Hank McCoy (Lead)', 'Kurt Wagner (Fullstack)', 'Kitty Pryde (Security)', 'Warren Worthington (Backend)'],
    techStack: ['W3C DID', 'Ethereum Attestation Service', 'React', 'Tailwind', 'Node.js']
  }
];

export const INITIAL_EVENT_CONFIG: EventConfig = {
  minRequiredJudges: 3,
  showIncompleteTeams: true,
  parameters: DEFAULT_PARAMETERS
};

// Seed realistic evaluations for demonstration so the leaderboard displays rich data right away!
export const SEED_DEMO_EVALUATIONS: Evaluation[] = [
  // PS-01 evaluations
  {
    id: 'judge-1_team-01',
    judgeId: 'judge-1',
    judgeName: 'Judge 1 (Dr. Aris Thorne)',
    problemStatementId: 'PS-01',
    teamId: 'team-01',
    teamName: 'Team Alpha (MedPulse AI)',
    creativity: 5,
    technicalImplementation: 5,
    innovation: 5,
    feasibility: 4,
    presentation: 5,
    totalScore: 24,
    feedback: 'Outstanding triage queue model and responsive edge telemetry demonstration. Extremely realistic clinical workflow.',
    status: 'submitted',
    submittedAt: '2026-10-01T19:30:00.000Z',
    updatedAt: '2026-10-01T19:30:00.000Z'
  },
  {
    id: 'judge-1_team-02',
    judgeId: 'judge-1',
    judgeName: 'Judge 1 (Dr. Aris Thorne)',
    problemStatementId: 'PS-01',
    teamId: 'team-02',
    teamName: 'Team Beta (AegisCare)',
    creativity: 4,
    technicalImplementation: 4,
    innovation: 4,
    feasibility: 5,
    presentation: 4,
    totalScore: 21,
    feedback: 'High real-world feasibility. SMS pre-intake is clever, though neural forecasting needs more historical calibration data.',
    status: 'submitted',
    submittedAt: '2026-10-01T19:30:00.000Z',
    updatedAt: '2026-10-01T19:30:00.000Z'
  },
  {
    id: 'judge-2_team-01',
    judgeId: 'judge-2',
    judgeName: 'Judge 2 (Maya Patel)',
    problemStatementId: 'PS-01',
    teamId: 'team-01',
    teamName: 'Team Alpha (MedPulse AI)',
    creativity: 5,
    technicalImplementation: 4,
    innovation: 5,
    feasibility: 4,
    presentation: 5,
    totalScore: 23,
    feedback: 'Intuitive interface for ER triage nurses. High marks on presentation and user empathy.',
    status: 'submitted',
    submittedAt: '2026-10-01T19:45:00.000Z',
    updatedAt: '2026-10-01T19:45:00.000Z'
  },
  {
    id: 'judge-2_team-02',
    judgeId: 'judge-2',
    judgeName: 'Judge 2 (Maya Patel)',
    problemStatementId: 'PS-01',
    teamId: 'team-02',
    teamName: 'Team Beta (AegisCare)',
    creativity: 4,
    technicalImplementation: 4,
    innovation: 4,
    feasibility: 4,
    presentation: 4,
    totalScore: 20,
    feedback: 'Very solid MVP. The patient-facing web flow is clean.',
    status: 'submitted',
    submittedAt: '2026-10-01T19:45:00.000Z',
    updatedAt: '2026-10-01T19:45:00.000Z'
  },
  {
    id: 'judge-8_team-01',
    judgeId: 'judge-8',
    judgeName: 'Judge 8 (Nathan Ross)',
    problemStatementId: 'PS-01',
    teamId: 'team-01',
    teamName: 'Team Alpha (MedPulse AI)',
    creativity: 5,
    technicalImplementation: 5,
    innovation: 4,
    feasibility: 5,
    presentation: 5,
    totalScore: 24,
    feedback: 'From a medical informatics perspective, this addresses a massive hospital throughput bottleneck.',
    status: 'submitted',
    submittedAt: '2026-10-01T20:10:00.000Z',
    updatedAt: '2026-10-01T20:10:00.000Z'
  },
  {
    id: 'judge-8_team-02',
    judgeId: 'judge-8',
    judgeName: 'Judge 8 (Nathan Ross)',
    problemStatementId: 'PS-01',
    teamId: 'team-02',
    teamName: 'Team Beta (AegisCare)',
    creativity: 4,
    technicalImplementation: 5,
    innovation: 4,
    feasibility: 5,
    presentation: 4,
    totalScore: 22,
    feedback: 'Great backend architecture and HIPAA compliance awareness.',
    status: 'submitted',
    submittedAt: '2026-10-01T20:10:00.000Z',
    updatedAt: '2026-10-01T20:10:00.000Z'
  },

  // PS-03 evaluations
  {
    id: 'judge-3_team-05',
    judgeId: 'judge-3',
    judgeName: 'Judge 3 (Elena Rostova)',
    problemStatementId: 'PS-03',
    teamId: 'team-05',
    teamName: 'Team Epsilon (GraphGuard)',
    creativity: 5,
    technicalImplementation: 5,
    innovation: 5,
    feasibility: 4,
    presentation: 5,
    totalScore: 24,
    feedback: 'GNN execution is exceptionally fast. Outstanding streaming graph partitioning.',
    status: 'submitted',
    submittedAt: '2026-10-01T20:00:00.000Z',
    updatedAt: '2026-10-01T20:00:00.000Z'
  },
  {
    id: 'judge-3_team-06',
    judgeId: 'judge-3',
    judgeName: 'Judge 3 (Elena Rostova)',
    problemStatementId: 'PS-03',
    teamId: 'team-06',
    teamName: 'Team Zeta (ZeroFraud Sentinel)',
    creativity: 4,
    technicalImplementation: 4,
    innovation: 4,
    feasibility: 5,
    presentation: 4,
    totalScore: 21,
    feedback: 'Solid behavioral capture. Keystroke dynamics showed minimal false positives in demo.',
    status: 'submitted',
    submittedAt: '2026-10-01T20:00:00.000Z',
    updatedAt: '2026-10-01T20:00:00.000Z'
  },
  {
    id: 'judge-4_team-05',
    judgeId: 'judge-4',
    judgeName: 'Judge 4 (Marcus Vance)',
    problemStatementId: 'PS-03',
    teamId: 'team-05',
    teamName: 'Team Epsilon (GraphGuard)',
    creativity: 5,
    technicalImplementation: 5,
    innovation: 5,
    feasibility: 5,
    presentation: 5,
    totalScore: 25,
    feedback: 'Flawless execution. Live detection of multi-hop cyclic transactions was the highlight of the session.',
    status: 'submitted',
    submittedAt: '2026-10-01T20:25:00.000Z',
    updatedAt: '2026-10-01T20:25:00.000Z'
  },
  {
    id: 'judge-4_team-06',
    judgeId: 'judge-4',
    judgeName: 'Judge 4 (Marcus Vance)',
    problemStatementId: 'PS-03',
    teamId: 'team-06',
    teamName: 'Team Zeta (ZeroFraud Sentinel)',
    creativity: 4,
    technicalImplementation: 4,
    innovation: 4,
    feasibility: 4,
    presentation: 4,
    totalScore: 20,
    feedback: 'Good work on fraud mitigation. Presentation was clear and concise.',
    status: 'submitted',
    submittedAt: '2026-10-01T20:25:00.000Z',
    updatedAt: '2026-10-01T20:25:00.000Z'
  },

  // PS-05 evaluations
  {
    id: 'judge-2_team-09',
    judgeId: 'judge-2',
    judgeName: 'Judge 2 (Maya Patel)',
    problemStatementId: 'PS-05',
    teamId: 'team-09',
    teamName: 'Team Iota (NeuroWeave)',
    creativity: 5,
    technicalImplementation: 4,
    innovation: 5,
    feasibility: 4,
    presentation: 5,
    totalScore: 23,
    feedback: 'Beautiful design. Truly addresses cognitive overload for neurodivergent learners.',
    status: 'submitted',
    submittedAt: '2026-10-01T21:00:00.000Z',
    updatedAt: '2026-10-01T21:00:00.000Z'
  },
  {
    id: 'judge-2_team-10',
    judgeId: 'judge-2',
    judgeName: 'Judge 2 (Maya Patel)',
    problemStatementId: 'PS-05',
    teamId: 'team-10',
    teamName: 'Team Kappa (CogniLearn)',
    creativity: 4,
    technicalImplementation: 4,
    innovation: 4,
    feasibility: 4,
    presentation: 4,
    totalScore: 20,
    feedback: 'Great reading assistance toolkit with solid phoneme parsing.',
    status: 'submitted',
    submittedAt: '2026-10-01T21:00:00.000Z',
    updatedAt: '2026-10-01T21:00:00.000Z'
  },

  // PS-15 evaluations
  {
    id: 'judge-3_team-29',
    judgeId: 'judge-3',
    judgeName: 'Judge 3 (Elena Rostova)',
    problemStatementId: 'PS-15',
    teamId: 'team-29',
    teamName: 'Team Nova (SovereignID)',
    creativity: 5,
    technicalImplementation: 5,
    innovation: 5,
    feasibility: 4,
    presentation: 5,
    totalScore: 24,
    feedback: 'ZK circuits were clean and verifiable in browser under 1.2s. Humanitarian impact is immense.',
    status: 'submitted',
    submittedAt: '2026-10-01T21:20:00.000Z',
    updatedAt: '2026-10-01T21:20:00.000Z'
  },
  {
    id: 'judge-3_team-30',
    judgeId: 'judge-3',
    judgeName: 'Judge 3 (Elena Rostova)',
    problemStatementId: 'PS-15',
    teamId: 'team-30',
    teamName: 'Team Polaris (CivicPass ZK)',
    creativity: 4,
    technicalImplementation: 4,
    innovation: 4,
    feasibility: 5,
    presentation: 4,
    totalScore: 21,
    feedback: 'Practical decentralized identity implementation with immediate municipality utility.',
    status: 'submitted',
    submittedAt: '2026-10-01T21:20:00.000Z',
    updatedAt: '2026-10-01T21:20:00.000Z'
  }
];
