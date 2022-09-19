import React, { memo } from 'react';
import { Button } from '@edx/paragon';
import PropTypes from 'prop-types';

const BulkActionButton = ({
  selectedFlatRows,
  text,
  onClick,
}) => (
  <Button
    onClick={() => {
      onClick(selectedFlatRows);
    }}
    variant="info"
  >
    {text}
  </Button>
);

BulkActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedFlatRows: PropTypes.arrayOf(PropTypes.shape({
    original: PropTypes.object,
  })),
};

BulkActionButton.defaultProps = {
  selectedFlatRows: [],
};

export default memo(BulkActionButton);
