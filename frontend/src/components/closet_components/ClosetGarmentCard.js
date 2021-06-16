// import DeleteGarment from "./DeleteGarment";

function ClosetGarmentCard({garment}){
    return(
        <div>
            <h2>{garment.name}</h2>
            {/* <DeleteGarment garment={garment} /> */}
        </div>
    )
}

export default ClosetGarmentCard;