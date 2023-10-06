import React from "react";
import VisualizationProps from "../../models/VisualizationProps";
import { Chart as ChartJS, ChartData, ChartOptions, Legend, Tooltip, CategoryScale, LinearScale, BarElement, } from "chart.js";
import RankedMatch from "../../models/RankedMatch";
import { Bar } from "react-chartjs-2";

const CharacterFrequencyChart = (props: VisualizationProps) => {
    ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
    // If I've played a character in less than 10 matches (5 FT2s), I consider that character to be rare
    const RARE_CHARACTER_OCCURENCE_THRESHOLD: number = 10;
    const lightModeBarColor: string[] = ['rgba(54, 162, 235, 0.2)'];
    const lightModeBarBorderColor: string[] = ['rgba(54, 162, 235, 1)'];
    const ALLMATCHES: RankedMatch[] = props.data.map(x => x.matches).reduce((a, b) => a.concat(b));
    
    let characterFrequency: Map<string, number> = new Map<string, number>();
    
    for (const match of ALLMATCHES) {
      if (characterFrequency.has(match.opponent)) {
        characterFrequency.set(match.opponent, characterFrequency.get(match.opponent)! + 1);
      } else {
        characterFrequency.set(match.opponent, 1);
      }
    }
    
    let characters: string[] = [...characterFrequency.keys()];
    let occurences: number[] = [...characterFrequency.values()];

    let rareCharacters: [string, number][] = new Array<[string, number]>();
    let commonCharacters: [string, number][] = new Array<[string, number]>();

    for (const opponentFrequencyData of characterFrequency.entries()) {
      if (opponentFrequencyData[1] < RARE_CHARACTER_OCCURENCE_THRESHOLD) {
        rareCharacters.push(opponentFrequencyData);
      } else {
        commonCharacters.push(opponentFrequencyData)
      }
    }

    commonCharacters = commonCharacters.sort((a, b) => b[1] - a[1]);
    rareCharacters = rareCharacters.sort((a, b) => b[1] - a[1]);

    let topSixCommonCharacters: [string, number][] = commonCharacters.slice(-commonCharacters.length, 6);
    let topSixRareCharacters: [string, number][] = rareCharacters.slice((rareCharacters.length / 2) + 1, rareCharacters.length);

    let chartOptions: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            }
        }
    };

      return (
        <div>
          <p>This bar chart represents the characters I ran into during my ranked grind to Diamond. In total, I had to deal with {characters.length} matchups; excluding Eleven, there were 44 characters in Street Fighter 5 by the end of its lifespan, yet I only had to deal with {characters.length} matchups.</p>
          <p>Who was the missing character? Ibuki. Over the four months I spent pushing to Diamond, I did not encounter one single Ibuki player. Shine was right, she's E-tier...</p>
          <div className="responsiveChart">
            <Bar options={chartOptions} data={createChartData(characters, occurences, lightModeBarColor, lightModeBarBorderColor)} />
          </div>

          <div className="row">
            <div className="col">
              <p className="text-center">My most common opponents on ranked were</p>
              {createTopSixTable(topSixCommonCharacters)}
            </div>
            <div className="col">
              <p className="text-center">My rarest opponents on ranked were</p>
              {createTopSixTable(topSixRareCharacters)}
            </div>
          </div>
        </div>
      );
};

const createTopSixTable = (characterData: [string, number][]) => {
  return (
    <table className="table table-borderless">
      <thead>
        <tr>
          <th className="text-center" scope="col">Character</th>
          <th className="text-center" scope="col">Number of Matches</th>
        </tr>
      </thead>
      <tbody>
        {characterData.map((charDatum) => {
          return (
            <tr>
              <td className="text-center">{charDatum[0]}</td>
              <td className="text-center">{charDatum[1]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const createChartData = (characterNames: string[], frequency: number[], customBackgroundColor: string[], customBorderColor: string[]): ChartData<"bar"> => {
  let chartData: ChartData<"bar"> = {
    labels: characterNames,
    datasets: [{
      label: "Character Frequency",
      data: frequency,
      backgroundColor: customBackgroundColor,
      borderColor: customBorderColor,
      datalabels: {
        display: false
      },
      borderWidth: 1
    }]
  };

  return chartData;
};

export default CharacterFrequencyChart;