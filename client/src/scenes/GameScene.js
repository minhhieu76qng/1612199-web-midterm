import React from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import { Result } from 'antd';
import IndexPage from '../components/game/IndexPage';

const GameScene = () => {
  const { path } = useRouteMatch();

  return (
    <div>
      <div style={{ padding: 24, overflow: 'initial' }}>
        <Switch>
          {/* route default: chọn giữa đánh với máy và người */}

          <Route exact path={`${path}`} component={IndexPage} />
          <Route exact path={`${path}/with-bot`} component={<div>bot</div>} />
          <Route
            exact
            path={`${path}/with-human`}
            component={<div>human</div>}
          />
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
    </div>
  );
};

export default GameScene;
