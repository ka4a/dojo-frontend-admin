import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { AdminDashboardProvider } from '../../test/AdminDashboardProvider';
import { CourseStaff } from './CourseStaff';

let wrapper;

describe('CourseStaff', () => {
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <AdminDashboardProvider>
          <CourseStaff />
        </AdminDashboardProvider>
      </MemoryRouter>,
    );
  });

  it('should render CourseStaff component', () => {
    shallow(
      <MemoryRouter>
        <AdminDashboardProvider>
          <CourseStaff />
        </AdminDashboardProvider>
      </MemoryRouter>,
    );
  });

  it('it should render page expected HTML', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('it should render page title', () => {
    expect(
      wrapper.contains(
        <div className="page-title">Course Staff Management</div>,
      ),
    ).toEqual(true);
  });
});
