import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { AppProvider } from '@edx/frontend-platform/react';
import Header from '@reustleco/dojo-frontend-component-admin-header';
import { Redirect, Route, Switch } from 'react-router';
import initializeStore from './store/configureStore';
import { EmptyComponent as Admins } from './pages/Admins';
import {
  NotFound, StaffMember, CourseStaff, Submissions,
} from './pages';

export default function App() {
  const { administrator } = getAuthenticatedUser();

  return (
    <AppProvider store={initializeStore()}>
      {!administrator ? (
        <NotFound />
      ) : (
        <div>
          <div className="container-fluid">
            <Header />
            <Switch>
              <Route exact path="/coursestaff" component={CourseStaff} />
              <Route path="/coursestaff/:userId" component={StaffMember} />
              <Route exact path="/admin" component={Admins} />
              <Route exact path="/submission" component={Submissions} />
              <Redirect from="/" to="/coursestaff" />
            </Switch>
          </div>
        </div>
      )}
    </AppProvider>
  );
}
