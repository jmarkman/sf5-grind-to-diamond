import React, { useState } from 'react';
import { RankedVisualizationType } from '../models/RankedVisualizationType';
import RankedDataVisualization from './rankeddatavisualization';

const SiteBody = () => {
    const [rankedVisualizationType, setRankedVisualizationType] = useState<RankedVisualizationType>(RankedVisualizationType.PerSession);

    const changeVisualizationType = (event: React.MouseEvent<HTMLButtonElement>) => {
        let visualizationButton: HTMLButtonElement = event.currentTarget;

        if (rankedVisualizationType === visualizationButton.value) {
            return;
        }

        setRankedVisualizationType(visualizationButton.value as RankedVisualizationType);
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col d-flex justify-content-center'>
                    <button type="button" onClick={changeVisualizationType} value={RankedVisualizationType.PerSession} className="btn btn-primary">LP change per session</button>
                </div>
                <div className='col d-flex justify-content-center'>
                    <button type="button" onClick={changeVisualizationType} value={RankedVisualizationType.AllGames} className="btn btn-primary">LP change for all games</button>
                </div>
                <div className='col d-flex justify-content-center'>
                    <button type="button" onClick={changeVisualizationType} value={RankedVisualizationType.WinLoss} className="btn btn-primary">Win/loss percentage</button>
                </div>
                <div className='col d-flex justify-content-center'>
                    <button type="button" onClick={changeVisualizationType} value={RankedVisualizationType.CharFreq} className="btn btn-primary">Character frequency</button>
                </div>
            </div>

            <div className='row'>
                <div className='col'>
                    <RankedDataVisualization rankedDataType={rankedVisualizationType} />
                </div>
            </div>
        </div>
    );
}

export default SiteBody;