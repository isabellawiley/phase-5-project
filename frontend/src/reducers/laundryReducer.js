let initialState = {
    laundry: [],
    weight: 0
}

function laundryReducer(state = initialState, action){

    switch(action.type){
        case "setUserLaundry":
            return{
                ...state, laundry: action.payload
            }
        case "addLaundry":
            return{
                ...state, laundry: [...state.laundry, action.payload]
            }
        case "setLaundryWeight":
            return{
                ...state, weight: action.payload
            }
        case "incLaundryWeight":
            return{
                ...state, weight: state.weight + action.payload
            }
        case "resetLaundryReducer":
            return{
                ...state, 
                laundry: [],
                weight: 0
            }
        default:
            return state;
    }
}

export default laundryReducer;