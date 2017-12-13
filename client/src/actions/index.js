import axios from 'axios'
import { FETCH_USER, FETCH_USER_CLASSES, ADD_USER_CLASSES, FETCH_CLASS_LIKES, ADD_STUDENT_CLASS_LIKE} from "./types";

export const fetchUser = function(){
    return async function(dispatch){ //when you return a function for your action then we get access to the dispatch function
        const res = await axios.get('/api/current_user');
        dispatch({
            type: FETCH_USER,
            payload: res.data
        });
    };
};

export const fetchUserClasses = function(){
    return async function(dispatch){
        const res = await axios.get('/api/student/classes');
        console.log(res)
        dispatch({
            type: FETCH_USER_CLASSES,
            payload: res.data
        })
    }
};

export const addUserClasses = function(tag){
    console.log('tag_post', tag);
    return async function(dispatch){
        const res = await axios.post('/api/student/classes', {name: tag});
          dispatch({
              type: ADD_USER_CLASSES,
              payload: tag
          })
    }
};

// export const deleteUserClasses = function(id){
//     const url_string = {"/api/student/classes/":id};
//     console.log(url_string);
//     return async function(dispatch){
//         const res = await axios.delete(url_string)
//     }
// }

export const fetchClassLikes = function(classId){  //fetches class likes
    console.log('classId', classId);
    let urlString = '/api/class/' + classId;
    console.log(urlString);
    return async function(dispatch){
        const res = await axios.get(urlString);
        console.log(res);
          dispatch({
            type: FETCH_CLASS_LIKES,
            payload: res.data
          })
    }
};

export const fetchStudentClassLikes = function(className){ //fetches student class likes
  console.log('className', className);
  // let urlString = '/api/classes/' + className;
  // console.log(urlString);
  // return async function(dispatch){
  //   const res = await axios.get(urlString);
  //   console.log(res);
  //   dispatch({
  //     type: FETCH_CLASS_LIKES,
  //     payload: res.data
  //   })
  // }
};


export const addStudentClassLike = function(classId, videoId){ //add student class like

  let obj = {
    classId: classId,
    videoId: videoId
  };
  return async function(dispatch){
    const res = await axios.post('/api/student/class/like', obj);
    dispatch({
      type: ADD_STUDENT_CLASS_LIKE,
      payload: res.data   //student.classes
    })
  }
};