import './SideBar.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Sidebar = (props) => {
  const [hide, setHide] = useState(props.hideSidebar);

  const onToggleCollapse = () => {
    setHide(!hide);
    props.onToggleCollapse(!hide);
  }

  return (
    <div className="sidebar-container">
      <div className="toggle-collapse" onClick={onToggleCollapse}>
          <FontAwesomeIcon icon={faBars} size="2x"/>
      </div>
      <div className={hide ? "hide" : ""}>
        <div className="sidebar-content">
          <React.Fragment>{props.children}</React.Fragment>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;