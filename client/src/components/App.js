import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from "./Landing";
import SpecificClass from "./SpecificClass"
import ClassSelection from "./ClassSelection"
import Profile from "./Profile"
import YoutubeSearch from "./Youtube"
const MyClasses = () => <h2>My Classes</h2>;

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
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/search" component={YoutubeSearch}/>
                        <Route exact path="/classes" component={MyClasses}/>
                        <Route exact path="/classes" component={ClassSelection}/>
                        <Route exact path="/classes/:className" component={SpecificClass}/>
                        <Route exact path="/profile" component={Profile}/>
                    </div>
                </BrowserRouter>
            </div>
            );
    };
}

export default connect(null, actions)(App);