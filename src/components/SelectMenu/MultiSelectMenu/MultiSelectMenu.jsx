import { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '@edx/paragon';
import * as R from 'ramda';
import { MultiselectItem } from './components/MultiSelectItem/MultiSelectItem';

export const MultiselectMenu = memo(
  ({
    title, onChange, values, options, shouldChangeOnClose,
  }) => {
    const [localValueSets, setLocalValuesSets] = useState(new Set(values));
    const [isOpened, setIsOpened] = useState(false);

    const handleChange = useCallback(
      (changedValues) => {
        if (!R.equals(values, changedValues)) {
          onChange(changedValues);
        }
      },
      [values, localValueSets, onChange],
    );

    const handleClose = useCallback(() => {
      if (shouldChangeOnClose) {
        handleChange([...localValueSets]);
      }

      setIsOpened(false);
    }, [shouldChangeOnClose, localValueSets, handleChange]);

    const handleOpen = useCallback(() => {
      setIsOpened(true);

      if (!isOpened) {
        setLocalValuesSets(new Set(values));
      }
    }, [setIsOpened, isOpened, setLocalValuesSets, values]);

    const handleSelect = useCallback(
      (value) => {
        let selectedValues = [...localValueSets];

        if (!selectedValues.includes(value)) {
          selectedValues.push(value);
        } else {
          selectedValues = selectedValues.filter(
            (localValueSet) => localValueSet !== value,
          );
        }

        if (!shouldChangeOnClose) {
          handleChange(selectedValues);
        }

        setLocalValuesSets(new Set(selectedValues));
      },
      [
        values,
        localValueSets,
        setLocalValuesSets,
        shouldChangeOnClose,
        handleChange,
      ],
    );

    // todo: Paragon Dropdown onToggle doesn't work on component is opening. onClick is used to process the opening.

    return (
      <Dropdown autoClose="outside" onToggle={handleClose} onClick={handleOpen}>
        <Dropdown.Toggle variant="outline-extra" id="dropdown-basic-4">
          {title}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {options.map(({ name, value }) => (
            <MultiselectItem
              key={value}
              value={value}
              name={name}
              isSelected={localValueSets.has(value)}
              onSelect={handleSelect}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  },
);

MultiselectMenu.propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  onChange: PropTypes.func,
  shouldChangeOnClose: PropTypes.bool,
  values: PropTypes.arrayOf(PropTypes.string),
};

MultiselectMenu.defaultProps = {
  title: '',
  options: [],
  values: [],
  onChange: null,
  shouldChangeOnClose: false,
};
