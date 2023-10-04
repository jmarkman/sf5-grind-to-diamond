import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, ChartData } from 'chart.js';
import VisualizationProps from "../../models/VisualizationProps";
import RankedSession from "../../models/RankedSession";
import RankedMatch from "../../models/RankedMatch";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import WinLoss from "../../models/WinLoss";

const WinLossChart = (props: VisualizationProps) => {
    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
    const ALLCHARACTERS: string = "All Characters";
    const [winLossFilter, setWinLossFilter] = useState<string>(ALLCHARACTERS);

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
                text: 'Win/Loss Ratio'
            }
        },
    };

    let allMatches: RankedMatch[] = rankedData.map(x => x.matches).reduce((a, b) => a.concat(b));

    let characterWinLoss: Map<string, WinLoss> = new Map();

    for (let match of allMatches) {
      if (characterWinLoss.has(match.opponent)) {
        let winLossDetails: WinLoss = characterWinLoss.get(match.opponent)!;
        if (match.result.toLowerCase() === "win") {
          characterWinLoss.set(match.opponent, { wins: winLossDetails.wins + 1, losses: winLossDetails.losses });
        } else {
          characterWinLoss.set(match.opponent, { wins: winLossDetails.wins, losses: winLossDetails.losses + 1 });
        }
      } else {
        characterWinLoss.set(match.opponent, { wins: 0, losses: 0 });
      }
    }

    let totalWins: number = allMatches.filter(x => x.result.toLowerCase() === "win").length;
    let totalLosses: number = allMatches.filter(x => x.result.toLowerCase() === "loss").length;

    const pieChartData: ChartData<"pie"> = {
        labels: ['Loss', 'Win'],
        datasets: [
          {
            label: 'Total',
            data: [totalLosses, totalWins],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'       
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            datalabels: {
              formatter(value, context) {
                let sum: number = 0;
                let dataArr = context.chart.data.datasets[0].data;

                dataArr.forEach((data) => {
                  sum += data as number;
                });

                let percentage: string = `${((value * 100) / sum).toFixed(1)}%`;
                return percentage;
              },
              font: {
                weight: 'bold',
                size: 48
            },
            borderWidth: 1
          },
        }],
      };
      
    return (
      <div>
        <div className="row">
          <div className="col">
            <p>This is my win-loss ratio for all the games I played during my ranked grind.</p>
            <p>In total, I played {allMatches.length} games; {totalWins} were wins and {totalLosses} were losses.</p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="mx-auto responsivePieChart">
              <Pie options={chartOptions} data={pieChartData} />
            </div>          
          </div>
        </div>

        <div className="row align-items-center justify-content-center">
          <div className="col">
            <select className="form-select" aria-label="Win Loss Fiter">
              <option selected>All Characters</option>
              <option value="Ryu">Ryu</option>
            </select>
          </div>
        </div>
      </div>
    );
};



export default WinLossChart;