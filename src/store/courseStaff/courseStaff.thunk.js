import { createAsyncThunk } from '@reduxjs/toolkit';
import { CourseStaffAPI } from '../../api';

export const fetchCourseStaff = createAsyncThunk(
  'instructors/fetchCourseStaff',
  async (payload, { rejectWithValue }) => {
    try {
      return await CourseStaffAPI.fetchCourseStaff(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchStaffMember = createAsyncThunk(
  'instructors/fetchStaffMember',
  async (userId, { rejectWithValue }) => {
    try {
      return await CourseStaffAPI.fetchStaffMember(userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchStaffMemberCourses = createAsyncThunk(
  'instructors/fetchStaffMemberCourses',
  async (userId, { rejectWithValue }) => {
    try {
      return await CourseStaffAPI.fetchStaffMemberCourses(userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const changeCourseRole = createAsyncThunk(
  'instructors/changeCourseRole',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const instructorData = await CourseStaffAPI.changeCourseRole(payload);

      dispatch(fetchStaffMemberCourses(payload.id));

      return instructorData;
    } catch (error) {
      return rejectWithValue(error.customAttributes.httpErrorResponseData);
    }
  },
);

export const addStaffMember = createAsyncThunk(
  'instructors/addStaffMember',
  async (payload, { rejectWithValue }) => {
    try {
      return await CourseStaffAPI.addStaffMember(payload);
    } catch (error) {
      return rejectWithValue(error.customAttributes.httpErrorResponseData);
    }
  },
);

export const assignNewCourses = createAsyncThunk(
  'instructors/assignNewCourses',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const newStaffMember = await CourseStaffAPI.assignNewCourses(payload);

      dispatch(fetchStaffMemberCourses(payload.id));

      return newStaffMember;
    } catch (error) {
      return rejectWithValue(error.customAttributes.httpErrorResponseData);
    }
  },
);

export const fetchCourses = createAsyncThunk(
  'instructors/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      return await CourseStaffAPI.fetchCourses();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const removeCourseRoles = createAsyncThunk(
  'instructors/removeCourseRoles',
  async (payload, { rejectWithValue }) => {
    try {
      return await CourseStaffAPI.removeCourseRoles(payload);
    } catch (error) {
      return rejectWithValue(error.customAttributes.httpErrorResponseData);
    }
  },
);
