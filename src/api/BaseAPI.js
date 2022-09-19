import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

class BaseAPI {
  async request(requestTypeCallback, pathname, params = {}, getParams) {
    const url = new URL(`${getConfig().LMS_BASE_URL}${pathname}/`);

    if (getParams) {
      url.search = new URLSearchParams(getParams);
    }

    const response = await requestTypeCallback(url.href, params);

    if (response.status !== 200) {
      throw new Error('Server Error!');
    }

    return response.data;
  }

  async get(...args) {
    return this.request(getAuthenticatedHttpClient().get, ...args);
  }

  async patch(...args) {
    return this.request(getAuthenticatedHttpClient().patch, ...args);
  }

  async put(...args) {
    return this.request(getAuthenticatedHttpClient().put, ...args);
  }

  async post(...args) {
    return this.request(getAuthenticatedHttpClient().post, ...args);
  }

  async delete(...args) {
    return this.request(getAuthenticatedHttpClient().delete, ...args);
  }
}

export default new BaseAPI();
