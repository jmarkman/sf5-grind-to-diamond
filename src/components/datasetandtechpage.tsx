import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkHeadingGap from 'remark-heading-gap';
import remarkBreaks from 'remark-breaks';
import DataSetDoc from "../content/writing/datasetandtech.md"
import JsonData from "../content/data/ranked-data.json"

const DataSetAndTechPage = () => {
    const [aboutDataSet, setAboutDataSet] = useState("");

    useEffect(() => {
        fetch(DataSetDoc).then(res => res.text()).then(text => setAboutDataSet(text));
    }, [aboutDataSet])

    const downloadRankedDataJson = () => {
        let link = document.createElement('a');
        let blob = new Blob([JSON.stringify(JsonData)], {type: "application/json"})
        let url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', "ranked-data.json");
        link.click();
    };

    return (
        <div className="container">
            <div className='row'>
                <h1 className='text-center'>My dataset and some tech reflections</h1>
                <div className="d-grid m-3">
                    <button type="button" className="btn btn-primary btn-lg" onClick={downloadRankedDataJson}>Download my Ranked Grind Data as a JSON file</button>
                </div>
            </div>

            <ReactMarkdown remarkPlugins={[remarkHeadingGap, remarkBreaks]} children={aboutDataSet} />
        </div>
    );
};

export default DataSetAndTechPage;