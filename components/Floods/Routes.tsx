import React from 'react';
import RouteComponent from '@/components/Floods/Route';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';
import useRootRoutes from '@/hooks/useRootRoutes';

type ComponentProps = {
  stations?: Station[];
  onSelect: (routeId: string) => void;
  selected: string | null;
  editable?: boolean;
  filter: FilterValue;
};

const Component = ({
  editable,
  selected,
  stations,
  onSelect,
  filter,
}: ComponentProps) => {
  const [polylines, setPolylines] = React.useState<
    { id: string; polyline: google.maps.Polyline }[]
  >([]);

  const { data: routes } = useFirestoreCollection<Route[]>(
    editable ? 'routes' : null,
    true,
  );

  const allRoutes = useRootRoutes(editable);

  const onCreate = React.useCallback(
    (id: string, polyline: google.maps.Polyline) => {
      if (polyline) {
        setPolylines((prev) => [...prev, { id, polyline }]);
      } else {
        setPolylines((prev) => prev.filter((p) => p.id !== id));
      }
    },
    [setPolylines],
  );

  const onPolylineClick = React.useCallback(
    (dir: number) => {
      const index = polylines.findIndex((p) => p.id === selected);
      let nextIndex = (index + dir) % polylines.length;
      if (nextIndex < 0) nextIndex = polylines.length - 1;
      console.log({ index, nextIndex });
      const { polyline } = polylines[nextIndex];
      const path = polyline.getPath();
      const middleIndex = Math.floor(path.getLength() / 2);
      google.maps.event.trigger(polyline, 'click', {
        latLng: polyline.getPath().getAt(middleIndex),
      });
      onSelect(polylines[nextIndex].id);
    },
    [onSelect, selected, polylines],
  );

  const onPrev = React.useCallback(
    () => onPolylineClick(-1),
    [onPolylineClick],
  );
  const onNext = React.useCallback(() => onPolylineClick(1), [onPolylineClick]);

  const items = (editable ? routes : allRoutes) as Route[];

  if (!stations?.length || !items?.length) return null;

  return (
    <>
      {items.map((route: Route) => (
        <RouteComponent
          onCreate={onCreate}
          onSelect={onSelect}
          key={route.id}
          stations={stations}
          selected={selected}
          route={route}
          editable={editable}
          onNext={onNext}
          onPrev={onPrev}
          filter={filter}
        />
      ))}
    </>
  );
};

export default Component;
