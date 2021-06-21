import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Button, Modal } from "semantic-ui-react";

function EditGarment({garment}){
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const animatedComponents = makeAnimated();
    const closets = useSelector((state) => state.closetReducer.closets)
    const temperatures = useSelector((state) => state.temperatureReducer.temperatures)
    const selectedGarmentTemps = useSelector((state) => state.garmentReducer.selectedTemps)
    const garmentTypes = useSelector((state) => state.garmentReducer.garmentTypes)
    const garmentStyles = useSelector((state) => state.garmentReducer.garmentStyles)
    let tempOptions = [];
    // let garmSelectedTemps = [];
    // const garmTemps = garment.temperatures;

    console.log(garment)
    console.log(garment.temperatures)

    // garmTemps.map((temp) => garmSelectedTemps.push({label: `${temp.low_temperature} - ${temp.high_temperature}`, value: temp}))

    // let garmentTemps = garment.temperatures.map((temp) => {
    //     return({label: `${temp.low_temperature} - ${temp.high_temperature}`, value: temp})
    // })
    
    // dispatch({type: "setSelectedTemps", payload: garmentTemps})

    let garmentTypeOptions = garmentTypes.map((type) => {
        return(
            <option value={type.name}>{type.name}</option>
        )
    })

    let garmentStyleOptions = garmentStyles.map((style) => {
        return(
            <option value={style}>{style}</option>
        )
    })

    let closetOptions = closets.map((closet) => {
        return(
            <option value={closet.id}>{closet.title}</option>
        )
    })
    
    temperatures.map((temp) => tempOptions.push({label: `${temp.low_temperature} - ${temp.high_temperature}`, value: temp}))

    function handleSubmit(e){
        e.preventDefault();

        fetch(`http://localhost:3000/garments/${garment.id}`, {
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
                closet_id: e.target[4].value
            })
        })
        .then(res => res.json())
        .then((data) => {
            // dispatch({type: "newGarment", payload: data});
            // EDIT GARMENT HERE
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
            <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)}
            open={open} trigger={<Button>Edit Garment</Button>}>
                <h1>Edit Garment</h1>
                <Modal.Content>
                    <Modal.Description>
                        <h1>{garment.name}</h1>
                        <form onSubmit={handleSubmit}>
                            <label>Garment Name</label>
                            <input id="name" type="text" value={garment.name}></input><br/>
                            <label>Garment Type</label>
                            <select>
                                {garmentTypeOptions}
                            </select><br/>
                            <label>Garment Style</label>
                            <select>
                                {garmentStyleOptions}
                            </select><br/>
                            <label>Add to Favorites?</label>
                            <select id="is_favorite" value={garment.is_favorite}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select><br/>
                            <label>Choose closet: </label>
                            <select value={garment.closet}>
                                {closetOptions}
                            </select><br/>
                            <label>Temperature you can where this garment in (choose all that apply): </label>
                            <Select
                                options={tempOptions}
                                components={animatedComponents}
                                isMulti
                                // value={selectedGarmentTemps}
                                onChange={(e) => dispatch({type: "setSelectedTemps", payload: e})}
                            /><br/>
                            <input type="submit"/>
                        </form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </div>
    )
}

export default EditGarment;