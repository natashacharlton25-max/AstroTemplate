export interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

export const links: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/resources', label: 'Resources' },
  { href: '/luna', label: 'Luna' },
  { 
    href: 'https://insights.icthemoon.com/', 
    label: 'Insights', 
    external: true
  },
];