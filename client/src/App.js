import './App.css';
import React  from 'react';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import jwt_decode from 'jwt-decode';
import setAuthToken from "./redux/utils/setAuthToken";
import { useDispatch } from 'react-redux';
import { logout_user, set_user } from './redux/ducks/auth';
import Dashboard from './components/dashboard/Dashboard';
import { clear_current_profile } from './redux/ducks/profile';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/createprofile/CreateProfile';
import EditProfile from './components/editprofile/EditProfile';
import AddExperience from './components/addcredentials/AddExperience';
import AddEducation from './components/addcredentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Notfound from './components/notfound/Notfound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

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
    const currentTime= Date.now()/1000;
    
    if(decode.exp < currentTime) {

      //Logout
      dispatch(logout_user());

      //clear curent profile
      dispatch(clear_current_profile())

      //redirect
      window.location.href='/login';

    }
  }

 
  return (
    <div className="App">
      <Router>
      <Navbar /> 
         <Route exact path='/'>
          <Landing/>
        </Route>
        <div className="container">
          <Route  exact  path="/login">
              <Login />
          </Route>
          <Route  exact  path="/register">
              <Register/>
          </Route> 
          <Route  exact  path="/profiles">
              <Profiles />
          </Route>
          <Route  exact  path="/profile/:handle">
              <Profile />
          </Route>
          {/* <Route  exact  path="/post/:id">
              <Post />
          </Route> */}
          <Route  exact  path="/not-found">
              <Notfound />
          </Route>
    
        <Switch>
          <PrivateRoute path="/dashboard"  component= {Dashboard}/>
         </Switch>
         <Switch>
          <PrivateRoute path="/create-profile"  component= {CreateProfile}/>
         </Switch>
         <Switch>
          <PrivateRoute path="/edit-profile"  component= {EditProfile}/>
         </Switch>
         <Switch>
          <PrivateRoute path="/add-experience"  component= {AddExperience}/>
         </Switch>
         <Switch>
          <PrivateRoute path="/add-education"  component= {AddEducation}/>
         </Switch>
         <Switch>
          <PrivateRoute path="/feed"  component= {Posts}/>
         </Switch>
         <Switch>
          <PrivateRoute path='/post/:id' component= {Post}/>
         </Switch>
       </div>
     </Router>
    </div>  
  );
}

export default App;
