import React from "react";

const HREF_LINK = '#';

const DropdownDots = props => (
  <div
    className="dropdown kebab customToggle"
    role="group"
    dropdown="toggleDiv"
  >
    <button className="btn dropdown-toggle kebab-btn">
      <i className="ion-android-more-vertical" />
    </button>
    <ul className="dropdown-menu dropdown-menu-right">
      {props.actions.map(action => (
        <li key={action.name}>
          <a
            href={HREF_LINK}
            className="pageHead-tableActionItem"
            onClick={e =>
              props.handlePermissions(e) && props.openModal(action.open)
            }
          >
            <i className={action.icon} />
            <span data-permisos={`${action.permiso}`}>{action.name}</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default DropdownDots;
