import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, ChartData } from 'chart.js';
import VisualizationProps from "../../models/VisualizationProps";
import RankedSession from "../../models/RankedSession";
import RankedMatch from "../../models/RankedMatch";
import { Pie } from "react-chartjs-2";

const WinLossChart = (props: VisualizationProps) => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    let rankedData: RankedSession[] = props.data;

    // Build options (extract to own function)
    let chartOptions: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'left' as const,
            },
            title: {
                display: true,
                text: 'Win/Loss Ratio'
            },
        }
    };

    let allMatches: RankedMatch[] = rankedData.map(x => x.matches).reduce((a, b) => a.concat(b));
    let totalWins: number = allMatches.filter(x => x.result.toLowerCase() === "win").length;
    let totalLosses: number = allMatches.filter(x => x.result.toLowerCase() === "loss").length;

    const pieChartData: ChartData<"pie"> = {
        labels: ['Win', 'Loss'],
        datasets: [
          {
            label: '# of Users',
            data: [totalWins, totalLosses],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'       
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
          },
        ],
      };
      
    return <Pie options={chartOptions} data={pieChartData} />
};

export default WinLossChart;