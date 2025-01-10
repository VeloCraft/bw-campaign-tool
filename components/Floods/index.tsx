'use client';
import React from 'react';
import GoogleMap from '@/components/Maps/index';
import Stations from '@/components/Floods/Stations';
import Routes from '@/components/Floods/Routes';
import Editor from '@/components/Floods/Editor';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';
import { Box, Flex } from '@radix-ui/themes';
import Filter from '@/components/Floods/Filter';
import Track from '@/components/Floods/Track';
import TrackSwitch from '@/components/Maps/TrackSwitch';

type FloodsProps = {
  editable?: boolean;
  position?: GeolocationCoordinates;
  tracking?: boolean;
  setTracking?: (value: boolean) => void;
  setPosition?: (value: GeolocationCoordinates) => void;
  stations?: Station[];
  rootRoutes?: RootRoutes;
};

const Floods = ({
  editable,
  position,
  tracking,
  setTracking,
  setPosition,
  rootRoutes,
  stations: _stations,
}: FloodsProps) => {
  const [filter, setFilter] = React.useState<FilterValue>('all');
  const { data } = useFirestoreCollection('stations');
  const [selected, setSelected] = React.useState<string | null>(null);
  const onSelect = (routeId: string) => setSelected(routeId);
  const onChangeFilter = (value: FilterValue) => setFilter(value);

  const stations = data || _stations;

  return (
    <Flex direction="column" height="100%" position="relative">
      <GoogleMap>
        <Stations stations={stations as Station[]} />
        <Routes
          onSelect={onSelect}
          selected={selected}
          stations={stations as Station[]}
          editable={editable}
          filter={filter}
          rootRoutes={rootRoutes}
        />
        {editable && !selected && <Editor stations={stations as Station[]} />}
        {position && (
          <Track
            position={position}
            tracking={tracking}
            setTracking={setTracking}
          />
        )}
        <Box
          position="absolute"
          top="4"
          right="0"
          pr="4"
          overflow="hidden"
          style={{ pointerEvents: selected ? 'none' : 'auto' }}
        >
          <Flex
            direction="column"
            gap="1"
            style={{
              transition:
                'opacity 0.35s ease-in-out, transform 0.35s ease-in-out',
              transform: `translatex(${selected ? 'calc(100% + 16px)' : '0'})`,
              opacity: selected ? 0 : 1,
            }}
          >
            <Filter
              editable={!!editable}
              value={filter}
              onChange={onChangeFilter}
            />
            {!editable && (
              <TrackSwitch
                hasPosition={!!position}
                tracking={tracking}
                setTracking={setTracking}
                setPosition={setPosition}
              />
            )}
          </Flex>
        </Box>
      </GoogleMap>
    </Flex>
  );
};

export default Floods;
