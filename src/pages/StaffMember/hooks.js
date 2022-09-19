// Modules this type usually contain multiple exports
/* eslint-disable import/prefer-default-export */

import { useCallback } from 'react';

export function useBulkAction(dispatch, actionCreator) {
  return useCallback((selectedRows) => {
    dispatch(actionCreator(selectedRows.map(row => row.original)));
  }, [dispatch, actionCreator]);
}
