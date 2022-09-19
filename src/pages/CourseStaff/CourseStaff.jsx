import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from '@edx/paragon';
import classNames from 'classnames';
import Button from 'react-bootstrap/esm/Button';
import { fetchCourseStaff } from '../../store/courseStaff/courseStaff.thunk';
import {
  getCourseStaffList,
  getNewStaffMember,
} from '../../store/courseStaff/courseStaff.selector';
import { setToast } from '../../store/baseLayout/baseLayout.slice';
import { AddStaffMemberModal, BaseLayout, SearchInput } from '../../components';
import {
  capitalize,
  displayOptionName,
  getOptionsFromStrings,
} from '../../utils';
import {
  requestStatus,
  roleOptions,
  statusOptions,
} from '../../utils/constants';
import {
  createActiveBadgeCell,
  createDateCell,
  createItemLinkCell,
  createTimeAgoCell,
} from '../../hocs';
import { DataTableFetcher } from '../../components/DataTableFetcher/DataTableFetcher';
import { MultiselectMenu } from '../../components/SelectMenu/MultiSelectMenu/MultiSelectMenu';
import './courseStaff.styles.scss';
import { SingleSelectMenu } from '../../components/SelectMenu/SingleSelectMenu/SingleSelectMenu';
import { fetchRoles } from '../../store/adminDashboard/adminDashboard.thunk';
import { getDashboardRoles } from '../../store/adminDashboard/adminDashboard.selector';

const STATUS_FILTER_CHOICES = ['all', 'active', 'inactive'];
const createLink = (rowData) => `/coursestaff/${rowData.user_id}`;

const COLUMNS = [
  {
    Header: 'Username',
    accessor: 'usernameAccessor',
    Cell: createItemLinkCell({
      createLink,
      isNavLink: true,
      textFieldName: 'username',
    }),
  },
  {
    Header: 'Full Name',
    accessor: 'fullNameAccessor',
    Cell: createItemLinkCell({
      createLink,
      isNavLink: true,
      textFieldName: 'full_name',
    }),
  },
  {
    Header: 'Email',
    accessor: 'email',
    disableFilters: true,
  },
  {
    Header: 'Date Join',
    accessor: 'dateJoinedTime',
    Cell: createDateCell({ fieldName: 'date_joined' }),
  },
  {
    Header: 'Last Login',
    accessor: 'loginAt',
    Cell: createTimeAgoCell({ fieldName: 'last_login' }),
  },
  {
    Header: 'Active',
    accessor: 'is_active',
    Cell: createActiveBadgeCell({ fieldName: 'is_active' }),
  },
  {
    Header: 'Staff',
    accessor: 'is_staff',
    Cell: createActiveBadgeCell({ fieldName: 'is_staff' }),
  },
];

export const CourseStaff = () => {
  const dispatch = useDispatch();

  const { data: newStaffMember } = useSelector(getNewStaffMember);
  const {
    status,
    error,
    data: courseStaffData,
    itemCount,
    pageCount,
    currentPage,
  } = useSelector(getCourseStaffList);

  const { data: dashboardRoles } = useSelector(getDashboardRoles);

  const roleChoises = useMemo(() => [roleOptions.LEARNER, ...dashboardRoles], [dashboardRoles]);

  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [userStatus, setUserStatus] = useState(statusOptions.ALL);
  const [roles, setRoles] = useState(roleChoises);

  const filters = useMemo(() => {
    const result = {};

    if (!roles?.includes(roleOptions.LEARNER) && roles.length > 0) {
      result.role = roles.join(',');
    }

    if (search) {
      result.search = search;
    }

    if (userStatus !== statusOptions.ALL) {
      result.is_active = statusOptions[userStatus.toUpperCase()];
    }

    return result;
  }, [roles, search, userStatus]);

  const fetchData = useCallback(
    (params) => {
      dispatch(fetchCourseStaff(params));
    },
    [dispatch],
  );

  const appliedFilterNames = useMemo(() => {
    const preparedFilters = [];
    if (roles.length > 0 && roles.length < roleChoises.length) {
      preparedFilters.push(
        `Role (${roles.map((role) => displayOptionName(role)).join(', ')})`,
      );
    }

    if (userStatus !== statusOptions.ALL) {
      preparedFilters.push(`User status (${capitalize(userStatus)})`);
    }

    return preparedFilters;
  }, [userStatus, roles]);

  useEffect(() => {
    const { username, message } = newStaffMember || {};
    if (username) {
      dispatch(setToast({ body: message }));
    }
  }, [newStaffMember]);

  useEffect(() => {
    setRoles(roleChoises);
  }, [roleChoises]);

  useEffect(() => {
    if (dashboardRoles.length === 0) {
      dispatch(fetchRoles());
    }
  }, []);

  return (
    <div>
      <div
        className={classNames(
          'page-title-background',
          'd-flex',
          'align-items-center',
          'justify-content-between',
          'px-2.5',
        )}
      >
        <div className="page-title">Course Staff Management</div>
        <AddStaffMemberModal modalTitle="Add Instructor" hasEmailField />
      </div>
      <BaseLayout errors={[error]}>
        <DataTable
          manualPagination
          manualSortBy
          isLoading={status === requestStatus.LOADING}
          isPaginated
          isSortable
          itemCount={itemCount}
          pageCount={pageCount}
          initialState={{
            pageSize: courseStaffData?.length,
            pageIndex: currentPage - 1,
          }}
          data={courseStaffData}
          columns={COLUMNS}
        >
          <DataTableFetcher filters={filters} fetchData={fetchData} />
          <div
            className={classNames('course-staff__control-bar', {
              active: appliedFilterNames.length > 0,
            })}
          >
            <div className="course-staff-filters">
              <SingleSelectMenu
                variant="outline-extra"
                title="User status"
                options={STATUS_FILTER_CHOICES}
                selectedValue={userStatus}
                onSelect={setUserStatus}
              />
              <MultiselectMenu
                title="Role"
                values={roles}
                options={getOptionsFromStrings(roleChoises)}
                onChange={setRoles}
                shouldChangeOnClose
              />

              <form
                className="course-staff__search"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSearch(searchInput);
                }}
              >
                <SearchInput
                  placeholder="Search user"
                  onChange={(e) => setSearchInput(e.target.value)}
                  onReset={() => {
                    setSearchInput('');
                    setSearch('');
                  }}
                />
                <Button
                  className="ml-2"
                  type="submit"
                  disabled={!searchInput.length}
                >
                  Search
                </Button>
              </form>
            </div>
            <div className="course-staff-status">
              <p>
                {appliedFilterNames.length > 0
                  ? `Filtered by: ${appliedFilterNames.join(', ')}`
                  : ''}
              </p>
              {appliedFilterNames.length > 0 && (
                <Button
                  onClick={() => {
                    setRoles(roleChoises);
                    setUserStatus(statusOptions.ALL);
                  }}
                  variant="link"
                  className="course-staff-filters__clear"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
          <DataTable.Table />
          <DataTable.EmptyTable content="No results found" />
          <DataTable.TableFooter />
        </DataTable>
      </BaseLayout>
    </div>
  );
};
