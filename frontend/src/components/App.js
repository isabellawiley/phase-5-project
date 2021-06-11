import { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router';
import '../App.css';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import {useDispatch, useSelector} from 'react-redux';

function App() {
  const history = useHistory();
  const currentUser = useSelector((state) => state.currentUser)
  console.log(currentUser)

  const count = useSelector((state) => state.count)
  const dispatch = useDispatch();
  

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedUser"));
    console.log(loggedInUser);
    if (loggedInUser) {
      dispatch({type: "setCurrentUser", payload: loggedInUser});
    }
    else {
      history.push("/login");
    }
  },[])



  return (
    <div>
      <Header />
      <h2>Current count value: {count}</h2> 
      <button onClick={() => dispatch({type: "inc", payload: 3})}>increment by 3</button>
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
      </Switch>
    </div>
  );
}

export default App;
