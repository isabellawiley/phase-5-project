import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Select from "react-select";
import makeAnimated from "react-select/animated"
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from "react";

function NewGarmentForm(){
    const dispatch = useDispatch();
    const history = useHistory();
    const animatedComponents = makeAnimated();
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    const closets = useSelector((state) => state.closetReducer.closets)
    const temperatures = useSelector((state) => state.temperatureReducer.temperatures)
    const selectedGarmentTemps = useSelector((state) => state.garmentReducer.selectedTemps)
    const garmentTypes = useSelector((state) => state.garmentReducer.garmentTypes)
    const garmentStyles = useSelector((state) => state.garmentReducer.garmentStyles)
    let tempOptions = [];
    const [image, setImage] = useState("");
    const [valid, setValid] = useState(false);

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

    const uploadImage = async e => {
        setValid(true);
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'mngmeimages');
        console.log(data)
        
        const res = await fetch("https://api.cloudinary.com/v1_1/ddr8azah3/image/upload", {
            method: "POST",
            body: data
        })

        const file = await res.json();
        console.log(file);

        setImage(file.secure_url);
        console.log(file.secure_url);
    }

    function handleSubmit(e){
        e.preventDefault();

        fetch(`http://localhost:3000/garments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: e.target[0].value,
                garment_type: e.target[2].value,
                garment_style: e.target[3].value,
                is_favorite: e.target[4].value,
                closet_id: e.target[1].value,
                user_id: currentUser.id,
                image: image
            })
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
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
            setImage("");
        })
    }

    return(
        <div className='form'>
            <Form onSubmit={handleSubmit}>
                <h1>New Garment</h1>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Garment Name</Form.Label>
                        <Form.Control
                        type="text"
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Choose Closet</Form.Label>
                        <Form.Control as="select">
                            {closetOptions}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Garment Type</Form.Label>
                        <Form.Control as="select">
                            {garmentTypeOptions}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Garment Style</Form.Label>
                        <Form.Control as="select">
                            {garmentStyleOptions}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Add to Favorites?</Form.Label>
                        <Form.Control as="select">
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Select Temperatures</Form.Label>
                        <Select
                            options={tempOptions}
                            components={animatedComponents}
                            isMulti
                            onChange={(e) => dispatch({type: "setSelectedTemps", payload: e})}
                        /><br/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Garment Image</Form.Label>
                        <Form.File id="custom-file" type="file" name="image" custom>
                            <Form.File.Input isValid={valid} onChange={uploadImage}/>
                            <Form.File.Label>Image Upload</Form.File.Label>
                            <Form.Control.Feedback type='valid'><img alt={image} src={image}/></Form.Control.Feedback>
                        </Form.File>
                    </Form.Group>
                </Form.Row>
                <Button variant="dark" type="submit">Submit</Button>
            </Form>
        </div>
    )
}  export default NewGarmentForm;