/* eslint-disable import/no-extraneous-dependencies */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

process.env.LMS_BASE_URL = 'http://localhost:18000';
process.env.MARKETING_SITE_BASE_URL = 'http://marketing.url';
process.env.LOGOUT_URL = 'http://localhost:18000/logout';
process.env.BASE_URL = 'http://localhost:8734';

jest.mock('@edx/frontend-platform/logging');
jest.mock('@edx/frontend-platform/analytics');

configure({ adapter: new Adapter() });
