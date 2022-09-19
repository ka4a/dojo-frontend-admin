import React from 'react';
import { PriorityBadge } from '@reustleco/dojo-frontend-common';

const priorityCell = (priority) => (
  <PriorityBadge submissionPriority={priority} />
);

export const createPriorityCell = ({ row }) => priorityCell(row?.original?.priority);
