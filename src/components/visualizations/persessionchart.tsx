import VisualizationProps from '../../models/VisualizationProps';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData, ChartOptions, TooltipItem, ChartTypeRegistry } from 'chart.js';
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
            },
            tooltip: {
                usePointStyle: true,
                callbacks: {
                    label: (tooltipItem: TooltipItem<keyof ChartTypeRegistry>) => { return generateToolipLabel(tooltipItem)},
                    labelPointStyle: () => {
                        return {
                            pointStyle: false,
                            rotation: 0
                        };
                    }
                }
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

    return (
        <div>
            <p>When I first made the resolution to get to diamond before SF6 dropped, I said that I was going to try to play every day.</p>
            <p>That didn't really work out in practice because I would find myself either skipping it after the gym, or opting to play in lobbies.</p>
            <p>During the course of the grind I also had to make time to off-the-clock studying for work, or even just playing an entirely different game.</p>
            <p>I made my starting point December 31st 2022 as I wanted to make it a New Year's resolution. It took about 4 months from start to finish.</p>
            <p>I actually started getting worried towards the end because people were slowly quitting ranked as they reached their own SF5 ranked milestones.</p>
            <Line options={chartOptions} data={lineChartData} />
        </div>
    );
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

/**
 * Creates the tooltip label (the body of the tooltip) based on the current data point the
 * user is hovering over
 * @remarks Since the first point is a dummy session representing my starting point, this
 * function will return a singular string as the label segment without any other metadata
 * @param tooltipItem The tooltip item that ChartJS provides access to in the Label callback
 * @returns A string array containing the label segments
 */
const generateToolipLabel = (tooltipItem: TooltipItem<keyof ChartTypeRegistry>) => { 
    let datumIndex = tooltipItem.dataIndex;
    let chartData = tooltipItem.dataset.data;
    let datum: RankedSession = chartData[datumIndex] as unknown as RankedSession;
    let lpDelta: number = datum.pointsEnd - datum.pointsStart;

    if (lpDelta === 0) {
        return `Session LP: ${datum.pointsEnd}`;
    }

    return [`Session LP: ${datum.pointsEnd}`, `Total Games Played: ${datum.matches.length}`, `LP Delta: ${lpDelta > 0 ? `+${lpDelta}` : lpDelta}`];
};

export default PerSessionChart;