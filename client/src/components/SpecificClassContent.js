/*
import React, { Component } from 'react'
import { Label, Icon } from 'semantic-ui-react'
import _isEqual from 'lodash/isEqual';



export default class SpecificClassContent extends Component{
  constructor(props) {
    super(props);
    this.props.fetchUserClasses();
    this.state = {
      key: this.props.key,
      videoId: this.props.videoId,
      likes:null
    };
  }

  componentDidMount(){
  }

  componentWillReceiveProps(nextProps){
    if(!_isEqual(nextProps, this.state)){
      this.setState(nextProps);
    }
  }

  render(){
    let data =null;
    if(this.props.userClasses){
      data = (
        <div>
          <Label>
            <Icon name='heart' /> 23
          </Label>
        </div>
      );
    }
    return data;
  }

}
*/
