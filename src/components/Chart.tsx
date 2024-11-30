import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';

type ChartData = {
    percentage: number;
    label: string;
    color: string;
};

const Chart: React.FC = () => {
    const [dating, setDating] = useState<ChartData[]>([]);

    useEffect(() => {
        fetch('https://trello.vimlc.uz/knowlodge')
            .then((res) => res.json())
            .then((data) => {
                setDating(data.semicharts);
            })
            .catch((err) => {
                console.log('Xatolik yuz berdi:', err);
            });
    }, []);

    useEffect(() => {
        if (dating.length > 0) {
            const charts = dating.map((value, i) => ({
                id: `chart${i + 1}`,
                value: value.percentage,
                label: value.label,
                color: value.color,
            }));

            charts.forEach((chart) => {
                const options = {
                    chart: {
                        type: 'radialBar',
                        height: 200,
                    },
                    series: [chart.value],
                    plotOptions: {
                        radialBar: {
                            startAngle: -90,
                            endAngle: 90,
                            track: {
                                background: '#E0E0E0',
                                strokeWidth: '97%',
                            },
                            dataLabels: {
                                value: {
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    offsetY: -10,
                                    color: chart.color,
                                },
                                name: {
                                    offsetY: 20,
                                    fontSize: '14px',
                                    color: '#666',
                                    show: true,
                                },
                            },
                        },
                    },
                    fill: {
                        colors: [chart.color],
                    },
                    labels: [chart.label],
                };

                const element = document.querySelector(`#${chart.id}`);
                if (element) {
                    const apexChart = new ApexCharts(element, options);
                    apexChart.render();
                }
            });

            return () => {
                charts.forEach((chart) => {
                    const element = document.querySelector(`#${chart.id}`);
                    if (element) {
                        while (element.firstChild) {
                            element.removeChild(element.firstChild);
                        }
                    }
                });
            };
        }
    }, [dating]);

    return (
        <div className='max-w-[1312px] mx-auto mt-10'>
            <h2 className='text-4xl font-bold flex gap-2.5'><p className='w-3 h-10 bg-blue-800'></p>Билим тести</h2>
            <div className="grid grid-cols-3 gap-5 p-5 justify-center items-center">
                {Array(6)
                    .fill(null)
                    .map((_, index) => (
                        <div key={index} id={`chart${index + 1}`} className="w-full"></div>
                    ))}
            </div>
        </div>
    );
};

export default Chart;
