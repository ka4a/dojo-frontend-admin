import { shallow, mount } from 'enzyme';
import { AdminDashboardProvider } from '../../test/AdminDashboardProvider';
import AssignAdminForm from './AssignAdminForm';

const defaultProps = {
  courseId: 1,
};

describe('AssignAdminForm', () => {
  it('it should render AssignAdminForm component', () => {
    shallow(
      <AdminDashboardProvider>
        <AssignAdminForm {...defaultProps} />
      </AdminDashboardProvider>,
    );
  });

  it('it should render the expected HTML', () => {
    expect(
      mount(
        <AdminDashboardProvider>
          <AssignAdminForm {...defaultProps} />
        </AdminDashboardProvider>,
      ).html(),
    ).toMatchSnapshot();
  });
});
