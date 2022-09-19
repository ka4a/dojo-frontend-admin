import * as R from 'ramda';

export const capitalize = R.compose(
  R.join(''),
  R.juxt([R.compose(R.toUpper, R.head), R.tail]),
);

export const displayOptionName = R.compose(
  R.join(' '),
  R.map(capitalize),
  R.split('_'),
);

export const matchNoCase = (string, toMatch) => {
  const lowerString = string.toLowerCase();
  const lowerToMatch = toMatch.toLowerCase();

  return lowerString.includes(lowerToMatch);
};
