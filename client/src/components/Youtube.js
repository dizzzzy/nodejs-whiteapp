/*
import React, { Component } from 'react'
import { Button, Card, Dropdown } from 'semantic-ui-react'
import YouTubeAutocomplete from 'react-youtube-autocomplete';
import {connect} from 'react-redux'
import * as UserActions from '../actions/index'
import * as YouActions from '../actions/youActions'
import { bindActionCreators } from 'redux'
import _isEqual from 'lodash/isEqual';



class YoutubeSearch extends Component{
    constructor(props) {
      super(props);
      this.state = {
        videos: [],
        userClasses: [],
        videoList: [],
      };
    }
    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
      if(!_isEqual(nextProps, this.state)){
        this.setState(nextProps);
      }
    }

    handleClick = () => this.setState({ active: !this.state.active });

    handleChange = (value, item) =>{ //should update the state for the video /!*{value }*!/
      //should also like or unlike the video for the student
      //fetchClassLikes(item.id);
      console.log('value', value);
      let index = item.class.map(function(e) { return e.text; }).indexOf(value);
      item.class.selected = item.class[index].id;
      let temp = this.state.videos;
      temp.push(item);
      this.setState({videos:temp});
      console.log(this.state);
    };

    render() {
      const { active } = this.state;
      const { value } = this.state;
      console.log('this.state',this.state);
      let userClasses;
      if(this.props.userClasses){
        userClasses =this.props.userClasses;
      }

      console.log('userClasses Youtube',userClasses);
      let list;
      if(this.props.videoList) {
        let temp = this.props.videoList.youTube.map((obj)=>{
          obj.class = userClasses;
          return obj;
        });




        console.log('temp', temp);
        list =
          temp.map((result, index) =>{
            return(
              <Card key={index} className="flex-item">
                  <Card.Content className="iframe-parent">
                  <iframe className='video iframe-dim'
                          src={"//www.youtube.com/embed/" +result.id.videoId}
                          frameBorder="0"
                          allowFullScreen>
                  </iframe>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two'>
                    <Dropdown placeholder='Choose a Class' value={value} selection options={this.props.userClasses} onChange={(e,{value})=>this.handleChange(value, result)} />
                    &nbsp;&nbsp;&nbsp;
                    <Button toggle active={active} onClick={this.handleClick}
                      content='Like'
                      icon='heart'
                      label={{ basic: true, color: 'red', pointing: 'left', content: '2,048' }}
                    />
                  </div>
                </Card.Content>
              </Card>
              )
          });
        }

        return (
          <div>
            <YouTubeAutocomplete
                apiKey={process.env.REACT_APP_YOUTUBE_KEY}
                placeHolder="Search Youtube"
                maxResults="20"
                callback={this._onSearchResultsFound}
            />
            <div className="flex-container">
              { list }
            </div>
          </div>
        );
    }

    _onSearchResultsFound = (results) => {
      this.props.fetchUserClasses();
      this.props.fetchYoVids(results)
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUserClasses: UserActions.fetchUserClasses,
    fetchYoVids: YouActions.getYouList,
    fetchClassLikes: UserActions.fetchClassLikes,
    fetchStudentClassLikes: UserActions.fetchStudentClassLikes,
    addStudentClassLike: UserActions.addStudentClassLike
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    userClasses: state.auth.userClasses,
    videoList: state.youTube
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeSearch)





*/
import React, { Component } from 'react'
import YouTubeAutocomplete from 'react-youtube-autocomplete';
import {connect} from 'react-redux'
import * as UserActions from '../actions/index'
import * as YouActions from '../actions/youActions'
import { bindActionCreators } from 'redux'
import _isEqual from 'lodash/isEqual';
import YoutubeCard from './YoutubeCard'

class YoutubeSearch extends Component{
  constructor(props) {
    super(props); //the only prop that we need is the student classes (also youtube vids)
                  // because they contain the likes array (video Ids)
    this.state ={
      videoList: null
    }
  }

  componentDidMount() {
    console.log('Parent did mount.');
  }

  componentWillReceiveProps(nextProps) {
    if(!_isEqual(nextProps, this.state)){
      this.setState(nextProps);
    }
  }

  render() {
    let youtubeCardList;
    if(this.state.videoList)
    {
      youtubeCardList = this.state.videoList.youTube.map((result, index) =>{
        return(<YoutubeCard
          videoId={result.id.videoId}
          key={index} />);
      });
    }
    return(
      <div>
        <YouTubeAutocomplete
          apiKey={process.env.REACT_APP_YOUTUBE_KEY}
          placeHolder="Search Youtube"
          maxResults="20"
          callback={this._onSearchResultsFound}
        />
        <div className="flex-container">
          {youtubeCardList}
        </div>
      </div>
    );
  }

  _onSearchResultsFound = (results) => {
    this.props.fetchYoVids(results)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchYoVids: YouActions.getYouList
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    videoList: state.youTube
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeSearch)





/* fetchClassLikes: UserActions.fetchClassLikes,
    fetchStudentClassLikes: UserActions.fetchStudentClassLikes,
    addStudentClassLike: UserActions.addStudentClassLike*/