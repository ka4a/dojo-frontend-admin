import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form } from '@edx/paragon';
import * as R from 'ramda';
import {
  assignStaffMember,
  fetchRoles,
} from '../../store/adminDashboard/adminDashboard.thunk';
import {
  getDashboardNewInstructor,
  getDashboardRoles,
} from '../../store/adminDashboard/adminDashboard.selector';
import { validateEmail, validateRole } from '../../utils/helpers/validation';

function AssignAdminForm({ courseId }) {
  const newInstructor = useSelector(getDashboardNewInstructor);
  const roles = useSelector(getDashboardRoles);

  const dispatch = useDispatch();

  const [emailFieldStatus, setEmailFieldStatus] = useState({
    isValid: true,
    errors: {},
  });
  const [roleFieldStatus, setRoleFieldStatus] = useState({
    isValid: true,
    errors: {},
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const role = event.target.role.value;

    const emailStatus = validateEmail(email);
    const roleStatus = validateRole(role);

    setEmailFieldStatus(emailStatus);
    setRoleFieldStatus(roleStatus);

    if (!R.isEmpty(emailStatus.errors) || !R.isEmpty(roleStatus.errors)) {
      return;
    }

    dispatch(
      assignStaffMember({
        userEmail: email,
        courseId,
        role,
      }),
    );
  };

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  if (R.isEmpty(emailFieldStatus.errors) && newInstructor.error) {
    emailFieldStatus.errors = newInstructor.error;
  }
  const emailFieldIsInvalid = !R.isEmpty(emailFieldStatus.errors);
  const roleFieldIsInvalid = !R.isEmpty(roleFieldStatus.errors);

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Row>
        <Form.Group
          as={Col}
          controlId="formGridEmail"
          isInvalid={emailFieldIsInvalid}
        >
          <Form.Control type="email" floatingLabel="Email" name="email" />
          {emailFieldIsInvalid && (
            <Form.Control.Feedback type="invalid">
              {emailFieldStatus.errors}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group
          as={Col}
          controlId="formGridState"
          isInvalid={roleFieldIsInvalid}
        >
          <Form.Control floatingLabel="Role" as="select" name="role">
            <option value="">Select a role</option>
            {roles.status === 'resolved'
              && roles.data?.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
          </Form.Control>
          {roleFieldIsInvalid && (
            <Form.Control.Feedback type="invalid">
              {roleFieldStatus.errors}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Form.Row>
      <Button variant="primary" type="submit" className="mt-3 mb-2">
        Assign
      </Button>
    </Form>
  );
}

AssignAdminForm.propTypes = {
  courseId: PropTypes.number.isRequired,
};

export default memo(AssignAdminForm);
