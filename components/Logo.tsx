// import icon from '@/app/logo.svg';
import Image from 'next/image';
import { Link, Flex, Heading } from '@radix-ui/themes';
import NextLink from 'next/link';

const Logo = () => {
  return (
    <Flex align="center" direction="row" gap="4">
      <Image
        src="/bike_worcester-logo-badge-512.png"
        alt="Bike Worcester logo"
        width={48}
        height={48}
      />
      <Heading size="5" asChild>
        <Link asChild>
          <NextLink href="/">Campaigns</NextLink>
        </Link>
      </Heading>
    </Flex>
  );
};

export default Logo;
