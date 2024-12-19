'use client';

import useFirestoreDoc from '@/hooks/useFirestoreDoc';
import { Container, Flex, Box, Heading, Text } from '@radix-ui/themes';
import SignInWrapper from '@/components/SignInWrapper';
import { useParams } from 'next/navigation';

const Page = () => {
  const { id }: { id: string } = useParams();
  const { data: campaign, loading } = useFirestoreDoc<Campaign>(
    `campaigns/${id}`,
  );

  return (
    <SignInWrapper force loading={loading}>
      <Container size="3">
        <Flex direction="row" align="top" justify="center" mt="8">
          <Heading>Campaign: {campaign?.name}</Heading>
          <Box flexGrow="1" />
        </Flex>

        <Flex
          direction={{ initial: 'column', md: 'row' }} // Stacks on narrow viewports, side-by-side on large viewports
          wrap="nowrap"
          gap="4"
          mt="4"
        >
          <Box
            flex={{ initial: 'none', md: '2' }} // Full width when stacked, takes two-thirds on large viewports
          >
            <Box mb="4">
              <Heading size="4">Description</Heading>
              <Text>{campaign?.description}</Text>
            </Box>
            <Box mb="4">
              <Heading size="4">Status</Heading>
              <Text>{campaign?.status}</Text>
            </Box>
            <Box>
              <Heading size="4">Contribution</Heading>
              <Text>{campaign?.contribution}</Text>
            </Box>
          </Box>

          <Box
            flex={{ initial: 'none', md: '1' }} // Full width when stacked, takes one-third on large viewports
          >
            <Heading size="4">Campaign Goals</Heading>
            {/* Render campaign goals */}
          </Box>
        </Flex>
      </Container>
    </SignInWrapper>
  );
};

export default Page;
