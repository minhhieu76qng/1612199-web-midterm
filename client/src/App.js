import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import GameContainer from './containers/GameContainer';
import RegisterContainer from './containers/RegisterContainer';
import LoginContainer from './containers/LoginContainer';
import HomeContainer from './containers/HomeContainer';

function App() {
  // fetch api for get current user with token
  // save user to current user.
  // if not remove token

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/login' component={LoginContainer} />
          <Route path='/register' component={RegisterContainer} />
          <Route path='/game' component={GameContainer} />
          <Route exact path='/' component={HomeContainer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
