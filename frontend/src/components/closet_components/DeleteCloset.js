import { useDispatch, useSelector } from "react-redux";

function DeleteCloset({closet}){
    const closets = useSelector((state) => state.closetReducer.closets)
    const dispatch = useDispatch();


    function handleDelete(){
        fetch(`http://localhost:3000/closets/${closet.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(() => {
            
            const updatedClosets = closets.filter(clos => {
                return clos !== closet;
            })
            dispatch({type: "deleteCloset", payload: updatedClosets});
        })
    }

    return(
        <div>
            <button onClick={handleDelete}>Delete Closet</button>
        </div>
    )
}

export default DeleteCloset;