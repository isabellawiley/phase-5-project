let initialState = {
    closets: [],
    closet: {},
    selectedCloset: {}
}

function closetReducer(state = initialState, action){

    switch(action.type){
        case "setUserClosets":
            return{
                ...state, closets: action.payload
            }
        case "setSelectedCloset":
            return{
                ...state, selectedCloset: action.payload
            }
        case "getCloset":
            return{
                ...state, closet: action.payload
            }
        case "newCloset":
            return{
                ...state, closets: [...state.closets, action.payload]
            }
        case "deleteCloset":
            return{
                ...state, closets: action.payload
            }
        default:
            return state
    }
}

export default closetReducer;