import React from 'react';
import { Box, Callout, Flex } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import Wrapper from '@/components/Wrapper';
import Embed from '@/components/Floods/Embed';
import { db } from '@/helpers/firebaseAdmin';
import type { DocumentSnapshot, QuerySnapshot } from 'firebase/firestore';

export default async function ListenerPage() {
  let result: [DocumentSnapshot, QuerySnapshot] | null = null;
  try {
    result = await Promise.all([
      db.doc('floods/root').get(),
      db.collection('stations').get(),
    ]);
  } catch (error) {
    console.error(error);
  }
  if (!result) return null;
  const [rootRoutesData, stationsData] = result;
  const rootRoutes = rootRoutesData.data() as RootRoutes;
  const stations = stationsData.docs
    .map((doc) => ({ ...doc.data(), id: doc.id }) as Station)
    .map((station) => ({
      ...station,
      updatedAt: station.updatedAt._seconds * 1000,
    }));
  return (
    <Wrapper noStatus>
      <Flex direction="column" width="100%" height="100%" align="center">
        <Box asChild mt="4" style={{ borderRadius: 0 }}>
          <Callout.Root style={{ width: '100%' }}>
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              Flood levels are crowdsourced and may not be accurate. Select a
              route to view detailed levels or report a change.
            </Callout.Text>
          </Callout.Root>
        </Box>
        <Box width="100%" flexGrow="1" pt="2">
          <Embed rootRoutes={rootRoutes} stations={stations} />
        </Box>
      </Flex>
    </Wrapper>
  );
}
