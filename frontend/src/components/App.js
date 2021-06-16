import { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router';
import '../App.css';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import {useDispatch} from 'react-redux';
import AllUserGarments from './garment_components/AllUserGarments';
import NewGarmentForm from './garment_components/NewGarmentForm';
import AllUserClosets from './closet_components/AllUserClosets';
import NewClosetForm from './closet_components/NewClosetForm';
import ClosetPage from './closet_components/ClosetPage';
import LaundryBasket from './laundry_components/LaundryBasket';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();  

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedInUser) {
      dispatch({type: "setCurrentUser", payload: loggedInUser});

      fetch(`http://localhost:3000/garments`)
      .then(res => res.json())
      .then((garments) => {
        let userGarments = garments.filter(garment => garment.user.id === loggedInUser.id)
        dispatch({type: "setUserGarments", payload: userGarments});

        let dirtyGarments = garments.filter((garment) => garment.is_clean === false)
        dispatch({type: "setUserLaundry", payload: dirtyGarments})
      })

      fetch(`http://localhost:3000/closets`)
      .then(res => res.json())
      .then((closets) => {
        let userClosets = closets.filter(closet => closet.user.id === loggedInUser.id)
        dispatch({type: "setUserClosets", payload: userClosets});
      })
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
  })

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
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
      </Switch>
    </div>
  );
}

export default App;
