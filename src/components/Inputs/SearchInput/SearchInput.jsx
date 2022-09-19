import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon } from '@edx/paragon';
import { Search, Close } from '@edx/paragon/icons';
import './SearchInput.scss';

const SearchInput = ({ placeholder, onChange, onReset }) => {
  const [inputValue, setInputValue] = useState('');
  const isEmpty = inputValue.length <= 0;

  const handleChange = useCallback(
    (event) => {
      setInputValue(event.target.value);
      if (onChange) {
        onChange(event);
      }
    },
    [onChange],
  );

  const handleReset = () => {
    if (onReset && !isEmpty) {
      onReset();
    }

    setInputValue('');
  };

  return (
    <Form.Group className="search">
      <Form.Control
        trailingElement={
          <Icon onClick={handleReset} src={isEmpty ? Search : Close} />
        }
        floatingLabel={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
    </Form.Group>
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func,
};

SearchInput.defaultProps = {
  placeholder: '',
  onReset: null,
};

export default memo(SearchInput);
