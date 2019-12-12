import React from "react";
import { Link } from "react-router-dom";

const PageHeader = props => (
  <div className="pageHead-mainRow-container">
    <div className="pageHead-mainRow wrapper">
      {props.isLink ?
        <a href={props.mainUrl} style={{ textDecoration: 'none' }}>
          <h1 className="pageHead-title" style={{ height: 30, width: 220 }}>{props.title}</h1>
        </a>
        : <h1 className="pageHead-title">{props.title}</h1>
      }
      <div className="pageHead-mainRow-actions">
        {props.link && (
          <Link to={props.link} className="pageHead-mainRow-actions">
            <button className="btn btn-primary">{props.buttonName}</button>
          </Link>
        )}
        {props.openModal && (
          <button
            className="btn btn-primary"
            onClick={e => props.openModal(props.modalName)}
          >
            {props.buttonName}
          </button>
        )}
      </div>
    </div>
  </div>
);

export default PageHeader;
