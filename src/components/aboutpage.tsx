import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkHeadingGap from 'remark-heading-gap';
import remarkBreaks from 'remark-breaks';
import AboutDoc from '../content/writing/about.md';

const AboutPage = () => {
    const [aboutDoc, setAboutDoc] = useState("");

    useEffect(() => {
        fetch(AboutDoc).then(res => res.text()).then(text => setAboutDoc(text));
    }, [])

    return (
        <div className='container'>
            <ReactMarkdown remarkPlugins={[remarkHeadingGap, remarkBreaks]} children={aboutDoc} />
        </div>
    );
};

export default AboutPage;