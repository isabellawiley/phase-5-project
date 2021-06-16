let initialState = {
    laundry: []
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
        default:
            return state;
    }
}

export default laundryReducer;