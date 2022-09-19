import { combineReducers } from 'redux';
import { adminDashboardReducer } from './adminDashboard/adminDashboard.slice';
import { baseLayoutReducer } from './baseLayout/baseLayout.slice';
import { courseStaffReducer } from './courseStaff/courseStaff.slice';
import { submissionsReducer } from './submissions/submissions.slice';

export const rootReducer = combineReducers({
  adminDashboard: adminDashboardReducer,
  courseStaff: courseStaffReducer,
  submissions: submissionsReducer,
  baseLayout: baseLayoutReducer,
});
