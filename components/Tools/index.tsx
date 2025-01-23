import { Text, Flex, Heading, Button } from '@radix-ui/themes';
import NextLink from 'next/link';
import SignInWrapper from '@/components/SignInWrapper';

type ComponentProps = {
  user?: User;
};

const links = [
  {
    href: '/tools/floodmap',
    title: 'Floods map',
    description: 'Live crowd-sourced localised flooding information',
  },
];

const Component = ({ user }: ComponentProps) => {
  return (
    <SignInWrapper
      user={user}
      force
      role="admin"
      breadcrumbs={[{ label: 'Tools' }]}
    >
      <Heading as="h1" size="7" mt="8" mb="4" align="center">
        Tools
      </Heading>
      <Flex direction="row" gap="4" align="center" justify="center" wrap="wrap">
        {links.map(
          ({
            href,
            title,
            description,
          }: {
            href: string;
            title: string;
            description: string;
          }) => (
            <Button asChild key={href} variant="outline" size="4">
              <Flex
                direction="column"
                align="center"
                asChild
                style={{ padding: 64 }}
              >
                <NextLink href={href}>
                  <Heading size="6" as="h2">
                    {title}
                  </Heading>
                  <Text size="1" color="gray">
                    {description}
                  </Text>
                </NextLink>
              </Flex>
            </Button>
          ),
        )}
      </Flex>
    </SignInWrapper>
  );
};

export default Component;
