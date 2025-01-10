import React from 'react';
import type { ChartData, ChartDataset } from 'chart.js';

export const colors = {
  primary: '#197CAE',
  secondary: '#A8EEFF',
  error: '#FF9592',
  disabled: 'rgba(0, 0, 0, 0.3)',
  editablePath: '#0090FF',
  editablePathHover: '#2870BD',
  editablePathSelected: '#E93D82',
  statusClear: '#12A594',
  statusClearHover: '#0BD8B6',
  statusHazardous: '#F76B15',
  statusHazardousHover: '#FFA057',
  statusFlooded: '#E5484D',
  statusFloodedHover: '#FF9592',
  statusReports: '#AB4ABA',
  statusReportsHover: '#E796F3',
  tracking: '#0090FF',
};

const useGraphData = (docs: Station[]): ChartData<'line'> => {
  return React.useMemo(() => {
    const obj = docs.reduce(
      (acc, doc, i) => {
        const { timestamps, levels } = doc;
        timestamps.forEach((timestamp: string, index: number) => {
          if (!acc[timestamp]) acc[timestamp] = [];
          acc[timestamp][i] = levels[index];
        });
        return acc;
      },
      {} as { [key: string]: number[] },
    );
    const labels = Object.keys(obj)
      .filter((key) => obj[key].length === docs.length)
      .sort((a, b) => a.localeCompare(b));
    const datasets = docs.map(
      (doc, i) =>
        ({
          label: doc.locationName,
          data: labels.map((label) => obj[label][i]),
          fill: true,
          backgroundColor: colors.primary,
          borderColor: colors.secondary,
          tension: 0.25,
          pointRadius: 0,
          borderWidth: 3,
          pointHoverRadius: 0,
        }) satisfies ChartDataset<'line'>,
    );
    return { labels, datasets };
  }, [docs]);
};

export default useGraphData;
