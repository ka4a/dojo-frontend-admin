import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Form, ModalDialog, Spinner,
} from '@edx/paragon';
import React, { memo, useCallback, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import { closeChangeRoleModal } from '../../../store/courseStaff/courseStaff.slice';
import { getChangeRoleModal } from '../../../store/courseStaff/courseStaff.selector';
import { changeCourseRole } from '../../../store/courseStaff/courseStaff.thunk';
import { requestStatus } from '../../../utils/constants';
import { castArray } from '../../../utils';
import { RoleDropDown } from '../../RoleDropDown/RoleDropDown';

export const ChangeRoleModal = memo(({ userId }) => {
  const dispatch = useDispatch();
  const {
    status, open, error, body,
  } = useSelector(getChangeRoleModal);
  const [role, setRole] = useState('');
  const [isRoleValid, setIsRoleValid] = useState(true);

  const handleClose = () => {
    setRole('');
    setIsRoleValid(true);
    dispatch(closeChangeRoleModal());
  };

  const handleSelectRole = useCallback((selectedRole) => {
    setRole(selectedRole);
    setIsRoleValid(true);
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (R.isEmpty(role)) {
      setIsRoleValid(false);
      return;
    }

    const courseAccessRoleIds = castArray(body).map(
      (course) => course.course_access_role_id,
    );

    dispatch(
      changeCourseRole({
        id: userId,
        role,
        course_access_role_ids: courseAccessRoleIds,
      }),
    );
  };

  return (
    <ModalDialog
      title="Change Role"
      isOpen={open}
      onClose={handleClose}
      size="md"
      hasCloseButton
      isFullscreenOnMobile
      isFullscreenScroll
      isBlocking
    >
      <ModalDialog.Header>
        <ModalDialog.Title>Change Role</ModalDialog.Title>
      </ModalDialog.Header>
      <ModalDialog.Body>
        <RoleDropDown
          onSelectRole={handleSelectRole}
          role={role}
          isRoleValid={isRoleValid}
        />
        <Form.Group>
          <div className="d-flex flex-column">
            {Array.isArray(body) ? (
              body.map((course) => (
                <span key={course.id} className="selected-course-list">
                  {course.course_display_name}
                </span>
              ))
            ) : (
              <span className="selected-course-list">
                {body.course_display_name}
              </span>
            )}
          </div>
          {error && (
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </ModalDialog.Body>
      <ModalDialog.Footer className="justify-content-center">
        <Button
          variant="primary"
          className={classNames(['modal-submit-btn'])}
          onClick={handleFormSubmit}
        >
          {status === requestStatus.LOADING ? (
            <Spinner variant="light" animation="border" />
          ) : (
            'Change Role'
          )}
        </Button>
      </ModalDialog.Footer>
    </ModalDialog>
  );
});

ChangeRoleModal.propTypes = {
  userId: PropTypes.number,
};

ChangeRoleModal.defaultProps = {
  userId: null,
};
