let initialState = {
    garments: [],
    selectedTemps: [], 
    garmentTemperatures: []
}

function garmentReducer(state = initialState, action){

    switch(action.type){
        case "setUserGarments":
            return{
                ...state, garments: action.payload
            }
        case "setGarmentTemperatures":
            return{
                ...state, garmentTemperatures: action.payload
            }
        case "setSelectedTemps":
            return{
                ...state, selectedTemps: action.payload
            }
        case "newGarment":
            return{
                ...state, garments: [...state.garments, action.payload]
            }
        case "deleteGarment":
            return{
                ...state, garments: action.payload
            }
        default:
            return state;
    }
}

export default garmentReducer;