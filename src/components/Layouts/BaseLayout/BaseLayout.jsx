import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Toast, Icon, Modal } from '@edx/paragon';
import { useDispatch, useSelector } from 'react-redux';
import { closeToast } from '../../../store/baseLayout/baseLayout.slice';
import { getToastContent } from '../../../store/baseLayout/baseLayout.selector';
import { requestStatus } from '../../../utils/constants/requestStatusConstants';
import './BaseLayout.styles.scss';

const BaseLayout = ({
  children, statuses, errors, position,
}) => {
  const dispatch = useDispatch();
  const toast = useSelector(getToastContent);

  return (
    <div className="base-layout">
      {statuses.some((status) => status === requestStatus.LOADING) && (
        <h2>Loading...</h2>
      )}
      {errors.some((error) => error) && (
        <Modal
          open
          title="An error occurred:"
          body={errors?.find((error) => error)}
          onClose={() => {}}
          closeText={<Icon className="fa fa-ship" screenReaderText="Close" />}
        />
      )}
      {statuses.every((status) => status === requestStatus.RESOLVED) && (
        <div className={classNames({ [position]: position })}>{children}</div>
      )}
      <Toast
        onClose={() => {
          dispatch(closeToast());
        }}
        show={toast.isOpened}
      >
        {toast.body && toast.body}
      </Toast>
    </div>
  );
};

BaseLayout.propTypes = {
  statuses: PropTypes.arrayOf(PropTypes.string),
  errors: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  position: PropTypes.string,
};

BaseLayout.defaultProps = {
  position: '',
  statuses: [],
  errors: [],
  children: null,
};

export default BaseLayout;
