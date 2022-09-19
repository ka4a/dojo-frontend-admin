import { submissionPriorityTypes } from '../constants';
import { getHoursDifference } from './date';

export const getSubmissionPriority = (createdAt) => {
  const submitted = getHoursDifference(createdAt);

  if (submitted > 48) {
    return submissionPriorityTypes.URGENT;
  }

  if (submitted >= 24) {
    return submissionPriorityTypes.MEDIUM;
  }

  return submissionPriorityTypes.NORMAL;
};
