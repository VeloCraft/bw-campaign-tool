import React from 'react';
import { Box, Flex } from '@radix-ui/themes';
import { db } from '@/helpers/firebaseAdmin';
import type { DocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import Floods from '@/components/Floods';
import SignInWrapper from '@/components/SignInWrapper';

export default async function Page() {
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
    <React.Suspense>
      <SignInWrapper
        breadcrumbs={[
          { label: 'Tools', href: '/tools' },
          { label: 'Flood map', href: '/tools/floodmap' },
          { label: 'Edit' },
        ]}
        force
        innerProps={{ p: '0' }}
      >
        <Flex direction="column" width="100%" height="100%" align="center">
          <Box width="100%" flexGrow="1" pt="2">
            <Floods
              height="100%"
              editable
              rootRoutes={rootRoutes}
              stations={stations}
            />
          </Box>
        </Flex>
      </SignInWrapper>
    </React.Suspense>
  );
}
