// eslint-disable-next-line import/no-unresolved
import { createSlice } from '@reduxjs/toolkit';
import { requestStatus } from '../../utils/constants/requestStatusConstants';
import {
  assignStaffMember,
  fetchCourses,
  fetchRoles,
} from './adminDashboard.thunk';

const adminDashboardSlice = createSlice({
  name: 'adminDashboard',
  initialState: {
    courses: { status: null, error: null, data: [] },
    roles: { status: null, error: null, data: [] },
    newInstructor: { status: null, error: null },
    isExpanded: false,
  },
  reducers: {
    expandSidebar(state) {
      state.isExpanded = true;
    },
    collapseSidebar(state) {
      state.isExpanded = false;
    },
  },
  extraReducers: {
    // Courses
    [fetchCourses.pending]: (state) => {
      state.courses.status = requestStatus.LOADING;
      state.courses.error = null;
    },
    [fetchCourses.fulfilled]: (state, action) => {
      state.courses.status = requestStatus.RESOLVED;
      state.courses.data = action.payload;
    },
    [fetchRoles.rejected]: (state, action) => {
      state.courses.status = requestStatus.REJECTED;
      state.courses.error = action.payload;
    },

    // Roles
    [fetchRoles.pending]: (state) => {
      state.roles.status = requestStatus.LOADING;
      state.roles.error = null;
    },
    [fetchRoles.fulfilled]: (state, action) => {
      state.roles.status = requestStatus.RESOLVED;
      state.roles.data = action.payload;
    },
    [fetchRoles.rejected]: (state, action) => {
      state.roles.status = requestStatus.REJECTED;
      state.roles.error = action.payload;
    },

    // Create new Admin
    [assignStaffMember.fulfilled]: (state, action) => {
      state.newInstructor.status = requestStatus.RESOLVED;
      state.newInstructor.error = action.payload;
    },
    [assignStaffMember.rejected]: (state, action) => {
      state.newInstructor.status = requestStatus.REJECTED;
      state.newInstructor.error = action.payload;
    },
  },
});

export const {
  actions: { expandSidebar, collapseSidebar },
  reducer: adminDashboardReducer,
} = adminDashboardSlice;
