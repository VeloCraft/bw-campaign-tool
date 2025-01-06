export const links = [
  { href: '/', label: 'Home', active: (pathname) => pathname === '/' },
  {
    href: '/campaigns',
    label: 'Campaigns',
    active: (pathname) => pathname.startsWith('/campaigns'),
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
