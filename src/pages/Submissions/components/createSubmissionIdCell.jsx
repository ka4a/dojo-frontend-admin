import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { LinkButton } from '../../../components';
import { openSubmissionModal } from '../../../store/submissions/submissions.slice';

const submissionIdCell = (submissionId, handleSelectSubmission) => (
  <LinkButton onClick={handleSelectSubmission}>{submissionId}</LinkButton>
);

export const createSubmissionIdCell = ({ row }) => {
  const submission = row.original;

  const dispatch = useDispatch();

  const handleSelectSubmission = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(openSubmissionModal(submission));
    },
    [submission, dispatch],
  );

  return submissionIdCell(submission.submission_id, handleSelectSubmission);
};
