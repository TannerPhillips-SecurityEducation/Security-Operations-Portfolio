// Public, approved professional context. Personal and operational details stay private.
export const milestones = [
  {
    year: '2014',
    title: 'A beginning in the U.S. Navy',
    summary: 'I graduated from high school and joined the U.S. Navy. I was beginning a path that would eventually bring together technical operations, security analysis, and education.',
    more: 'I did not begin with an elaborate professional roadmap. My work developed through learning, practice, and increasing responsibility. That period established the setting for the years of cyber operations that followed.',
    reflection: 'The value of technical understanding became clearest to me when it had to support real decisions rather than remain an abstract explanation.',
  },
  {
    year: '2015',
    title: 'The 90th Cyber Protection Team',
    summary: 'I joined the 90th Cyber Protection Team as a Cryptologic Technician Networks (CTN), a rating now known as Cyber Warfare Technician (CWT).',
    more: 'I spent approximately my first two years in Cyber Threat Emulation, then moved into Cyber Threat Hunting for the remainder of my Navy service. Those roles provided different perspectives on the same fundamental problem: understanding how activity unfolds within technical systems.',
    reflection: 'Studying adversarial behavior and looking for evidence of it both reinforced the importance of separating what happened from what an analyst believes happened.',
  },
  {
    year: '2020',
    title: 'From operations to education at Elastic',
    summary: 'I completed my Navy service and joined Elastic Security Education. Teaching became my primary responsibility, with curriculum development as an additional part of the role.',
    more: 'My instruction brought together packet analysis with Wireshark and tcpdump, intrusion detection with Suricata, network log analytics with Zeek, searching in Elastic, and a guided hunt using CTFd and Kibana. I also contributed to maintaining and developing educational material as needed.',
    reflection: 'Explaining a system to someone encountering it for the first time requires a different kind of precision. It is not enough to know the steps; the underlying concepts and decisions must become visible.',
  },
  {
    year: '2025',
    title: 'Education and creation at Corelight',
    summary: 'I joined Corelight Security Education, where delivering learning experiences and developing them are both primary responsibilities.',
    more: 'I describe my work through two complementary modes: Education, which focuses on learners and instruction, and Creation, which focuses on the resources, architecture, labs, and methods that make education possible.',
    reflection: 'The strongest learning systems can improve through the experience of teaching them. What I observe during instruction informs what I design, develop, and refine afterward.',
  },
] as const;

export const education = [
  ['Prepare','Review objectives, materials, labs, and learner readiness'],
  ['Instruct','Explain concepts, architectures, methodologies, and practices'],
  ['Demonstrate','Show how concepts are applied through real technical workflows'],
  ['Facilitate','Guide labs, discussions, exercises, and collaborative learning'],
  ['Support','Troubleshoot challenges, mentor learners, and adapt instruction'],
  ['Assess','Evaluate knowledge, practical capabilities, and understanding'],
  ['Reflect','Evaluate the learning experience and identify improvements'],
] as const;

export const creation = [
  ['Analyze','Identify learning needs, requirements, audiences, and objectives'],
  ['Architect','Structure curricula, learning pathways, modules, and relationships'],
  ['Design','Plan instructional experiences, exercises, assessments, and interactions'],
  ['Develop','Create slides, documentation, lab guides, reference materials, and assessments'],
  ['Engineer','Build technical laboratories, demonstrations, simulations, and learning environments'],
  ['Validate','Test technical accuracy, instructional effectiveness, and learner usability'],
  ['Evolve','Maintain, revise, and improve educational resources and experiences'],
] as const;

export const elasticDays = [
  ['Day 1','Packet Analysis','Wireshark and tcpdump'],
  ['Day 2','Intrusion Detection','Suricata'],
  ['Day 3','Network Log Analytics','Zeek and Linux CLI'],
  ['Day 4','Elastic & Search','Elastic and Kibana'],
  ['Day 5','Guided Threat Hunt','Suricata and Zeek logs within CTFd and Kibana'],
] as const;

export const capabilities = [
  {
    name: 'Cybersecurity',
    description: 'I learned security through work that asked me to understand both adversarial behavior and the evidence defenders can recover. Cyber Threat Emulation and Cyber Threat Hunting are different practices, but they sharpen related questions: what could an adversary do, what would that activity change, and which observations could support a defensible conclusion?',
    perspective: 'I approach suspicious activity as a problem of uncertainty rather than a label waiting to be attached. An interesting signal may justify further investigation without proving malicious intent. That distinction matters when the available telemetry is incomplete.',
    example: 'My Navy roles included roughly two years in Cyber Threat Emulation followed by Cyber Threat Hunting. Later, I taught guided threat hunting using Suricata detections and Zeek logs with CTFd and Kibana at Elastic.',
    practices: ['Cyber Threat Emulation','Cyber Threat Hunting','Incident Response concepts'],
    methods: ['Network security operations','Suricata','Zeek','Kibana'],
    evidence: 'Navy threat emulation and hunting experience, followed by threat hunting education at Elastic. Specific operational details are not public.',
    scope: 'This section describes my background and the concepts I work with; it does not claim that confidential operations or tools are available for inspection.',
  },
  {
    name: 'Network Engineering & Analysis',
    description: 'Networks are particularly interesting to me because their activity can be examined at multiple levels. A packet exposes one view, a connection summarizes another, and protocol records reveal details that neither can convey alone. To understand a network event, I want to know what was observable, how it was captured, and what information may be missing.',
    perspective: 'I tend to move between raw observations and higher-level context. A packet capture can help answer one question; a Zeek log or Suricata alert can help answer another. Neither is a universal substitute for the others.',
    example: 'At Elastic, I taught packet analysis with Wireshark and tcpdump, intrusion detection with Suricata, and network log analytics using Zeek and the Linux command line.',
    practices: ['Packet Analysis','Protocol Analysis','Network Telemetry Analysis'],
    methods: ['Wireshark','tcpdump','Suricata','Zeek','Linux CLI'],
    evidence: 'Historical technical instruction built around packet capture, protocol behavior, detection, and network-derived logs.',
    scope: 'Network engineering and analysis are related but distinct activities. The examples here emphasize my documented analysis and instructional experience.',
  },
  {
    name: 'Security Engineering',
    description: 'I am drawn to the architecture beneath security tools: what information enters a system, how that information is transformed, what assumptions are encoded in a rule or workflow, and what a user can reasonably conclude from the output. I want systems to be understandable, testable, and useful under real conditions.',
    perspective: 'That interest carries into technical learning environments. A demonstration or lab is itself an engineered system. It needs a clear objective, reliable inputs, observable behavior, sensible failure modes, and enough documentation that a learner can understand what happened.',
    example: 'At Corelight, my Creation responsibilities include engineering demonstrations, laboratories, and other technical resources for learning. I also explore systems and software through personal experiments.',
    practices: ['Security System Architecture','Technical Lab Engineering','Detection Engineering concepts'],
    methods: ['Practical laboratories','Technical demonstrations','System design'],
    evidence: 'Creation responsibilities within Corelight Security Education, alongside broader technical experimentation. Individual work artifacts are shown publicly only when released and authorized.',
    scope: 'These are areas of practice and design focus, not claims of particular production deployments or published applications.',
  },
  {
    name: 'Education & Instruction',
    description: 'Technical education is not simply presenting information I already understand. It means finding the structure of a subject and creating a path by which another person can discover it. A useful explanation should survive the moment the learner leaves the classroom and encounters a slightly different problem.',
    perspective: 'I connect explanation with demonstration and practice. I also make room for questions, mistakes, and different learning speeds. When someone struggles, I want to identify the missing connection; when someone finishes early, I want there to be another meaningful problem to explore.',
    example: 'Education was my primary responsibility at Elastic. At Corelight, both Education and Creation are primary responsibilities, encompassing instruction as well as curriculum design, development, and improvement.',
    practices: ['Technical Instruction','Curriculum Development','Knowledge Checks and Practical Assessments'],
    methods: ['Guided practice','CTFd','Kibana','Demonstrations','Labs'],
    evidence: 'Professional security education responsibilities across Elastic and Corelight. The Education section describes my underlying teaching approach.',
    scope: 'Teaching methods and educational outcomes are documented separately from the subject matter housed in the Knowledge library.',
  },
  {
    name: 'Computing & Development',
    description: 'Computing gives me a place to turn conceptual models into behavior I can observe. I enjoy programming, automation, system architecture, and exploring what becomes possible when tools or technologies are combined in unexpected ways.',
    perspective: 'My interest is as much about experimentation as finished software. I like understanding the constraints of a platform, building a small test around an assumption, and revising a design when the result contradicts what I expected.',
    example: 'Outside formal instruction, I explore software experiments, home laboratories, automation, artificial intelligence, and computational models. My interest in procedural generation and simulation also connects this work to game development and worldbuilding.',
    practices: ['Programming','Automation','Systems Engineering'],
    methods: ['Personal software experiments','Home laboratories','Computational models'],
    evidence: 'Personal exploration described in my Interests section. The public Projects gallery is reserved for work with an explicitly selected, demonstrable result.',
    scope: 'An area of active exploration is not automatically a completed project or a claim of professional mastery.',
  },
] as const;
