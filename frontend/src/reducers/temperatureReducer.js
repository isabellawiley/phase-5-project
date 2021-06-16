let initialState = { 
    temperatures: []
}

function temperatureReducer(state = initialState, action){

    switch(action.type){
        case "setTemperatures":
            return{
                ...state, temperatures: action.payload
            }
        default:
            return state;
    }
}

export default temperatureReducer;