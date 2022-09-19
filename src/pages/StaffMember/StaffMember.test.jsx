import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { AdminDashboardProvider } from '../../test/AdminDashboardProvider';
import { StaffMember } from './StaffMember';

describe('StaffMember', () => {
  it('should render StaffMember component', () => {
    shallow(
      <MemoryRouter initialEntries={['/coursestaff/:userId']}>
        <AdminDashboardProvider>
          <StaffMember />
        </AdminDashboardProvider>
      </MemoryRouter>,
    );
  });

  it('it should render the expected HTML', () => {
    expect(
      mount(
        <MemoryRouter initialEntries={['/coursestaff/:userId']}>
          <AdminDashboardProvider>
            <StaffMember />
          </AdminDashboardProvider>
        </MemoryRouter>,
      ).html(),
    ).toMatchSnapshot();
  });
});
