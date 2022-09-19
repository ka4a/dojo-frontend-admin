import { DataTableContext } from '@edx/paragon';
import { memo, useContext, useEffect } from 'react';
import { usePrevious } from '../../hooks';

export const DataTableFetcher = memo(({ filters, fetchData }) => {
  const {
    state: { pageIndex },
    gotoPage,
  } = useContext(DataTableContext);

  const prevFilters = usePrevious(filters);
  const newPageIndex = filters !== prevFilters ? 0 : pageIndex;

  useEffect(() => {
    if (newPageIndex !== pageIndex) {
      gotoPage(newPageIndex);
    }
  }, [newPageIndex, pageIndex]);

  useEffect(() => {
    fetchData({
      pageNumber: newPageIndex + 1,
      ...filters,
    });
  }, [newPageIndex, filters]);

  return null;
});
