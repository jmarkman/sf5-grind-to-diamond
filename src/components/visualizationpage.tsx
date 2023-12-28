import React, { useState } from 'react';
import { RankedVisualizationType } from '../models/RankedVisualizationType';
import RankedDataVisualizationFactory from './rankeddatavisualization';
import arisJam from '../content/video/arisJam.webm';

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
        <div>
            <div className='container d-none d-lg-block'>
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

            <div className='container d-block d-lg-none'>
                <div className='row'>
                    <div className='col'>
                        <p>The visualizations are best seen from a desktop computer or device with a screen resolution greater than or equal to 720p</p>
                        <p>Please use such a device to access the content of the visualizations page</p>
                        <p>I've tested this website with smaller resolutions and the charts become illegible below 1024x768</p>
                    </div>
                </div>
                <div className='row'>
                    <video src={arisJam} autoPlay={true} loop={true} muted={true} />
                    <a href='https://twitter.com/cooneucooneu/status/1697147332859678864'>(source)</a>
                </div>
            </div>
        </div>
    );
}

export default VisualizationPage;