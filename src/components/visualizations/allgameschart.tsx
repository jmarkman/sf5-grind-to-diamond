import React, { useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData, ChartOptions, TooltipItem, ChartTypeRegistry } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import RankedSession from '../../models/RankedSession';
import VisualizationProps from '../../models/VisualizationProps';
import { Line } from 'react-chartjs-2';
import RankedMatch from '../../models/RankedMatch';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';

const AllGamesChart = (props: VisualizationProps) => {
    // The third type here is defined as unknown as the third typing of a chart in Chart.js is
    // the TLabel type (I believe this is the type used for labeling the chart data, commonly string)
    const chartRef = useRef<ChartJSOrUndefined<"line", RankedMatch[], unknown> | null>(null);
    
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
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                    modifierKey: 'ctrl'
                },
                zoom: {
                    drag: {
                        enabled: true
                    },
                    mode: 'x'
                }
            },
            tooltip: {
                usePointStyle: true,
                callbacks: {
                    title: (tooltipItems: TooltipItem<keyof ChartTypeRegistry>[]) => { return generateTooltipTitle(tooltipItems) },
                    label: (tooltipItem: TooltipItem<keyof ChartTypeRegistry>) => { return generateToolipLabel(tooltipItem) },
                    labelPointStyle: () => {
                        return {
                            pointStyle: false,
                            rotation: 0
                        };
                    }
                }
            }
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
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            datalabels: {
                display: false
            }
        }]
    };

    const handleResetZoom = () => {
        if (chartRef && chartRef.current) {
            chartRef.current.resetZoom();
        }
    };

    return (
        <>
            <div className='row'>
                <div className='col'>
                    <div className='px-5'>
                        <p>The "All Games" chart is a bit more interactive! In total, I played {allMatches.length} games, so there are a LOT of points on the chart. To see a subsection of the games I played, click and drag on a given region of the chart. The chart will then zoom in on that section. While zoomed, you can move the chart left and right by holding the <code>control</code> button on your keyboard and click-and-dragging with your mouse.</p>
                        <p>Each point represents one game and one game is first to two rounds. You can hover over each point to see the character I played against, the outcome of the match, the change in my LP, and the replay id associated with the game. Click the <code>Reset Zoom</code> button to return to the complete view of all my games.</p>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col'>
                    <div className='responsiveChart'>
                        <Line ref={chartRef} options={chartOptions} data={lineChartData} />
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col offset-5'>
                    <div className='p-4 mx-auto'>
                        <button className='btn btn-primary' onClick={handleResetZoom}>Reset Zoom</button>
                    </div>
                </div>
            </div>
        </>
    );
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

/**
 * Creates the tooltip title based on the current data point the user is hovering over
 * @remarks This function returns a string array because ChartJS will process the string
 * array as separate title segments that are separated by a newline
 * @param tooltipItems The tooltip item array that ChartJS provides access to in the Title callback
 * @returns A string array containing the title segments
 */
const generateTooltipTitle = (tooltipItems: TooltipItem<keyof ChartTypeRegistry>[]): string[] => {
    let tooltip: TooltipItem<keyof ChartTypeRegistry> = tooltipItems[0];
    let label: string = tooltip.label;
    let matchDatum: RankedMatch = getRankedMatchFromDataset(tooltip, tooltip.dataIndex);

    return [`Game ${label}`, `Opponent: ${matchDatum.opponent}`];
};

/**
 * Creates the tooltip label (the body of the tooltip) based on the current data point the
 * user is hovering over
 * @remarks This function returns a string array because ChartJS will process the string
 * array as separate title segments that are separated by a newline
 * @param tooltipItem The tooltip item that ChartJS provides access to in the Label callback
 * @returns A string array containing the label segments
 */
const generateToolipLabel = (tooltipItem: TooltipItem<keyof ChartTypeRegistry>): string[] => {
    let resolutionStartLP: number = 10035;
    let datumIndex: number = tooltipItem.dataIndex;
    let datum: RankedMatch = getRankedMatchFromDataset(tooltipItem, datumIndex);
    // If previousDatum is null, the user attempted to zoom in from the very start
    // The list of all my games doesn't contain a starting RankedMatch object like I have for the RankedSession visualization
    // Therefore, if previousDatum is null, coalecse the value into a new RankedMatch object that represents my starting point
    let previousDatum: RankedMatch = getRankedMatchFromDataset(tooltipItem, datumIndex - 1) ?? new RankedMatch(resolutionStartLP, "", "", "");
    let lpDelta: number = datum.points - previousDatum.points;
    
    return [`Outcome: ${datum.result}`, `Previous LP: ${previousDatum.points}`, `New LP: ${datum.points}`, `LP Change: ${lpDelta >= 0 ? `+${lpDelta}` : lpDelta }`, `Replay ID: ${datum.replayId}`];
};

/**
 * Retrieves the underlying RankedMatch object from the dataset enclosed within the tooltip object
 * @param tooltipItem The tooltip item object representing the datapoint the user is currently hovering over
 * @param index The numeric index of the current datapoint in the dataset array stored within the tooltip object
 * @returns The RankedMatch object in the underlying dataset
 */
const getRankedMatchFromDataset = (tooltipItem: TooltipItem<keyof ChartTypeRegistry>, index: number): RankedMatch => {
    let chartData = tooltipItem.dataset.data;
    let datum: RankedMatch = chartData[index] as unknown as RankedMatch;

    return datum;
}

export default AllGamesChart;