import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkHeadingGap from 'remark-heading-gap';
import remarkBreaks from 'remark-breaks';
import AboutDoc from '../content/writing/about.md';
import YouTubeEmbed from './youtubeembed';

const AboutPage = () => {
    const [aboutDoc, setAboutDoc] = useState("");

    useEffect(() => {
        fetch(AboutDoc).then(res => res.text()).then(text => setAboutDoc(text));
    }, [aboutDoc])

    return (
        <div className='container'>
            <div className='row'>
                <h1 className='pb-3 text-center'>About this website</h1>
            </div>
            <ReactMarkdown remarkPlugins={[remarkHeadingGap, remarkBreaks]} children={aboutDoc} />
            <div className='row pb-5 align-content-center'>
                <YouTubeEmbed hyperlink='https://www.youtube-nocookie.com/embed/8aH5byo3J6A?si=vs7XSqfIcml7ZUZn' videoTitle='History of the Jive, Part 1' />
            </div>
        </div>
    );
};

export default AboutPage;