export const identity = {
  name: 'Tanner Phillips',
  headline: 'Security Educator, Engineer & Researcher',
  summary: 'Exploring security operations through education, engineering, and research.',
  github: 'https://github.com/TannerPhillips-SecurityEducation',
  knowledge: 'https://github.com/TannerPhillips-SecurityEducation/Security-Education',
  portfolio: 'https://github.com/TannerPhillips-SecurityEducation/Security-Operations-Portfolio',
};

export const navigation = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about/' },
  { label: 'Projects', path: '/projects/' },
  { label: 'Knowledge', path: '/knowledge/' },
  { label: 'Publications', path: '/publications/' },
  { label: 'Education', path: '/education/' },
  { label: 'Contact', path: '/contact/' },
];

export const work = [
  { title: 'Network Security Operations', status: 'Foundational research', description: 'Exploring the progression from network activity to network telemetry, evidence, and security action.' },
  { title: 'Zeek LDE', status: 'In development', description: 'A Zeek Learning & Development Environment supporting learning, architecture, engineering, development, and analysis.' },
  { title: 'Security Knowledge Hub', status: 'Architecture established', description: 'A hierarchy for navigation with typed cross-domain knowledge relationships.', href: identity.knowledge },
  { title: 'The Foundations of Network Threat Hunting', status: 'Article in development', description: 'Mindset, methodology, evidence assessment, and operational practice for network threat hunting.' },
];

export const sections = [
  {
    slug: 'about', title: 'About',
    intro: 'My work connects cybersecurity practice, engineering, research, and technical education.',
    paragraphs: ['I focus on building clear mental models of complex security systems and connecting those models to practical investigation and engineering.', 'This site distinguishes ideas, working drafts, implementations, and verified results.'],
    topics: [
      { title: 'Security', detail: 'Network security operations, threat hunting, detection, and investigation.' },
      { title: 'Engineering', detail: 'Tools, learning environments, system design, and hands-on experimentation.' },
      { title: 'Education', detail: 'Knowledge transfer, skill development, and mindset development.' },
      { title: 'Research', detail: 'Documenting concepts and methodologies for critical evaluation.' },
    ],
    links: [{ label: 'GitHub profile', href: identity.github }],
  },
  {
    slug: 'projects', title: 'Projects',
    intro: 'Selected engineering, research, and education projects at different stages of maturity.',
    paragraphs: ['Projects will link to source, documentation, demonstrations, and validated results as they become publicly available.'],
    topics: work.map((item) => ({ title: item.title, detail: item.status + ' · ' + item.description })),
    links: [{ label: 'Portfolio repository', href: identity.portfolio }],
  },
  {
    slug: 'knowledge', title: 'Knowledge',
    intro: 'A structured cybersecurity knowledge base: hierarchy for navigation, graph for relationships.',
    paragraphs: ['Foundations provide shared concepts. Domain-specific knowledge develops those ideas without treating domain boundaries as conceptual isolation.'],
    topics: [
      { title: 'Foundations', detail: 'Fundamentals, security foundations, and operational foundations.' },
      { title: 'Network and Endpoint', detail: 'Communications, hosts, telemetry, and defensive practices.' },
      { title: 'Application, Cloud, and Identity', detail: 'Systems, services, permissions, and relationships.' },
      { title: 'Industrial and IoT', detail: 'Operational and connected-device environments.' },
    ],
    links: [{ label: 'Security Education repository', href: identity.knowledge }],
  },
  {
    slug: 'publications', title: 'Publications',
    intro: 'Technical writing and research, with publication status made explicit.',
    paragraphs: ['Working manuscripts are not presented as published or independently validated works. Public editions will be linked when available.'],
    topics: [
      { title: 'The Foundations of Network Threat Hunting', detail: 'Technical article · Work in progress.' },
      { title: 'Network Security Operations', detail: 'Foundational textbook project · Working manuscript.' },
      { title: 'Research and reference materials', detail: 'Additional papers, diagrams, and reference resources · Planned.' },
    ],
    links: [],
  },
  {
    slug: 'education', title: 'Education',
    intro: 'Teaching connects understanding, practical capability, and analytical mindset.',
    paragraphs: ['Explanation, demonstration, guided practice, and assessment should reinforce one another.'],
    topics: [
      { title: 'Knowledge Transfer', detail: 'Develop accurate concepts and foundational understanding.' },
      { title: 'Skill Development', detail: 'Apply knowledge through exercises, labs, investigation, and construction.' },
      { title: 'Mindset Development', detail: 'Practice curiosity, evidence assessment, and reflection.' },
      { title: 'Speaking and Workshops', detail: 'A place for future public talks and training material.' },
    ],
    links: [{ label: 'Browse knowledge materials', href: identity.knowledge }],
  },
  {
    slug: 'contact', title: 'Contact',
    intro: 'Professional connections and collaboration.',
    paragraphs: ['Only verified public destinations appear here. The preferred LinkedIn profile URL, professional email, and other contact channels can be added later.'],
    topics: [
      { title: 'GitHub', detail: 'Explore repositories, work in progress, and public contributions.' },
      { title: 'Collaboration', detail: 'Research, security education, technical writing, and engineering.' },
    ],
    links: [{ label: 'Visit GitHub', href: identity.github }],
  },
] as const;
