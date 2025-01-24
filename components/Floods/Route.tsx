import React from 'react';
import usePolyline from '@/hooks/usePolyline';
import { Box, Heading, Text } from '@radix-ui/themes';
import useRouteGraphData from '@/hooks/useRouteGraphData';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/helpers/firebase';
import EditLevels from '@/components/Floods/EditLevels';
import useUpdateDoc from '@/hooks/useUpdateDoc';
import InfoWindow from '@/components/Maps/InfoWindow';
import useDirectionsService from '@/hooks/useDirectionsService';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { nearestStations } from '@/helpers/geolocation';
import Report from '@/components/Floods/Report';
import useUpdateRoot from '@/hooks/useUpdateRootRoute';
import StationGraph from '@/components/Floods/StationGraph';

type RouteProps = {
  stations: Station[];
  route: Route;
  onSelect: (routeId: string) => void;
  selected: string | null;
  editable?: boolean;
  filter?: FilterValue;
  onCreate: (id: string, polyine?: google.maps.Polyline) => void;
  onNext: () => void;
  onPrev: () => void;
};

const RouteComponent = ({
  selected,
  stations,
  route,
  onSelect: select,
  editable,
  filter = 'all',
  onCreate,
}: RouteProps) => {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState<
    google.maps.LatLng | google.maps.LatLngLiteral | null
  >(null);
  const [disabled, setDisabled] = React.useState(false);
  const graph = useRouteGraphData(stations, route);
  const geometry = useMapsLibrary('geometry');

  const [directionsResult, onRequestRoute, onCancelRoute] =
    useDirectionsService();

  const onClick = React.useCallback(() => {
    setOpen(true);
    select(route.id);
  }, [select, route.id, setOpen]);

  const onClose = React.useCallback(() => {
    setOpen(false);
    setPosition(null);
    select(null);
    if (editable) onCancelRoute();
  }, [setOpen, select, editable, onCancelRoute]);

  const onSelect = React.useCallback(
    (latLng?: google.maps.LatLng) => {
      if (!latLng) return;
      setPosition(route.position);
      setOpen(true);
      if (!editable) return;
      const path = geometry.encoding.decodePath(route.path);
      onRequestRoute(path[0], path[path.length - 1]);
    },
    [setOpen, geometry, route, onRequestRoute, editable],
  );

  const polyline = usePolyline({
    onSelect,
    route,
    stations,
    onClick,
    selected: route.id === selected,
    editable,
    filter,
    onCreate,
  });

  const [onUpdateDoc] = useUpdateDoc(`routes/${route.id}`, 'Route updated');
  const onUpdateRoot = useUpdateRoot();

  const onRemove = async () => {
    setDisabled(true);
    await deleteDoc(doc(db, `routes/${route.id}`));
    setDisabled(false);
  };

  const onUpdate = async (data: Partial<Route>) => {
    await Promise.all([
      onUpdateRoot(route.id, { ...route, ...data }),
      onUpdateDoc(data),
    ]);
  };

  const onSetCurrent = async () => {
    setDisabled(true);
    const updatedAt = new Date();
    const level =
      Math.round(
        graph.data.datasets[0].data[graph.data.datasets[0].data.length - 1] *
          1000,
      ) / 1000;
    await onUpdate({ level, updatedAt });
    setDisabled(false);
  };

  React.useEffect(() => {
    if (directionsResult?.routes?.[0]) {
      const newRoute = directionsResult.routes[0];
      const path = newRoute.overview_polyline;
      if (path === route.path) return;
      const distance = newRoute.legs[0]?.distance?.text as string | '';
      const position =
        newRoute.overview_path[Math.floor(newRoute.overview_path.length * 0.5)];
      const [nearest, weight] = nearestStations(position, stations);
      const newDoc = {
        path,
        distance,
        nearestStations: nearest,
        stationWeight: weight,
        position: position.toJSON(),
        updatedAt: new Date(),
      };
      onUpdate(newDoc);
      onUpdateRoot(route.id, { ...route, ...newDoc });
    }
  }, [directionsResult]); // eslint-disable-line

  React.useEffect(() => {
    if (open && selected && selected !== route.id) onClose();
  }, [open, selected, route.id, onClose]);

  if (!open || !position || !geometry) return null;

  return (
    <>
      <InfoWindow
        anchor={polyline as unknown as google.maps.marker.AdvancedMarkerElement}
        position={position}
        onCloseClick={onClose}
        headerContent={
          <Box mb="4" minWidth="240px">
            <Heading size="4">{route.summary || 'Untitled route'}</Heading>
            <Text size="3">{!route.level && 'No flood level recorded'}</Text>
          </Box>
        }
      >
        <StationGraph data={graph.data} options={graph.options} />
        {editable && (
          <EditLevels
            stations={stations}
            route={route}
            onUpdate={onUpdate}
            onRemove={onRemove}
            disabled={disabled}
            onSetCurrent={onSetCurrent}
            onClose={onClose}
          />
        )}
        {!editable && (
          <Report onClose={onClose} route={route} stations={stations} />
        )}
      </InfoWindow>
    </>
  );
};

export default RouteComponent;
