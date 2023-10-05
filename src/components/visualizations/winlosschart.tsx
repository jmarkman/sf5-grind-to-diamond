import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, ChartData } from 'chart.js';
import VisualizationProps from "../../models/VisualizationProps";
import RankedMatch from "../../models/RankedMatch";
import { Pie } from "react-chartjs-2";
import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";
import WinLoss from "../../models/WinLoss";

const WinLossChart = (props: VisualizationProps) => {
    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
    const ALLCHARACTERS: string = "All Characters";
    const ALLMATCHES: RankedMatch[] = props.data.map(x => x.matches).reduce((a, b) => a.concat(b));
    const TOTALWINS: number = ALLMATCHES.filter(x => x.result.toLowerCase() === "win").length;
    const TOTALLOSSES: number = ALLMATCHES.filter(x => x.result.toLowerCase() === "loss").length;
    const [winLossFilter, setWinLossFilter] = useState<string>(ALLCHARACTERS);

    const changeCharacter = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setWinLossFilter(event.target.value);
    }

    let chartOptions: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'left' as const,
            }
        },
    };

    let characterWinLoss: Map<string, WinLoss> = createCharacterWinLossMap(ALLMATCHES);
    let backgroundColor: string[] = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'];
    let borderColor: string[] = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'];
    let resultSet: number[];

    switch (winLossFilter) {
      case ALLCHARACTERS:
        resultSet = [TOTALLOSSES, TOTALWINS];
        break;
      default:
        resultSet = singleCharacterWinLossFilter(characterWinLoss.get(winLossFilter)!);
        break;
    }

    const pieChartData: ChartData<"pie"> = generatePieChart(resultSet, backgroundColor, borderColor);
      
    return (
      <div>
        <div className="row">
          <div className="col">
            <p>This is my win-loss ratio for all the games I played during my ranked grind. You can see individual character win-loss by selecting a character from the dropdown field below.</p>
            <p>Selecting "All Characters" will return you to the default of my total win-loss ratio. Ibuki is not present in the list, see the "Character frequency" visualization for more information.</p>
          </div>
        </div>

        <div className="row py-3 align-items-center justify-content-center">
          <div className="col">
            <select className="form-select" aria-label="Win Loss Filter" onChange={changeCharacter}>
              <option value={ALLCHARACTERS} selected>{ALLCHARACTERS}</option>
              {[...characterWinLoss.keys()].map((x) => <option value={x}>{x}</option>)}
            </select>
          </div>
        </div>

        <div className="row">
          { winLossFilter === ALLCHARACTERS 
            ? <p className="d-flex pt-3 mx-auto fs-2 justify-content-center align-items-center">For my entire ranked grind run, I won {TOTALWINS} times and lost {TOTALLOSSES} times.</p> 
            : <p className="d-flex pt-3 mx-auto fs-2 justify-content-center align-items-center">vs {winLossFilter}, I won {resultSet[1]} {resultSet[1] > 1 || resultSet[1] === 0 ? "times" : "time"} and lost {resultSet[0]} {resultSet[0] > 1 || resultSet[0] === 0 ? "times" : "time"}.</p> }
        </div>

        <div className="row">
          <div className="col">
            <div className="mx-auto responsivePieChart">
              <Pie options={chartOptions} data={pieChartData} />
            </div>          
          </div>
        </div>
      </div>
    );
};

/**
 * Generates a dataset of two values: my total match wins and losses against a specific character
 * @remarks Like allMatchesWinLossFilter, index 0 is my losses, index 1 is my wins
 * @param opponent The opposing character's wins and losses
 * @returns An array containing my total wins and losses vs a specific character
 */
const singleCharacterWinLossFilter = (opponent: WinLoss): number[] => {
  return [opponent.losses, opponent.wins]
};

/**
 * Generates a mapping of characters and the number of wins and losses I had against that character
 * @param rankedMatches An array of all of the matches I played during my grind to diamond
 * @returns A map of characters and the number of wins and losses I had against each character
 */
const createCharacterWinLossMap = (rankedMatches: RankedMatch[]): Map<string, WinLoss> => {
  let characterWinLoss: Map<string, WinLoss> = new Map();

  for (let match of rankedMatches) {
    if (characterWinLoss.has(match.opponent)) {
      let winLossDetails: WinLoss = characterWinLoss.get(match.opponent)!;
      if (match.result.toLowerCase() === "win") {
        characterWinLoss.set(match.opponent, { wins: winLossDetails.wins + 1, losses: winLossDetails.losses });
      } else {
        characterWinLoss.set(match.opponent, { wins: winLossDetails.wins, losses: winLossDetails.losses + 1 });
      }
    } else {
      if (match.result.toLowerCase() === "win") {
        characterWinLoss.set(match.opponent, { wins: 1, losses: 0 });
      } else {
        characterWinLoss.set(match.opponent, { wins: 0, losses: 1 });
      }
    }
  }

  return characterWinLoss;
};

/**
 * Generates the data and the associated customizations necessary for rending the win-loss pie chart
 * @param winLossData The number of wins and losses to use for the pie chart
 * @param customBackgroundColor Array of RGB CSS methods for the background colors for each pie chart slice
 * @param customBorderColor Array of RGB CSS methods for the border colors for each pie chart slice
 * @returns The data and customizations associated with the pie chart
 */
const generatePieChart = (winLossData: number[], customBackgroundColor: string[], customBorderColor: string[]): ChartData<"pie"> => {  
  let chartData: ChartData<"pie"> = {
    labels: ['Loss', 'Win'],
    datasets: [
      {
        label: 'Total',
        data: winLossData,
        backgroundColor: customBackgroundColor,
        borderColor: customBorderColor,
        datalabels: {
          formatter(value: number, context: Context) {
            let percentage: string = "";
            let sum: number = 0;
            let dataArr = context.chart.data.datasets[0].data;

            dataArr.forEach((data) => {
              sum += data as number;
            });

            if (value !== 0) {
              percentage = `${((value * 100) / sum).toFixed(1)}%`;
            } 

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

  return chartData;
}

export default WinLossChart;