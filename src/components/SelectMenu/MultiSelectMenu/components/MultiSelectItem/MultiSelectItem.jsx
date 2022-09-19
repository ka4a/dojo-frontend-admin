import { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Form } from '@edx/paragon';
import './MultiSelectItem.scss';

export const MultiselectItem = memo(({
  isSelected, value, name, onSelect,
}) => {
  const handleSelect = useCallback(() => {
    if (onSelect) {
      onSelect(value);
    }
  }, [value, onSelect]);

  return (
    <Dropdown.Item
      active={isSelected}
      onClick={handleSelect}
      className="multiselect-item"
    >
      <Form.Checkbox checked={isSelected}>{name}</Form.Checkbox>
    </Dropdown.Item>
  );
});

MultiselectItem.propTypes = {
  isSelected: PropTypes.bool,
  value: PropTypes.string,
  name: PropTypes.string,
  onSelect: PropTypes.func,
};

MultiselectItem.defaultProps = {
  value: '',
  name: '',
  onSelect: null,
  isSelected: false,
};
