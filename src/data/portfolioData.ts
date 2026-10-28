import wedonateImg from '../PHOTO/projects/wedonate.jpg';
import cryptoImg from '../PHOTO/projects/crypto.jpg';
import starHopperImg from '../PHOTO/projects/star_hopper.jpg';
import nlpImg from '../PHOTO/projects/nlp_tweet.jpg';
import agriboraImg from '../PHOTO/projects/agribora.jpg';
import amharicImg from '../PHOTO/projects/amharic_ocr.jpg';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full Stack' | 'Machine Learning' | 'NLP & Vision' | 'Data Science';
  description: string;
  longDescription: string;
  image: string;
  tech: string[];
  features: string[];
  github: string;
  demo?: string;
  stars?: number;
  highlight?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 1-100
  iconName?: string;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  badge: string;
  description: string;
  metrics?: string;
  link?: string;
}

export const PERSONAL_INFO = {
  name: "Segni Nadew",
  title: "Full-Stack Software Engineer & AI/ML Developer",
  email: "segninadew1@gmail.com",
  location: "Adama, Ethiopia",
  status: "Available for new roles & collaborations",
  github: "https://github.com/Segn11/",
  linkedin: "https://www.linkedin.com/in/segni-nadew",
  bio: "Passionate Full-Stack Software Engineer and AI/ML practitioner crafting resilient web architectures and high-impact machine learning solutions. With deep expertise across modern TypeScript/React, Python, Deep Learning (BERT, CNNs), and scalable backends, I transform complex data and product problems into elegant, production-ready software.",
  stats: [
    { label: "Projects Completed", value: "15+", sub: "Web & Machine Learning" },
    { label: "Zindi ML Ranking", value: "Top 15%", sub: "Rank 51 of 358 Participants" },
    { label: "Tech Stack Breadth", value: "12+", sub: "Languages & Frameworks" },
    { label: "Code Dedication", value: "100%", sub: "Clean, Typed & Tested" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "wedonate-portal",
    title: "WeDonate Civic Charity Portal",
    subtitle: "Municipal aid distribution with 3-tier government verification",
    category: "Full Stack",
    description: "An official municipal charity platform (Kebele → Woreda → Direct Delivery) digitizing aid distribution with full public transparency, anti-fraud National ID checks, and Gemini AI multilingual support.",
    longDescription: "Engineered to modernize humanitarian and civic aid in Ethiopia. Implements a secure 3-tier verification pipeline from local Kebele administrators up to Woreda coordinators to eliminate duplicate assistance and ensure verified delivery with photo confirmation. Features guest donations, digital receipt issuance, real-time public fund allocation dashboards, and multilingual AI assistance in English, Afaan Oromoo, and Amharic powered by Google Gemini.",
    image: wedonateImg,
    tech: ["React", "Node.js", "Express", "PostgreSQL", "Prisma ORM", "Gemini AI", "Tailwind CSS"],
    features: [
      "3-tier government verification workflow (Kebele → Woreda → Direct Handover)",
      "Public transparency portal with real-time fund metrics & digital audit receipts",
      "National ID duplicate detection algorithm for fraud prevention",
      "Multilingual AI assistant supporting English, Afaan Oromoo, and Amharic"
    ],
    github: "https://github.com/Segn11/WeDonate-portal",
    demo: "https://github.com/Segn11/WeDonate-portal",
    highlight: "Civic Tech & Public Verification"
  },
  {
    id: "crypto-ml",
    title: "Cryptocurrency Price Predictor",
    subtitle: "Machine learning time-series forecasting & analytics engine",
    category: "Machine Learning",
    description: "An interactive ML dashboard that leverages historical financial datasets and algorithmic models to predict future cryptocurrency closing values and market sentiment trends.",
    longDescription: "Built an intelligent end-to-end data pipeline that ingests historical cryptocurrency market data, computes rolling moving averages (EMA 20/50/200), RSI, and MACD indicators, and trains predictive regression models. Delivered through an intuitive Streamlit interface allowing users to simulate scenarios, analyze model confidence intervals, and visualize future price trajectories.",
    image: cryptoImg,
    tech: ["Python", "Streamlit", "Scikit-Learn", "Pandas", "Plotly", "NumPy"],
    features: [
      "Time-series model training with real-time parameter tuning",
      "Visual candlestick financial charts with technical indicators (RSI, MACD, Moving Averages)",
      "Confidence interval estimation and model accuracy metrics (RMSE, MAE)",
      "Instant multi-asset selection covering Bitcoin, Ethereum, and major tokens"
    ],
    github: "https://github.com/Segn11/crypto-price-ml-dashboard",
    demo: "https://crypto-price-ml-dashboard-esvsawgjtfappe8tms4pguw.streamlit.app/",
    highlight: "Deployed Live Streamlit App"
  },
  {
    id: "low-poly-3d-adventure",
    title: "Super Star Hopper: 3D Platformer Adventure",
    subtitle: "Full-featured 3D low-poly platformer engine running at 60 FPS in browser & desktop",
    category: "Full Stack",
    description: "An international AAA-grade 3D low-poly platformer game built with Three.js, procedural shaders, Web Audio API synth, and Electron. Features acrobatic movesets, wall kicks, belly dives, and multi-biome sky islands.",
    longDescription: "Built a 100% zero-dependency standalone 3D gaming experience that executes at butter-smooth 60 FPS directly inside the browser via WebGL/Three.js or packaged as a native offline Windows desktop app (.exe). Implements procedural low-poly geometry, animated vertex water ripples, custom physics collision meshes, dynamic scarf/antenna secondary spring dynamics, and an algorithmic polyphonic Web Audio synthesizer with full gamepad/controller support.",
    image: starHopperImg,
    tech: ["Three.js", "WebGL", "TypeScript", "Web Audio API", "Electron", "HTML5 Canvas"],
    features: [
      "Zero-dependency procedural 3D engine with vertex shaders and water ripple physics",
      "Acrobatic moveset: double jumps, wall slide & wall jump, dive rolls, ground pound shockwaves",
      "Synthesized real-time sound effects and retro chiptune audio via Web Audio API",
      "Multi-platform support: Instant 60 FPS web play + standalone Windows desktop release"
    ],
    github: "https://github.com/Segn11/low-poly-3d-adventure",
    demo: "https://segn11.github.io/low-poly-3d-adventure/",
    highlight: "Playable 3D WebGL Game & Desktop App"
  },
  {
    id: "covid-tweet-nlp",
    title: "COVID-19 NLP Tweet Sentiment & Classification",
    subtitle: "Transformer-based NLP pipeline for public health sentiment",
    category: "NLP & Vision",
    description: "A machine learning pipeline utilizing fine-tuned BERT transformers and LightGBM to classify emergency social media feeds into misinformation, news, and genuine citizen reports.",
    longDescription: "Processed a corpus of social media updates during the global pandemic to filter noise and flag critical health misinformation. Performed advanced NLP text preprocessing (tokenization, stop-word removal, lemmatization), BERT embeddings generation, and ensemble classification with LightGBM, achieving superior F1-scores on heavily imbalanced datasets.",
    image: nlpImg,
    tech: ["Python", "BERT", "LightGBM", "Scikit-Learn", "HuggingFace", "NLTK"],
    features: [
      "Fine-tuned Transformer (BERT) pipeline for context-aware contextual embeddings",
      "Ensemble modeling with LightGBM achieving high precision and recall on imbalanced text",
      "Multi-class categorization: Verified News, Misinformation, Personal Experience",
      "Comprehensive evaluation with confusion matrices and ROC-AUC curve analysis"
    ],
    github: "https://github.com/Segn11/COVID-19_Tweet_Classification_Challenge_updated",
    highlight: "Deep NLP Transformer Pipeline"
  },
  {
    id: "agribora-challenge",
    title: "AgriBORA Commodity Price Forecaster",
    subtitle: "Competitive Machine Learning for agricultural economic forecasting",
    category: "Data Science",
    description: "Predictive econometric model analyzing geospatial climate indicators, weather patterns, and market supply data. Earned top 15% ranking on Zindi platform.",
    longDescription: "Developed for the Zindi AgriBORA Commodity Price Forecasting Challenge. Engineered high-impact features combining satellite weather anomaly data, precipitation cycles, and historic market pricing across African agricultural regions. Achieved competitive ranking 51 among 358 international data scientists.",
    image: agriboraImg,
    tech: ["Python", "XGBoost", "LightGBM", "GeoPandas", "Feature Engineering"],
    features: [
      "Multi-source feature aggregation combining geospatial climate data and trade logs",
      "Cross-validation strategy designed specifically for temporal economic time-series",
      "Ranked #51 out of 358 top competitors on the international Zindi leaderboard",
      "In-depth feature importance interpretation identifying key weather drivers"
    ],
    github: "https://github.com/Segn11/",
    highlight: "Zindi Ranked 51 / 358"
  },
  {
    id: "amharic-ocr",
    title: "Amharic Character Classifier (Ethiopic OCR)",
    subtitle: "Deep Convolutional Neural Network for indigenous script recognition",
    category: "NLP & Vision",
    description: "Deep learning computer vision system trained on thousands of handwritten and scanned Ge'ez/Amharic characters to enable optical character transcription.",
    longDescription: "Engineered a custom deep CNN architecture tailored to the rich 200+ syllable syllabary of the Ethiopic/Amharic writing system. Built an augmented training pipeline to handle noisy historical scans, orientation shifts, and varying handwriting styles, achieving strong classification accuracy.",
    image: amharicImg,
    tech: ["Python", "PyTorch", "OpenCV", "CNN", "NumPy", "Matplotlib"],
    features: [
      "Custom Convolutional Neural Network architecture tailored to complex Ge'ez orthography",
      "Data augmentation pipeline simulating paper degradation and ink variations",
      "High accuracy classification across 200+ Amharic character classes",
      "Modular inference engine ready for real-time document digitization"
    ],
    github: "https://github.com/Segn11/",
    highlight: "Indigenous AI Computer Vision"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    description: "Building responsive, lightning-fast, and accessible web user interfaces",
    skills: [
      { name: "React 19 / Next.js", level: 94, featured: true },
      { name: "TypeScript", level: 90, featured: true },
      { name: "JavaScript (ES6+)", level: 95, featured: true },
      { name: "Tailwind CSS", level: 96, featured: true },
      { name: "HTML5 / Semantic Web", level: 98 },
      { name: "CSS3 / Modern Layouts", level: 92 },
      { name: "Vite & Tooling", level: 88 },
      { name: "Motion / Animation", level: 85 }
    ]
  },
  {
    title: "Backend & Systems",
    description: "Architecting reliable APIs, microservices, and database schemas",
    skills: [
      { name: "Node.js & Express", level: 92, featured: true },
      { name: "Python", level: 95, featured: true },
      { name: "Django REST Framework", level: 86, featured: true },
      { name: "MongoDB & Mongoose", level: 90, featured: true },
      { name: "PostgreSQL & SQL", level: 88, featured: true },
      { name: "RESTful API Design", level: 94 },
      { name: "SQLite & ORMs", level: 87 },
      { name: "JWT & Auth Security", level: 89 }
    ]
  },
  {
    title: "AI, ML & Data Science",
    description: "Developing predictive models, neural networks, and NLP transformers",
    skills: [
      { name: "PyTorch & Deep Learning", level: 88, featured: true },
      { name: "Scikit-Learn", level: 94, featured: true },
      { name: "BERT & Transformers", level: 86, featured: true },
      { name: "Convolutional Neural Nets (CNN)", level: 90, featured: true },
      { name: "LightGBM & XGBoost", level: 91 },
      { name: "Pandas & NumPy", level: 95 },
      { name: "Computer Vision (OpenCV)", level: 82 },
      { name: "Data Visualization (Plotly/Seaborn)", level: 89 }
    ]
  },
  {
    title: "DevOps & Developer Tools",
    description: "Version control, containerization, deployment, and testing",
    skills: [
      { name: "Git & GitHub Workflow", level: 95, featured: true },
      { name: "Docker Fundamentals", level: 80, featured: true },
      { name: "Linux / Shell Scripting", level: 85 },
      { name: "Streamlit Cloud", level: 92 },
      { name: "Vercel & Netlify Deployment", level: 94 },
      { name: "Postman & API Testing", level: 90 },
      { name: "VS Code & Debugging", level: 96 },
      { name: "Agile / Scrum Methodologies", level: 88 }
    ]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "zindi-agribora",
    title: "Top 15% Leaderboard Finish (51/358)",
    organization: "Zindi Data Science Platform",
    date: "AgriBORA Challenge",
    badge: "Competitive Honor",
    description: "Competed internationally against 350+ data scientists and machine learning engineers to build predictive commodity pricing algorithms based on agricultural and climatic anomalies.",
    metrics: "Rank 51 / 358 Participants"
  },
  {
    id: "fullstack-production",
    title: "Full-Stack Production Deployments",
    organization: "Personal & Open Source Projects",
    date: "2024 - Present",
    badge: "Engineering Delivery",
    description: "Engineered and deployed robust full-stack software applications including the WeDonate Civic Aid Platform, Super Star Hopper 3D WebGL Game, and real-time Streamlit machine learning applications.",
    metrics: "5+ Live Deployed Systems"
  },
  {
    id: "indigenous-ai",
    title: "Indigenous Script AI Innovation",
    organization: "Computer Vision Research",
    date: "Academic Project",
    badge: "AI Research",
    description: "Developed deep learning models specialized in Ethiopic / Amharic character recognition (CNNs) to aid document preservation and automated translation for African languages.",
    metrics: "200+ Character Classes Classified"
  }
];

export const EDUCATION = [
  {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "Adama Science and Technology University (ASTU)",
    period: "2023 — 2027",
    highlights: [
      "Concentrations in Advanced Algorithms, Machine Learning, Database Architecture, and Distributed Systems",
      "Active participant in competitive programming challenges and data science hackathons",
      "Core academic focus on bridging practical full-stack web software with applied artificial intelligence"
    ]
  }
];
