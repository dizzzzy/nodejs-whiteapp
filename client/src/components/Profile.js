import React from 'react';
import ReactDOM from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import {Icon} from 'react-materialize'
import {connect} from 'react-redux'
import * as UserActions from '../actions'
import { bindActionCreators } from 'redux'
import _isEqual from 'lodash/isEqual';
import * as CountryLanguage from 'country-language'

const allLanguageCodes = CountryLanguage.getLanguageCodes(1);

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [{ id: 1, text: "Thailand" }, { id: 2, text: "India" }],
            suggestions: ["hello","hi"]
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      if(!_isEqual(nextProps, this.state)){
        this.setState(nextProps);
      }
    }

    handleDelete(tag) {
        console.log('tag',tag); //tag id
        let tags = this.state.tags;
        console.log('tags',tags); //array of obj with id and name
        // this.props.deleteUserClasses(tag);
        // tags.pull({
        //     id: tag
        // });
        this.setState({tags: tags});
    }

    componentWillMount() {
     this.props.fetchUserClasses();
     console.log("this.state.tags", this.state.tags);
    }

    handleAddition(tag) {
        this.props.addUserClasses(tag);
        let tags = this.state.tags;
        tags.push({
            id: tags.length + 1,
            text: tag
        });
        this.setState({tags: tags});
    }

    handleDrag(tag, currPos, newPos) {
        let tags = this.state.tags;

        // mutate array
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: tags });
    }

    render() {
        const { suggestions } = this.state;
        let tags;
        if(this.props.userClasses)
          tags = this.props.userClasses
        console.log(tags)
        return (
            <div className='container'>
                <h3>Profile</h3>
                <p style={{fontSize: 16}}><Icon>perm_identity</Icon>&nbsp; Personal Information
                    <br/>
                    <ul style={{marginLeft: 30}}>
                        <li>First Name:&nbsp;&nbsp; James</li>
                        <li>Last Name: &nbsp;&nbsp; Ziavras</li>
                        <li>Gender: &nbsp;&nbsp; Male</li>
                        <li>Home City:&nbsp;&nbsp; Montreal</li>
                        <li>Country:&nbsp;&nbsp; Canada</li>
                        <li>Email:&nbsp;&nbsp; dimitriosziavras@hotmail.com</li>
                        <li>Phone Number:&nbsp;&nbsp; (514) 550 6323</li>
                    </ul>
                </p>

                <p style={{fontSize: 16}}><Icon>work</Icon>&nbsp; Work
                    <ul style={{marginLeft: 30}}>
                        <li>Current Position:&nbsp;&nbsp; Full Stack developer</li>
                        <li>Current Company: &nbsp;&nbsp; Freelancing</li>
                    </ul>
                </p>

                <p style={{fontSize: 16}}><Icon>school</Icon>&nbsp; What classes are you currently enrolled in?</p>
                <ReactTags
                           tags={tags}
                           suggestions={suggestions}
                           handleDelete={this.handleDelete}
                           handleAddition={this.handleAddition}
                           handleDrag={this.handleDrag} />
                <br/>

            </div>
        )
    }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUserClasses: UserActions.fetchUserClasses,
    addUserClasses: UserActions.addUserClasses
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    userClasses: state.auth.userClasses
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
