import { api } from '../utils/constants/apiConstants';
import BaseAPI from './BaseAPI';

class AdminDashboardAPI {
  #instance;

  constructor(baseAPI) {
    this.#instance = baseAPI;
  }

  async fetchCourses() {
    return this.#instance.get(api.base + api.coursesStaff);
  }

  async fetchRoles() {
    return this.#instance.get(api.base + api.roles);
  }

  async assignStaffMember(payload) {
    return this.#instance.post(api.base + api.coursesStaff, {
      course_id: payload.courseId,
      user_email: payload.userEmail,
      role: payload.role,
    });
  }
}

export default new AdminDashboardAPI(BaseAPI);
