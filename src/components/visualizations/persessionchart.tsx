import VisualizationProps from '../../models/VisualizationProps';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import RankedSession from '../../models/RankedSession';
import { Line } from 'react-chartjs-2';

const PerSessionChart = (props: VisualizationProps) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    let rankedData: RankedSession[] = props.data;
    let lineChartLabels: string[] = generateDateAxis(rankedData);
    let allRankedSessions: RankedSession[] = generateRankedSessionData(rankedData);
    
    let chartOptions: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'LP Delta Per Ranked Session'
            }
        },
    };

    let lineChartData: ChartData<"line", RankedSession[]> = {
        labels: lineChartLabels,
        datasets: [
            {
                label: 'Session Point Change',
                data: allRankedSessions,
                parsing: {
                    xAxisKey: 'date',
                    yAxisKey: 'pointsEnd'
                },
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                datalabels: {
                    display: false
                }
            }
        ]
    };

    return <Line options={chartOptions} data={lineChartData} />
};

/**
 * Builds the array that represents the x-axis for the line chart
 * @remarks I construct a "fake" date to represent my ranked state from before I started tracking my progress
 * @param data The ranked data for all my games
 * @returns A string array with dates to be used as the x-axis for the line chart
 */
const generateDateAxis = (data: RankedSession[]): string[] => {
    let labels: string[] = [];
    labels.push('2022-12-31');
    data.forEach(x => labels.push(x.date));

    return labels;
};

/**
 * Builds the array that contains the ranked data for the line chart
 * @remarks I construct a "fake" RankedSession object to represent my total SF5 Ranked state before I started tracking my progress
 * @param data The ranked data for all my games
 * @returns An array of all my ranked games plus a placeholder at index 0 to represent the first step
 */
const generateRankedSessionData = (data: RankedSession[]): RankedSession[] => {
    let initialSession: RankedSession[] = [new RankedSession("2022-12-31", data[0].pointsStart, data[0].pointsStart, [])];
    let rankedArr: RankedSession[] = [...initialSession, ...data];
    
    return rankedArr;
};

export default PerSessionChart;