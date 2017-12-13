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
    console.log('SpecificClassCard props', this.props);
    this.state = {
      videoId: this.props.videoId,
      numberLikes: this.props.numberLikes,
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
    return (
      <Card className="flex-item">
        <Card.Content className="iframe-parent">
          <iframe className='video iframe-dim'
                  src={"//www.youtube.com/embed/" + this.props.videoId}
                  frameBorder="0"
                  allowFullScreen>
          </iframe>
        </Card.Content>
        <Card.Content extra>
          <SpecificClassContent videoId={this.props.videoId} numberLikes={this.props.numberLikes} key={this.state.key}/>
        </Card.Content>
      </Card> );
  }
}






