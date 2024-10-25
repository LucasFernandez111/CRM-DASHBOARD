import { Card, CardContent } from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from 'recharts';
import { ChartSalesData } from '../../types';

export type ChartSalesProps = {
  chartData: ChartSalesData[];
};

const chartConfig = {
  sales: {
    label: 'Ventas',
    color: '#2563eb',
  },
} satisfies ChartConfig;

const ChartSales: React.FC<ChartSalesProps> = ({ chartData }) => {
  return (
    <Card className="pt-2">
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <ResponsiveContainer width="99%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} stroke="rgba(128, 128, 128, 0.5)" />

              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="sales" fill="#2563eb" radius={10} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartSales;
