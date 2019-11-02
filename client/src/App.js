import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import './App.css';
import { Result } from 'antd';
import RegisterContainer from './containers/RegisterContainer';
import LoginContainer from './containers/LoginContainer';
import PrivateRouteContainer from './containers/PrivateRouteContainer';
import AccountScene from './scenes/AccountScene';
import LayoutPage from './layout/LayoutPage';
import GameScene from './scenes/GameScene';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/login' component={LoginContainer} />
        <Route path='/register' component={RegisterContainer} />

        <PrivateRouteContainer path='/game'>
          <LayoutPage>
            <GameScene />
          </LayoutPage>
        </PrivateRouteContainer>

        <PrivateRouteContainer exact path='/'>
          {/* <LayoutPage>
            <AccountScene />
          </LayoutPage> */}
          <Redirect to='/account' />
        </PrivateRouteContainer>
        <PrivateRouteContainer path='/account'>
          <LayoutPage>
            <AccountScene />
          </LayoutPage>
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
  );
}

export default App;
