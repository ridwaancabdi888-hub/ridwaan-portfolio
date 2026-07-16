export type EducationEntry = {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  period: string;
  description?: string;
  areas?: string[];
};

export const educationTimeline: EducationEntry[] = [
  {
    id: "gollis-university",
    degree: "Bachelor of Software Engineering",
    institution: "Gollis University",
    location: "Hargeisa, Somaliland",
    period: "2023–2027",
    areas: [
      "Web Development",
      "Programming",
      "Database Systems",
      "Computer Networking",
      "Software Engineering",
      "Operating Systems",
      "System Analysis and Design",
      "Project Documentation",
    ],
  },
  {
    id: "form-4",
    degree: "Form 4 Completed",
    institution: "Secondary Education",
    period: "Completed",
  },
];

export const practicalExperience = [
  {
    id: "system-development",
    title: "System Development",
    items: [
      "Planning software requirements",
      "Designing management systems",
      "Building frontend and backend applications",
      "Designing databases",
      "Implementing user roles and authentication",
      "Testing systems",
      "Writing technical documentation",
    ],
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    items: [
      "Creating detailed prompts for AI coding assistants",
      "Turning project requirements into structured development instructions",
      "Creating debugging and correction prompts",
      "Creating prompts for system design and documentation",
      "Using Claude Code, Codex and other AI development tools",
      "Reviewing AI-generated code and requesting improvements",
    ],
  },
  {
    id: "github-development",
    title: "GitHub Project Development",
    items: [
      "Building and maintaining public software projects",
      "Using Git and GitHub",
      "Organizing repositories",
      "Writing README documentation",
      "Testing and improving projects",
    ],
  },
];
