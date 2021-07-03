import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";

function DeleteCloset({closet}){
    const closets = useSelector((state) => state.closetReducer.closets)
    const dispatch = useDispatch();


    function handleDelete(){
        fetch(`http://localhost:3000/closets/${closet.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            const updatedClosets = closets.filter(clos => {
                return clos !== closet;
            })
            console.log(updatedClosets)
            dispatch({type: "deleteCloset", payload: updatedClosets});
        })
    }

    return(
        <div>
            <Button className="button" variant="outline-dark" onClick={handleDelete}>Delete Closet</Button >
        </div>
    )
}

export default DeleteCloset;