import React, {PropTypes} from 'react';
import {Router, Route, IndexRoute, Link} from 'dva/router';

// import TeacherCourseListPage from './routes/teacher/TeacherCourseListPage';
// import TeacherHomePage from './routes/teacher/TeacherHomePage';
// import TeacherCourses from './components/teacher/TeacherCourses';
import LoginPage from './routes/LoginPage';

// import Wrapper from './routes/student/Wrapper';

export default function ({history}) {
  return (
    <Router history={history}>
      <Route path="/">
        <IndexRoute components={LoginPage}/>
        <Route path="/login" component={LoginPage}/>

      </Route>

    </Router>
  );
};
