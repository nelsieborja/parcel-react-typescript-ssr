import React from 'react';
import { Helmet } from 'react-helmet';

import Button from './styled/Button';

interface Props {}

const defaultProps = {};

const About: React.FC<Props> = () => (
  <>
    <Helmet>
      <title>About Page</title>
    </Helmet>
    <h1>
      About Page <Button>Click</Button>
    </h1>
  </>
);

About.defaultProps = defaultProps;

export default About;
