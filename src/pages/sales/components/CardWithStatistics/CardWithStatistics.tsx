import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React from 'react';

export type CardWithStatisticsProps = {
  title: string | number;
  description: string;
  className?: string;
};

const CardWithStatistics: React.FC<CardWithStatisticsProps> = ({ title, description, className }) => {
  return (
    <Card className={cn('w-72 h-40  text-center flex items-center justify-center rounded-4xl p-2', className)}>
      <CardHeader>
        <CardTitle className="text-3xl font-extrabold text-customSteelblue">{title} </CardTitle>
        <CardDescription className="text-xl font-extrabold text-customSteelblue">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default CardWithStatistics;
