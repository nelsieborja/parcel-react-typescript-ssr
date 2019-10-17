import React from 'react';
import { Helmet } from 'react-helmet';

import Button from './styled/Button';
// https://stackoverflow.com/questions/52600056/destructuring-props-in-the-function-parameters-using-typescript
interface Props {
  name?: string;
} // & typeof defaultProps;

const defaultProps = {
  name: 'Typescript'
};

const Home: React.FC<Props> = ({ name }) => (
  <div>
    <Helmet>
      <title>Home Page</title>
    </Helmet>
    <h1>
      Home {name} <Button>Click</Button>
    </h1>
  </div>
);

Home.defaultProps = defaultProps;

export default Home;
