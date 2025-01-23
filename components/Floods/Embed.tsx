'use client';
import React from 'react';
import Floods from '@/components/Floods';

type EmbedProps = {
  rootRoutes: RootRoutes;
  stations: Station[];
};

const Embed = ({ rootRoutes, stations }: EmbedProps) => {
  const [position, setPosition] = React.useState<GeolocationCoordinates | null>(
    null,
  );
  const [tracking, setTracking] = React.useState(true);

  return (
    <Floods
      rootRoutes={rootRoutes}
      stations={stations}
      position={position}
      tracking={tracking}
      setTracking={setTracking}
      setPosition={setPosition}
    />
  );
};

export default Embed;
