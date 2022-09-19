import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@edx/paragon';
import classNames from 'classnames';
import './LinkButton.scss';

const LinkButton = ({ children, onClick, className }) => (
  <Button.Deprecated
    onClick={onClick}
    className={classNames('table-nav-link link-button', className)}
  >
    {children}
  </Button.Deprecated>
);

LinkButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

LinkButton.defaultProps = {
  className: '',
  children: null,
};

export default LinkButton;
