// Approved About-site facts and frameworks. No private or sensitive details.
export const milestones = [
  { year:'2014', title:'Graduation & U.S. Navy', summary:'I graduated from high school and joined the U.S. Navy.', more:'My Navy service continued until 2020.' },
  { year:'2015', title:'90th Cyber Protection Team', summary:'I joined the 90th Cyber Protection Team as a Cryptologic Technician Networks (CTN).', more:'Now called Cyber Warfare Technician (CWT), this rating was part of my work in cyber operations. I began with approximately two years in Cyber Threat Emulation and later transitioned to Cyber Threat Hunting.' },
  { year:'2020', title:'Elastic Security Education', summary:'I left the Navy and joined Elastic Security Education.', more:'My primary responsibility was Education, with Curriculum Development as a secondary responsibility.' },
  { year:'2025', title:'Corelight Security Education', summary:'I joined Corelight’s Security Education team.', more:'My two primary functional roles are Educator and Curriculum Developer, organized as Education and Creation modes.' },
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
    name:'Cybersecurity',
    description:'My work has included both adversarial and defensive security practices.',
    practices:['Cyber Threat Emulation','Cyber Threat Hunting','Incident Response'],
    methods:['Network security operations','Suricata','Zeek','Kibana'],
    evidence:'Navy threat emulation and hunting experience; threat hunting education delivered at Elastic.',
  },
  {
    name:'Network Engineering & Analysis',
    description:'I work with packets, protocols, network telemetry, and evidence drawn from network activity.',
    practices:['Packet Analysis','Protocol Analysis','Network Telemetry Analysis'],
    methods:['Wireshark','tcpdump','Suricata','Zeek','Linux CLI'],
    evidence:'Instruction in packet analysis, intrusion detection, and network log analytics at Elastic.',
  },
  {
    name:'Security Engineering',
    description:'I connect security concepts with technical demonstrations, labs, and security system designs.',
    practices:['Detection Engineering','Tool Development','Security Systems'],
    methods:['Practical laboratories','Technical demonstrations','System design'],
    evidence:'Corelight Creation Mode includes engineering labs and technical learning environments. This is not a claim of a specific public software release.',
  },
  {
    name:'Education & Instruction',
    description:'I create and facilitate learning experiences that develop understanding, skills, and confidence.',
    practices:['Technical Instruction','Curriculum Development','Practical Assessments'],
    methods:['Guided practice','CTFd','Kibana','Demonstrations','Labs'],
    evidence:'Primary education duties at Elastic; both education and curriculum development are primary at Corelight.',
  },
  {
    name:'Computing & Development',
    description:'I explore software, automation, programming, and systems through hands-on experimentation.',
    practices:['Programming','Automation','Systems Engineering'],
    methods:['Personal software experiments','Home laboratories','Computational models'],
    evidence:'Ongoing personal exploration described in my Interests section, not a verified public project release.',
  },
] as const;
