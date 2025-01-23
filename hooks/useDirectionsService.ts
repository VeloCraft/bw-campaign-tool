import React from 'react';
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
import { useEffectOnceWhen } from 'rooks';

const useDirectionsService = (): [
  google.maps.DirectionsResult,
  (
    origin: google.maps.LatLng,
    destination: google.maps.LatLng,
  ) => Promise<void>,
  () => void,
] => {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] =
    React.useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    React.useState<google.maps.DirectionsRenderer>();
  const [directionsResult, setDirectionsResult] =
    React.useState<google.maps.DirectionsResult | null>(null);

  useEffectOnceWhen(
    () => {
      setDirectionsService(new routesLibrary.DirectionsService());
      setDirectionsRenderer(
        new routesLibrary.DirectionsRenderer({ map, draggable: true }),
      );
    },
    !!(routesLibrary && map),
  );

  const renderRoute = async (request: google.maps.DirectionsRequest) => {
    const result = await directionsService?.route(request);
    directionsRenderer?.setMap(map);
    directionsRenderer?.setDirections(result);
    return result;
  };

  const onRequestRoute = React.useCallback(
    async (origin: google.maps.LatLng, destination: google.maps.LatLng) => {
      const request: google.maps.DirectionsRequest = {
        origin,
        destination,
        travelMode: google.maps.TravelMode.WALKING,
      };
      const result: google.maps.DirectionsResult | undefined =
        await renderRoute(request);
      directionsRenderer?.addListener('directions_changed', () => {
        const result = directionsRenderer.getDirections();
        setDirectionsResult(result);
      });
      if (result) setDirectionsResult(result);
    },
    [renderRoute, directionsRenderer, map],
  );

  const onCancelRoute = React.useCallback(() => {
    directionsRenderer?.setMap(null);
    setDirectionsResult(null);
  }, [directionsRenderer, setDirectionsResult]);

  React.useEffect(() => {
    return () => {
      directionsRenderer?.setMap(null);
    };
  }, [directionsRenderer]);

  return [directionsResult, onRequestRoute, onCancelRoute];
};

export default useDirectionsService;
