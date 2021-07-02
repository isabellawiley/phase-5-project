import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Modal } from "semantic-ui-react";
import { Form, Button, Col } from 'react-bootstrap';

function EditGarment({garment}){
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const animatedComponents = makeAnimated();
    const allGarments = useSelector((state) => state.garmentReducer.garments);
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    const closets = useSelector((state) => state.closetReducer.closets)
    const temperatures = useSelector((state) => state.temperatureReducer.temperatures)
    const selectedGarmentTemps = useSelector((state) => state.garmentReducer.selectedTemps)
    const garmentTypes = useSelector((state) => state.garmentReducer.garmentTypes)
    const garmentStyles = useSelector((state) => state.garmentReducer.garmentStyles)
    let tempOptions = [];

    let garmSelectedTemps = garment.temperatures.map((temp) => {
        return({label: `${temp.low_temperature} - ${temp.high_temperature}`, value: temp})
    })

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

    function handleOpen(){
        setOpen(true);
        dispatch({type: "setSelectedTemps", payload: garmSelectedTemps});
    }

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
                garment_type: e.target[2].value,
                garment_style: e.target[3].value,
                is_favorite: e.target[4].value,
                closet_id: e.target[1].value,
                user_id: currentUser.id,
                image: e.target[5].value
            })
        })
        .then(res => res.json())
        .then((data) => {
            let garmentIndex = allGarments.indexOf(garment);
            allGarments[garmentIndex] = data;
            console.log(allGarments);
            dispatch({type: "setUserGarments", payload: allGarments});

            let selectedArr = [];
            selectedGarmentTemps.map((sel) => selectedArr.push(sel.value));
            let to_delete = [];
            let to_create = [];

            garment.temperatures.map((current_temp) => {
                if(!selectedArr.includes(current_temp)){
                    let range_id = garment.temperature_ranges.find(temp_range => temp_range.temperature_id == current_temp.id);
                    to_delete.push(range_id);
                }
            })

            selectedArr.map((temp) => {
                if(!garment.temperatures.includes(temp)){
                    to_create.push(temp);
                }
            })

            to_create.forEach((temp) => {
                fetch(`http://localhost:3000/temperature_ranges`,{
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        temperature_id: temp.id,
                        garment_id: data.id
                    })
                })
                .then(res => res.json())
                .then((d) => {
                    console.log(d)
                })
            })

            to_delete.forEach((temp) => {
                fetch(`http://localhost:3000/temperature_ranges/${temp.id}`, {
                    method: "DELETE"
                })
                .then(res => res.json())
                .then((x) => {
                    console.log(x)
                })
            })
            dispatch({type: "setSelectedTemps", payload: []});
            setOpen(false);
            window.location.reload();
        })
    }

    return(
        <div>
            <Modal onClose={() => setOpen(false)} onOpen={handleOpen}
            open={open} trigger={<Button className="button" variant="outline-dark">Edit Garment</Button>}>
                <h1>Edit Garment</h1>
                <Modal.Content>
                    <Modal.Description>
                        <h1>{garment.name}</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Garment Name</Form.Label>
                                    <Form.Control
                                    type="text" defaultValue={garment.name}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Choose Closet</Form.Label>
                                    <Form.Control as="select" defaultValue={garment.closet}>
                                        {closetOptions}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Garment Type</Form.Label>
                                    <Form.Control as="select" defaultValue={garment.garment_type}>
                                        {garmentTypeOptions}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Garment Style</Form.Label>
                                    <Form.Control as="select" defaultValue={garment.garment_style}>
                                        {garmentStyleOptions}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Add to Favorites?</Form.Label>
                                    <Form.Control as="select" defaultValue={garment.is_favorite}>
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Change Garment URL:</Form.Label>
                                    <Form.Control
                                    type="text"
                                    defaultValue={garment.image}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Select Temperatures</Form.Label>
                                    <Select
                                        options={tempOptions}
                                        components={animatedComponents}
                                        isMulti
                                        defaultValue={garmSelectedTemps}
                                        onChange={(e) => dispatch({type: "setSelectedTemps", payload: e})}
                                    /><br/>
                                </Form.Group>
                            </Form.Row>
                            <Button variant="dark" type="submit">Submit</Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </div>
    )
}

export default EditGarment;