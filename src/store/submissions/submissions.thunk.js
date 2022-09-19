// Modules of this type usually have multiple exports
// So keep it consistent this one doesnt have default export
/* eslint-disable import/prefer-default-export */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { SubmissionsAPI } from '../../api';

export const fetchSubmissions = createAsyncThunk(
  'submissions/fetchSubmissions',
  async (_, { rejectWithValue }) => {
    try {
      return await SubmissionsAPI.getSubmissions();
    } catch (error) {
      return rejectWithValue(error.customAttributes.httpErrorResponseData);
    }
  },
);
