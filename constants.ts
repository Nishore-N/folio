// Copyright NISHORE N 2024. All Rights Reserved.
// Project: folio
// Author contact: nagakalpanish2004@gmail.com
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

export const METADATA = {
  title: "NISHORE N | Portfolio",
  description:
    "I am a Software Developer experienced in building scalable mobile and Full stack applications. I am seeking opportunities to leverage my strong problem-solving skills and hands-on project experience in a dynamic professional environment.",
  siteUrl: "https://nishore-portfolio.net/",
};

export const MENULINKS = [
  {
    name: "Home",
    ref: "home",
  },
  {
    name: "Works",
    ref: "works",
  },
  {
    name: "Skills",
    ref: "skills",
  },
  {
    name: "Timeline",
    ref: "timeline",
  },
  {
    name: "Contact",
    ref: "contact",
  },
];

export const TYPED_STRINGS = [
  "I am a Software Developer",
  "I build scalable web and mobile apps",
  "I specialize in Flutter & Next.js",
  "I am a quick learner and problem solver",
];

export const EMAIL = "nagakalpanish2004@gmail.com";

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/Nishore007",
  github: "https://github.com/Nishore-N",
  medium: "https://medium.com/@nagakalpanish2004",
  instagram: "https://www.instagram.com/mercato_007?igsh=MTlhanZzamR2bDFx",
};

export interface IProject {
  name: string;
  image: string;
  blurImage: string;
  description: string;
  gradient: [string, string];
  url: string;
  tech: string[];
  category: "software" | "hardware";
}

export const PROJECTS: IProject[] = [
  {
    name: "Vehicle Speed Intimation",
    image: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=800&h=600&fit=crop",
    blurImage: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=100&h=100&fit=crop&blur=20",
    description: "Working real-time product: Automatic vehicle speed limit notification and warning system for improving traffic safety.",
    gradient: ["#1F6582", "#1ABCFE"],
    url: "#",
    tech: ["arduino ide", "lora"],
    category: "hardware",
  },
  {
    name: "Brain Tumor Application",
    image: "https://images.unsplash.com/photo-1576091160399-112bc8fa0e7e?w=800&h=600&fit=crop",
    blurImage: "https://images.unsplash.com/photo-1576091160399-112bc8fa0e7e?w=100&h=100&fit=crop&blur=20",
    description: "Real-time monitoring and communication between doctor and patient for post-treatment tracking.",
    gradient: ["#153BB9", "#0E2C8B"],
    url: "#",
    tech: ["flutter", "firebase"],
    category: "software",
  },
  {
    name: "Canteen Rush Management",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop",
    blurImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop&blur=20",
    description: "Flutter-based canteen app with time-slot ordering, QR receipts, and queue monitoring.",
    gradient: ["#245B57", "#004741"],
    url: "#",
    tech: ["flutter", "firebase"],
    category: "software",
  },
  {
    name: "Aroma Health & Nutrition Platform",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    blurImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100&h=100&fit=crop&blur=20",
    description: "Cross-platform health app with ingredient scanning, dietary tracking, and personalized nutrition workflows.",
    gradient: ["#003052", "#167187"],
    url: "https://play.google.com/store/apps/details?id=com.cooking.aroma&hl=en_IN",
    tech: ["flutter", "nodejs", "Amazon S3 storage", "MongoDB"],
    category: "software",
  },
  {
    name: "Custom FCM Payloader & SDK",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    blurImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&blur=20",
    description: "Custom FCM payloader platform and plug-and-play Flutter SDK for advanced push notifications and in-app messaging with customizable rendering.",
    gradient: ["#4B0082", "#8A2BE2"],
    url: "#",
    tech: ["flutter", "firebase"],
    category: "software",
  },
  {
    name: "Claude Mobile UI Clone",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop",
    blurImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&h=100&fit=crop&blur=20",
    description: "Advanced Flutter application replicating the Claude mobile UI integrated with Generative AI for real-time streaming LLM responses and dynamic widget rendering.",
    gradient: ["#2E8B57", "#3CB371"],
    url: "#",
    tech: ["flutter", "gen ai", "vertex ai"],
    category: "software",
  },
  {
    name: "AI-Based Intelligence Automation",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    blurImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop&blur=20",
    description: "Node.js automation system integrated with Explorium AI for collecting business insights, synchronized with Google Sheets via Apps Script and Cloudflare Tunnel for Lead Generation.",
    gradient: ["#8B0000", "#DC143C"],
    url: "#",
    tech: ["nodejs", "ai", "apps script"],
    category: "software",
  },
  {
    name: "Manual CI/CD Pipeline System",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop",
    blurImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=100&h=100&fit=crop&blur=20",
    description: "Manual deployment pipeline workflow for automated website deployment, environment handling, and infrastructure management.",
    gradient: ["#4682B4", "#5F9EA0"],
    url: "#",
    tech: ["ci/cd", "deployment"],
    category: "software",
  },
  {
    name: "Firebase Crashlytics Integration",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    blurImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop&blur=20",
    description: "Orchestrated advanced diagnostics within a live production client, leveraging Firebase Crashlytics for automated fault isolation, comprehensive telemetry tracking, and optimized application stability.",
    gradient: ["#FFA000", "#FF6D00"],
    url: "#",
    tech: ["flutter", "firebase", "crashlytics"],
    category: "software",
  },
  {
    name: "Expense Tracker Application",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop",
    blurImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop&blur=20",
    description: "A robust financial dashboard engineered to track complex transaction lifecycles. Architected with Flutter for native-grade performance, Firestore for resilient real-time state management, and versatile REST APIs for extensive system interoperability.",
    gradient: ["#00b09b", "#96c93d"],
    url: "#",
    tech: ["flutter", "firestore", "rest api"],
    category: "software",
  },
];

export const SKILLS = {
  frontend: [
    "html",
    "css",
    "javascript",
    "react",
    "flutter",
  ],
  uiUx: ["figma", "canva"],
  other: ["java", "c", "firebase", "sql", "git"],
};

export enum Branch {
  LEFT = "leftSide",
  RIGHT = "rightSide",
}

export enum NodeTypes {
  CONVERGE = "converge",
  DIVERGE = "diverge",
  CHECKPOINT = "checkpoint",
}

export enum ItemSize {
  SMALL = "small",
  LARGE = "large",
}

export const TIMELINE: Array<TimelineNodeV2> = [
  {
    type: NodeTypes.CHECKPOINT,
    title: "2026",
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Software Developer",
    size: ItemSize.SMALL,
    subtitle:
      "Launched the initial phase of Aroma Chefs, a real-time client project deployed on the Play Store. Integrated Firebase Crashlytics for anamoly detection for production app, Engineered impactful solutions including a Custom FCM Payloader SDK, a dynamic Claude UI Clone at Fuzionest Private Limited. (Apr 2026 - Present)",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "2025",
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Software Developer Intern",
    size: ItemSize.SMALL,
    subtitle:
      "Laid the foundation for Aroma Chefs, a real-time client project, by designing user interfaces and integrating core APIs during an internship at Fuzionest Private Limited.",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "2024",
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Salesforce Development Intern",
    size: ItemSize.SMALL,
    subtitle:
      "Acquired practical experience in Salesforce development at Inno Valley Works, specializing in Apex programming, custom classes, and triggers.",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Cyber Security Intern",
    size: ItemSize.SMALL,
    subtitle:
      "Completed an intensive internship at Gateway Software Solutions, gaining hands-on expertise in network analysis, penetration testing, and cryptography.",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "2022",
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "B.Tech in Information Technology",
    size: ItemSize.SMALL,
    subtitle:
      "Completed a Bachelor of Technology in Information Technology at Dr. N.G.P. Institute of Technology with an 8.05 CGPA.",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Higher Secondary Education",
    size: ItemSize.SMALL,
    subtitle:
      "Completed the Higher Secondary Certificate (HSC) at AVP Trust National Matric Higher Secondary School with an 85% score.",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "2020",
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Secondary Education",
    size: ItemSize.SMALL,
    subtitle:
      "Completed the Secondary School Leaving Certificate (SSLC) at AVP Trust National Matric Higher Secondary School with a 71% score.",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },
];

export type TimelineNodeV2 = CheckpointNode | BranchNode;

export interface CheckpointNode {
  type: NodeTypes.CHECKPOINT;
  title: string;
  subtitle?: string;
  size: ItemSize;
  image?: string;
  slideImage?: string;
  shouldDrawLine: boolean;
  alignment: Branch;
}

export interface BranchNode {
  type: NodeTypes.CONVERGE | NodeTypes.DIVERGE;
}

export const GTAG = "";
