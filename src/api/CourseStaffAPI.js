import { api } from '../utils/constants/apiConstants';
import BaseAPI from './BaseAPI';

class CourseStaffAPI {
  #instance;

  constructor(baseAPI) {
    this.#instance = baseAPI;
  }

  async fetchCourseStaff(payload) {
    return this.#instance.get(api.base + api.instructors, {
      params: {
        page: payload ? payload.pageNumber : 1,
        search: payload && payload.search,
        role: payload.role,
        is_active: payload.is_active,
      },
    });
  }

  async fetchStaffMember(userId) {
    return this.#instance.get(`${api.base + api.instructors}/${userId}`);
  }

  async changeCourseRole(payload) {
    return this.#instance.patch(
      `${api.base + api.instructors}/${payload.id}${api.courses}`,
      payload,
    );
  }

  async fetchStaffMemberCourses(userId) {
    return this.#instance.get(
      `${api.base + api.instructors}/${userId}${api.courses}`,
    );
  }

  async addStaffMember(payload) {
    return this.#instance.post(api.base + api.instructors, payload);
  }

  async assignNewCourses(payload) {
    return this.#instance.post(
      `${api.base + api.instructors}/${payload.id}${api.courses}`,
      payload,
    );
  }

  async fetchCourses() {
    return this.#instance.get(api.base + api.courses + api.v1 + api.courses);
  }

  async removeCourseRoles(payload) {
    return this.#instance.delete(
      `${api.base + api.instructors}/${payload.id}${api.courses}`,
      payload,
      {
        ids: payload.courseAccessRoleIds,
      },
    );
  }
}

export default new CourseStaffAPI(BaseAPI);
