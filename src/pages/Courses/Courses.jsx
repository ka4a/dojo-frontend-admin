import React, { useEffect } from 'react';
import { Collapsible } from '@edx/paragon';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardCourses } from '../../store/adminDashboard/adminDashboard.selector';
import { fetchCourses } from '../../store/adminDashboard/adminDashboard.thunk';
import AssignAdminForm from '../../components/AssignAdminForm/AssignAdminForm';
import { BaseLayout } from '../../components';

export const Courses = () => {
  const { status, error, data: courses } = useSelector(getDashboardCourses);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  return (
    <div className="container-fluid">
      <h2>Manage courses</h2>

      <BaseLayout statuses={[status]} errors={[error]}>
        {courses.map((course) => (
          <Collapsible
            key={course.id}
            styling="card"
            title={(
              <p>
                <strong>{course.display_name}</strong>
              </p>
            )}
          >
            <Collapsible.Advanced>
              <Collapsible.Trigger>
                <p>+</p>
              </Collapsible.Trigger>
              <Collapsible.Body>
                <AssignAdminForm courseId={course.id} />
              </Collapsible.Body>
            </Collapsible.Advanced>
            {course.instructors.length > 0 ? (
              course.instructors.map((user) => (
                <p key={user.user_id}>
                  <b>{user.username}</b> -{' '}
                  {user.roles.map((role) => (
                    <span key={role}>{role} </span>
                  ))}
                </p>
              ))
            ) : (
              <p>There is no instructors</p>
            )}
          </Collapsible>
        ))}
      </BaseLayout>
    </div>
  );
};
