import type { Meta, StoryObj } from '@storybook/react';
import faker, { arrayOf, seed } from '@/.storybook/faker';
import StationGraph from '@/components/Floods/StationGraph';

seed('Floods/StationGraph');

const meta = {
  title: 'Floods/StationGraph',
  component: StationGraph,
} satisfies Meta<typeof StationGraph>;

export default meta;
type Story = StoryObj<typeof StationGraph>;

const labels = arrayOf(() => faker.lorem.word(), { min: 20, max: 50 });

export const WithValue = {
  args: {
    data: {
      labels,
      datasets: [
        labels.map(() => faker.number.float({ min: 0, max: 1 })) as any,
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            color: '#fff',
            display: true,
          },
        },
        y: {
          grid: {
            color: '#fff',
            display: true,
          },
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  },
} satisfies Story;
