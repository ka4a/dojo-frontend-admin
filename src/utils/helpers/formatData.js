import { displayOptionName } from './string';

export const getOptionsFromStrings = (options) => options.map((value) => ({ value, name: displayOptionName(value) }));
