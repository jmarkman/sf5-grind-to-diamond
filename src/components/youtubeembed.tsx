import React from 'react';
import YouTubeEmbedProps from '../models/YouTubeEmbedProps';

const YouTubeEmbed = (props: YouTubeEmbedProps) => {

    return (
        <iframe width='1024' height='576' title={props.videoTitle} src={props.hyperlink} />
    );

}

export default YouTubeEmbed;