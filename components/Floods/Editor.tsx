import React from 'react';
import { AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import SaveWindow from '@/components/Floods/SaveWindow';
import EditorInstructions from '@/components/Floods/EditorInstructions';
import useDirectionsService from '@/hooks/useDirectionsService';

const Component = ({ stations }: { stations?: Station[] }) => {
  const map = useMap();
  const [from, setFrom] = React.useState<google.maps.LatLng | null>(null);
  const [to, setTo] = React.useState<google.maps.LatLng | null>(null);

  const [directionsResult, onRequestRoute, onCancelRoute] =
    useDirectionsService();

  const onDragEnd =
    (field: 'from' | 'to') => (ev: google.maps.MapMouseEvent) => {
      const { latLng } = ev;
      if (field === 'from') {
        setFrom(latLng);
      } else if (from) {
        setTo(latLng);
        onRequestRoute(from, latLng);
      }
    };

  const onClick = React.useCallback(
    (ev: google.maps.MapMouseEvent) => {
      const { latLng } = ev;
      if (!from) {
        setFrom(latLng);
      } else if (!to) {
        setTo(latLng);
        onRequestRoute(
          from as google.maps.LatLng,
          latLng as google.maps.LatLng,
        );
      }
    },
    [from, to, onRequestRoute],
  );

  const onCancel = React.useCallback(() => {
    setFrom(null);
    setTo(null);
    onCancelRoute();
  }, [setFrom, setTo, onCancelRoute]);

  const clickEnabled = !!map && !(from && to);

  React.useEffect(() => {
    if (clickEnabled) {
      const listener = map.addListener('click', onClick);
      return () => listener.remove();
    }
  }, [map, clickEnabled, onClick]);

  return (
    <>
      <EditorInstructions open={!from || !to} />
      {from && !directionsResult && (
        <AdvancedMarker
          draggable
          onDragEnd={onDragEnd('from')}
          position={from}
        />
      )}
      {to && !directionsResult && (
        <AdvancedMarker draggable onDragEnd={onDragEnd('to')} position={to} />
      )}
      <SaveWindow
        stations={stations}
        onClose={onCancel}
        route={directionsResult?.routes[0]}
      />
    </>
  );
};

export default Component;
