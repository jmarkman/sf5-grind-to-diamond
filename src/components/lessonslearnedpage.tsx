import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkHeadingGap from 'remark-heading-gap';
import remarkBreaks from 'remark-breaks';
import FindingsDoc from '../content/writing/findings.md';
import '../css/quote.css';

const LessonsLearnedPage = () => {
    const [findingsDoc, setFindingsDoc] = useState("");

    useEffect(() => {
        fetch(FindingsDoc).then(res => res.text()).then(text => setFindingsDoc(text));
    }, [findingsDoc])

    return (
        <div className='container'>
            <div className='row'>
                <h1 className='pb-3 text-center'>Lessons learned during the grind</h1>
            </div>
            <ReactMarkdown remarkPlugins={[remarkHeadingGap, remarkBreaks]} children={findingsDoc} />
        </div>
    )
};

export default LessonsLearnedPage;