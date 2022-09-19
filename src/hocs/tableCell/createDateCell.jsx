import Moment from 'react-moment';

const dateCell = (time) => <Moment format="MMMM D, Y">{time}</Moment>;

export function createDateCell({ fieldName }) {
  return ({ row }) => dateCell(row.original[fieldName]);
}
