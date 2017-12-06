export default function(state = null, action){
    console.log(action);
    switch(action.type){
        case 'GET_YOU_LIST':
            return {...state, youTube: action.results};
        default:
            return state;
    }
}
