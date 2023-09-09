import { RankedVisualizationType } from '../models/RankedVisualizationType';
import rankedJson from '../data/ranked-data.json'
import RankedSession from '../models/RankedSession';
import PerSessionChart from './visualizations/persessionchart';
import AllGamesChart from './visualizations/allgameschart';
import WinLossChart from './visualizations/winlosschart';
import CharacterFrequencyChart from './visualizations/characterfrequencychart';
import "../css/chart.css";

interface RankedDataVisualizationProps {
    rankedDataType: RankedVisualizationType;
}

const RankedDataVisualizationFactory = (props: RankedDataVisualizationProps) => {
    let rankedData: RankedSession[] = rankedJson as RankedSession[];

    switch (props.rankedDataType) {
        case RankedVisualizationType.PerSession:
            return (
                <div className='responsiveChart'>
                    <PerSessionChart data={rankedData} />
                </div>
            );
        case RankedVisualizationType.AllGames:
            return (
                <div className='responsiveChart'>
                    <AllGamesChart data={rankedData} />
                </div>
            );
        case RankedVisualizationType.WinLoss:
            return (
                <div className='responsivePieChart'>
                    <WinLossChart data={rankedData} />
                </div>
            );
        case RankedVisualizationType.CharFreq:
            return (
                <div className='responsiveChart'>
                    <CharacterFrequencyChart data={rankedData} />
                </div>
            );
        default:
            return <></>;
    }
}

export default RankedDataVisualizationFactory;