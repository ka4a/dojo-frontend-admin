import moment from 'moment';

export const getHoursDifference = (date) => {
  const now = moment();

  return now.diff(moment(date), 'hours');
};

export const getTimeSinceCreated = (createdAt) => moment(createdAt).fromNow();

export const getTimeDifference = (startAt, finishedAt) => finishedAt && moment(startAt).from(finishedAt, true);
