import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ColumnTable.scss';

const ColumnTable = ({ data }) => (
  <section>
    {data.map(({ title, content }) => (
      <div className="mb-4" key={title}>
        <h4>{title}</h4>
        <div className="column-table__row">
          {content.map(({ subtitle, value }, index) => (
            <div
              key={`${value}-${subtitle}`}
              className={classNames({
                'border-right border-light-100': content.length - 1 > index,
                'pl-5': index > 0,
              })}
            >
              <span className="small">{subtitle}</span>
              <br />
              <span className="text-gray-500 x-small font-weight-bold">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </section>
);

ColumnTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.arrayOf(
        PropTypes.shape({
          subtitle: PropTypes.string,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        }),
      ),
    }),
  ),
};

ColumnTable.defaultProps = {
  data: [],
};

export default memo(ColumnTable);
