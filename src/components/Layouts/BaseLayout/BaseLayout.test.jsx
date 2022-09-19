import { shallow, mount } from 'enzyme';
import { AdminDashboardProvider } from '../../../test/AdminDashboardProvider';
import BaseLayout from './BaseLayout';

const defaultProps = {
  statuses: [],
  errors: [],
  position: 'center',
};

describe('BaseLayout', () => {
  it('should render BaseLayout component', () => {
    shallow(
      <AdminDashboardProvider>
        <BaseLayout {...defaultProps}>Test</BaseLayout>
      </AdminDashboardProvider>,
    );
  });

  it('it should render the expected HTML', () => {
    expect(
      mount(
        <AdminDashboardProvider>
          <BaseLayout {...defaultProps}>Test</BaseLayout>
        </AdminDashboardProvider>,
      ).html(),
    ).toMatchSnapshot();
  });
});
