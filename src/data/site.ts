// Approved site identity and navigation only.
// Section content will be added through the website interview.
export const identity = {
  name: 'Tanner Phillips',
} as const;

// Owner-approved public profile URLs. Do not add email, phone, forms, or location.
export const contactChannels = [
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/securityeducator/',
    description: 'Professional connection and conversations about security, education, and technology.',
    detail: 'linkedin.com/in/securityeducator/',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/TannerPhillips-SecurityEducation',
    description: 'Public code, technical documentation, and project repositories.',
    detail: 'github.com/TannerPhillips-SecurityEducation',
  },
] as const;

export const navigation = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about/' },
  { label: 'Projects', path: '/projects/' },
  { label: 'Knowledge', path: '/knowledge/' },
  { label: 'Publications', path: '/publications/' },
  { label: 'Education', path: '/education/' },
  { label: 'Contact', path: '/contact/' },
] as const;
