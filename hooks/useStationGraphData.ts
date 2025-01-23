import useGraphData, { colors } from '@/hooks/useGraphData';
import type { ChartDataset } from 'chart.js';

const useStationGraphData = (stations: Station[] | null) => {
  const graphData = useGraphData(stations || []);
  if (!stations) return [];
  const dataArr = graphData.datasets.map(
    (dataset: ChartDataset, i: number) => ({
      id: stations[i].id,
      data: {
        labels: graphData.labels,
        datasets: [dataset],
      },
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
              color: colors.disabled,
              display: true,
            },
            max: graphData.labels?.[graphData.labels?.length - 3],
          },
          y: {
            grid: {
              color: colors.disabled,
              display: true,
            },
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    }),
  );

  return dataArr;
};

export default useStationGraphData;
