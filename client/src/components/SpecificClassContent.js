import React, { Component } from 'react'
import { Label, Icon } from 'semantic-ui-react'
import _isEqual from 'lodash/isEqual';



export default class SpecificClassContent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      key: this.props.key,
      videoId: this.props.videoId,
      numberLikes: this.props.numberLikes,
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
    if(this.props.numberLikes){
      data = (
        <div>
          <Label>
            Total likes <Icon name='heart' />{this.props.numberLikes}
          </Label>
        </div>
      );
    }
    return data;
  }

}
