import './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';

import App from './components/App';
import reducers from './reducers';

const store = createStore(function(){
        return reducers;
    },
    {},
    applyMiddleware()
);

ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    document.getElementById('root')
);