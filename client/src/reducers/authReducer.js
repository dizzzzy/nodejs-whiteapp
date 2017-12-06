import { FETCH_USER, FETCH_USER_CLASSES, ADD_USER_CLASSES, ADD_STUDENT_CLASS_LIKE, FETCH_CLASS_LIKES} from "../actions/types";

const initialState = {
  userClasses: []
};

export default function(state = initialState, action){
    console.log(action);
    switch(action.type){
      case FETCH_USER:
          return action.payload || false;
      case FETCH_USER_CLASSES:
        let user_classes = [];
        action.payload.map((tag, index) =>{
          tag.value = tag.name;
          tag.text =  tag.name;
          user_classes.push(tag);
        });
        return {...state, userClasses: user_classes};
      case ADD_USER_CLASSES:
          let tag = { id: state.userClasses.length+1, text: action.payload };
          return {...state, userClasses: [...state.userClasses, tag]};
      case ADD_STUDENT_CLASS_LIKE:  //might need to be fixed
          let student_class = [];
          action.payload.map((tag, index) =>{
            tag.value = tag.name;
            tag.text =  tag.name;
            student_class.push(tag);
          });
          return {...state, userClasses: student_class};
      case FETCH_CLASS_LIKES:
        let class_likes;
        console.log('fetch_class_likes action payload',action.payload);
        return {...state};
      default:
          return state;
    }
}
