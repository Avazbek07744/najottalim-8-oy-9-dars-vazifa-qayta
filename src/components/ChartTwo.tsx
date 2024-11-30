import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

type PercentData = {
    label: string;
    percentage: number;
};

const ChartTwo: React.FC = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [leftData, setLeftData] = useState<number[]>([]);
    const [rightData, setRightData] = useState<number[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://trello.vimlc.uz/professional");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                if (data?.percents && Array.isArray(data.percents)) {
                    const percents: PercentData[] = data.percents;
                    const half = Math.ceil(percents.length / 2);
                    const leftGroup = percents.slice(0, half);
                    const rightGroup = percents.slice(half);

                    setCategories([
                        ...leftGroup.map((item) => item.label),
                        ...rightGroup.map((item) => item.label),
                    ]);
                    setLeftData(leftGroup.map((item) => item.percentage));
                    setRightData(rightGroup.map((item) => item.percentage));
                } else {
                    console.error("Invalid data format:", data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const barChartOptionsLeft = {
        chart: {
            type: "bar",
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: "60%",
            },
        },
        colors: ["#007bff"],
        dataLabels: {
            enabled: true,
            formatter: (val: number) => `${val}%`,
            style: {
                colors: ["#000"],
            },
        },
        xaxis: {
            categories: categories.slice(0, leftData.length),
        },
    };

    const barChartOptionsRight = {
        chart: {
            type: "bar",
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: "60%",
            },
        },
        colors: ["#007bff"],
        dataLabels: {
            enabled: true,
            formatter: (val: number) => `${val}%`,
            style: {
                colors: ["#000"],
            },
        },
        xaxis: {
            categories: categories.slice(leftData.length),
        },
    };

    return (
        <div className="max-w-[1312px] mx-auto my-8">
            <h2 className="text-4xl font-bold flex gap-2.5">
                <p className="w-3 h-10 bg-blue-800"></p>Шахсий хусусиятлар
            </h2>
            <div className="flex gap-8 items-center max-w-[1312px] mx-auto">
                <div className="w-full max-w-[500px]">
                    <Chart
                        options={barChartOptionsLeft}
                        series={[{ data: leftData }]}
                        type="bar"
                        height={350}
                    />
                </div>

                <div className="w-full max-w-[300px]">
                    <Chart
                        options={{
                            chart: { type: "radar", height: 350 },
                            xaxis: { categories: categories },
                        }}
                        series={[{
                            name: "Skills",
                            data: [...leftData, ...rightData],
                        }]}
                        type="radar"
                        height={350}
                    />
                </div>

                <div className="w-full max-w-[500px]">
                    <Chart
                        options={barChartOptionsRight}
                        series={[{ data: rightData }]}
                        type="bar"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChartTwo;
