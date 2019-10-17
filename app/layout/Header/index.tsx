import React from 'react';
import { NavLink } from 'react-router-dom';

import { default as HeaderStyled } from './styled/Header';

interface Route {
  path: string;
  exact?: boolean;
  component: React.ReactNode;
  loadData?: Function;
  displayLabel: string;
}

interface Props {
  children?: React.ReactNode;
  Routes: Route[];
};

const Header: React.FC<Props> = ({ children, Routes }) => (
  <HeaderStyled>
    {Routes.map(({ path, exact, displayLabel }) => (
      <NavLink key={displayLabel} to={path} exact={exact}>
        {displayLabel}
      </NavLink>
    ))}
    {children}
  </HeaderStyled>
);

export default Header;
