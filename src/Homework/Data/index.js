import React  from 'react'
import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import "./index.css"
import Home from './pages/Home';
import Login from './pages/Login';


function Homework() {
  const userToken = useSelector(state => state.user.userToken);


  return (
    <>
    <Router>
      <Switch>
        <Route path="/create-playlist">
          {userToken ? (
              <Home />
          ) : (
            <Redirect to ="/" />
          ) }
        </Route>
        <Route path="/">
          {!userToken ? (
             <Login /> 
          ) : (
            <Redirect to="/create-playlist"/>
          )}
        </Route>
      </Switch>
    </Router>

    </>
  )
}

export default Homework