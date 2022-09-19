import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ModalDialog, Spinner } from '@edx/paragon';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { closeRemoveRoleModal } from '../../../store/courseStaff/courseStaff.slice';
import { removeCourseRoles } from '../../../store/courseStaff/courseStaff.thunk';
import { getRemoveRoleModal } from '../../../store/courseStaff/courseStaff.selector';
import { castArray } from '../../../utils';
import { requestStatus } from '../../../utils/constants';

export const RemoveRoleModal = memo(({ userId }) => {
  const dispatch = useDispatch();

  const { status, open, body } = useSelector(getRemoveRoleModal);

  const handleClose = () => {
    dispatch(closeRemoveRoleModal());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const courseAccessRoleIds = castArray(body).map(
      (role) => role.course_access_role_id,
    );

    dispatch(
      removeCourseRoles({
        id: userId,
        courseAccessRoleIds,
      }),
    );
  };

  return (
    <>
      <ModalDialog
        title="Remove Role"
        isOpen={open}
        onClose={handleClose}
        size="md"
        hasCloseButton
        isFullscreenOnMobile
        isFullscreenScroll
        isBlocking
      >
        <ModalDialog.Header>
          <ModalDialog.Title>
            Are you sure, you want to remove?
          </ModalDialog.Title>
        </ModalDialog.Header>
        <ModalDialog.Footer
          className={classNames('d-flex', {
            'justify-content-center': status === requestStatus.LOADING,
            'justify-content-start': status !== requestStatus.LOADING,
          })}
        >
          {status === requestStatus.LOADING ? (
            <Spinner variant="light" animation="border" />
          ) : (
            <>
              <Button variant="tertiary" onClick={handleClose}>
                No
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Yes
              </Button>
            </>
          )}
        </ModalDialog.Footer>
      </ModalDialog>
    </>
  );
});

RemoveRoleModal.propTypes = {
  userId: PropTypes.number,
};

RemoveRoleModal.defaultProps = {
  userId: null,
};
