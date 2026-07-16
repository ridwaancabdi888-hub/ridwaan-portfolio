export const personalInfo = {
  fullName: "Ridwaan Apdirahman Mohamed",
  initials: "RM",
  title: "Full-Stack Web Developer, System Developer & Prompt Engineer",
  secondaryTitle: "Software Engineering Student",
  rotatingTitles: [
    "Full-Stack Web Developer",
    "System Developer",
    "Prompt Engineer",
    "Software Engineering Student",
  ],
  location: "Hargeisa, Somaliland",
  university: "Gollis University",
  degree: "Bachelor of Software Engineering",
  studyPeriod: "2023–2027",
  educationLevel: "Form 4 completed",
  email: "rfeeraari8@gmail.com",
  whatsappNumber: "+252 63 4199277",
  whatsappLink: "https://wa.me/252634199277",
  whatsappPrefilledMessage:
    "Hello Ridwaan, I visited your portfolio and would like to discuss a project or professional opportunity with you.",
  githubUsername: "ridwaancabdi888-hub",
  githubUrl: "https://github.com/ridwaancabdi888-hub",
  linkedinUsername: "ridwancabdi-9a7770341",
  linkedinUrl: "https://www.linkedin.com/in/ridwancabdi-9a7770341/",
  avatarUrl: "https://avatars.githubusercontent.com/u/284196008?v=4",
  siteUrl: "https://ridwaan-portfolio.vercel.app/",
  resumePdfPath: "/resume/Ridwaan-Apdirahman-Mohamed-CV.pdf",

  availabilityShort:
    "Available for internships, junior roles, freelance projects and collaboration.",

  heroIntro: "Hello, my name is",
  heroDescription:
    "I design and build modern websites, full-stack management systems, REST APIs and database-driven software solutions. I also use prompt engineering to plan, document and develop complete technical projects.",

  bio: `I am Ridwaan Apdirahman Mohamed, an advanced Full-Stack Web Developer, System Developer, Prompt Engineer and Software Engineering student at Gollis University in Hargeisa, Somaliland.

I build modern websites, database-driven management systems, REST APIs and practical software solutions using frontend, backend and database technologies. I am also interested in mobile development, networking, GIS, artificial intelligence and using prompt engineering to plan and build complete software projects.

I enjoy transforming real-world problems into organized, secure and user-friendly digital systems. My goal is to continue developing my technical skills, contribute to meaningful projects and build reliable software solutions for organizations and communities.`,

  aboutStats: [
    { label: "Major full-stack projects", value: "3+" },
    { label: "Currently", value: "Software Engineering student" },
    { label: "Graduation target", value: "2027" },
  ],

  aboutCards: [
    { label: "Location", value: "Hargeisa, Somaliland" },
    { label: "Education", value: "Bachelor of Software Engineering" },
    { label: "University", value: "Gollis University" },
    { label: "Study period", value: "2023–2027" },
    { label: "Skill level", value: "Advanced" },
    {
      label: "Specializations",
      value: "Full-Stack Development, System Development & Prompt Engineering",
    },
    {
      label: "Availability",
      value: "Internships, junior roles, freelance projects and collaboration",
    },
  ],

  seekingRoles: [
    "Internships",
    "Junior and entry-level development roles",
    "Freelance system-development projects",
    "Web-development projects",
    "Prompt-engineering opportunities",
    "Collaboration opportunities",
  ],

  languages: [
    { name: "Somali", level: "Native" },
    { name: "English", level: "Good working proficiency" },
  ],
} as const;

export type PersonalInfo = typeof personalInfo;
