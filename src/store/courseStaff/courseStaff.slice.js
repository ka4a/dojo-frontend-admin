import { createSlice } from '@reduxjs/toolkit';
import { displayOptionName } from '../../utils';
import { requestStatus } from '../../utils/constants/requestStatusConstants';
import {
  fetchCourseStaff,
  fetchStaffMember,
  fetchStaffMemberCourses,
  changeCourseRole,
  addStaffMember,
  assignNewCourses,
  fetchCourses,
  removeCourseRoles,
} from './courseStaff.thunk';

const courseStaffSlice = createSlice({
  name: 'courseStaff',
  initialState: {
    courseStaffList: {
      status: null,
      error: null,
      data: [],
      itemCount: 0,
      pageCount: 1,
      currentPage: 1,
    },
    staffMemberDetail: { status: null, error: null, data: null },
    newStaffMember: { status: null, error: null, data: {} },
    staffMemberCourses: { status: null, error: null, data: [] },
    courses: { status: null, error: null, data: [] },
    multipleCoursesModal: { open: false },
    changeRoleModal: {
      status: null, open: false, error: null, body: [],
    },
    removeRoleModal: {
      status: null, error: null, open: false, body: [],
    },
  },
  reducers: {
    updateCourses(state, action) {
      state.courses.data.results = action.payload;
    },
    openMultipleCoursesModal(state) {
      state.multipleCoursesModal.open = true;
    },
    closeMultipleCoursesModal(state) {
      state.multipleCoursesModal.open = false;
    },
    openChangeRoleModal(state, action) {
      state.changeRoleModal.open = true;
      state.changeRoleModal.error = null;
      state.changeRoleModal.body = action.payload;
    },
    closeChangeRoleModal(state) {
      state.changeRoleModal.open = false;
      state.changeRoleModal.error = null;
      state.changeRoleModal.body = [];
    },
    openRemoveRoleModal(state, action) {
      state.removeRoleModal.open = true;
      state.removeRoleModal.body = action.payload;
    },
    closeRemoveRoleModal(state) {
      state.removeRoleModal.open = false;
      state.removeRoleModal.body = [];
    },
    setInstructorCourses(state, action) {
      state.staffMemberCourses.data = action.payload;
    },
  },
  extraReducers: {
    [fetchCourseStaff.pending]: (state) => {
      state.courseStaffList.status = requestStatus.LOADING;
      state.courseStaffList.error = null;
    },
    [fetchCourseStaff.fulfilled]: (state, action) => {
      state.courseStaffList.status = requestStatus.RESOLVED;
      const preparedInstructorList = action.payload.results?.map(
        (instructor) => ({
          ...instructor,
          fullNameAccessor: instructor.full_name.toLowerCase(),
          usernameAccessor: instructor.username.toLowerCase(),
          dateJoinedTime: new Date() - new Date(instructor.date_joined),
          loginAt: new Date() - new Date(instructor.last_login),
          is_active: instructor.is_active.toString(),
          is_staff: instructor.is_staff.toString(),
        }),
      );

      state.courseStaffList.data = preparedInstructorList;
      state.courseStaffList.itemCount = action.payload.count;
      state.courseStaffList.pageCount = action.payload.num_pages;
      state.courseStaffList.currentPage = action.payload.current_page;
    },
    [fetchCourseStaff.rejected]: (state, action) => {
      state.courseStaffList.status = requestStatus.REJECTED;
      state.courseStaffList.error = action.payload;
    },
    [fetchStaffMember.pending]: (state) => {
      state.staffMemberDetail.status = requestStatus.LOADING;
      state.staffMemberDetail.error = null;
    },
    [fetchStaffMember.fulfilled]: (state, action) => {
      state.staffMemberDetail.status = requestStatus.RESOLVED;
      const instructor = action.payload;
      state.staffMemberDetail.data = {
        ...instructor,
        fullNameAccessor: instructor.full_name.toLowerCase(),
        usernameAccessor: instructor.username.toLowerCase(),
        dateJoinedTime: new Date() - new Date(instructor.date_joined),
        loginAt: new Date() - new Date(instructor.last_login),
        is_active: instructor.is_active.toString(),
        is_staff: instructor.is_staff.toString(),
      };
    },
    [fetchStaffMember.rejected]: (state, action) => {
      state.staffMemberDetail.status = requestStatus.REJECTED;
      state.staffMemberDetail.error = action.payload;
    },
    [fetchStaffMemberCourses.pending]: (state) => {
      state.staffMemberCourses.status = requestStatus.LOADING;
      state.staffMemberCourses.error = null;
    },
    [fetchStaffMemberCourses.fulfilled]: (state, action) => {
      state.staffMemberCourses.status = requestStatus.RESOLVED;
      state.staffMemberCourses.data = action.payload.map((courseData) => ({
        ...courseData,
        roleName: displayOptionName(courseData.role),
      }));
    },
    [fetchStaffMemberCourses.rejected]: (state, action) => {
      state.staffMemberCourses.status = requestStatus.REJECTED;
      state.staffMemberCourses.error = action.payload;
    },
    [fetchCourses.pending]: (state) => {
      state.courses.status = requestStatus.LOADING;
      state.courses.error = null;
    },
    [fetchCourses.fulfilled]: (state, action) => {
      state.courses.status = requestStatus.RESOLVED;
      state.courses.data = action.payload;
    },
    [fetchCourses.rejected]: (state, action) => {
      state.courses.status = requestStatus.REJECTED;
      state.courses.error = action.payload;
    },
    [addStaffMember.fulfilled]: (state, action) => {
      state.newStaffMember.status = requestStatus.RESOLVED;
      state.newStaffMember.data = action.payload;
      state.multipleCoursesModal.open = false;
    },
    [addStaffMember.rejected]: (state, action) => {
      state.newStaffMember.status = requestStatus.REJECTED;
      state.newStaffMember.error = action.payload;
    },
    [addStaffMember.pending]: (state) => {
      state.newStaffMember.status = requestStatus.LOADING;
      state.newStaffMember.error = null;
    },
    [assignNewCourses.fulfilled]: (state) => {
      state.newStaffMember.status = requestStatus.RESOLVED;
      state.multipleCoursesModal.open = false;
      state.changeRoleModal.open = false;
      state.changeRoleModal.body = {};
    },
    [assignNewCourses.rejected]: (state, action) => {
      state.newStaffMember.status = requestStatus.REJECTED;
      state.newStaffMember.error = action.payload;
    },
    [assignNewCourses.pending]: (state) => {
      state.newStaffMember.status = requestStatus.LOADING;
      state.newStaffMember.error = null;
    },
    [changeCourseRole.pending]: (state) => {
      state.changeRoleModal.status = requestStatus.LOADING;
      state.changeRoleModal.error = null;
    },
    [changeCourseRole.fulfilled]: (state) => {
      state.changeRoleModal.status = requestStatus.RESOLVED;
      state.changeRoleModal.open = false;
      state.changeRoleModal.body = {};
    },
    [changeCourseRole.rejected]: (state, action) => {
      state.changeRoleModal.status = requestStatus.REJECTED;
      state.changeRoleModal.error = action.payload;
    },
    [removeCourseRoles.pending]: (state) => {
      state.removeRoleModal.status = requestStatus.LOADING;
      state.removeRoleModal.error = null;
    },
    [removeCourseRoles.fulfilled]: (state, action) => {
      state.staffMemberCourses.data = state.staffMemberCourses.data.filter(
        (course) => !action.payload.includes(course.course_access_role_id),
      );
      state.removeRoleModal.open = false;
      state.removeRoleModal.body = {};
      state.removeRoleModal.status = requestStatus.RESOLVED;
    },
    [removeCourseRoles.rejected]: (state, action) => {
      state.removeRoleModal.status = requestStatus.REJECTED;
      state.removeRoleModal.error = action.payload;
    },
  },
});

export const {
  actions: {
    updateCourses,
    openMultipleCoursesModal,
    closeMultipleCoursesModal,
    openChangeRoleModal,
    closeChangeRoleModal,
    openRemoveRoleModal,
    closeRemoveRoleModal,
    setInstructorCourses,
  },
  reducer: courseStaffReducer,
} = courseStaffSlice;
