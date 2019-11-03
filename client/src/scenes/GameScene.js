import React from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import { Result } from 'antd';
import GameContainer from '../containers/GameContainer';
import GameIndexContainer from '../containers/GameIndexContainer';
import GameWithHumanContainer from '../containers/GameWithHumanContainer';

const GameScene = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      {/* route default: chọn giữa đánh với máy và người */}

      <Route exact path={`${path}`}>
        <GameIndexContainer />
      </Route>
      <Route exact path={`${path}/with-bot`}>
        <GameContainer />
      </Route>
      <Route exact path={`${path}/with-human`}>
        <GameWithHumanContainer />
      </Route>
      <Route path='*'>
        <Result
          status='404'
          title='404'
          subTitle='Sorry, the page you visited does not exist.'
          extra={<Link to='/'>Back Home</Link>}
        />
      </Route>
    </Switch>
  );
};

export default GameScene;
