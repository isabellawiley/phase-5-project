let initialState = {
    garments: [],
    selectedTemps: [], 
    garmentTemperatures: [],
    garmentTypes: [
        {
            name: "short-sleeve shirt",
            weight: 200
        },
        {
            name: "long-sleeve shirt",
            weight: 250
        },
        {
            name: "sleeveless shirt",
            weight: 150
        },
        {
            name: "long pants",
            weight: 500
        },
        {
            name: "mid-length pants",
            weight: 400
        },
        {
            name: "shorts",
            weight: 300
        },
        {
            name: "dress",
            weight: 350
        },
        {
            name: "sweater/sweatshirt",
            weight: 400
        }
    ],
    garmentStyles: ["casual", "activewear", "loungewear", "formal"]
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
        case "resetGarmentReducer":
            return{
                ...state,
                garments: [],
                selectedTemps: [], 
                garmentTemperatures: []
            }
        default:
            return state;
    }
}

export default garmentReducer;