import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from "./Landing";
import ChipExampleArray from "./ChipExampleArray";
import TagsExample from "./TagsExample"
import YoutubeSearch from "./Youtube"
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Profile = () => <h2>Profile</h2>;

class App extends Component{
    componentDidMount(){
        this.props.fetchUser();
    };

    render(){
        return(
            <div>
                {/*Hi There!*/}
                {/*<a href="/auth/google/"> Sign In With Google</a>*/}
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Route exact path="/" component={YoutubeSearch}/>
                        <Route exact path="/classes" component={Dashboard}/>
                        <Route exact path="/videos/new" component={SurveyNew}/>
                        <Route exact path="/profile" component={TagsExample}/>
                    </div>
                </BrowserRouter>
            </div>
            );
    };
}

export default connect(null, actions)(App);