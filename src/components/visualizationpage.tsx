import React, { useState } from 'react';
import { RankedVisualizationType } from '../models/RankedVisualizationType';
import RankedDataVisualizationFactory from './rankeddatavisualization';

interface ButtonNameAndVisualization {
    name: string,
    visualization: RankedVisualizationType
}

const VisualizationPage = () => {
    const BUTTONCLASS: string = "btn btn-outline-primary";
    const BUTTONACTIVE: string = "active";
    const LPCHANGEPERSESSION: string = "LP change per session";

    const BUTTONNAMES: ButtonNameAndVisualization[] = [
        { name: "LP change per session", visualization: RankedVisualizationType.PerSession },
        { name: "LP change for all games", visualization: RankedVisualizationType.AllGames },
        { name: "Win/loss percentage", visualization: RankedVisualizationType.WinLoss },
        { name: "Character frequency", visualization: RankedVisualizationType.CharFreq }
    ]; 

    const [rankedVisualizationType, setRankedVisualizationType] = useState<RankedVisualizationType>(RankedVisualizationType.PerSession);
    const [activeButton, setActiveButton] = useState<string>(LPCHANGEPERSESSION);

    const changeVisualizationType = (event: React.MouseEvent<HTMLButtonElement>) => {
        let visualizationButton: HTMLButtonElement = event.currentTarget;

        if (rankedVisualizationType === visualizationButton.value) {
            return;
        }

        setRankedVisualizationType(visualizationButton.value as RankedVisualizationType);
        setActiveButton(visualizationButton.name)
    }

    return (
        <div className='container'>
            <div className='row m-5'>
                <div className="btn-group" role="group">
                    {BUTTONNAMES.map((nameAndVisual, idx) =>{
                        return <button 
                            type='button' 
                            className={activeButton === nameAndVisual.name ? `${BUTTONCLASS} ${BUTTONACTIVE}` : BUTTONCLASS}
                            onClick={changeVisualizationType}
                            value={nameAndVisual.visualization}
                            key={idx}
                            name={nameAndVisual.name}>
                                {nameAndVisual.name}
                            </button>
                    })}
                </div>
            </div>

            <div className='row'>
                <div className='col'>
                    <RankedDataVisualizationFactory rankedDataType={rankedVisualizationType} />
                </div>
            </div>
        </div>
    );
}

export default VisualizationPage;