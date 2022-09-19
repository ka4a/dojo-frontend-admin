import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button } from '@edx/paragon';

export function createActionCell({ actionCreator, text }) {
  function ActionCell({ row }) {
    const item = row.original;

    const dispatch = useDispatch();

    const handleClick = useCallback(() => {
      dispatch(actionCreator(item));
    }, [dispatch, item]);

    return (
      <Button
        className="instructor__table-button"
        variant="link"
        onClick={handleClick}
      >
        {text}
      </Button>
    );
  }

  ActionCell.propTypes = {
    row: PropTypes.shape({
      original: PropTypes.object,
    }).isRequired,
  };

  return memo(ActionCell);
}
