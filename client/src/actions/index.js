import axios from 'axios'
import { FETCH_USER } from "./types";

export const fetchUser = function(){
    return function(dispatch){ //when you return a function for your action then we get access to the dispatch function
        axios.get('/api/current_user').then(function(res){
            dispatch({
                type: FETCH_USER,
                payload: res
            });
        });
    };
};   