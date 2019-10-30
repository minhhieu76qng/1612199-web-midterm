import React from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import { Result } from 'antd';
import AccountView from '../components/account/AccountView';

const AccountScene = () => {
  const { path } = useRouteMatch();
  /* hiển thị biểu đổ số trận thắng thua khi đánh với người,
   với máy, thông tin về số trận đã đấu, tổng số giờ chơi */
  return (
    <div className='account'>
      <Switch>
        <Route exact path={path}>
          <AccountView />
        </Route>
        <Route exact path={`${path}/edit/profiles`}>
          <AccountView />
        </Route>
        <Route exact path={`${path}/edit/password`}>
          <AccountView />
        </Route>
        <Route exact path={`${path}/edit/avatar`}>
          <AccountView />
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
    </div>
  );
};

export default AccountScene;
