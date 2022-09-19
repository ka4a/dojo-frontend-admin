import React, { memo } from 'react';
import { ModalDialog } from '@edx/paragon';
import { NavLink } from 'react-router-dom';
import Moment from 'react-moment';
import { PriorityBadge, StatusBadge, TypeBadge } from '@reustleco/dojo-frontend-common';
import { getConfig } from '@edx/frontend-platform';
import { useDispatch, useSelector } from 'react-redux';
import ColumnTable from '../../ColumnTable/ColumnTable';
import { getSubmissionModal } from '../../../store/submissions/submissions.selector';
import { closeSubmissionModal } from '../../../store/submissions/submissions.slice';

export const SubmissionsModal = memo(() => {
  const dispatch = useDispatch();
  const { open, body: submission } = useSelector(getSubmissionModal);

  const dojoInstructorUrl = (
    getConfig().DOJO_INSTRUCTOR_URL || process.env.DOJO_INSTRUCTOR_URL
  );

  const columnTableData = [
    {
      title: 'Details',
      content: [
        { subtitle: 'ID', value: submission.submission_id },
        {
          subtitle: 'Student',
          value: submission.student?.length > 0 ? submission.student : '---',
        },
        {
          subtitle: 'Created',
          value: <Moment format="MMMM D, Y">{submission.created_at}</Moment>,
        },
      ],
    },
    {
      title: 'Ticket',
      content: [
        {
          subtitle: 'Ticket id',
          value: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${dojoInstructorUrl}/ticket/${submission.ticket_id}`}
              className="table-nav-link text-gray-500"
            >
              {submission.ticket_id}
            </a>
          ),
        },
        {
          subtitle: 'Submission number',
          value: submission.submission_number,
        },
        {
          subtitle: 'Time since submission',
          value: submission.timeSinceSubmission,
        },
      ],
    },
    {
      title: 'Grading',
      content: [
        {
          subtitle: 'Instructor',
          value: submission.instructor_full_name ? (
            <NavLink
              to={`/coursestaff/${submission.instructor_id}`}
              className="table-nav-link text-gray-500"
            >
              {submission.instructor_full_name}
            </NavLink>
          ) : (
            '---'
          ),
        },
        {
          subtitle: 'Grade',
          value: submission.grade ? submission.grade.points_earned : '---',
        },
        {
          subtitle: 'Grading duration',
          value: submission.gradingTime || '---',
        },
      ],
    },
  ];

  if (submission.instructor_full_name) {
    columnTableData.push();
  }

  return (
    <div>
      <ModalDialog
        title=""
        isOpen={open}
        size="lg"
        onClose={() => {
          dispatch(closeSubmissionModal());
        }}
        isFullscreenOnMobile
        isFullscreenScroll
      >
        <ModalDialog.Body>
          <div className="mb-3 mt-3 d-flex">
            <div className="mr-2">
              <PriorityBadge submissionPriority={submission.priority} />
            </div>
            <div className="mr-2">
              <StatusBadge status={submission.status} />
            </div>
            <div>
              <TypeBadge type={submission.submission_item_type} />
            </div>
          </div>

          <h3>
            <a
              href={submission.unit_url}
              target="_blank"
              rel="noopener noreferrer"
              className="table-nav-link"
            >
              {submission.unit}
            </a>
          </h3>

          <div className="mb-4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={submission.course_url}
              className="table-nav-link text-gray-500 small"
            >
              {submission.course}
            </a>
          </div>

          <ColumnTable data={columnTableData} />

          {submission.score_note && (
            <div>
              <span>Note</span>
              <p className="x-small font-weight-bold text-gray-500">
                {submission.score_note}
              </p>
            </div>
          )}
        </ModalDialog.Body>
      </ModalDialog>
    </div>
  );
});
