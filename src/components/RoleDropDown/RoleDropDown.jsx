import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@edx/paragon';
import { getDashboardRoles } from '../../store/adminDashboard/adminDashboard.selector';
import { fetchRoles } from '../../store/adminDashboard/adminDashboard.thunk';
import { SingleSelectMenu } from '../SelectMenu/SingleSelectMenu/SingleSelectMenu';
import './RoleDropDown.scss';

export const RoleDropDown = memo(({ onSelectRole, role, isRoleValid }) => {
  const dispatch = useDispatch();
  const { data: roles } = useSelector(getDashboardRoles);

  useEffect(() => {
    if (roles.length === 0) {
      dispatch(fetchRoles());
    }
  }, []);

  return (
    <Form.Group isInvalid={!isRoleValid}>
      <div className="role-dropdown">
        <SingleSelectMenu
          variant="outline-light"
          title="Select Role"
          options={roles}
          selectedValue={role}
          onSelect={onSelectRole}
          showSelectedItem
          isInvalid={!isRoleValid}
        />
      </div>
      {!isRoleValid && (
        <Form.Control.Feedback type="invalid" className="mt-1">
          Please select your Role.
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
});

RoleDropDown.propTypes = {
  onSelectRole: PropTypes.func,
  role: PropTypes.string,
  isRoleValid: PropTypes.bool,
};

RoleDropDown.defaultProps = {
  onSelectRole: () => {},
  role: '',
  isRoleValid: true,
};
