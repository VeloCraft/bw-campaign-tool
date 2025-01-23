import React from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { nearestStations } from '@/helpers/geolocation';
import { Box, Button, Heading, Text } from '@radix-ui/themes';
import { db } from '@/helpers/firebase';
import useUpdateRoot from '@/hooks/useUpdateRootRoute';
import InfoWindow from '@/components/Maps/InfoWindow';

type SaveWindowProps = {
  onClose: () => void;
  route?: google.maps.DirectionsRoute;
  stations?: Station[];
};

const SaveWindow = ({ stations, onClose, route }: SaveWindowProps) => {
  const [submitting, setSubmitting] = React.useState(false);
  const onUpdateRoot = useUpdateRoot();

  if (!stations || !route) return null;

  const position =
    route.overview_path[Math.floor(route.overview_path.length * 0.5)];

  const onSave = async () => {
    if (route) {
      setSubmitting(true);
      const path = route.overview_polyline;
      const summary = route.summary;
      const distance = route.legs[0]?.distance?.text as string | '';
      const [nearest, weight] = nearestStations(position, stations);
      const routeDoc: Route = {
        path,
        summary,
        distance,
        nearestStations: nearest,
        stationWeight: weight,
        position: position.toJSON(),
        hazardous: false,
        reports: [],
        level: 5,
        updatedAt: new Date(),
      };
      const docRef = await addDoc(collection(db, 'routes'), routeDoc);
      await onUpdateRoot(docRef.id, routeDoc);
      setSubmitting(false);
      onClose();
    }
  };

  return (
    <InfoWindow
      onCloseClick={onClose}
      position={
        route.overview_path[Math.floor(route.overview_path.length * 0.5)]
      }
      headerContent={
        <Box mb="4">
          <Heading size="4">{route.summary}</Heading>
          <Text size="3">{route?.legs[0]?.distance?.text}</Text>
        </Box>
      }
    >
      <Button disabled={submitting} onClick={onSave}>
        Save
      </Button>
    </InfoWindow>
  );
};

export default SaveWindow;
