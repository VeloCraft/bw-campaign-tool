import { Line } from 'react-chartjs-2';
import {
  LineElement,
  PointElement,
  LinearScale,
  Chart as ChartJS,
  TimeScale,
  Title,
  Legend,
  CategoryScale,
  Filler,
  type ChartData,
  type ChartOptions,
} from 'chart.js';

import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

ChartJS.register(
  CategoryScale,
  Legend,
  Title,
  LineElement,
  PointElement,
  TimeScale,
  LinearScale,
  Filler,
);

export type LineGraphProps = {
  data: ChartData<'line'>;
  options: ChartOptions<'line'>;
};

const LineGraph = ({ data, options }: LineGraphProps) => (
  <Line data={data} options={options} />
);

export default LineGraph;
