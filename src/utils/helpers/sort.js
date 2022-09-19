export const sortByDate = (data, dateKey, isDescending) => [...data].sort((currentItem, nextItem) => {
  if (isDescending) {
    return nextItem[dateKey] - currentItem[dateKey];
  }

  return currentItem[dateKey] - nextItem[dateKey];
});
