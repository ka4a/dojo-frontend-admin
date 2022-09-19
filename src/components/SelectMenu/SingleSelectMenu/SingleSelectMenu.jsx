import { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownButton } from '@edx/paragon';
import classNames from 'classnames';
import { displayOptionName, getOptionsFromStrings } from '../../../utils';
import './SingleSelectMenu.scss';

export const SingleSelectMenu = memo(
  ({
    title,
    variant,
    options,
    selectedValue,
    onSelect,
    showSelectedItem,
    isInvalid,
  }) => {
    const handleClick = useCallback((value) => {
      onSelect(value);
    });

    return (
      <DropdownButton
        variant={variant}
        title={
          showSelectedItem && selectedValue
            ? displayOptionName(selectedValue)
            : title
        }
        className={classNames({ 'is-invalid': isInvalid })}
      >
        {getOptionsFromStrings(options).map(({ name, value }) => (
          <Dropdown.Item
            key={value}
            active={value === selectedValue}
            onClick={() => handleClick(value)}
          >
            {name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  },
);

SingleSelectMenu.propTypes = {
  title: PropTypes.string,
  variant: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  selectedValue: PropTypes.string,
  onSelect: PropTypes.func,
  isInvalid: PropTypes.bool,
};

SingleSelectMenu.defaultProps = {
  title: '',
  variant: '',
  options: [],
  selectedValue: '',
  onSelect: () => {},
  isInvalid: false,
};
