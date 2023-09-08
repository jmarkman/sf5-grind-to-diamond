import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import RankedSession from '../../models/RankedSession';
import VisualizationProps from '../../models/VisualizationProps';
import { Line } from 'react-chartjs-2';
import RankedMatch from '../../models/RankedMatch';

const AllGamesChart = (props: VisualizationProps) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);
    
    let rankedData: RankedSession[] = props.data;
    let allMatches: RankedMatch[] = generateAllGamesData(rankedData);
    let matchLabels: string[] = generateLabelArray(allMatches.length);

    let chartOptions: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'LP Delta For All Ranked Games'
            },
        }
    };
  
    let lineChartData: ChartData<"line", RankedMatch[]> = {
        labels: matchLabels,
        datasets: [{
            label: "Per Game Point Change",
            data: allMatches,
            parsing: {
                xAxisKey: 'number',
                yAxisKey: 'points'
            },
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }]
    };

    return <Line options={chartOptions} data={lineChartData} />
};

/**
 * Generates an array of ranked matches that reflect lp change across all games
 * @remarks Since matches are related to a given session, the lp needed to be recalculated
 * to represent what my total lp was at the end of a given ranked match
 * @param data The ranked data for all my games
 * @returns An array of RankedMatch objects with a revised points value
 */
const generateAllGamesData = (data: RankedSession[]): RankedMatch[] => {
    let allMatches: RankedMatch[] = [];

    for (let session of data) {
        let sessionLp: number = session.pointsStart;
        let matchNumber: number = 1;

        for (let match of session.matches) {
            (match.result === "WIN") 
                ? sessionLp += match.points 
                : sessionLp -= match.points;

            let updatedMatch: RankedMatch = new RankedMatch(sessionLp, match.result, match.opponent, match.replayId);
            updatedMatch.number = matchNumber;
            allMatches.push(updatedMatch);
            matchNumber++;
        }
    }
    
    return allMatches;
};

/**
 * Generates an array of numbers to create the labels for the x-axis for the "all games" chart
 * @param total The total number of matches I played during my grind to diamond
 * @returns A string array of numbers from 1 to n to represent the x-axis of the "all games" chart
 */
const generateLabelArray = (total: number): string[] => {
    let arr: string[] = [];
    
    for (let i = 1; i <= total; i++) {
        arr.push(i.toString());
    }

    return arr;
}

export default AllGamesChart;