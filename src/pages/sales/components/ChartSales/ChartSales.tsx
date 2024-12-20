'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ChartSalesData } from '../../types';

const chartConfig = {
  sales: {
    label: 'sales',
    color: '#2563eb',
  },
} satisfies ChartConfig;

export type ChartSalesProps = {
  chartData: ChartSalesData[];
};

export const ChartSales: React.FC<ChartSalesProps> = ({ chartData }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-1">
          <TrendingUp className="h-4 w-4" />

          <CardTitle>Ventas</CardTitle>
        </div>
        <CardDescription>Enero - Diciembre 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="sales" fill="var(--color-sales)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">Mostrando el total de ventas de los últimos 12 meses</div>
      </CardFooter>
    </Card>
  );
};
