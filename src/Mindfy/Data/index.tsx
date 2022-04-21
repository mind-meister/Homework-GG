import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Login from './components/Login/Login';
import Home from './pages/Home/Home';
import { RootState, useAppSelector } from './Redux/Store/store';


function Homework() {
  const userToken: string = useAppSelector((state: RootState) => state.user.userToken);


  return (
    <>
    <Router>
      <Switch>
        <Route path='/create-playlist'>
          {userToken ? (
              <Home />
          ) : (
            <Redirect to ='/' />
          ) }
        </Route>
        <Route path='/'>
          {!userToken ? (
             <Login /> 
          ) : (
            <Redirect to='/create-playlist'/>
          )}
        </Route>
      </Switch>
    </Router>

    </>
  );
}

export default Homework;