import VisualizationProps from '../../models/VisualizationProps';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData, ChartOptions, TooltipItem, ChartTypeRegistry } from 'chart.js';
import RankedSession from '../../models/RankedSession';
import { Line } from 'react-chartjs-2';
import "../../css/chart.css";
import { ThemeContext } from "../../contexts/themecontext";
import React, { useState, useContext, useEffect, useRef } from 'react';
import { ThemeContextType } from '../../models/ThemeContextType';
import { LIGHT_MODE, DARK_MODE, NO_GRID_LINE } from '../../models/StyleConstants';
import YouTubeEmbed from '../youtubeembed';
import chunPoint from '../../content/images/chun-line-chart-point.png';
import sphealPoint from '../../content/images/spheal-line-chart-point.png';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';

const PerSessionChart = (props: VisualizationProps) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    const chartRef = useRef<ChartJSOrUndefined<"line", RankedSession[], unknown> | null>(null);
    const themeContext: ThemeContextType | null = useContext(ThemeContext);
    const [gridStyle, setGridStyle] = useState<string>("");
    const [videoVisibility, setVideoVisibility] = useState<boolean>(false);
    const chunLineChartPoint = new Image();
    chunLineChartPoint.src = chunPoint;

    const sphealLineChartPoint = new Image();
    sphealLineChartPoint.src = sphealPoint;

    const closeVideo = (): void => {
        setVideoVisibility(false);
    };

    useEffect(() => {
        if (themeContext?.theme === "dark") {
            setGridStyle(DARK_MODE.LINE_CHART_AXIS_AND_TEXT_COLOR);
        } else {
            setGridStyle(LIGHT_MODE.LINE_CHART_AXIS_AND_TEXT_COLOR);
        }      
    }, [themeContext?.theme]);

    let rankedData: RankedSession[] = props.data;
    let lineChartLabels: string[] = generateDateAxis(rankedData);
    let allRankedSessions: RankedSession[] = generateRankedSessionData(rankedData);
    
    let chartOptions: ChartOptions<"line"> = {
        responsive: true,
        onClick(event, elements, chart) {
            if (elements.length > 0) {
                let session: RankedSession = chart.data.datasets[0].data[elements[0].index] as unknown as RankedSession;
                if (session.date === "2023-03-26") {
                    setVideoVisibility(true);
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: NO_GRID_LINE
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 20,
                    color: gridStyle
                },
                title: {
                    display: true,
                    text: "Date (Year-Month-Day)",
                    color: gridStyle
                }
            },
            y: {
                grid: {
                    color: gridStyle
                },
                ticks: {
                    color: gridStyle
                },
                title: {
                    display: true,
                    text: "League Points",
                    color: gridStyle
                },
                border: {
                    color: gridStyle
                }
            }
        },
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: gridStyle
                }
            },
            title: {
                display: true,
                text: 'LP Delta Per Ranked Session',
                color: gridStyle
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

    return (
        <div className='alignment'>
            <div className='row'>
                <div className='col'>
                    <div className='px-5'>
                        <p>Street Fighter 6 had its <a className='link-offset-2 link-underline link-underline-opacity-25' href='https://www.youtube.com/watch?v=1INU3FOJsTw'>first announcement trailer debut on June 2nd, 2022</a>. Even prior to the trailer, I had always wanted to make it into Diamond to at least play a few games with some known players in matchmaking before the end of Street Fighter 5. When the trailer first dropped, I started getting more active in ranked, realizing that the clock was ticking.</p>
                        <p>However, I ran into setbacks both self-imposed and external: I had a rough time breaking the 9k LP to 10k LP barrier to Super Platinum, tried my hand at online tournaments, got <a className='link-offset-2 link-underline link-underline-opacity-25' href='https://www.youtube.com/watch?v=RxSmD0OW_oI&list=PLLGcuLWMLx9EHsRlsshuXRgS1Zxz3e-r_&index=1'>distracted by Apex Legends being more enjoyable</a> since I had last played on its release, the list goes on. I eventually made it into Super Plat shortly before New Year's, so I made my starting point December 31st 2022 (a New Year's resolution!)</p>
                        <p>When I first made the resolution to get to Diamond before SF6 dropped, I said that I was going to try to play every day. That didn't really work out in practice because I would find myself either skipping it after the gym or opting to play in lobbies. During the course of the grind I also had to make time to off-the-clock studying for work, or even just playing an entirely different game. It took about 4 months from start to finish. I actually started getting worried towards the end because people were slowly quitting ranked as they reached their own SF5 ranked milestones.</p>
                        <p>Each point in the chart represents a session of ranked matchmaking I played (from here on out referred to as a <em>ranked session</em>). If you hover over each point, you'll see my total LP for each session, how many games I played in that session (if applicable), and the change in LP from the previous session (if applicable).</p>
                    </div>
                </div>
            </div>
            {videoVisibility && 
                <div className='py-3'>
                    <div className='row'>
                        <div className='mx-auto text-center'>
                            <YouTubeEmbed videoTitle='The breakthrough' hyperlink='https://www.youtube-nocookie.com/embed/wVbmQbMZu7E?si=RJzdeXlcbzCvcnil' />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='mx-auto text-center'>
                            <button className='btn btn-danger' onClick={closeVideo}>Close</button>
                        </div>
                    </div>
                </div>
            }
            <div className='row'>
                <div className='col'>
                    <div className='responsiveChart'>
                        <Line ref={chartRef} options={chartOptions} data={generateLineChartData(lineChartLabels, allRankedSessions)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * Generates the line chart data and the label easter eggs for the
 * points on the chart
 * @param axesLabels 
 * @param rankedSessions 
 * @returns The chart data object for the Line element
 */
const generateLineChartData = (axesLabels: string[], rankedSessions: RankedSession[]): ChartData<"line", RankedSession[]> => {
    let flag: number = Math.floor(Math.random() * 11);
    let pointStyle: HTMLImageElement = new Image();

    switch (flag) {
        case 3:
            pointStyle.src = chunPoint;
            break;
        case 7:
            pointStyle.src = sphealPoint;
            break;
        default:
            break;
    }
    
    let lineChartData: ChartData<"line", RankedSession[]> = {
        labels: axesLabels,
        datasets: [
            {
                label: 'Session Point Change',
                data: rankedSessions,
                parsing: {
                    xAxisKey: 'date',
                    yAxisKey: 'pointsEnd'
                },
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                datalabels: {
                    display: false
                },
                pointStyle: pointStyle.src === "" ? "circle" : pointStyle
            }
        ]
    };

    return lineChartData;
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