'use client';

import useFirestoreDoc from '@/hooks/useFirestoreDoc';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';
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
import Select from '@/components/Contacts/Select';
import ContactList from '@/components/Contacts/List';
import useUpdateDoc from '@/hooks/useUpdateDoc';

type PageProps = {
  user?: User;
  campaign: Campaign;
};

const Page = ({ user, campaign: _campaign }: PageProps) => {
  const { id }: { id: string } = useParams();
  const { data, loading: _loading } = useFirestoreDoc<Campaign>(
    `campaigns/${id}`,
    true,
  );


  const { data: contacts, contactLoading } =
    useFirestoreCollection<Contact>('contacts');

  // Get the update function from the useUpdateDoc hook
  //const updateDoc = useUpdateDoc();
  const [onUpdate] = useUpdateDoc(`campaigns/${id}`, true);

  const onSubmitContacts = async (selectedContactIds) => {
    //console.log('in submit function', selectedContactIds);
    const updatedCampaign = { ...campaign, contacts: selectedContactIds };
    await onUpdate(updatedCampaign); // Use the update function procedurally
  };



  // Get contact information for ids in campaign.contacts

  // Safely get contact information for ids in campaign.contacts
  const campaignContacts = Array.isArray(campaign?.contacts)
    ? contacts.filter((contact) => campaign.contacts.includes(contact.id))
    : [];


  const campaign = !_loading ? data || _campaign : _campaign;
  const loading = !_campaign && _loading;

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
          {campaign && (
            <AddAction size="1" mt="2" campaign={campaign}>
              Add action
            </AddAction>
          )}
        </Card>

        <Heading mt="2" size="4">
          Relevant documents
        </Heading>
<<<<<<< HEAD
        <DocumentList campaignId={campaign?.id} />
=======
        {campaign && <DocumentList campaignId={campaign?.id} />}
>>>>>>> 5e613cb9ed023fdd88f37fc5ceafb9614d62a3fb
        <AddDocument size="1" mt="2" campaignId={campaign?.id}>
          Add documents
        </AddDocument>
        <Card mt="2">
          <Heading size="4">Contacts</Heading>
          <ContactList contacts={campaignContacts} />
          <Select
            onSubmit={onSubmitContacts}
            contacts={contacts}
            initialValues={campaign?.contacts || []}
            mt="2"
          >
            Assign/unassign contacts
          </Select>
        </Card>
      </Container>
    </SignInWrapper>
  );
};

export default Page;
