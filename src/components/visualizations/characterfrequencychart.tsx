import React from "react";
import VisualizationProps from "../../models/VisualizationProps";
import { Chart as ChartJS, ChartData, ChartOptions, Legend, Tooltip, CategoryScale, LinearScale, BarElement, } from "chart.js";
import RankedSession from "../../models/RankedSession";
import RankedMatch from "../../models/RankedMatch";
import { Bar } from "react-chartjs-2";

const CharacterFrequencyChart = (props: VisualizationProps) => {
    ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

    let rankedData: RankedSession[] = props.data;
    let characterFrequency: Map<string, number> = new Map();
    
    let allMatches: RankedMatch[] = rankedData.map(x => x.matches).reduce((a, b) => a.concat(b));

    for (const match of allMatches) {
        if (characterFrequency.has(match.opponent)) {
            characterFrequency.set(match.opponent, characterFrequency.get(match.opponent)! + 1);
        } else {
            characterFrequency.set(match.opponent, 1);
        }
    }

    let characters: string[] = Array.from(characterFrequency.keys());
    let occurences: number[] = Array.from(characterFrequency.values());

    let sortedCharacterFrequency: Map<string, number> = new Map([...characterFrequency.entries()].sort((a, b) => b[1] - a[1]));

    // TODO: The slice isn't that great for the "bottom three" because there are multiple characters I only encountered for a singular ft2 (2 games)
    let topThreeMostCommon: [string, number][] = [...sortedCharacterFrequency.entries()].slice(0, 3);
    let bottomThreeLeastCommon: [string, number][] = [...sortedCharacterFrequency.entries()].slice(characters.length - 3, characters.length);

    // Build options (extract to own function)
    let chartOptions: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: 'Character Frequency'
            },
        }
    };

    const pieChartData: ChartData<"bar"> = {
        labels: characters,
        datasets: [
          {
            label: 'Character Frequency',
            data: occurences,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)'       
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)'
            ],
            datalabels: {
              display: false
            },
            borderWidth: 1
          },
        ],
      };

      return (
        <div>
          <p>These are all the characters I ran into during my ranked grind to diamond.</p>
          <p>The most common characters I ran into were:</p>
          {listTopThreeCharacterOccurrences(topThreeMostCommon)}
          <p>The least common characters I ran into were:</p>
          {listTopThreeCharacterOccurrences(bottomThreeLeastCommon)}
          <Bar options={chartOptions} data={pieChartData} />
        </div>
      );
};

const listTopThreeCharacterOccurrences = (characterData: [string, number][]) => {

  return (
    <ul>
      {characterData.map((x, y) => <li key={y}>{x[0]}, {x[1]} {x[1] > 1 ? "times" : "time"}</li>)}
    </ul>
  );

};

export default CharacterFrequencyChart;