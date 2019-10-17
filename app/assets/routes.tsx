import importedComponent from 'react-imported-component';

import LoadingComponent from '../layout/Loading';
import ErrorComponent from '../layout/Error';

const Home = importedComponent(() => import('../pages/Home'), {
  LoadingComponent,
  ErrorComponent
});

const About = importedComponent(() => import('../pages/About'), {
  LoadingComponent,
  ErrorComponent
});

const Routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    loadData: () => console.log('LOAD DATA'),
    displayLabel: 'Home'
  },
  {
    path: '/about',
    exact: true,
    component: About,
    displayLabel: 'About'
  }
];

export default Routes;
