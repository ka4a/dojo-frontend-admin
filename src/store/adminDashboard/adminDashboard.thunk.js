import { createAsyncThunk } from '@reduxjs/toolkit';
import { AdminDashboardAPI } from '../../api';

export const fetchCourses = createAsyncThunk(
  'adminDashboard/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      return await AdminDashboardAPI.fetchCourses();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchRoles = createAsyncThunk(
  'adminDashboard/fetchRoles',
  async (_, { rejectWithValue }) => {
    try {
      return await AdminDashboardAPI.fetchRoles();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const assignStaffMember = createAsyncThunk(
  'adminDashboard/assignStaffMember',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await AdminDashboardAPI.assignStaffMember(data);

      dispatch(fetchCourses());

      return response;
    } catch (error) {
      return rejectWithValue(error.customAttributes.httpErrorResponseData);
    }
  },
);
