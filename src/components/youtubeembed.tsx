import React from 'react';
import YouTubeEmbedProps from '../models/YouTubeEmbedProps';

const YouTubeEmbed = (props: YouTubeEmbedProps) => {

    return (
        <iframe width='1280' height='720' title={props.videoTitle} src={props.hyperlink} />
    );

}

export default YouTubeEmbed;