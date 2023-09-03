import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData, ChartOptions, ArcElement } from 'chart.js';
import { RankedVisualizationType } from '../models/RankedVisualizationType';
import rankedJson from '../data/ranked-data.json'
import { IRankedSession } from '../models/RankedSession';
import { Line } from 'react-chartjs-2';

interface RankedDataVisualizationProps {
    rankedDataType: RankedVisualizationType;
}

const RankedDataVisualization = (props: RankedDataVisualizationProps) => {
    let rankedData: IRankedSession[] = rankedJson as IRankedSession[];
    let lineChartLabels: string[] = [];
    let perSessionPointsData: number[] = [];
    let chartOptions: ChartOptions;

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

    if (props.rankedDataType === RankedVisualizationType.PerSession) {
        // Build options (extract to own function)
        chartOptions = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top' as const,
                },
                title: {
                    display: true,
                    text: 'LP Delta Per Street Fighter 5 Ranked Session'
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
                    label: 'perSessionPointsData',
                    data: perSessionPointsData,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)'
                }
            ]
        };

        return <Line options={chartOptions} data={lineChartData} />
    }

    return <></>
}

export default RankedDataVisualization;