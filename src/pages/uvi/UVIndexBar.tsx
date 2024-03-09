import React from "react";

const UV = ({ currentUVI }: any) => {
  const uvRanges = [
    {
      min: 0,
      max: 3,
      bgClass: "bg-green-500",
      label: "Low",
      description:
        "Minimal danger. You can safely stay outside without protection.",
    },
    {
      min: 3,
      max: 5,
      bgClass: "bg-yellow-500",
      label: "Moderate",
      description:
        "Low to moderate risk. You should take precautions, such as wearing protective clothing and applying sunscreen.",
    },
    {
      min: 5,
      max: 8,
      bgClass: "bg-orange-500",
      label: "High",
      description:
        "Moderate to high risk. Extra protection measures are necessary, including seeking shade during peak hours.",
    },
    {
      min: 8,
      max: 10,
      bgClass: "bg-red-500",
      label: "Very High",
      description:
        "High risk. Unprotected skin can be damaged quickly. It's crucial to take steps to protect yourself from the sun.",
    },
    {
      min: 10,
      max: Infinity,
      bgClass: "bg-purple-700",
      label: "Extreme",
      description:
        "Very high risk. Extraordinary precautions are needed. Avoid sun exposure during peak hours, wear protective clothing, and use high-SPF sunscreen.",
    },
  ];

  const currentRange: any =
    uvRanges.find(
      (range) => currentUVI >= range.min && currentUVI <= range.max
    ) || uvRanges[2];

  return (
    <div className="max-w-xs mx-auto">
      <div className="text-sm font-medium text-gray-700 mb-1">
        UV Index: {currentUVI} ({currentRange.label})
      </div>
      <div className="flex justify-between">
        {uvRanges.map((range, index) => (
          <div
            key={index}
            className={`w-1/6 h-4 ${
              currentUVI >= range.min && currentUVI <= range.max
                ? range.bgClass
                : "bg-gray-200"
            }`}
          >
            {currentUVI >= range.min && currentUVI <= range.max && (
              <div className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-white"></div>
            )}
          </div>
        ))}
      </div>
      <div className="text-[10px] font-medium text-gray-500 mt-1">
        {currentRange.description}
      </div>
    </div>
  );
};

const TempBar = ({ temp }: any) => {
  // Define temperature ranges and their corresponding colors
  const tempRanges: any = [
    { min: -10, max: 0, bgClass: "bg-blue-500" }, // Cold
    { min: 1, max: 10, bgClass: "bg-cyan-500" }, // Cool
    { min: 11, max: 20, bgClass: "bg-green-500" }, // Mild
    { min: 21, max: 30, bgClass: "bg-yellow-500" }, // Warm
    { min: 31, max: 40, bgClass: "bg-red-500" }, // Hot
  ];

  // Calculate the percentage of the current temperature within the total range
  const totalRange = 40 - -10; // Max temp - Min temp
  const normalizedTemp = temp - -10; // Normalize temp to start from 0
  const tempPercentage =
    Math.min(Math.max(normalizedTemp / totalRange, 0), 1) * 100;

  const target =
    tempRanges.find((range: any) => temp >= range.min && temp <= range.max) ||
    tempRanges[2];

  return (
    <div className="max-w-xs mx-auto mt-5 md:mt-0">
      <div className="text-sm font-medium text-gray-700 mb-1">
        Temp: {temp}°C
      </div>
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          style={{ width: `${tempPercentage}%` }}
          className={`h-full ${target.bgClass}`}
        ></div>
      </div>
    </div>
  );
};

const UVIndexBar = ({ currentUVI, temp }: any) => {
  // Convert Kelvin to Celsius
  const convertKelvinToCelsius = (kelvin: any) => {
    return (kelvin - 273.15).toFixed(2); // Rounds to two decimal places
  };

  if (temp === 0) return <div />;

  return (
    <div className="flex flex-col md:flex-row justify-center items-center">
      <UV currentUVI={currentUVI} />
      <TempBar temp={convertKelvinToCelsius(temp)} />
    </div>
  );
};

export default UVIndexBar;
