import { combineReducers } from 'redux';
import authReducer from './authReducer';
import youTubeReducer from './youTubeReducer'

export default combineReducers({
    auth: authReducer,
    youTube: youTubeReducer
})
