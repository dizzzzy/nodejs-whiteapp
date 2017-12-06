import React, { Component } from 'react'
import { Button, Dropdown } from 'semantic-ui-react'
import {connect} from 'react-redux'
import * as UserActions from '../actions/index'
import { bindActionCreators } from 'redux'
import _isEqual from 'lodash/isEqual';



class CardContent extends Component{
  constructor(props) {
    super(props);
    this.props.fetchUserClasses();
    this.state = {
      key: this.props.key,
      videoId: this.props.videoId,
      activeClassId: null,
      activeClass: null,
      like:null
    };
  }

  componentDidMount(){
    console.log('GrandChild Mounted');
  }

  componentWillReceiveProps(nextProps){
    if(!_isEqual(nextProps, this.state)){
      this.setState(nextProps);
    }
  }

  handleClick = () => {
    //Update database with changed like (I need id of the video(videoID) and the selected class (activeClass)
    this.props.addStudentClassLike(this.state.activeClassId, this.state.videoId);
    this.setState({ like: !this.state.like });
  };

  handleChange = (value) =>{ //Receive value of class and video id. Find index of class in this.state.props.
                             //Find out if a video with that id exist in the like list of the class
                             //If yes change state of like
    console.log('Seeing if videoId gets updated', this.state.videoId);
    let like;
    let val;
    let activeClassId;
    let class_index = this.props.userClasses.map(function(e) { return e.text;}).indexOf(value);
    if(class_index === -1){
      val =null;
      activeClassId= null;
      like = null;
    }else{
      val = value;
      activeClassId = this.props.userClasses[class_index].id;
      if(this.props.userClasses[class_index].hasOwnProperty("likeList")){
        //it does
        let video_index = this.props.userClasses[class_index].likeList.map(function(e) { return e.videoId; }).indexOf(this.state.videoId);
        if(video_index === -1){
          //video is not in the liked list, therefore like =null
          like = null;
        }else{
          like = true;
        }
      }else{
        //if student class doesn't have a likedList then video is not liked.
        like= null;
      }
    }

    // item.class.selected = item.class[index].id;
    this.setState({ activeClass: val, like:like, activeClassId: activeClassId});
  };

  render(){
    let data =null;
    if(this.props.userClasses){
      data = (
        <div className='ui two'><Dropdown
        key={this.state.key}
        placeholder='Choose a Class'
        selection
        options={this.props.userClasses}
        onChange={(e,{value})=>this.handleChange(value)}
      />
          &nbsp;&nbsp;&nbsp;
        <Button
          toggle
          key={this.state.key}
          active={this.state.like}
          onClick={this.handleClick}
          content='Like'
          icon='heart'
          label={{ basic: true, color: 'red', pointing: 'left', content: '2,048' }}
        />
      </div>
      );
    }
    return data;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUserClasses: UserActions.fetchUserClasses,
    fetchClassLikes: UserActions.fetchClassLikes,
    addStudentClassLike: UserActions.addStudentClassLike
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    userClasses: state.auth.userClasses
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContent)












