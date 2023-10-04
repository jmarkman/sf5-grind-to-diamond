import { RankedVisualizationType } from '../models/RankedVisualizationType';
import rankedJson from '../content/data/ranked-data.json'
import RankedSession from '../models/RankedSession';
import PerSessionChart from './visualizations/persessionchart';
import AllGamesChart from './visualizations/allgameschart';
import WinLossChart from './visualizations/winlosschart';
import CharacterFrequencyChart from './visualizations/characterfrequencychart';

interface RankedDataVisualizationProps {
    rankedDataType: RankedVisualizationType;
}

const RankedDataVisualizationFactory = (props: RankedDataVisualizationProps) => {
    let rankedData: RankedSession[] = rankedJson as RankedSession[];

    switch (props.rankedDataType) {
        case RankedVisualizationType.PerSession:
            return (
                <PerSessionChart data={rankedData} />
            );
        case RankedVisualizationType.AllGames:
            return (
                <AllGamesChart data={rankedData} />
            );
        case RankedVisualizationType.WinLoss:
            return (
                <WinLossChart data={rankedData} />
            );
        case RankedVisualizationType.CharFreq:
            return (
                <CharacterFrequencyChart data={rankedData} />
            );
        default:
            return <></>;
    }
}

export default RankedDataVisualizationFactory;