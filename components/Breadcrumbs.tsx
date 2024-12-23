import React from 'react';
import { Link, Flex, Text, Box } from '@radix-ui/themes';
import NextLink from 'next/link';
import { ChevronRightIcon } from '@radix-ui/react-icons';

type BreadcrumbsProps = {
  items?: Breadcrumb[];
};

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  if (!items?.length) return <Box />;
  return (
    <Flex gap="2" align="center">
      {items.map((breadcrumb: Breadcrumb) => (
        <React.Fragment key={`${breadcrumb.href}-${breadcrumb.label}`}>
          <ChevronRightIcon />
          {breadcrumb.href ? (
            <Box asChild>
              <Link asChild>
                <NextLink shallow href={breadcrumb.href}>
                  <Text size="4">{breadcrumb.label}</Text>
                </NextLink>
              </Link>
            </Box>
          ) : (
            <Text size="4">{breadcrumb.label}</Text>
          )}
        </React.Fragment>
      ))}
    </Flex>
  );
};

export default Breadcrumbs;
