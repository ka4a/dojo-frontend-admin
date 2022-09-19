import { useMemo } from 'react';
import { matchNoCase } from '../utils';

export function useLocalSearch(data, search, searchInFields) {
  return useMemo(() => {
    if (!data || !search) {
      return data;
    }
    return data.filter(item => searchInFields.some(
      key => matchNoCase(item[key], search),
    ));
  }, [data, search, searchInFields]);
}
