import * as R from 'ramda';
import { capitalize } from './string';

export const filterFieldRepeats = (tableData, uniqueField) => R.uniqWith(R.eqProps(uniqueField))(tableData);

export const getFilterChoicesFromColumn = (tableData, filterKey) => filterFieldRepeats(tableData, filterKey)
  .filter(item => item[filterKey])
  .map(item => ({
    name: capitalize(item[filterKey]),
    value: item[filterKey],
  }));
