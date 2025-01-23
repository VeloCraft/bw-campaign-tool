'use client';
import React from 'react';
import Floods from '@/components/Floods';
import { Button, Box, Callout, Flex } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import Wrapper from '@/components/Wrapper';
import SignInWrapper from '@/components/SignInWrapper';
import NextLink from 'next/link';

type WrapperProps = {
  variant?: 'default' | 'edit' | 'embed';
  rootRoutes: RootRoutes;
  stations: Station[];
  user?: User;
};

const Component = ({
  rootRoutes,
  stations,
  user,
  variant = 'default',
}: WrapperProps) => {
  const [position, setPosition] = React.useState<GeolocationCoordinates | null>(
    null,
  );
  const [tracking, setTracking] = React.useState(true);

  if (variant === 'embed')
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
            <Floods
              height="100%"
              rootRoutes={rootRoutes}
              stations={stations}
              position={position}
              tracking={tracking}
              setTracking={setTracking}
              setPosition={setPosition}
            />
          </Box>
        </Flex>
      </Wrapper>
    );
  return (
    <SignInWrapper
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        ...(variant === 'default'
          ? [{ label: 'Flood map' }]
          : [
              { label: 'Flood map', href: '/tools/floodmap' },
              { label: 'Edit' },
            ]),
      ]}
      force
      innerProps={{ p: '0' }}
      user={user}
    >
      <Flex direction="column" width="100%" height="100%" align="center">
        {variant === 'default' && (
          <>
            <Box asChild mt="4" style={{ borderRadius: 0 }}>
              <Callout.Root style={{ width: '100%' }}>
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                  <Flex
                    width="100%"
                    direction="row"
                    align="center"
                    gap="4"
                    as="span"
                  >
                    <span>
                      Flood levels are crowdsourced and may not be accurate.
                      Select a route to view detailed levels or report a change.
                    </span>
                    <Button color="gray" asChild size="2" variant="soft">
                      <NextLink href="/embed/floodmap" target="blank">
                        Embed
                      </NextLink>
                    </Button>
                    <Button asChild size="2" color="teal" variant="soft">
                      <NextLink href="/tools/floodmap/edit" shallow>
                        Edit
                      </NextLink>
                    </Button>
                  </Flex>
                </Callout.Text>
              </Callout.Root>
            </Box>
            <Box width="100%" flexGrow="1" pt="2">
              <Floods
                height="100%"
                rootRoutes={rootRoutes}
                stations={stations}
                position={position}
                tracking={tracking}
                setTracking={setTracking}
                setPosition={setPosition}
              />
            </Box>
          </>
        )}
        {variant === 'edit' && (
          <Box width="100%" flexGrow="1" pt="2">
            <Floods
              height="100%"
              editable
              rootRoutes={rootRoutes}
              stations={stations}
            />
          </Box>
        )}
      </Flex>
    </SignInWrapper>
  );
};

export default Component;
