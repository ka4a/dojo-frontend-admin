import { api } from '../utils/constants/apiConstants';
import BaseAPI from './BaseAPI';

class SubmissionsAPI {
  #instance;

  constructor(baseAPI) {
    this.#instance = baseAPI;
  }

  async getSubmissions() {
    return this.#instance.get(api.base + api.submissions);
  }
}

export default new SubmissionsAPI(BaseAPI);
