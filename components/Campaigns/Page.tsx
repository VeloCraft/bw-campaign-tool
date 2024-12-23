'use client';

import useFirestoreDoc from '@/hooks/useFirestoreDoc';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';

import { where} from "firebase/firestore";
import { Container, Flex, Box, Heading, Text } from '@radix-ui/themes';
import SignInWrapper from '@/components/SignInWrapper';
import { useParams } from 'next/navigation';
import GoalList from '@/components/Goals/List';
import AddAction from '@/components/Actions/Add';
import ActionList from '@/components/Actions/List';
import { auth } from '@/helpers/firebase';

const Page = () => {
  const { id }: { id: string } = useParams();
  const { data: campaign, loading } = useFirestoreDoc<Campaign>(
    `campaigns/${id}`, true
  );

  const {data: actions, loading: loadingActions} = useFirestoreCollection<Action>('actions', true, where("campaign.id", "==", id))
  


  const user = auth.currentUser;

  return (
    <SignInWrapper force loading={loading}>
      <Container size="3">
        <Flex direction="row" justify="center" mt="8">
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
            flexGrow={{ initial: 'none', md: '2' }} // Full width when stacked, takes two-thirds on large viewports
          >
            <Box mb="4">
              <Heading size="4">Background</Heading>
              <Text>{campaign?.description}</Text>
            </Box>
            <Box mb="4">
              <Heading size="4">Status</Heading>
              <Text>{campaign?.status}</Text>
            </Box>
            <Box>
              <Heading size="4">How can you help?</Heading>
              <Text>{campaign?.contribution}</Text>
            </Box>
          </Box>

          <Box
            flexGrow={{ initial: 'none', md: '1' }} // Full width when stacked, takes one-third on large viewports
          >
          <GoalList goals={campaign?.goals} loading={loading} docId={id} />
          </Box>

        </Flex>
        <Flex direction="row" justify="center" mt="4">
          <Heading size="4">Actions</Heading>
          <Box flexGrow="1" />
        </Flex>
        <Flex direction="row" mt="2">
          <ActionList actions={actions} loading={loadingActions} />
          <Box flexGrow="1"/>
        </Flex>
          <Box>
            <AddAction size="1" mt="2" campaign={{id: id, name: campaign?.name}} user={{id: user?.uid, name: user?.displayName, email: user?.email}}>
              Add action
            </AddAction>
            </Box>
      </Container>
    </SignInWrapper>
  );
};

export default Page;
