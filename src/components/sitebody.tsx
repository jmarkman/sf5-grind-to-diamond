import React from 'react';

const SiteBody = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col d-flex justify-content-center'>
                    <button type="button" className="btn btn-primary">LP change by session date</button>
                </div>
                <div className='col d-flex justify-content-center'>
                    <button type="button" className="btn btn-primary">LP change for all games</button>
                </div>
                <div className='col d-flex justify-content-center'>
                    <button type="button" className="btn btn-primary">Win/loss percentage</button>
                </div>
                <div className='col d-flex justify-content-center'>
                    <button type="button" className="btn btn-primary">Character frequency</button>
                </div>
            </div>

            <div className='row'>
                <div className='col'>
                    <p>Graph</p>
                </div>
            </div>
        </div>
    );
}

export default SiteBody;