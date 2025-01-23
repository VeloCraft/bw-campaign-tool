'use client';

import React from 'react';
import SignInWrapper from '@/components/SignInWrapper';
import { Box, Container, Heading, Text } from '@radix-ui/themes';

export default function Page() {
  return (
    <React.Suspense>
      <SignInWrapper
        breadcrumbs={[
          { label: 'Broadcasts', href: '/broadcast' },
          { label: 'Help' },
        ]}
      >
        <Container size="2" my="4">
          <Heading as="h2" size="8" mb="4">
            How to manage the floods map
          </Heading>
          <Heading as="h3">Adding new routes to the map</Heading>
          <Box mb="8" asChild>
            <ol>
              <li>
                <Text as="span">
                  Click on a space on the map to set an origin marker. The
                  origin point must be at an intersection of other paths or
                  roads.
                </Text>
              </li>
              <li>
                <Text as="span">
                  Click on another space on the map to set a destination marker.
                  The destination point must be at an intersection of other
                  paths or roads.
                </Text>
              </li>
              <li>
                <Text as="span">
                  Click the SAVE button to save the route to the map.
                </Text>
              </li>
            </ol>
          </Box>
        </Container>
      </SignInWrapper>
    </React.Suspense>
  );
}
