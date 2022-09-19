import { filterFieldRepeats, getFilterChoicesFromColumn } from '../filter';

describe('filterFieldRepeats', () => {
  test('No repeats', () => {
    const janeDoe = { id: 1, name: 'Jane', lastName: 'Doe' };
    const janeSmith = { id: 1, name: 'Jane', lastName: 'Smith' };
    const johnSmith = { id: 2, name: 'John', lastName: 'Smith' };

    expect(filterFieldRepeats([janeDoe, janeSmith, johnSmith], 'id'))
      .toEqual([janeDoe, johnSmith]);
  });
});

describe('getFilterChoicesFromColumn', () => {
  test('Proper options', () => {
    const list = [
      { name: 'Apple', type: 'fruit' },
      { name: 'Tomato', type: 'vegetable' },
      { name: 'Cucumber', type: 'vegetable' },
    ];

    expect(getFilterChoicesFromColumn(list, 'type'))
      .toEqual([
        { name: 'Fruit', value: 'fruit' },
        { name: 'Vegetable', value: 'vegetable' },
      ]);
  });
});
