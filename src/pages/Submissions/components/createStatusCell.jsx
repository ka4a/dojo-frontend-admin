import React from 'react';
import { StatusBadge } from '@reustleco/dojo-frontend-common';

const statusCell = (status) => <StatusBadge status={status} />;

export const createStatusCell = ({ row }) => statusCell(row.original.status);
