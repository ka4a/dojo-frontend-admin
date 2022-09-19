import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { submissionPriorityTypes } from '@reustleco/dojo-frontend-common';
import { requestStatus } from '../utils/constants';

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  adminDashboard: {
    courses: {
      status: requestStatus.RESOLVED,
      error: null,
      data: [
        {
          display_name: 'Dojo',
          id: 'course-v1:Dojo+DDC+2022_T1',
          instructors: [
            {
              user_id: 1,
              username: 'Test',
              roles: ['instructor'],
            },
          ],
        },
      ],
    },
    roles: {
      status: requestStatus.RESOLVED,
      error: null,
      data: ['grader', 'instructor'],
    },
    newInstructor: { status: requestStatus.RESOLVED, error: null },
    isExpanded: false,
  },
  baseLayout: {
    toast: {
      isOpened: true,
      body: 'toast',
    },
  },
  courseStaff: {
    courseStaffList: {
      status: requestStatus.RESOLVED,
      error: null,
      data: [
        {
          user_id: '32',
          full_name: 'Test',
          username: 'test',
          email: 'test@strata.co.jp',
          is_staff: 'false',
          is_active: 'true',
          last_login: '2022-05-30T11:36:05.018418Z',
          date_joined: '2021-11-19T10:08:36Z',
          fullNameAccessor: 'test',
          usernameAccessor: 'test',
          dateJoinedTime: 16614552982,
          loginAt: 20503964,
        },
      ],
      itemCount: 0,
      pageCount: 1,
      currentPage: 1,
    },
    staffMemberDetail: { status: null, error: null, data: null },
    newStaffMember: { status: null, error: null, data: {} },
    staffMemberCourses: { status: null, error: null, data: [] },
    courses: {
      status: requestStatus.RESOLVED,
      error: null,
      data: [
        {
          blocks_url:
            'https://exp.dojoalpha.com/api/courses/v2/blocks/?course_id=course-v1%3ADojo%2BDDC%2B2022_T1',
          effort: '5',
          end: '2032-05-30T00:00:00Z',
          enrollment_start: '2022-05-02T00:00:00Z',
          enrollment_end: null,
          id: 'course-v1:Dojo+DDC+2022_T1',
          media: {
            banner_image: {
              uri: '/asset-v1:Dojo+DDC+2022_T1+type@asset+block@images_course_image.jpg',
              uri_absolute:
                'https://exp.dojoalpha.com/asset-v1:Dojo+DDC+2022_T1+type@asset+block@images_course_image.jpg',
            },
            course_image: {
              uri: '/asset-v1:Dojo+DDC+2022_T1+type@asset+block@6268cd681d9fa6575e7dda33_WhatsApp_Image_2021-10-05_at_9.51.27_AM__1_.jpeg',
            },
            course_video: {
              uri: null,
            },
            image: {
              raw: 'https://exp.dojoalpha.com/asset-v1:Dojo+DDC+2022_T1+type@asset+block@6268cd681d9fa6575e7dda33_WhatsApp_Image_2021-10-05_at_9.51.27_AM__1_.jpeg',
              small:
                'https://exp.dojoalpha.com/asset-v1:Dojo+DDC+2022_T1+type@asset+block@6268cd681d9fa6575e7dda33_WhatsApp_Image_2021-10-05_at_9.51.27_AM__1_.jpeg',
              large:
                'https://exp.dojoalpha.com/asset-v1:Dojo+DDC+2022_T1+type@asset+block@6268cd681d9fa6575e7dda33_WhatsApp_Image_2021-10-05_at_9.51.27_AM__1_.jpeg',
            },
          },
          name: 'Dojo Codelabs Demo',
          number: 'DDC',
          org: 'Dojo',
          short_description:
            'Have a fundamental understanding of the Python programming language.\nHave the skills and understanding of Python to confidently apply for Python programming jobs.\nAcquire the pre-requisite Python skills to move into specific branches - Machine Learning, Data Science, etc..\nAdd the Python Object-Oriented Programming (OOP) skills to your résumé.\nUnderstand how to create your own Python programs.\nLearn Python from experienced professional software developers.\nUnderstand both Python 2 and Python 3.\n\n',
          start: '2022-05-02T05:00:00Z',
          start_display: 'May 2, 2022',
          start_type: 'timestamp',
          pacing: 'instructor',
          mobile_available: false,
          hidden: false,
          invitation_only: true,
          course_id: 'course-v1:Dojo+DDC+2022_T1',
        },
      ],
    },
    multipleCoursesModal: { open: false },
    changeRoleModal: { open: false, error: null, body: [] },
    removeRoleModal: { open: false, body: [] },
  },
  submissions: {
    submissions: {
      status: requestStatus.RESOLVED,
      error: null,
      data: [
        {
          submission_id: '1',
          submission_uuid: 'f80bfe48-2055-44ab-8dad-b7c016cebb96',
          submission_item_type: 'LTI',
          course: 'AI Technologies',
          course_id: 'course-v1:Strata+ST101+2021Q1',
          course_url:
            'https://learning.exp.dojoalpha.com/course/course-v1:Strata+ST101+2021Q1/home',
          unit: 'CPP - Staging LTI',
          unit_url:
            'https://learning.exp.dojoalpha.com/course/course-v1:Strata+ST101+2021Q1/block-v1:Strata+ST101+2021Q1+type@sequential+block@04fe80fd1323488d9ebfe69bdf4a6ed7/block-v1:Strata+ST101+2021Q1+type@vertical+block@8b5d80b13b71413e9e1984add4be8f2d',
          student: 'Alex Student',
          status: 'graded',
          instructor_full_name: 'Alexander Rassanov',
          instructor_id: 70,
          item_id:
            'block-v1:Strata+ST101+2021Q1+type@lti_consumer+block@75362d97152549ea87199d913dc0481a',
          scorer_id: 'ebd5d98d22e0bd36ccbfd8fe87310657',
          submission_number: '1',
          created_at: '2022-05-18T14:26:50.483121Z',
          grading_completed_at: '2022-05-18T14:30:58.214320Z',
          grading_started_at: '2022-05-18T14:27:31.534937Z',
          cancelled_at: null,
          ticket_id: '83',
          score_note: 'q',
          grade: null,
          priority: submissionPriorityTypes.NORMAL,
          timeSinceSubmission: 0,
          submissionLifetime: 0,
          gradingTime: 0,
          gradingTimeDifference: 0,
          lifetimeDifference: 0,
          submitedAt: 0,
        },
      ],
    },
    submissionModal: {
      open: true,
      body: {
        submission_id: '170',
        submission_uuid: 'f80bfe48-2055-44ab-8dad-b7c016cebb96',
        submission_item_type: 'LTI',
        course: 'AI Technologies',
        course_id: 'course-v1:Strata+ST101+2021Q1',
        course_url:
          'https://learning.exp.dojoalpha.com/course/course-v1:Strata+ST101+2021Q1/home',
        unit: 'CPP - Staging LTI',
        unit_url:
          'https://learning.exp.dojoalpha.com/course/course-v1:Strata+ST101+2021Q1/block-v1:Strata+ST101+2021Q1+type@sequential+block@04fe80fd1323488d9ebfe69bdf4a6ed7/block-v1:Strata+ST101+2021Q1+type@vertical+block@8b5d80b13b71413e9e1984add4be8f2d',
        student: 'Alex Student',
        status: 'graded',
        instructor_full_name: 'Alexander Rassanov',
        instructor_id: 70,
        item_id:
          'block-v1:Strata+ST101+2021Q1+type@lti_consumer+block@75362d97152549ea87199d913dc0481a',
        scorer_id: 'ebd5d98d22e0bd36ccbfd8fe87310657',
        submission_number: '1',
        created_at: '2022-05-18T14:26:50.483121Z',
        grading_completed_at: '2022-05-18T14:30:58.214320Z',
        grading_started_at: '2022-05-18T14:27:31.534937Z',
        cancelled_at: null,
        ticket_id: '83',
        score_note: 'q',
        grade: null,
        priority: submissionPriorityTypes.NORMAL,
        timeSinceSubmission: 0,
        submissionLifetime: 0,
        gradingTime: 0,
        gradingTimeDifference: 0,
        lifetimeDifference: 0,
        submitedAt: 0,
      },
    },
  },
});

export const AdminDashboardProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

AdminDashboardProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
