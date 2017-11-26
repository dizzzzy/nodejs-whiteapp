import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import Header from './Header'
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

const App = function(){
    return(
        <div>
            {/*Hi There!*/}
            {/*<a href="/auth/google/"> Sign In With Google</a>*/}
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/surveys" component={Dashboard}/>
                    <Route exact path="/surveys/new" component={SurveyNew}/>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;