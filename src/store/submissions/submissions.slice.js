import { createSlice } from '@reduxjs/toolkit';
import { requestStatus } from '../../utils/constants/requestStatusConstants';
import { submissionStatusTypes } from '../../utils/constants/submissionsConstants';
import {
  getTimeDifference,
  getTimeSinceCreated,
} from '../../utils/helpers/date';
import { getSubmissionPriority } from '../../utils/helpers/submissions';
import { fetchSubmissions } from './submissions.thunk';

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState: {
    submissions: { status: null, error: null, data: [] },
    submissionModal: { open: false, body: {} },
  },
  reducers: {
    openSubmissionModal(state, action) {
      state.submissionModal.body = action.payload;
      state.submissionModal.open = true;
    },
    closeSubmissionModal(state) {
      state.submissionModal.open = false;
    },
  },
  extraReducers: {
    [fetchSubmissions.pending]: (state) => {
      state.submissions.status = requestStatus.LOADING;
      state.submissions.error = null;
    },
    [fetchSubmissions.fulfilled]: (state, action) => {
      const preparedData = action.payload.map((submission) => ({
        ...submission,
        priority:
          submission.status.toLowerCase() !== submissionStatusTypes.GRADED
            ? getSubmissionPriority(submission.created_at)
            : '',
        timeSinceSubmission: getTimeSinceCreated(submission.created_at),
        submissionLifetime: getTimeDifference(
          submission.created_at,
          submission.grading_completed_at,
        ),
        gradingTime: getTimeDifference(
          submission.grading_started_at,
          submission.grading_completed_at,
        ),
        gradingTimeDifference:
          new Date(submission.grading_completed_at)
          - new Date(submission.grading_started_at),
        lifetimeDifference:
          new Date(submission.grading_completed_at)
          - new Date(submission.created_at),
        submitedAt: new Date() - new Date(submission.created_at),
      }));

      state.submissions.status = requestStatus.RESOLVED;
      state.submissions.data = preparedData;
    },
    [fetchSubmissions.rejected]: (state, action) => {
      state.submissions.status = requestStatus.REJECTED;
      state.submissions.error = action.payload;
    },
  },
});

export const {
  actions: { openSubmissionModal, closeSubmissionModal },
  reducer: submissionsReducer,
} = submissionsSlice;
