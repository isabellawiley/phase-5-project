import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router';
import { Button, Modal } from "react-bootstrap";
import '../App.css';
import Header from './Header';
import Home from './Home';
import Login from './user_components/Login';
import SignUp from './user_components/SignUp';
import {useDispatch, useSelector} from 'react-redux';
import AllUserGarments from './garment_components/AllUserGarments';
import NewGarmentForm from './garment_components/NewGarmentForm';
import AllUserClosets from './closet_components/AllUserClosets';
import NewClosetForm from './closet_components/NewClosetForm';
import ClosetPage from './closet_components/ClosetPage';
import LaundryBasket from './laundry_components/LaundryBasket';
import Profile from './user_components/Profile';
import SuggestedGarments from './garment_components/SuggestedGarments';
import GarmentCard from "./garment_components/GarmentCard";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.garmentReducer.garmentTypes);
  const laundry_weight = useSelector((state) => state.laundryReducer.weight);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedInUser) {
      // dispatch({type: "setCurrentUser", payload: loggedInUser});
      // dispatch({type: "setUserLaundry", payload: loggedInUser.laundry})
      // dispatch({type: "incLaundryWeight", payload: loggedInUser.laundry_weight})
      // dispatch({type: "defaultCloset", payload: loggedInUser.default_closet})
      // dispatch({type: "setUserClosets", payload: loggedInUser.closets});
      
      fetch(`http://localhost:3000/users/${loggedInUser.id}`)
      .then(res => res.json())
      .then((user) => {
        dispatch({type: "setCurrentUser", payload: user});
        dispatch({type: "setUserGarments", payload: user.garments});
        currentWeather(loggedInUser.lat, loggedInUser.lon, user.garments); 
        dispatch({type: "setUserLaundry", payload: user.laundry});
        dispatch({type: "setLaundryWeight", payload: user.laundry_weight});
        dispatch({type: "favoriteGarments", payload: user.fav_garments});
        dispatch({type: "setUserClosets", payload: user.closets});
        dispatch({type: "defaultCloset", payload: user.default_closet});
      })

      // fetch(`http://localhost:3000/garments`)
      // .then(res => res.json())
      // .then((garments) => {
      //   let userGarments = garments.filter(garment => garment.user.id == loggedInUser.id)
      //   let favGarments = userGarments.filter(garment => garment.is_favorite == true);
      //   let laundry = userGarments.filter(garment => garment.is_clean == false);

      //   dispatch({type: "setUserGarments", payload: userGarments});
      //   currentWeather(loggedInUser.lat, loggedInUser.lon, userGarments) 
      //   dispatch({type: "favoriteGarments", payload: favGarments});
      //   dispatch({type: "setUserLaundry", payload: loggedInUser.laundry})
      //   dispatch({type: "setLaundryWeight", payload: loggedInUser.laundry_weight})   
      // })

      // fetch(`http://localhost:3000/closets`)
      // .then(res => res.json())
      // .then((closets) => {
      //   let userClosets = closets.filter(closet => closet.user.id === loggedInUser.id)
      //   dispatch({type: "setUserClosets", payload: userClosets});
      // })

    }
    else {
      history.push("/login");
    }
  },[])
  

  useEffect(() => {
    fetch(`http://localhost:3000/temperatures`)
    .then(res => res.json())
    .then((data) => {
      dispatch({type: "setTemperatures", payload: data})
    })
  },[])

  function logout(){
    localStorage.clear();
    history.push("/login");
    dispatch({type: "resetUserReducer"});
    dispatch({type: "resetGarmentReducer"})
    dispatch({type: "resetClosetReducer"})
    dispatch({type: "resetLaundryReducer"})
}

function currentWeather(lat, lon, garments){
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=56962be90eb5550793ea9f08272fa9ac`)
    .then(res => res.json())
    .then((data) => {
      const words = data.current.weather[0].description.split(" ");
      const description = words.map((word) => { 
        return word[0].toUpperCase() + word.substring(1); 
      }).join(" ");
      
      dispatch({type: "currentTemp", payload: data.current.temp})
      dispatch({type: "icon", payload: data.current.weather[0].icon})
      dispatch({type: "description", payload: description})
      const suggestedGarms = garments.filter((garment) => garment.lowest_temp < data.current.temp && data.current.temp < garment.highest_temp);
      dispatch({type: "suggestedGarments", payload: suggestedGarms})
    })
}

function addToLaundry(garment){
  let garmentType = allTypes.find(type => type.name == garment.garment_type);
  let garmentWeight = garmentType.weight

  fetch(`http://localhost:3000/garments/${garment.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          is_clean: false
      })
  })
  .then(res => res.json())
  .then((data) => {
      dispatch({type: "addLaundry", payload: data});
      dispatch({type: "incLaundryWeight", payload: garmentWeight})
      if(laundry_weight + garmentWeight > 3500){
          setShow(true);
      }
  })
}

function makeCards(garment){
  return <GarmentCard key={garment.id} garment={garment} addToLaundry={addToLaundry} />
}

  return (
    <div>
      <Header logout={logout}/>
      <Switch>
        <Route exact path="/login">
          <Login currentWeather={currentWeather}/>
        </Route>
        <Route exact path="/signup">
          <SignUp currentWeather={currentWeather}/>
        </Route>
        <Route exact path="/profile">
          <Profile logout={logout}/>
        </Route>
        <Route exact path="/">
          <Home addToLaundry={addToLaundry} />
        </Route>
        <Route exact path="/garments">
          <AllUserGarments addToLaundry={addToLaundry} makeCards={makeCards}/>
        </Route>
        <Route exact path="/new-garment">
          <NewGarmentForm />
        </Route>
        <Route exact path="/closets">
          <AllUserClosets />
        </Route>
        <Route exact path="/new-closet">
          <NewClosetForm />
        </Route>
        <Route exact path="/closets/:id">
          <ClosetPage makeCards={makeCards} />
        </Route>
        <Route exact path="/laundry">
          <LaundryBasket makeCards={makeCards} />
        </Route>
        <Route exact path="/suggested">
          <SuggestedGarments makeCards={makeCards}/>
        </Route>
      </Switch>
      <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Heading closeButton>Laundry Time!</Modal.Heading>
          <Modal.Body>
              Looks like your laundry basket is full! Click below to go to your Laundry Basket and do some laundry.
          </Modal.Body>
          <Modal.Footer>
              <Button variant="light" href="/laundry" onClick={() => setShow(false)}>View Laundry</Button>
          </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
