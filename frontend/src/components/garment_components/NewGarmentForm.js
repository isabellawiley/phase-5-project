import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Select from "react-select";
import makeAnimated from "react-select/animated"

function NewGarmentForm(){
    const closets = useSelector((state) => state.closetReducer.closets)
    const temperatures = useSelector((state) => state.temperatureReducer.temperatures)
    const dispatch = useDispatch();
    const selectedCloset = useSelector((state) => state.closetReducer.selectedCloset)
    const selectedGarmentTemps = useSelector((state) => state.garmentReducer.selectedTemps)
    const history = useHistory();
    let tempOptions = [];
    let closetOptions = [];
    const animatedComponents = makeAnimated();

    temperatures.map((temp) => tempOptions.push({label: `${temp.low_temperature} - ${temp.high_temperature}`, value: temp}))
    closets.map((closet) => closetOptions.push({label: closet.title, value: closet}))

    function handleSubmit(e){
        e.preventDefault();

        fetch(`http://localhost:3000/garments`, {
            method: "POST",
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
                {/* <label>Garment Image</label>
                <input name="image" type="text"></input><br/> */}
                <label>Garment Name</label>
                <input id="name" type="text"></input><br/>
                <label>Garment Type</label>
                <input id="garment_type" type="text" ></input><br/>
                <label>Garment Style</label>
                <input id="garment_style" type="text"></input><br/>
                <label>Add to Favorites?</label>
                <select id="is_favorite" >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </select><br/>
                <label>Choose closet: </label>
                <Select
                    options={closetOptions}
                    components={animatedComponents} 
                    onChange={(e) => dispatch({type: "setSelectedCloset", payload: e.value})}
                    // onChange={(e) => setValue("closet", e.value)}
                /><br/>
                <label>Temperature you can where this garment in (choose all that apply): </label>
                <Select
                    options={tempOptions}
                    components={animatedComponents}
                    isMulti
                    // onChange={(e) => setSelected(e)}
                    // value={selected}
                    onChange={(e) => dispatch({type: "setSelectedTemps", payload: e})}
                    // value={selected}
                 /><br/>
                <input type="submit"/>
            </form>
        </div>
    )
}  export default NewGarmentForm;