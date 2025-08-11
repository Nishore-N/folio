// Copyright NISHORE N 2024. All Rights Reserved.
// Project: folio
// Author contact: nagakalpanish2004@gmail.com
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

export const METADATA = {
  title: "Portfolio | NISHORE N",
  description:
    "I am a passionate Information Technology graduate seeking entry-level positions in software industry. I bridge the gap between design and development with strong problem-solving skills.",
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
  "I design and develop things",
  "I develop modern mobile apps",
  "I design dynamic user experience",
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
    name: "Blind Man's Stick",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    blurImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100&h=100&fit=crop&blur=20",
    description: "Wearable IoT technology using ultrasonic waves to detect obstacles for visually impaired.",
    gradient: ["#003052", "#167187"],
    url: "#",
    tech: ["arduino ide", "ultrasonic"],
    category: "hardware",
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
  other: ["firebase", "sql", "arduino", "git"],
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
    title: "2024",
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Intern",
    size: ItemSize.SMALL,
    subtitle:
      "15 days internship on Cyber Security with hands-on experience in network analysis, penetration testing, and cryptography tools",
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
    title: "Started B.Tech in Information Technology",
    size: ItemSize.SMALL,
    subtitle:
      "Enrolled at DR.N.G.P Institute of Technology, pursuing Bachelor of Technology with current GPA: 7.94/10",
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
    title: "Higher Secondary Education",
    size: ItemSize.SMALL,
    subtitle:
      "Completed Higher Secondary Leaving Certificate from AVP Trust National Matric Higher Secondary School with 85% GPA",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Secondary Education",
    size: ItemSize.SMALL,
    subtitle:
      "Completed Secondary School Leaving Certificate from AVP Trust National Matric Higher Secondary School with 71% GPA",
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
