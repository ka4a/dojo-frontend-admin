import { DataTable, DropdownFilter } from '@edx/paragon';
import React, { memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubmissions } from '../../store/submissions/submissions.selector';
import { fetchSubmissions } from '../../store/submissions/submissions.thunk';
import { DEFAULT_PAGE, PAGE_SIZE } from '../../utils/constants';
import { getFilterChoicesFromColumn, sortByDate } from '../../utils';
import { BaseLayout, SubmissionsModal } from '../../components';
import { createItemLinkCell } from '../../hocs';
import { createPriorityCell, createStatusCell, createSubmissionIdCell } from './components';
import './Submissions.scss';

const INITIAL_STATE = {
  pageSize: PAGE_SIZE,
  pageIndex: DEFAULT_PAGE - 1,
};

export const Submissions = memo(() => {
  const dispatch = useDispatch();
  const { status, error, data: submissions } = useSelector(getSubmissions);

  useEffect(() => {
    dispatch(fetchSubmissions());
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'submission_id',
        disableFilters: true,
        Cell: createSubmissionIdCell,
      },
      {
        Header: 'Course',
        accessor: 'course',
        filter: 'exactText',
        filterChoices: getFilterChoicesFromColumn(submissions, 'course'),
        Cell: createItemLinkCell({
          createLink: (rowData) => rowData.course_url,
          textFieldName: 'course',
        }),
      },
      {
        Header: 'Project',
        accessor: 'unit',
        disableFilters: true,
        Cell: createItemLinkCell({
          createLink: (rowData) => rowData.unit_url,
          textFieldName: 'unit',
        }),
      },
      {
        Header: 'Student',
        accessor: 'student',
        filter: 'exactText',
        filterChoices: getFilterChoicesFromColumn(submissions, 'student'),
      },
      {
        Header: 'Priority',
        accessor: 'priority',
        disableFilters: true,
        Cell: createPriorityCell,
      },
      {
        Header: 'Status',
        accessor: 'status',
        filter: 'exactText',
        filterChoices: getFilterChoicesFromColumn(submissions, 'status'),
        Cell: createStatusCell,
      },
      {
        Header: 'Instructor',
        accessor: 'instructor_full_name',
        filter: 'exactText',
        filterChoices: getFilterChoicesFromColumn(
          submissions,
          'instructor_full_name',
        ),
        Cell: createItemLinkCell({
          createLink: (rowData) => `/coursestaff/${rowData.instructor_id}`,
          textFieldName: 'instructor_full_name',
        }),
      },
      {
        Header: 'Submission No.',
        accessor: 'submission_number',
        disableFilters: true,
      },

      {
        Header: 'Submission Time',
        accessor: 'submitedAt',
        disableFilters: true,
        Cell: ({ row }) => row.original.timeSinceSubmission,
      },
      {
        Header: 'Grading duration',
        accessor: 'gradingTimeDifference',
        disableFilters: true,
        Cell: ({ row }) => row.original.gradingTime,
      },
    ],
    [submissions],
  );

  return (
    <BaseLayout statuses={[status]} errors={[error]}>
      <div className="page-title-background d-flex align-items-center justify-content-between px-2.5">
        <div className="align-items-center">
          <div className="page-title">Submission Management</div>
        </div>
      </div>
      <DataTable
        isPaginated
        isFilterable
        isSortable
        RowStatusComponent={() => null}
        FilterStatusComponent={() => null}
        numBreakoutFilters={4}
        defaultColumnValues={{ Filter: DropdownFilter }}
        itemCount={submissions.length}
        initialState={INITIAL_STATE}
        data={sortByDate(submissions, 'submitedAt')}
        columns={columns}
      >
        <div className="control-bar">
          <p className="control-bar__title">Filter by: </p>
          <DataTable.TableControlBar />
        </div>
        <DataTable.Table />
        <DataTable.EmptyTable content="No results found" />
        <DataTable.TableFooter />
      </DataTable>
      <SubmissionsModal />
    </BaseLayout>
  );
});
