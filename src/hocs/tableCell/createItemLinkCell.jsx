import React from 'react';
import { NavLink } from 'react-router-dom';

export function createItemLinkCell(options) {
  const {
    createLink, textFieldName, isNavLink,
  } = options;

  const renderNavLink = (link, text) => (
    <NavLink to={link} className="table-nav-link">
      {text}
    </NavLink>
  );

  const renderRegularLink = (link, text) => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={link}
      className="table-nav-link"
    >
      {text}
    </a>
  );

  const renderLink = isNavLink ? renderNavLink : renderRegularLink;

  const itemLinkCell = ({ row }) => {
    const text = row.original[textFieldName];

    return renderLink(createLink(row.original), text);
  };

  return itemLinkCell;
}
