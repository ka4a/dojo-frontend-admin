import React, { useEffect, useMemo, memo } from 'react';
import {
  Avatar,
  Breadcrumb,
  Button,
  DataTable,
  TextFilter,
} from '@edx/paragon';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';
import Moment from 'react-moment';
import TimeAgo from 'timeago-react';
import { getConfig } from '@edx/frontend-platform';
import {
  fetchStaffMemberCourses,
  fetchStaffMember,
} from '../../store/courseStaff/courseStaff.thunk';
import {
  openChangeRoleModal,
  openRemoveRoleModal,
} from '../../store/courseStaff/courseStaff.slice';

import { capitalize } from '../../utils';
import { DEFAULT_PAGE, PAGE_SIZE, requestStatus } from '../../utils/constants';
import {
  getStaffMemberCourses,
  getStaffMemberDetail,
} from '../../store/courseStaff/courseStaff.selector';
import {
  ChangeRoleModal,
  RemoveRoleModal,
  BulkActionButton,
  AddStaffMemberModal,
  BaseLayout,
} from '../../components';
import { useBulkAction } from './hooks';
import { createActionCell } from './hocs';

import './staffMember.scss';
import { CourseNameCell } from './components';

const ADDITIONAL_COLUMNS = [
  {
    id: 'change_role',
    Cell: createActionCell({
      text: 'Change Role',
      actionCreator: openChangeRoleModal,
    }),
  },
  {
    id: 'remove',
    Cell: createActionCell({
      text: 'Remove',
      actionCreator: openRemoveRoleModal,
    }),
  },
];

const COLUMNS = [
  {
    Header: 'Course name',
    accessor: 'course_display_name',
    Cell: CourseNameCell,
  },
  {
    Header: 'Role',
    accessor: 'roleName',
    disableFilters: true,
  },
];

const INITIAL_STATE = {
  pageSize: PAGE_SIZE,
  pageIndex: DEFAULT_PAGE - 1,
};

const sortByName = (a, b) => a.course_display_name
  .toLowerCase()
  .localeCompare(b.course_display_name.toLowerCase());

export const StaffMember = memo(() => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const {
    status: staffMemberDetailStatus,
    error: staffMemberDetailError,
    data: staffMemberDetail,
  } = useSelector(getStaffMemberDetail);
  const {
    status: staffMemberCoursesStatus,
    data: staffMemberCourses,
  } = useSelector(getStaffMemberCourses);

  const baseUrl = getConfig().LMS_BASE_URL;

  const editUserUrl = `${baseUrl}/admin/auth/user/${userId}/change/`;

  useEffect(() => {
    dispatch(fetchStaffMember(userId));
    dispatch(fetchStaffMemberCourses(userId));
  }, []);

  const sortedCourses = useMemo(
    () => [...staffMemberCourses].sort(sortByName),
    [staffMemberCourses],
  );

  const handleChangeRoleInBulk = useBulkAction(dispatch, openChangeRoleModal);
  const handleRemoveRoleInBulk = useBulkAction(dispatch, openRemoveRoleModal);

  const bulkActions = useMemo(
    () => [
      // selectedFlatRows is provided implicitly via element cloning
      <BulkActionButton text="Change Role" onClick={handleChangeRoleInBulk} />,
      <BulkActionButton text="Remove" onClick={handleRemoveRoleInBulk} />,
    ],
    [handleChangeRoleInBulk, handleRemoveRoleInBulk],
  );

  return (
    <div className="staff-member">
      <div className="page-title-background d-flex align-items-center justify-content-between px-2.5">
        <div className="align-items-center">
          <div className="page-title">Staff Member</div>
          <div>
            <Breadcrumb
              links={[
                { label: 'Course Staff Management', url: '/coursestaff' },
              ]}
              activeLabel={staffMemberDetail?.full_name || ''}
            />
          </div>
        </div>
        <Button href={editUserUrl}>Edit User</Button>
      </div>
      <BaseLayout
        statuses={[staffMemberDetailStatus]}
        errors={[staffMemberDetailError]}
      >
        {staffMemberDetail && (
          <>
            <div className={classNames(['info-block', 'row'])}>
              <div className="col col-md-3 d-flex align-items-center justify-content-center vertical-divider">
                <div className="d-flex flex-column">
                  <div className="p-2">
                    <Avatar size="xxl" />
                  </div>
                  <div className="p-2 d-flex justify-content-center font-weight-bold">
                    <h3>{staffMemberDetail?.full_name}</h3>
                  </div>
                </div>
              </div>
              <div className="col col-md-9 d-flex flex-column">
                <div className="col d-flex justify-content-center justify-content-between px-5 pt-4">
                  <div className="info-element pt-4">
                    <div className="info-element-title">Email:</div>
                    <div className="info-element-text">
                      {staffMemberDetail.email}
                    </div>
                    <hr />
                  </div>
                  <div className="info-element pt-4">
                    <div className="info-element-title">Date Join:</div>
                    <Moment format="MMMM D, Y" className="info-element-text">
                      {staffMemberDetail.date_joined}
                    </Moment>
                    <hr />
                  </div>
                  <div className="info-element pt-4">
                    <div className="info-element-title">Last Login:</div>
                    {staffMemberDetail.last_login ? (
                      <TimeAgo
                        datetime={staffMemberDetail.last_login}
                        className="info-element-text"
                      />
                    ) : (
                      <span className="info-element-text">Never</span>
                    )}
                    <hr />
                  </div>
                </div>
                <div className="col d-flex justify-content-center justify-content-between px-5 p-2">
                  <div className="info-element pt-4">
                    <div className="info-element-title">Active:</div>
                    <div className="info-element-text">
                      {capitalize(staffMemberDetail.is_active.toString())}
                    </div>
                    <hr />
                  </div>
                  <div className="info-element pt-4">
                    <div className="info-element-title">Staff:</div>
                    <div className="info-element-text">
                      {capitalize(staffMemberDetail.is_staff.toString())}
                    </div>
                    <hr />
                  </div>
                  <div className="info-element pt-4" />
                </div>
              </div>
            </div>
            <div className="pt-5">
              <div className="d-flex align-items-center justify-content-between px-2.5 pt-2 pb-2">
                <div className="table-title">Assigned Courses</div>
                <AddStaffMemberModal
                  modalTitle="Assign New Courses"
                  hasEmailField={false}
                  userEmail={staffMemberDetail.email}
                  userId={userId}
                />
              </div>
              <DataTable
                isFilterable
                isPaginated
                isSelectable
                isLoading={staffMemberCoursesStatus === requestStatus.LOADING}
                defaultColumnValues={{ Filter: TextFilter }}
                itemCount={staffMemberCourses.length}
                initialState={INITIAL_STATE}
                data={sortedCourses}
                additionalColumns={ADDITIONAL_COLUMNS}
                columns={COLUMNS}
                bulkActions={bulkActions}
              >
                <DataTable.TableControlBar />
                <DataTable.Table />
                <DataTable.EmptyTable content="No results found" />
                <DataTable.TableFooter />
              </DataTable>
              <ChangeRoleModal
                userId={userId}
                email={staffMemberDetail.email}
              />
              <RemoveRoleModal userId={userId} />
            </div>
          </>
        )}
      </BaseLayout>
    </div>
  );
});
