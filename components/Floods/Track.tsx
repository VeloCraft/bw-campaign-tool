import React from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { colors } from '@/hooks/useGraphData';

type TrackingProps = {
  position?: GeolocationCoordinates;
  setTracking: (value: boolean) => void;
  tracking: boolean;
};

const Track = ({ tracking, setTracking, position }: TrackingProps) => {
  const map = useMap();
  const circle = React.useRef<google.maps.Circle | null>(null);
  const hasZoomed = React.useRef(false);

  const onCancelTracking = React.useCallback(() => {
    setTracking(false);
  }, [setTracking]);

  React.useEffect(() => {
    if (circle.current || !map) return;
    circle.current = new google.maps.Circle({
      visible: false,
      fillOpacity: 0.5,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: colors.tracking,
      strokeColor: colors.tracking,
    });
    hasZoomed.current = false;
    circle.current.setMap(map);
    map.addListener('dragstart', onCancelTracking);
    return () => {
      console.log('unmount');
      circle.current.setMap(null);
      circle.current = null;
    };
  }, [map]);

  React.useEffect(() => {
    if (circle.current && position) {
      circle.current.setCenter({
        lat: position.latitude,
        lng: position.longitude,
      });
      circle.current.setRadius(position.accuracy);
      circle.current.setVisible(true);
      if (tracking) {
        map?.panTo({
          lat: position.latitude,
          lng: position.longitude,
        });
        if (!hasZoomed.current && position.accuracy < 50) {
          map?.setZoom(18);
          hasZoomed.current = true;
        }
      }
    }
  }, [position, tracking]);

  return null;
};

export default Track;
