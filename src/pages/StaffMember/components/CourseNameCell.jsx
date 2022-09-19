import React, { memo } from 'react';
import PropTypes from 'prop-types';

export const CourseNameCell = memo(({ row }) => (
  <span className="table-nav-link">
    {row.original.course_display_name}
  </span>
));

CourseNameCell.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      course_display_name: PropTypes.string,
    }),
  }).isRequired,
};
