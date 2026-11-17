// Education page presentation data.
// Category names and operating functions follow the approved website interview.
// Education and Creation functions are imported from src/data/about.ts.

export const learningOutcomes = [
  {
    name: 'Knowledge & Understanding',
    description: 'Develop accurate mental models of the concepts, systems, and principles being studied.',
  },
  {
    name: 'Skills & Capabilities',
    description: 'Apply knowledge through hands-on practice, investigation, and technical execution.',
  },
  {
    name: 'Confidence',
    description: 'Become more comfortable questioning, experimenting, and applying what has been learned independently.',
  },
] as const;

export const developmentPurposes = [
  {
    name: 'Knowledge Transfer',
    description: 'Building the conceptual and factual understanding needed to engage with a subject.',
  },
  {
    name: 'Skill Development',
    description: 'Developing the ability to perform tasks, use tools, and solve problems in practice.',
  },
  {
    name: 'Mindset Development',
    description: 'Developing the habits of inquiry, judgment, reflection, and evidence-based reasoning that support learning.',
  },
] as const;

export const teachingMethods = [
  {
    name: 'Lecture & Explanation',
    description: 'Introduce concepts, terminology, and the underlying structure of a subject.',
  },
  {
    name: 'Demonstration',
    description: 'Show a concept in operation and make decisions, evidence, and workflows visible.',
  },
  {
    name: 'Guided Practice',
    description: 'Create room for students to apply the material with instruction and support.',
  },
  {
    name: 'Challenges & CTFs',
    description: 'Offer practical opportunities to connect concepts and explore more complex scenarios.',
  },
  {
    name: 'Assessment & Feedback',
    description: 'Check understanding and capability, identify gaps, and improve the learning experience.',
  },
] as const;

export const assessmentRoots = [
  {
    name: 'Knowledge Checks',
    description: 'Assess understanding through questions or other checks of conceptual knowledge.',
  },
  {
    name: 'Practical Assessments',
    description: 'Assess the application of knowledge through tasks, investigation, troubleshooting, construction, or simulation.',
  },
] as const;
