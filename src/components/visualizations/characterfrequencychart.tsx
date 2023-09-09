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

      return <Bar options={chartOptions} data={pieChartData} />
};

export default CharacterFrequencyChart;