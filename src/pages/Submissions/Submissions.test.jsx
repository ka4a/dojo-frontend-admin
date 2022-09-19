import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { AdminDashboardProvider } from '../../test/AdminDashboardProvider';
import { Submissions } from './Submissions';

let wrapper;

describe('Submissions', () => {
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <AdminDashboardProvider>
          <Submissions />
        </AdminDashboardProvider>
      </MemoryRouter>,
    );
  });

  it('should render Submissions component', () => {
    shallow(
      <MemoryRouter>
        <AdminDashboardProvider>
          <Submissions />
        </AdminDashboardProvider>
      </MemoryRouter>,
    );
  });

  it('it should render the expected HTML', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('it should render page title', () => {
    expect(
      wrapper.contains(<div className="page-title">Submission Management</div>),
    ).toEqual(true);
  });
});
