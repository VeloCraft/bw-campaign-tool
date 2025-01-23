export const links = [
  { href: '/', label: 'Home', active: (pathname) => pathname === '/' },
  {
    href: '/campaigns',
    label: 'Campaigns',
    active: (pathname) => pathname.startsWith('/campaigns'),
  },
  {
    href: '/tools',
    label: 'Tools',
    active: (pathname) => pathname.startsWith('/tools'),
  },
  {
    href: '/admin',
    label: 'Admin',
    active: (pathname) => pathname.startsWith('/admin'),
  },
] as {
  href: string;
  label: string;
  active: (pathname: string) => boolean;
}[];
