import { Flex, Heading, Button } from '@radix-ui/themes';
import NextLink from 'next/link';
import SignInWrapper from '@/components/SignInWrapper';

const links = [
  { href: '/admin/users', title: 'Users' },
  { href: '/admin/roles', title: 'Roles' },
];

const Component = ({ user }: { user?: User }) => (
  <SignInWrapper
    user={user}
    force
    role="admin"
    breadcrumbs={[{ label: 'Admin' }]}
  >
    <Heading as="h1" size="7" mt="8" mb="4" align="center">
      Admin
    </Heading>
    <Flex direction="row" gap="4" align="center" justify="center" wrap="wrap">
      {links.map(({ href, title }: { href: string; title: string }) => (
        <Heading asChild size="2" as="h2" style={{ padding: 64 }} key={href}>
          <Button asChild key={href} variant="outline" size="4">
            <NextLink href={href} shallow>
              {title}
            </NextLink>
          </Button>
        </Heading>
      ))}
    </Flex>
  </SignInWrapper>
);

export default Component;
