import './App.css';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import jwt_decode from 'jwt-decode';
import setAuthToken from "./redux/utils/setAuthToken";
import { useDispatch } from 'react-redux';
import { logout_user, set_user } from './redux/ducks/auth';

function App() {

  const dispatch = useDispatch();

  //Check for token
  if(localStorage.jwtToken){

    //set auth token
    setAuthToken(localStorage.jwtToken);
    
    //decode token
    const decode= jwt_decode(localStorage.jwtToken);
    
    //set user and its authentication
    dispatch(set_user(decode));

    //Check for expired token
    const currentTime= Date.now();
    if(decode.exp > currentTime) {

      //Logout
      dispatch(logout_user());

      //redirect
      window.location.href='/login';

    }
  }


  return (
    <div className="App">
      <Router>
      <Navbar /> 
       <Switch>
         <Route exact path='/'>
          <Landing/>
        </Route>
        <div className="container">
          <Route path="/login">
              <Login />
          </Route>
          <Route path="/register">
              <Register/>
          </Route>
        </div>
       </Switch>
     </Router>
    </div>
  );
}

export default App;
