import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import { Result } from 'antd';
import GameContainer from './containers/GameContainer';
import RegisterContainer from './containers/RegisterContainer';
import LoginContainer from './containers/LoginContainer';
import PrivateRouteContainer from './containers/PrivateRouteContainer';
import AccountScene from './scenes/AccountScene';

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
            <AccountScene />
          </PrivateRouteContainer>
          <PrivateRouteContainer path='/account'>
            <AccountScene />
          </PrivateRouteContainer>
          <Route path='*'>
            <Result
              status='404'
              title='404'
              subTitle='Sorry, the page you visited does not exist.'
              extra={<Link to='/'>Back Home</Link>}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
