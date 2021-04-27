import { LineChartSource } from './portfolio/lab/experiments/chart-libraries/models/line-chart.interface';

declare module "ct.json" {
  const value: LineChartSource[];
  export default value;
}
