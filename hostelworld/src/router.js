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
import RoomList from "./routes/RoomList"
import UnfinishedCheckList from './routes/UnCheckList'
import HotelManagePage from './routes/HotelManage'
import ApproveNewPage from './routes/ApproveNew'
import ApproveEditPage from './routes/ApproveEdit'
import CompleteCheckPage from './routes/CompleteCheck'
import StatisticPage from './routes/StatisticPage'

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
        <Route path="/:userId/hotelRoomList" component={RoomList} />
        <Route path="/:userId/hotelUnfinished" component={UnfinishedCheckList}/>
        <Route path="/:userId/hotelManage" component={HotelManagePage}/>
        <Route path="/:userId/checkRecord" component={CheckList} />
        <Route path="/:userId/reserveRecord" component={ReserveList} />
        <Route path="/:userId/approveNew" component={ApproveNewPage}/>
        <Route path="/:userId/approveEdit" component={ApproveEditPage}/>
        <Route path="/:userId/completeChecks" component={CompleteCheckPage}/>
        <Route path="/:userId/dashboard" component={StatisticPage}/>
        <Route path="/:userId/statHotel" component={StatisticPage}/>
      </Route>
    </Router>
  );
};
