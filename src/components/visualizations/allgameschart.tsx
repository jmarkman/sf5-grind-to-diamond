import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import RankedSession from '../../models/RankedSession';
import VisualizationProps from '../../models/VisualizationProps';
import { Line } from 'react-chartjs-2';

const AllGamesChart = (props: VisualizationProps) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    const populateLabelArray = (total: number): string[] => {
        let arr: string[] = [];
    
        for (let i = 1; i <= total; i++) {
            arr.push(i.toString());
        }

        return arr;
    }
    
    let rankedData: RankedSession[] = props.data;

    // Build options (extract to own function)
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

    // Overarching + important to-do: How does react-chartjs accept a customized
    // React component as a popup?
    // let allMatches: RankedMatch[] = [];

    /*
    For each ranked session
        Declare sentinel value for session start lp
        For each match
            if win
                match lp = tracked lp + match lp
            else
                match lp = tracked lp - match lp
    */
    // for (const session of rankedData) {
    //     let sessionLP: number = session.pointsStart;
        
    //     for (const match of session.matches) {
    //         if (match.result === "WIN") {
    //             sessionLP += match.points
    //             allMatches.push(new RankedMatch(sessionLP, match.result, match.opponent, match.replayId));
    //         } else {
    //             sessionLP -= match.points;
    //             allMatches.push(new RankedMatch(sessionLP, match.result, match.opponent, match.replayId));
    //         }
    //     }
    // }

    // This mapreduce flattens all of the match collections in each session object so we get all matches
    let allMatches: number[] = rankedData.map(x => x.matches).reduce((a, b) => a.concat(b)).map(x => x.points);
    let matchLabels: string[] = populateLabelArray(allMatches.length);
    
    let lineChartData: ChartData<"line"> = {
        labels: matchLabels,
        datasets: [{
            label: "Per Game Point Change",
            data: allMatches,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }]
    };

    return <Line options={chartOptions} data={lineChartData} />
};

export default AllGamesChart;