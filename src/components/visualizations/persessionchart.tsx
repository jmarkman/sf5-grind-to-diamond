import React from 'react';
import VisualizationProps from '../../models/VisualizationProps';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import RankedSession from '../../models/RankedSession';
import { Line } from 'react-chartjs-2';

const PerSessionChart = (props: VisualizationProps) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    let rankedData: RankedSession[] = props.data;
    let lineChartLabels: string[] = [];
    let perSessionPointsData: number[] = [];
    
    let chartOptions: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'LP Delta Per Ranked Session'
            },
        },
    };

    // Coalesce data (extract to own function)
    lineChartLabels.push("2022-12-31");
    perSessionPointsData.push(rankedData[0].pointsStart);

    rankedData.forEach(x => {
        lineChartLabels.push(x.date);
        perSessionPointsData.push(x.pointsEnd);
    });

    let lineChartData: ChartData<"line"> = {
        labels: lineChartLabels,
        datasets: [
            {
                label: 'Session Point Change',
                data: perSessionPointsData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }
        ]
    };

    return <Line options={chartOptions} data={lineChartData} />
};

export default PerSessionChart;