let initialState = { 
    temperatures: [],
    icon: "",
    description: ""
}

function temperatureReducer(state = initialState, action){

    switch(action.type){
        case "setTemperatures":
            return{
                ...state, temperatures: action.payload
            }
        case "icon":
            return{
                ...state, icon: action.payload
            }
        case "description":
            return{
                ...state, description: action.payload
            }
        default:
            return state;
    }
}

export default temperatureReducer;