import {
  Code2,
  Database,
  BrainCircuit,
  Wrench,
  LineChart,
  Cpu,
  Bot,
  BarChart3,
  Server,
  CloudLightning,
  ShieldAlert,
  Home,
  Building2,
  Wind,
  Bike
} from "lucide-react";

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const SKILLS = [
  {
    category: "Programming",
    icon: "Code2",
    items: ["Python", "SQL", "Embedded C/C++"],
  },
  {
    category: "Data Tools",
    icon: "Database",
    items: ["Power BI", "Power Query", "MySQL", "BigQuery"],
  },
  {
    category: "AI / ML",
    icon: "BrainCircuit",
    items: ["Pandas", "NumPy", "Scikit-learn", "OpenCV", "LLMs (RAG)"],
  },
  {
    category: "Tools & Platforms",
    icon: "Wrench",
    items: ["n8n", "FastAPI", "Arduino", "ESP32", "Raspberry Pi"],
  },
];

export const PROJECTS = [
  {
    id: "rag-agent",
    title: "AI RAG Agent",
    subtitle: "Fault Reporting & Knowledge Assistant",
    description:
      "Built a RAG-based system for intelligent fault reporting. Automated the classification of faults (electrical, HVAC, plumbing) and integrated chatbot capabilities with automated n8n workflows.",
    techStack: ["Python", "LLMs", "RAG", "n8n", "Vector DB"],
    achievements: [
      "Reduced fault reporting time by 40%",
      "Automated complex categorization",
    ],
    icon: "ShieldAlert",
    github: "#",
    demo: "#",
  },
  {
    id: "virtual-assistant",
    title: "AI Virtual Assistant",
    subtitle: "Home Services Chatbot",
    description:
      "Developed a virtual assistant chatbot using the OpenAI API. Integrated speech-to-text, text-to-speech, and image recognition (OpenCV) via a FastAPI backend and React UI.",
    techStack: ["OpenAI API", "OpenCV", "FastAPI", "React", "Speech AI"],
    achievements: [
      "Seamless voice and image interactions",
      "Low latency modular backend",
    ],
    icon: "Home",
    github: "#",
    demo: "#",
  },
  {
    id: "dashboard",
    title: "Building Maintenance Dashboard",
    subtitle: "Real-time Analytics",
    description:
      "Created highly interactive Power BI real-time dashboards utilizing OneDrive data integration to provide actionable insights for stakeholders.",
    techStack: ["Power BI", "Power Query", "OneDrive API", "Data Viz"],
    achievements: [
      "Live dashboard updates",
      "Streamlined reporting for stakeholders",
    ],
    icon: "Building2",
    github: "#",
    demo: "#",
  },
  {
    id: "air-quality",
    title: "Indoor Air Quality Monitor",
    subtitle: "IoT + AI Pipeline",
    description:
      "Designed an IoT data pipeline using ESP32 sensors (CO2, PM2.5). Data flows over MQTT/HTTP for Python analysis and Power BI visualization.",
    techStack: ["ESP32", "MQTT", "Python", "Power BI", "IoT"],
    achievements: [
      "Continuous real-time environment tracking",
      "Predictive analysis mapping",
    ],
    icon: "Wind",
    github: "#",
    demo: "#",
  },
  {
    id: "bike-trip",
    title: "Bike Trip Data Analysis",
    subtitle: "User Behavior Insights",
    description:
      "Conducted extensive SQL analysis on bike trip datasets, visualized through a Tableau dashboard to extract deep user behavior insights.",
    techStack: ["SQL", "Tableau", "Data Analysis"],
    achievements: [
      "Identified peak usage patterns",
      "Provided actionable business metrics",
    ],
    icon: "Bike",
    github: "#",
    demo: "#",
  },
];

export const EXPERIENCE = [
  {
    id: 1,
    role: "Data Analyst / AI Engineer",
    company: "The Intellect",
    period: "2024 – Present",
    description:
      "Leading the development of generative AI applications, building robust data pipelines, and designing interactive dashboards for real-time decision making.",
  },
  {
    id: 2,
    role: "Data Science Consultant",
    company: "Rubixe",
    period: "Previous",
    description:
      "Consulted on data science workflows, built predictive models, and collaborated with cross-functional teams to solve complex business problems.",
  },
  {
    id: 3,
    role: "IoT Trainer",
    company: "Skill-Lync",
    period: "Previous",
    description:
      "Instructed students on Internet of Things architectures, embedded systems design, and bridging the gap between hardware and software.",
  },
  {
    id: 4,
    role: "Firmware Intern",
    company: "Boodskap",
    period: "Previous",
    description:
      "Developed firmware for embedded devices, heavily focusing on C/C++ programming for constrained environments.",
  },
];

export const CERTIFICATIONS = [
  "Google Data Analytics Professional Certificate",
  "Data Science – Datamites",
  "Python – Guvi",
];
