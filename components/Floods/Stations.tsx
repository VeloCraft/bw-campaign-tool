import React from 'react';
import useStationGraphData from '@/hooks/useStationGraphData';
import type { ChartData } from 'chart.js';
import { Box, Heading, Text } from '@radix-ui/themes';
import Marker from '@/components/Maps/Marker';
import MarkerRadiusIcon from '@/components/Maps/MarkerRadiusIcon';
import StationGraph from '@/components/Floods/StationGraph';

type StationsProps = {
  stations?: Station[];
};

const Stations = ({ stations }: StationsProps) => {
  const graphData = useStationGraphData(stations as Station[]);
  const [selected, setSelected] = React.useState<string | null>(null);

  const gd = React.useMemo(
    () => graphData.reduce((obj, gd) => ({ ...obj, [gd.id]: gd }), {}),
    [graphData],
  );

  const onSelect = (id: string | null) => () => setSelected(id);

  if (!stations) return null;

  return (
    <>
      {stations.map((station) => (
        <Marker
          title={station.locationName}
          position={station.position}
          key={station.id}
          onOpen={onSelect(station.id)}
          onClose={onSelect(null)}
          open={selected ? selected === station.id : null}
          header={
            <>
              <Heading size="5" m="0">
                {station.locationName}
              </Heading>
              <Text size="3">River {station.riverName}</Text>
            </>
          }
          info={
            <Box width="300px">
              <StationGraph
                data={gd[station.id].data as ChartData<'line'>}
                options={gd[station.id].options}
              />
            </Box>
          }
        >
          <MarkerRadiusIcon style={{ width: 42, color: 'var(--accent-7)' }} />
        </Marker>
      ))}
    </>
  );
};

export default Stations;
