import axios from 'axios'
import { FETCH_USER } from "./types";

export const fetchUser = function(){
    return async function(dispatch){ //when you return a function for your action then we get access to the dispatch function
        const res = await axios.get('/api/current_user');
        dispatch({
            type: FETCH_USER,
            payload: res.data
        });
    };
};

// export const fetchUserClasses = function(){
//     return async function(dispatch){
//         const res = await axios.get('/api/student_classes');
//         dispatch({
//             type: FETCH_USER_CLASSES,
//             payload: res.data
//         })
//     }
// };