import React, { memo } from 'react';
import { Hyperlink } from '@edx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { compose } from 'redux';
import {
  FormattedMessage,
  injectIntl,
} from '@edx/frontend-platform/i18n';
import Header from '@reustleco/dojo-frontend-component-admin-header';

const wrapper = compose(
  memo,
  injectIntl,
);

export const NotFound = wrapper(({ intl }) => {
  const homepageMessage = {
    id: 'error.notfound.homepageMessage',
    defaultMessage: 'Homepage',
    description: 'Link to user’s Homepage',
  };

  const dashboardLink = (
    <Hyperlink
      variant="muted"
      isInline
      destination={`${getConfig().LMS_BASE_URL}/dashboard`}
    >
      {intl.formatMessage(homepageMessage)}
    </Hyperlink>
  );

  return (
    <div>
      <Header />
      <div className="container-fluid justify-content-center align-items-center text-center">
        <h1 className="text-muted">
          <FormattedMessage
            id="error.notfound.header"
            defaultMessage="Page Not Found"
            description="error message when a page does not exist"
          />
        </h1>
        <p className="text-muted">
          <FormattedMessage
            id="error.notfound.message"
            defaultMessage="The page that you were looking for was not found. Go back to the {dashboardLink} ."
            description="error message when a page does not exist"
            values={{ dashboardLink }}
          />
        </p>
      </div>
    </div>
  );
});
