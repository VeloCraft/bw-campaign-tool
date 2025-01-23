import useGraphData, { colors } from '@/hooks/useGraphData';
import type { ChartData, ChartOptions } from 'chart.js';

const useRouteGraphData = (
  stations: Station[],
  { nearestStations, stationWeight, level }: Route,
) => {
  const graphData = useGraphData(stations || []);
  const datasets = graphData.datasets.filter((_val, i) =>
    nearestStations?.includes(stations[i].id),
  );
  return {
    data: {
      labels: graphData.labels,
      datasets: [
        {
          label: 'Flood level',
          data: (graphData.labels || []).map(() => level || 5),
          fill: false,
          borderColor: colors.error,
          tension: 0.25,
          pointRadius: 0,
          borderWidth: 3,
          pointHoverRadius: 0,
        },
        {
          ...datasets[0],
          data: datasets[0]?.data?.map((value, i) => {
            const values: number[] = [
              (value as number) || 0,
              (datasets[1]?.data[i] as number) || 0,
            ];
            return values[0] * stationWeight + values[1] * (1 - stationWeight);
          }),
        },
      ],
    } satisfies ChartData<'line'>,
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.3)',
            display: true,
          },
          max: graphData.labels?.[graphData.labels?.length - 3] as string,
        },
        y: {
          grid: {
            color: 'rgba(0, 0, 0, 0.3)',
            display: true,
          },
          ticks: {
            stepSize: 1,
          },
        },
      },
    } satisfies ChartOptions<'line'>,
  };
};

export default useRouteGraphData;
