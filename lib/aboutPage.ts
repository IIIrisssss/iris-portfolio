import type { Locale } from "@/components/LanguageProvider";

export type AboutProject = {
  title: string;
  highlights: string[];
};

export type AboutExperience = {
  id: string;
  company: string;
  role: string;
  period: string;
  skills: string[];
  projects: AboutProject[];
};

export type AboutEducation = {
  school: string;
  degree: string;
  period: string;
};

export type AboutPageCopy = {
  heroEyebrow: string;
  heroAriaLabel: string;
  experienceEyebrow: string;
  experienceTitle: string;
  educationEyebrow: string;
  educationTitle: string;
  skillsAriaLabel: string;
  downloadLabel: string;
  downloadAriaLabel: string;
};

export type AboutPageData = {
  copy: AboutPageCopy;
  profile: {
    name: string;
    role: string;
    summary: string;
    photoAlt: string;
  };
  education: AboutEducation[];
  experience: AboutExperience[];
};

export const aboutAssets = {
  photo: "/about/profile.webp",
  resumeHref: "/about/resume.pdf",
  resumeDownloadName: "李妍-17876520519-视觉设计师.pdf",
};

const aboutPageData: Record<Locale, AboutPageData> = {
  zh: {
    copy: {
      heroEyebrow: "Portfolio",
      heroAriaLabel: "个人介绍",
      experienceEyebrow: "Experience",
      experienceTitle: "Work History",
      educationEyebrow: "Education",
      educationTitle: "Background",
      skillsAriaLabel: "核心技能",
      downloadLabel: "下载简历",
      downloadAriaLabel: "下载简历",
    },
    profile: {
      name: "李妍 LIYAN",
      role: "创意设计师 | 海外设计",
      summary:
        "作为创意视觉设计师，我擅长平面设计，并能熟练驾驭从概念设定到动态演绎的 AIGC 全链路。具备本地化与国际化设计逻辑，拥有跨国项目落地经验。依托良好的英语沟通与跨部门协作优势，确保方案精准交付，并始终对前沿技术与设计边界保持强烈好奇。",
      photoAlt: "李妍 LIYAN 个人照片",
    },
    education: [
      {
        school: "皇家艺术学院",
        degree: "硕士 · 信息体验设计",
        period: "2023.09-2024.09",
      },
      {
        school: "江南大学",
        degree: "本科 · 服装与服饰设计",
        period: "2019.09-2023.06",
      },
    ],
    experience: [
      {
        id: "bytedance",
        company: "字节跳动",
        role: "TikTok-Ug-创意设计师（外包）",
        period: "2025.10-至今",
        skills: ["AIGC 提效", "本地化设计", "AI动态", "AI WORKFLOW"],
        projects: [
          {
            title:
              "TikTok World Cup Campaign（负责 9+ Promotion 设计，6+ 玩法设计）",
            highlights: [
              "视觉本地化定调：汲取日本热血足球漫画内核，结合 3D 转 2D 艺术化渲染技术与激励 IP 角色设计，打造极具张力的本土差异化视觉。",
              "核心玩法换肤与落地：负责 6 大核心增长玩法的换肤设计，精细打磨日文排版；与 RD/QA 团队完成前端多端适配，保障高保真上线。",
              "AIGC 提效：优化 AIGC 生成视觉链路，推动 AI 在玩法设计全流程中的使用占比，相比传统流程提效 70%-60%。",
            ],
          },
          {
            title: "TikTok Lite 日韩本地化推视觉与 AIGC 创意探索",
            highlights: [
              "日韩本地化地推模板：针对日韩线下拉新需求，设计标准化模板，梳理统一品牌视觉规范。",
              "探索 IP 的 AIGC 动态表达边界：应用 AI 生图与前沿视频生成工具，独立完成 IP 动态表情包及「樱花季」概念短视频的设计包装。",
            ],
          },
        ],
      },
      {
        id: "manwan",
        company: "漫玩集团有限公司",
        role: "品牌设计师",
        period: "2024.4-2025.8",
        skills: ["品牌视觉", "新媒体运营", "版式系统"],
        projects: [
          {
            title: "MAVA 漫玩品牌新媒体视觉升级",
            highlights: [
              "全平台运营视觉体系标准化：独立主导小红书等多平台的运营模板视觉重构，建立规范化设计输出规范，驱动流量转化。",
              "优化公众号版式与阅读体验：重构长图文阵地版式，重新梳理图文视觉动线，优化用户的阅读沉浸感。",
            ],
          },
        ],
      },
    ],
  },
  en: {
    copy: {
      heroEyebrow: "Portfolio",
      heroAriaLabel: "Profile introduction",
      experienceEyebrow: "Experience",
      experienceTitle: "Work History",
      educationEyebrow: "Education",
      educationTitle: "Background",
      skillsAriaLabel: "Core skills",
      downloadLabel: "Download Resume",
      downloadAriaLabel: "Download resume",
    },
    profile: {
      name: "李妍 LIYAN",
      role: "Creative Designer | Global Design",
      summary:
        "As a creative visual designer, I specialize in graphic design and the full AIGC pipeline—from concept to motion. I bring both localization and international design logic, with hands-on experience delivering cross-border projects. Strong English communication and cross-functional collaboration help me ship precise solutions, while staying deeply curious about emerging technology and the edges of design.",
      photoAlt: "Portrait of LIYAN",
    },
    education: [
      {
        school: "Royal College of Art",
        degree: "MA · Information Experience Design",
        period: "Sep 2023 – Sep 2024",
      },
      {
        school: "Jiangnan University",
        degree: "BA · Fashion & Apparel Design",
        period: "Sep 2019 – Jun 2023",
      },
    ],
    experience: [
      {
        id: "bytedance",
        company: "ByteDance",
        role: "TikTok UG Creative Designer (Contract)",
        period: "Oct 2025 – Present",
        skills: ["AIGC Efficiency", "Localization Design", "AI Motion", "AI WORKFLOW"],
        projects: [
          {
            title:
              "TikTok World Cup Campaign (9+ promotion designs, 6+ gameplay designs)",
            highlights: [
              "Visual localization direction: drew from Japanese sports-manga energy, combined 3D-to-2D art direction with incentive IP character design to build high-impact, locally differentiated visuals.",
              "Core gameplay reskin & launch: led reskin design for six growth playbooks, refined Japanese typography, and partnered with RD/QA for multi-platform front-end adaptation to ensure high-fidelity release.",
              "AIGC efficiency: optimized AIGC visual pipelines and expanded AI usage across gameplay design, improving efficiency by 60%–70% versus traditional workflows.",
            ],
          },
          {
            title:
              "TikTok Lite JP/KR offline campaign visuals & AIGC creative exploration",
            highlights: [
              "JP/KR offline acquisition templates: designed standardized templates for on-the-ground user acquisition and unified brand visual guidelines.",
              "Exploring AIGC motion for IP: used AI image and video tools to independently deliver IP sticker packs and a Sakura Season concept short-form video package.",
            ],
          },
        ],
      },
      {
        id: "manwan",
        company: "Manwan Group Co., Ltd.",
        role: "Brand Designer",
        period: "Apr 2024 – Aug 2025",
        skills: ["Brand Visual", "Social Media", "Layout Systems"],
        projects: [
          {
            title: "MAVA brand social media visual refresh",
            highlights: [
              "Cross-platform visual system: independently rebuilt operating templates for Xiaohongshu and other channels, establishing standardized design output to drive conversion.",
              "WeChat long-form layout refresh: restructured editorial layouts, clarified visual flow, and improved reading immersion across long-form content.",
            ],
          },
        ],
      },
    ],
  },
};

export function getAboutPageData(locale: Locale): AboutPageData {
  return aboutPageData[locale];
}

/** @deprecated Use getAboutPageData(locale) instead */
export const aboutProfile = {
  name: aboutPageData.zh.profile.name,
  role: aboutPageData.zh.profile.role,
  summary: aboutPageData.zh.profile.summary,
  photo: aboutAssets.photo,
  photoAlt: aboutPageData.zh.profile.photoAlt,
  resumeHref: aboutAssets.resumeHref,
  resumeDownloadName: aboutAssets.resumeDownloadName,
};

/** @deprecated Use getAboutPageData(locale) instead */
export const aboutEducation = aboutPageData.zh.education;

/** @deprecated Use getAboutPageData(locale) instead */
export const aboutExperience = aboutPageData.zh.experience;
