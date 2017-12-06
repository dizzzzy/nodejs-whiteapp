/*
import React, {Component} from 'react';
import {Card} from 'react-materialize'
import * as UserActions from '../actions'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import SpecificClassCard from './SpecificClassCard'

class SpecificClass extends Component{

    constructor(props) {
      super(props);
      this.props.fetchClassLikes(this.props.match.params.name);
      this.state = {
          className: this.props.match.params.name
      };
    }

    componentDidMount(){
    };

    render(){
      let youtubeCardList;
      if(this.state.videoList)
      {
        youtubeCardList = this.state.videoList.youTube.map((result, index) =>{
          return(<SpecificClassCard
            videoId={result.id.videoId}
            key={index} />);
        });
      }
        return (
          <div className="flex-container">
            {youtubeCardList}
          </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchClassLikes: UserActions.fetchClassLikes
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    videoList: state.auth.videoList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecificClass);
*/

import React from 'react'

export default function SpecificClass(props) {
  return <h1>{props.match.params.className}</h1>
}