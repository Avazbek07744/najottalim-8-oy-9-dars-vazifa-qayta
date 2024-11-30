import { FC, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import img from "../assets/shtrixCode.png";

interface CompetenceData {
    label: string;
    percentage: number;
    color?: string;
}

const FooterChart: FC = () => {
    const [competenceData, setCompetenceData] = useState<CompetenceData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("https://trello.vimlc.uz/competence")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setCompetenceData(data);
                } else {
                    console.error("Invalid data structure:", data);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching competence data:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <p className="text-lg font-semibold text-gray-600">Loading...</p>
            </div>
        );
    }

    return (
        <div className="max-w-[1312px] mx-auto my-8">
            <h2 className="text-4xl font-bold flex gap-2.5">
                <p className="w-3 h-10 bg-blue-800"></p>Компетенцияларнинг намоён бўлиши
            </h2>
            <div className="flex items-center justify-center mt-6">
                <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
                    {competenceData.length > 0 ? (
                        competenceData.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center justify-center space-y-2"
                            >
                                <Chart
                                    options={{
                                        chart: {
                                            type: "radialBar",
                                            height: 200,
                                        },
                                        plotOptions: {
                                            radialBar: {
                                                hollow: {
                                                    size: "60%",
                                                },
                                                dataLabels: {
                                                    name: {
                                                        show: false,
                                                    },
                                                    value: {
                                                        fontSize: "16px",
                                                        color: "#000",
                                                        fontWeight: "bold",
                                                    },
                                                },
                                            },
                                        },
                                        colors: [item.color || "#007bff"],
                                    }}
                                    series={[item.percentage || 0]} 
                                    type="radialBar"
                                    height={150}
                                />
                                <span className="text-center text-sm font-medium">
                                    {item.label || "No Label"}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-3 text-center">Маълумот мавжуд эмас!</p>
                    )}
                </div>
                <img src={img} alt="QR Code" className="ml-6" />
            </div>
        </div>
    );
};

export default FooterChart;
