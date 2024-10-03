import React from "react";

interface StatsCardProps {
  value?: string | number;
  label: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ value = 0, label }) => {
  return (
    <div className="bg-white rounded-4xl shadow-xl  text-center xl:w-72 xl:h-40 xl:p-4 lg:w-52 lg:h-40 lg:p-2 flex  justify-center items-center flex-col transition duration-300 hover:scale-105">
      <h2 className="xl:text-4xl lg:text-2xl font-extrabold text-customSteelblue">
        {value}
      </h2>
      <p className="xl:text-2xl lg:text-xl font-bold text-customSteelblue mt-3">
        {label}
      </p>
    </div>
  );
};

export default StatsCard;
