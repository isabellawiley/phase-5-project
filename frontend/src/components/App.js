import { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router';
import '../App.css';
import Header from './Header';
import Home from './Home';
import Login from './user_components/Login';
import SignUp from './user_components/SignUp';
import {useDispatch} from 'react-redux';
import AllUserGarments from './garment_components/AllUserGarments';
import NewGarmentForm from './garment_components/NewGarmentForm';
import AllUserClosets from './closet_components/AllUserClosets';
import NewClosetForm from './closet_components/NewClosetForm';
import ClosetPage from './closet_components/ClosetPage';
import LaundryBasket from './laundry_components/LaundryBasket';
import Profile from './user_components/Profile';
import SuggestedGarments from './garment_components/SuggestedGarments';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedInUser) {
      currentWeather(loggedInUser.lat, loggedInUser.lon)
      dispatch({type: "setCurrentUser", payload: loggedInUser});
      dispatch({type: "setUserLaundry", payload: loggedInUser.laundry})
      dispatch({type: "incLaundryWeight", payload: loggedInUser.laundry_weight})
      dispatch({type: "defaultCloset", payload: loggedInUser.default_closet})
      dispatch({type: "setUserLaundry", payload: loggedInUser.laundry})
      dispatch({type: "setLaundryWeight", payload: loggedInUser.laundry_weight})
      // dispatch({type: "setUserGarments", payload: loggedInUser.garments}); 
      dispatch({type: "setUserClosets", payload: loggedInUser.closets});       

      fetch(`http://localhost:3000/garments`)
      .then(res => res.json())
      .then((garments) => {
        let userGarments = garments.filter(garment => garment.user.id == loggedInUser.id)
        dispatch({type: "setUserGarments", payload: userGarments});        
      })

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

function currentWeather(lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=56962be90eb5550793ea9f08272fa9ac`)
    .then(res => res.json())
    .then((data) => {
      dispatch({type: "currentTemp", payload: data.current.temp})
    })
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
          <Home />
        </Route>
        <Route exact path="/garments">
          <AllUserGarments/>
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
          <ClosetPage />
        </Route>
        <Route exact path="/laundry">
          <LaundryBasket />
        </Route>
        {/* <Route exact path="/suggested">
          <SuggestedGarments />
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
