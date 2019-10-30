import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import GameContainer from './containers/GameContainer';
import RegisterContainer from './containers/RegisterContainer';
import LoginContainer from './containers/LoginContainer';
import HomeContainer from './containers/HomeContainer';
import PrivateRouteContainer from './containers/PrivateRouteContainer';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/login' component={LoginContainer} />
          <Route path='/register' component={RegisterContainer} />

          <PrivateRouteContainer exact path='/game'>
            <GameContainer />
          </PrivateRouteContainer>

          <PrivateRouteContainer exact path='/'>
            <HomeContainer />
          </PrivateRouteContainer>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
