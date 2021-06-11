let initialState = {count: 0, garments: [], currentUser: {}, errorMessage: ""};

function rootReducer(state = initialState, action){

    switch(action.type){
        case "inc":
            return{
                ...state, count: state.count + action.payload
            }
        case "setCurrentUser":
            return{
                ...state, currentUser: action.payload
            }
        case "setErrorMessage":
            return{
                ...state, errorMessage: action.payload
            }
        case "setGarments":
            return{
                ...state, garments: action.payload
            }
        default:
            return state;
    }
    // return state
}

export default rootReducer;