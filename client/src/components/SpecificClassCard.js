/*
import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import {connect} from 'react-redux'
import * as UserActions from '../actions/index'
import * as YouActions from '../actions/youActions'
import { bindActionCreators } from 'redux'
import _isEqual from 'lodash/isEqual';
import SpecificClassContent from './SpecificClassContent'


export default class SpecificClassCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      videoId: this.props.videoId,
      key: this.props.key
    };
  }


  componentDidMount() {
    console.log('Child Mounted');
  }

  componentWillReceiveProps(nextProps) {
    if(!_isEqual(nextProps, this.state)){
      this.setState(nextProps);
    }
  }

  render() {
    return(
      <Card className="flex-item">
        <Card.Content className="iframe-parent">
          <iframe className='video iframe-dim'
                  src={"//www.youtube.com/embed/" + this.state.videoId}
                  frameBorder="0"
                  allowFullScreen>
          </iframe>
        </Card.Content>
        <Card.Content extra>
          <SpecificClassContent videoId={this.state.videoId} key={this.state.key}/>
        </Card.Content>
      </Card>
    );
  }
}
/!*
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchClassLikes: UserActions.fetchClassLikes
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    userClasses: state.auth.userClasses
  }
}*!/





*/
