import React from 'react';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import GlobalStyles from '../../assets/globalStyles';
import Routes from '../../assets/routes';

import Header from '../Header';

interface Props {
  children?: React.ReactNode;
}

const Main: React.FC<Props> = ({ children }) => (
  <>
    {GlobalStyles}
    <main>
      <Header Routes={Routes} />
      <Switch>{renderRoutes(Routes)}</Switch>
      {children}
    </main>
  </>
);

export default Main;
