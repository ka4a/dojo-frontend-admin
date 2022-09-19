import { shallow, mount } from 'enzyme';
import ColumnTable from './ColumnTable';

const defaultProps = {
  data: [
    {
      title: 'test title',
      content: [{ subtitle: 'test subtitle', value: 'test value' }],
    },
  ],
};

describe('ColumnTable', () => {
  it('it should render ColumnTable component', () => {
    shallow(<ColumnTable {...defaultProps} />);
  });

  it('it should render the expected HTML', () => {
    expect(mount(<ColumnTable {...defaultProps} />).html()).toMatchSnapshot();
  });
});
