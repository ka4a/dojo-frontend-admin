import { shallow, mount } from 'enzyme';
import { MultiselectMenu } from './MultiSelectMenu';

const defaultValues = {
  title: 'title',
  onChange: () => {},
  values: ['value'],
  options: [{ name: 'Name', value: 'value' }],
  shouldChangeOnClose: true,
};

describe('MultiSelectMenu', () => {
  it('should render MultiSelectMenu component', () => {
    shallow(<MultiselectMenu {...defaultValues} />);
  });

  it('it should render the expected HTML', () => {
    expect(
      mount(<MultiselectMenu {...defaultValues} />).html(),
    ).toMatchSnapshot();
  });
});
