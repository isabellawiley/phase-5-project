import { useDispatch, useSelector } from "react-redux";
import makeAnimated from "react-select/animated";

function EditGarment({garment}){
    const dispatch = useDispatch();
    const animatedComponents = makeAnimated();
    const closets = useSelector((state) => state.closetReducer.closets)
    const selectedCloset = useSelector((state) => state.closetReducer.selectedCloset)
    const temperatures = useSelector((state) => state.temperatureReducer.temperatures)
    const selectedGarmentTemps = useSelector((state) => state.garmentReducer.selectedTemps)
    let tempOptions = [];
    let closetOptions = [];
    
    temperatures.map((temp) => tempOptions.push({label: `${temp.low_temperature} - ${temp.high_temperature}`, value: temp}))
    closets.map((closet) => closetOptions.push({label: closet.title, value: closet}))

    function handleSubmit(){
        e.preventDefault();

        fetch(`http://localhost:3000/garments`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // image: e.target[0].value,
                name: e.target[0].value,
                garment_type: e.target[1].value,
                garment_style: e.target[2].value,
                is_favorite: e.target[3].value,
                closet_id: selectedCloset.id
            })
        })
        .then(res => res.json())
        .then((data) => {
            dispatch({type: "newGarment", payload: data});
            selectedGarmentTemps.forEach((temp) => {
                fetch(`http://localhost:3000/temperature_ranges`,{
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        temperature_id: temp.value.id,
                        garment_id: data.id
                    })
                })
                .then(res => res.json())
                .then((d) => {
                    console.log(d)
                })
            })
            history.push("/garments")        
        })
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
            <label>Garment Name</label>
                <input id="name" type="text" value={garment.name}></input><br/>
                <label>Garment Type</label>
                <input id="garment_type" type="text" value={garment.garment_type} ></input><br/>
                <label>Garment Style</label>
                <input id="garment_style" type="text" value={garment.garment_style}></input><br/>
                <label>Add to Favorites?</label>
                <select id="is_favorite" >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </select><br/>
                <label>Choose closet: </label>
                <Select
                    options={closetOptions}
                    components={animatedComponents} 
                    value={selectedCloset}
                    onChange={(e) => dispatch({type: "setSelectedCloset", payload: e.value})}
                /><br/>
                <label>Temperature you can where this garment in (choose all that apply): </label>
                <Select
                    options={tempOptions}
                    components={animatedComponents}
                    isMulti
                    value={selectedGarmentTemps}
                    onChange={(e) => dispatch({type: "setSelectedTemps", payload: e})}
                 /><br/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default EditGarment;