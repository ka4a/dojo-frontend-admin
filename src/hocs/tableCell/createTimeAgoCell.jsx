import TimeAgo from 'timeago-react';

const timeAgoCell = (time) => {
  if (!time) {
    return <span>Never</span>;
  }

  return <TimeAgo datetime={time} />;
};

export function createTimeAgoCell({ fieldName }) {
  return ({ row }) => timeAgoCell(row.original[fieldName]);
}
