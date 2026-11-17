// Approved site identity and navigation only.
// Section content will be added through the website interview.
export const identity = {
  name: 'Tanner Phillips',
} as const;

export const navigation = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about/' },
  { label: 'Projects', path: '/projects/' },
  { label: 'Knowledge', path: '/knowledge/' },
  { label: 'Publications', path: '/publications/' },
  { label: 'Education', path: '/education/' },
  { label: 'Contact', path: '/contact/' },
] as const;
