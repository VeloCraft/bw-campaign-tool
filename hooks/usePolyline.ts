import React from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { colors } from '@/hooks/useGraphData';
import useRouteStatus from '@/hooks/useRouteStatus';

type UsePolylineProps = {
  onClick: (e: google.maps.PolyMouseEvent) => void;
  bounds?: google.maps.LatLngBounds;
  onSelect: (latLng?: google.maps.LatLng) => void;
  selected?: boolean;
  editable: boolean;
  route: Route;
  stations: Station[];
  filter: FilterValue;
  onCreate: (id: string, polyline?: google.maps.Polyline) => void;
};

const usePolyline = ({
  selected,
  onClick: click,
  onSelect,
  route,
  bounds,
  editable,
  stations,
  filter,
  onCreate,
}: UsePolylineProps) => {
  const map = useMap();
  const geometry = useMapsLibrary('geometry');
  const [polyline, setPolyline] = React.useState<google.maps.Polyline | null>(
    null,
  );
  const [status] = useRouteStatus(route, stations, editable);

  let mainColor = colors.editablePath;
  let hoverColor = colors.editablePathHover;
  if (!editable) {
    if (status === 'hazardous') {
      mainColor = colors.statusHazardous;
      hoverColor = colors.statusHazardousHover;
    } else if (status === 'clear') {
      mainColor = colors.statusClear;
      hoverColor = colors.statusClearHover;
    } else if (status === 'flooded') {
      mainColor = colors.statusFlooded;
      hoverColor = colors.statusFloodedHover;
    }
  } else {
    if (status === 'reports') {
      mainColor = colors.statusReports;
      hoverColor = colors.statusReportsHover;
    }
  }

  React.useEffect(() => {
    if (
      (filter !== 'all' && filter !== status) ||
      !route.path ||
      !map ||
      !geometry
    )
      return;
    const newPolyline = new google.maps.Polyline({
      path: geometry.encoding.decodePath(route.path),
      map,
      strokeColor: mainColor,
      strokeWeight: 7,
    });
    onCreate(route.id, newPolyline);
    newPolyline.setOptions({ strokeColor: mainColor });
    setPolyline(newPolyline);
    return () => {
      newPolyline.setMap(null);
      setPolyline(null);
      onCreate(route.id);
    };
  }, [filter, route.nearestStations, route.path, map, geometry]);

  const onClick = React.useCallback(
    (e: google.maps.PolyMouseEvent) => {
      if (map && polyline && e.latLng) {
        if (bounds) map.fitBounds(bounds);
        onSelect(e.latLng);
        click(e);
      }
    },
    [onSelect, click, map, bounds, polyline],
  );

  const onMouseOver = React.useCallback(() => {
    if (polyline && !selected) {
      polyline.setOptions({ strokeColor: hoverColor });
    }
  }, [polyline, selected]);

  const onMouseOut = React.useCallback(() => {
    if (polyline && !selected) {
      polyline.setOptions({ strokeColor: mainColor });
    }
  }, [polyline, selected]);

  React.useEffect(() => {
    if (!polyline || !click) return;
    polyline.addListener('click', onClick);
    polyline.addListener('mouseover', onMouseOver);
    polyline.addListener('mouseout', onMouseOut);
    return () => {
      google.maps.event.clearInstanceListeners(polyline);
    };
  }, [click, polyline, onClick, onMouseOver, onMouseOut]);

  React.useEffect(() => {
    if (!polyline) return;
    if (selected) {
      polyline.setOptions({
        strokeColor: editable ? colors.editablePathSelected : hoverColor,
      });
    } else {
      polyline.setOptions({ strokeColor: mainColor });
    }
  }, [polyline, selected]);

  return polyline;
};

export default usePolyline;
