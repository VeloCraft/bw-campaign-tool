'use client';

import useFirestoreDoc from '@/hooks/useFirestoreDoc';
import { Container, Flex, Box, Heading, Card } from '@radix-ui/themes';
import SignInWrapper from '@/components/SignInWrapper';
import { useParams } from 'next/navigation';
import GoalList from '@/components/Goals/List';
import AddAction from '@/components/Actions/Add';
import ActionList from '@/components/Actions/List';
import ReactMarkdown from 'react-markdown';
import Edit from '@/components/Campaigns/Edit';
import StatusBadge from '@/components/Campaigns/StatusBadge';
import DocumentList from '@/components/Documents/List';
import AddDocument from '@/components/Documents/Add';

type PageProps = {
  user?: User;
};

const Page = ({ user }: PageProps) => {
  const { id }: { id: string } = useParams();
  const { data: campaign, loading } = useFirestoreDoc<Campaign>(
    `campaigns/${id}`,
    true,
  );

  return (
    <SignInWrapper
      force
      user={user}
      loading={loading}
      breadcrumbs={[
        {
          label: 'Campaigns',
          href: '/campaigns',
        },
        {
          label: loading ? 'Loading...' : campaign?.name,
        },
      ]}
    >
      <Container size="3" pb="6">
        <Flex direction="row" align="center" gap="2" mt="8">
          <Heading>{campaign?.name}</Heading>

          <Box flexGrow="1" />
          <StatusBadge status={campaign?.status} />

          <Edit
            ml="auto"
            docId={campaign?.id}
            variant="outline"
            color="green"
            size="1"
            loading={loading}
            name={campaign?.name}
            description={campaign?.description}
            status={campaign?.status}
            contribution={campaign?.contribution}
          >
            Edit campaign
          </Edit>
        </Flex>

        <Flex
          direction={{ initial: 'column', md: 'row' }} // Stacks on narrow viewports, side-by-side on large viewports
          wrap="nowrap"
          gap="4"
          mt="4"
        >
          <Flex
            flexGrow="1"
            wrap="nowrap"
            direction="column"
            maxWidth={{ initial: '100%', md: '60%' }}
            /// Full width when stacked, takes two-thirds on large viewports
          >
            <Box mb="4">
              <Heading size="4">Background</Heading>
              <ReactMarkdown>
                {campaign?.description ||
                  "No information available - select 'edit campaign' to add more details"}
              </ReactMarkdown>
            </Box>
            {/* hide this box if campaign.contribution is null*/}
            {campaign?.contribution && (
              <>
                <Heading size="4">How can you help?</Heading>
                <ReactMarkdown>{campaign?.contribution}</ReactMarkdown>
              </>
            )}
          </Flex>

          <Box flexShrink="5" flexGrow="5" mb="4">
            <GoalList goals={campaign?.goals} loading={loading} docId={id} />
          </Box>
        </Flex>

        <Card>
          <Heading size="4">Actions</Heading>
          <ActionList />
          <AddAction size="1" mt="2" campaign={campaign}>
            Add action
          </AddAction>
        </Card>

        <Heading mt="2" size="4">Relevant documents</Heading>
        <DocumentList campaignId={campaign?.id} />
        <AddDocument size="1" mt="2" campaignId={campaign?.id}>
          Add documents
        </AddDocument>
      </Container>
    </SignInWrapper>
  );
};

export default Page;
