import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from 'react-router-dom';
import SignInSide from './pages/SignIn';
import DashboardHome from './pages/dashboard_home';
import DashboardAnalytics from './pages/dashboard_analytics';
import DashboardStudents from './pages/dashboard_students';
import DashboardLessons from './pages/dashboard_lessons';
import DashboardCourses from './pages/dashboard_courses';
import DashboardSyllabus from './pages/dashboard_syllabus';
import DashboardClass from './pages/dashboard_class';
/*

<Route path="/portal/signup"><SignUp></SignUp></Route>
            <Route path="/portal/accountcreated"><AccountCreated></AccountCreated></Route>
            <Route path="/portal/dashboard/home"><Dashboard></Dashboard></Route>
            <Route path="/portal/dashboard/schedule"><Schedule></Schedule></Route>
            <Route path="/portal/dashboard/notif"><Notifications></Notifications></Route>
            <Route path="/portal/dashboard/syllabus"><Syllabus></Syllabus></Route>
            <Route path="/portal/terms"><Terms></Terms></Route>
            <Route path="/portal/privacy"><Privacy></Privacy></Route>
            <Route path="/portal/classroom"><Classroom></Classroom></Route>
            <Route path="/portal"><SignInSide></SignInSide></Route>
*/

const App = props => {
  return (
    <Router>
      <div>
        <div style={{ padding: '0', margin: '0' }}>
          <Switch>
          <Route path="/admin/dashboard/class"><DashboardClass></DashboardClass></Route>
          <Route path="/admin/dashboard/syllabus"><DashboardSyllabus></DashboardSyllabus></Route>
          <Route path="/admin/dashboard/courses"><DashboardCourses></DashboardCourses></Route>
          <Route path="/admin/dashboard/lessons"><DashboardLessons></DashboardLessons></Route>
          <Route path="/admin/dashboard/students"><DashboardStudents></DashboardStudents></Route>
          <Route path="/admin/dashboard/analytics"><DashboardAnalytics></DashboardAnalytics></Route>
          <Route path="/admin/dashboard/home"><DashboardHome></DashboardHome></Route>
          <Route path="/admin"><SignInSide></SignInSide></Route>
          </Switch>
        </div>

      </div>
    </Router>
  );
}

export default App;