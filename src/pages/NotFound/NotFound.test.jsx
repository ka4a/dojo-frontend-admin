import { IntlProvider } from '@edx/frontend-platform/i18n';
import { shallow, mount } from 'enzyme';
import { NotFound } from './NotFound';

describe('NotFound', () => {
  it('should render NotFound component', () => {
    shallow(
      <IntlProvider locale="en">
        <NotFound />
      </IntlProvider>,
    );
  });

  it('it should render the expected HTML', () => {
    expect(
      mount(
        <IntlProvider locale="en">
          <NotFound />
        </IntlProvider>,
      ).html(),
    ).toMatchSnapshot();
  });
});
