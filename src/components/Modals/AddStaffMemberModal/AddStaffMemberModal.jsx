import PropTypes from 'prop-types';
import {
  Button,
  Form,
  ModalDialog,
  Spinner,
  useCheckboxSetValues,
} from '@edx/paragon';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';
import { SearchInput } from '../../Inputs';
import { validateEmail } from '../../../utils';
import {
  addStaffMember,
  assignNewCourses,
  fetchCourses,
  fetchCourseStaff,
} from '../../../store/courseStaff/courseStaff.thunk';
import {
  openMultipleCoursesModal,
  closeMultipleCoursesModal,
  setInstructorCourses,
} from '../../../store/courseStaff/courseStaff.slice';
import {
  getCourses,
  getCourseStaffList,
  getMultipleCoursesModal,
  getNewStaffMember,
} from '../../../store/courseStaff/courseStaff.selector';
import { requestStatus } from '../../../utils/constants';
import { CourseStaffAPI } from '../../../api';
import './AddStaffMemberModal.styles.scss';
import { useLocalSearch } from '../../../hooks';
import { RoleDropDown } from '../../RoleDropDown/RoleDropDown';

const SELECTED_FILTER_KEYS = ['name'];

export const AddStaffMemberModal = ({
  modalTitle,
  hasEmailField,
  userEmail,
  userId,
}) => {
  const dispatch = useDispatch();

  const { error, status } = useSelector(getNewStaffMember);
  const { open } = useSelector(getMultipleCoursesModal);
  const { data: coursesData } = useSelector(getCourses);

  const [emailInput, setEmailInput] = useState('');
  const [courseSearch, setCourseSearch] = useState('');

  const filteredCourses = useLocalSearch(
    coursesData.results,
    courseSearch,
    SELECTED_FILTER_KEYS,
  );

  const [role, setRole] = useState('');
  const [isRoleValid, setIsRoleValid] = useState(true);
  const [chosenCourses, { add, remove, clear }] = useCheckboxSetValues([]);
  const [emailFieldStatus, setEmailFieldStatus] = useState({
    isValid: true,
    errors: '',
  });
  const [chosenCoursesStatus, setChosenCoursesStatus] = useState({
    isValid: true,
    errors: '',
  });

  const { currentPage } = useSelector(getCourseStaffList);

  const handleSelectRole = useCallback((selectedRole) => {
    setRole(selectedRole);
    setIsRoleValid(true);
  });

  const handleChangeCourseSearch = useCallback((event) => {
    setCourseSearch(event.target.value);
  }, []);

  const handleClose = useCallback(() => {
    dispatch(closeMultipleCoursesModal());
  }, [dispatch]);

  const handleResetCourseSearch = useCallback(() => {
    setCourseSearch('');
  }, [courseSearch]);

  const handleOpen = useCallback(() => {
    dispatch(openMultipleCoursesModal());
  }, [dispatch]);

  const handleChooseCourse = (event) => {
    if (event.target.checked) {
      add(event.target.value);
    } else {
      remove(event.target.value);
    }

    setChosenCoursesStatus({
      isValid: true,
      errors: '',
    });
  };

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  useEffect(() => {
    if (!open) {
      setRole('');
      setEmailFieldStatus({
        isValid: true,
        errors: '',
      });
      setChosenCoursesStatus({
        isValid: true,
        errors: '',
      });
      setIsRoleValid(true);
      clear();
      setEmailInput('');
    }
  }, [open]);

  useEffect(() => {
    if (status === requestStatus.RESOLVED) {
      handleClose();
    }

    if (status === requestStatus.REJECTED) {
      setEmailFieldStatus({
        isValid: false,
        errors: error,
      });
    }
  }, [status]);

  const handleAddInstructorSubmit = (event) => {
    event.preventDefault();

    const emailStatus = validateEmail(emailInput);
    setEmailFieldStatus(emailStatus);

    if (!R.isEmpty(emailStatus.errors)) {
      return;
    }

    if (R.isEmpty(role)) {
      setIsRoleValid(false);
      return;
    }

    if (R.isEmpty(chosenCourses)) {
      setChosenCoursesStatus({
        isValid: false,
        errors: 'Please choose at least one course',
      });
      return;
    }

    dispatch(
      addStaffMember({
        user_email: emailInput,
        role,
        course_ids: chosenCourses,
      }),
    );

    dispatch(fetchCourseStaff({ pageNumber: currentPage }));
  };

  const handleAssignNewCoursesSubmit = (event) => {
    event.preventDefault();

    if (R.isEmpty(role)) {
      setIsRoleValid(false);
      return;
    }

    if (R.isEmpty(chosenCourses)) {
      setChosenCoursesStatus({
        isValid: false,
        errors: 'Please choose at least one course',
      });
      return;
    }

    dispatch(
      assignNewCourses({
        id: userId,
        user_email: userEmail,
        role,
        course_ids: chosenCourses,
      }),
    );
  };

  const handleEmailBlur = useCallback(async () => {
    try {
      const userData = await CourseStaffAPI({
        user_email: emailInput,
        role,
        course_ids: [],
      });

      const courses = await CourseStaffAPI.fetchInstructorCourses(
        userData.user_id,
      );
      dispatch(setInstructorCourses(courses));
    } catch {
      // ignore
    }
  }, []);

  if (R.isEmpty(emailFieldStatus.errors) && error) {
    emailFieldStatus.errors = error;
  }

  const emailFieldIsInvalid = !emailFieldStatus.isValid;
  const chosenCoursesInvalid = !chosenCoursesStatus.isValid;

  return (
    <>
      <Button
        variant={hasEmailField ? 'primary' : 'outline-primary'}
        onClick={handleOpen}
      >
        {modalTitle}
      </Button>

      <ModalDialog
        title="Add Instructor"
        isOpen={open}
        onClose={handleClose}
        size="md"
        hasCloseButton
        isFullscreenOnMobile
        isBlocking
      >
        <ModalDialog.Header>
          <ModalDialog.Title>{modalTitle}</ModalDialog.Title>
        </ModalDialog.Header>

        <ModalDialog.Body>
          {hasEmailField && (
            <Form.Group isInvalid={emailFieldIsInvalid}>
              <Form.Control
                floatingLabel="Instructor Email"
                type="email"
                name="email"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  setEmailFieldStatus({
                    isValid: true,
                    errors: '',
                  });
                }}
                onBlur={handleEmailBlur}
              />
              {emailFieldIsInvalid && (
                <Form.Control.Feedback type="invalid">
                  {emailFieldStatus.errors}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          )}
          <RoleDropDown
            onSelectRole={handleSelectRole}
            role={role}
            isRoleValid={isRoleValid}
          />
          <Form.Group>
            {hasEmailField && <Form.Label>Assigned Courses</Form.Label>}
            <div className="add-staff-member__search">
              <SearchInput
                onReset={handleResetCourseSearch}
                onChange={handleChangeCourseSearch}
                placeholder="Search courses"
              />
            </div>
          </Form.Group>
          <Form.Group isInvalid={chosenCoursesInvalid}>
            {filteredCourses?.length > 0 ? (
              <Form.CheckboxSet
                name="courses"
                onChange={handleChooseCourse}
                value={chosenCourses}
              >
                {filteredCourses?.map((course) => (
                  <Form.Checkbox key={course.id} value={course.id}>
                    {course.name}
                  </Form.Checkbox>
                ))}
              </Form.CheckboxSet>
            ) : (
              <Form.Control.Feedback type="invalid">
                No courses found
              </Form.Control.Feedback>
            )}
            {chosenCoursesInvalid && (
              <Form.Control.Feedback type="invalid">
                {chosenCoursesStatus.errors}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </ModalDialog.Body>

        <ModalDialog.Footer className="justify-content-center">
          <Button
            variant="primary"
            className={classNames(['modal-submit-btn'])}
            onClick={
              hasEmailField
                ? handleAddInstructorSubmit
                : handleAssignNewCoursesSubmit
            }
          >
            {status !== requestStatus.LOADING ? (
              'Assign Course'
            ) : (
              <Spinner
                size="md"
                animation="border"
                className=""
                screenReaderText="loading"
              />
            )}
          </Button>
        </ModalDialog.Footer>
      </ModalDialog>
    </>
  );
};

AddStaffMemberModal.propTypes = {
  modalTitle: PropTypes.string.isRequired,
  hasEmailField: PropTypes.bool,
  userEmail: PropTypes.string,
  userId: PropTypes.number,
};

AddStaffMemberModal.defaultProps = {
  hasEmailField: false,
  userEmail: null,
  userId: null,
};
