import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: white;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
 border-bottom:1px solid white;
 border-top:1px solid white;

  &:hover {
    background: blue;
    border-left: 6px solid white;
    cursor: pointer;
    color:white;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
 background: #0088ff;
  height: 50px;
  padding-left: 3rem;
  display: flex;
  margin-top:5px;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  border:4px solid white;
  border-radius:50px;
  &:hover {
    background: #632ce4;
    border:4px solid white;
    border-radius:50px;
    cursor: pointer;
    color:white;

  }
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;