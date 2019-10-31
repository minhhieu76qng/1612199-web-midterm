import React from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import { Result } from 'antd';
import AccountView from '../components/account/AccountView';
import AccountLayout from '../layout/AccountLayout';
import UpdateInfoContainer from '../containers/UpdateInfoContainer';
import ChangePasswordContainer from '../containers/ChangePasswordContainer';
import UploadAvatarContainer from '../containers/UploadAvatarContainer';

const AccountScene = () => {
  const { path } = useRouteMatch();
  /* hiển thị biểu đổ số trận thắng thua khi đánh với người,
   với máy, thông tin về số trận đã đấu, tổng số giờ chơi */

  return (
    <AccountLayout>
      <div style={{ padding: 24, overflow: 'initial' }}>
        <Switch>
          <Route exact path={path}>
            <AccountView />
          </Route>
          <Route exact path={`${path}/edit/profiles`}>
            <UpdateInfoContainer />
          </Route>
          <Route exact path={`${path}/edit/password`}>
            <ChangePasswordContainer />
          </Route>
          <Route exact path={`${path}/edit/avatar`}>
            <UploadAvatarContainer />
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
    </AccountLayout>
  );
};

export default AccountScene;
