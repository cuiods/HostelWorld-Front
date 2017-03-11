import React, {PropTypes} from 'react';
import {Router, Route, IndexRoute, Link} from 'dva/router';

import LoginPage from './routes/LoginPage';
import Console from './routes/Console'
import HotelList from './routes/HotelList'
import HotelDetail from "./routes/HotelDetail";
import ReserveList from "./routes/ReserveList"
import CheckList from "./routes/CheckList"
import ConsumeList from "./routes/ConsumeList"
import MemberDetail from "./routes/MemberDetail"


export default function ({history}) {
  return (
    <Router history={history}>
      <Route path="/" component={Console}>
        <Route path="/login" component={LoginPage}/>
        <Route path="/:userId/hotelList" component={HotelList}/>
        <Route path="/hotelDetail/:hotelId" component={HotelDetail} />
        <Route path="/:userId/reserveList" component={ReserveList} />
        <Route path="/:userId/checkList" component={CheckList} />
        <Route path="/:userId/consumeList" component={ConsumeList} />
        <Route path="/:userId/userInfo" component={MemberDetail} />
      </Route>
    </Router>
  );
};
