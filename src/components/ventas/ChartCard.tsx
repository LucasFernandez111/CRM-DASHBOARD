import React, { useState } from "react";
const ChartCard = ({
  mountList = Array(12).fill(0),
}: {
  mountList?: number[];
}) => {
  const chartData = mountList;

  const labels = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipX, setTooltipX] = useState(0);
  const [tooltipY, setTooltipY] = useState(0);

  const showTooltip = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: number
  ) => {
    setTooltipContent(data.toString());
    setTooltipX(e.currentTarget.offsetLeft - e.currentTarget.clientWidth / 2);
    setTooltipY(e.currentTarget.clientHeight + e.currentTarget.clientWidth / 2);
    setTooltipOpen(true);
  };

  const hideTooltip = () => {
    setTooltipContent("");
    setTooltipOpen(false);
    setTooltipX(0);
    setTooltipY(0);
  };

  // Calcular la altura máxima para evitar que las barras sean demasiado altas
  const maxHeight = 200; // Altura máxima en píxeles
  const maxDataValue = Math.max(...chartData);
  const scale = maxHeight / (maxDataValue || 1); // Escala para ajustar la altura

  return (
    <div className="shadow p-6 rounded-4xl bg-white w-[600px]">
      <div className="md:flex md:justify-between md:items-center">
        <div>
          <h2 className="text-4xl text-customSteelblue font-extrabold leading-tight">
            VENTAS
          </h2>
          <p className="mb-2 text-gray-600 text-sm">Monthly Average</p>
        </div>

        {/* Legends */}
        <div className="mb-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 mr-2 rounded-full"></div>
            <div className="text-sm text-gray-700">Sales</div>
          </div>
        </div>
      </div>

      <div className="line my-8 relative">
        {/* Tooltip */}
        {tooltipOpen && (
          <div
            className="p-0 m-0 z-10 shadow-lg rounded-lg absolute h-auto block"
            style={{ bottom: `${tooltipY}px`, left: `${tooltipX}px` }}
          >
            <div className="shadow-xs rounded-lg bg-white p-2">
              <div className="flex items-center justify-between text-sm">
                <div>Sales:</div>
                <div className="font-bold ml-2">
                  <span>{tooltipContent}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bar Chart */}
        <div className="flex -mx-2 items-end mb-2">
          {chartData.map((data, index) => (
            <div key={index} className="px-1 w-1/6">
              <div
                style={{
                  height: `${data * scale}px`,
                  maxHeight: `${maxHeight}px`,
                }}
                className="transition ease-in duration-200 bg-customSteelblue hover:bg-sky-500 rounded-t-md relative"
                onMouseEnter={(e) => showTooltip(e, data)}
                onMouseLeave={hideTooltip}
              >
                <div className="text-center absolute top-0 left-0 right-0 -mt-6 text-gray-800 text-sm">
                  ${data}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Labels */}
        <div
          className="border-t border-gray-400 mx-auto"
          style={{
            height: "1px",
            width: `${100 - (1 / chartData.length) * 100 + 3}%`,
          }}
        ></div>
        <div className="flex -mx-2 items-end">
          {labels.map((label, index) => (
            <div key={index} className="px-2 w-1/6">
              <div className="relative">
                <div
                  className="text-center absolute top-0 left-0 right-0 h-2 -mt-px bg-gray-400 mx-auto"
                  style={{ width: "1px" }}
                ></div>
                <div className="text-center absolute top-0 left-0 right-0 mt-3 text-gray-700 text-sm">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
