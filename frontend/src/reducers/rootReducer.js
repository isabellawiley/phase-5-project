import {combineReducers} from 'redux';
import garmentReducer from './garmentReducer';
import closetReducer from './closetReducer';
import temperatureReducer from './temperatureReducer';
import laundryReducer from './laundryReducer'

let initialState = {
    currentUser: {}, 
    errorMessage: ""
};

function userReducer(state = initialState, action){

    switch(action.type){
        case "setCurrentUser":
            return{
                ...state, currentUser: action.payload
            }
        case "setErrorMessage":
            return{
                ...state, errorMessage: action.payload
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({userReducer, garmentReducer, closetReducer, temperatureReducer, laundryReducer})
export default rootReducer;