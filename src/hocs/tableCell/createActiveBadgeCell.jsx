import { Badge } from '@edx/paragon';
import { capitalize } from '../../utils';

export const createActiveBadgeCell = ({ fieldName }) => ({ row }) => {
  const isActive = row.original[fieldName];

  return (
    <Badge variant={isActive === 'true' ? 'success' : 'danger'}>
      {capitalize(isActive)}
    </Badge>
  );
};
