import React, { Component } from 'react'
import YouTubeAutocomplete from 'react-youtube-autocomplete';

export default class YoutubeSearch extends Component{

    render() {
        return (
            <YouTubeAutocomplete
                apiKey="AIzaSyBVHcVyoGwt_VbwbE2noVwBz0kPwkT-rGc"
                placeHolder="Search Youtube"
                maxResults="20"
                callback={this._onSearchResultsFound}
            />
        );
    }

    _onSearchResultsFound(results) {
        var lis= [];
        for(var i=0; i<19; i++){
            lis.push(
                <div key={i}>
                    <h2>{results[i].snippet.title}</h2>
                    <iframe className='video w100'
                            width="640px"
                            height="360px"
                            src="//www.youtube.com/embed/{results[i].id.videoId}"
                            frameBorder="0"
                            allowFullScreen>
                    </iframe>
                </div>);
        }
        const data= (
            <div>
                {lis}
            </div>
        );
        console.log(data);
        return(data);
    }
}
