import React, {Component} from 'react';
import {Card} from 'react-materialize'
import * as UserActions from '../actions'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import SpecificClassCard from './SpecificClassCard'
import _isEqual from 'lodash/isEqual';


class SpecificClass extends Component{

    constructor(props) {
      super(props);
      console.log('this.props.match.params',this.props.match.params);
      this.props.fetchClassLikes(this.props.match.params.classId);
      this.state = {
        classId: this.props.match.params.classId,
        videoList: null
      };
    }


  componentWillReceiveProps(nextProps) {
    if(!_isEqual(nextProps, this.state)){
      this.setState(nextProps);
    }
  }

  render(){
      let specificClassCardList;
      if(this.props.videoList)
      {
        console.log('I got the videoList', this.props.videoList);
        specificClassCardList = this.props.videoList.map((result, index) =>{
          return(<SpecificClassCard
            videoId={result.videoId}
            numberLikes={result.numberLikes}
            key={index} />);
        });
        console.log('specificClassCardList', specificClassCardList);
      }
        return (
          <div>
            <h2>List of all liked videos</h2>
            <div className="flex-container">
              {specificClassCardList}
            </div>
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

/*
import React from 'react'

export default function SpecificClass(props) {
  return <h1>{props.match.params.className}</h1>
}*/
