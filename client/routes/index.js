import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { object } from 'prop-types';
import Layout from '../components/Layout';

import HomeComponent from './Home';
import PDPComponent from './PDP';

const Routes = ({ history, location, match }) => {
  const routeProps = { history, location, match };

  return (
    <Layout {...routeProps}>
      <Switch>
        <Route path="/:id" component={PDPComponent} {...routeProps} />
        <Route exact path="/" component={HomeComponent} {...routeProps} />
      </Switch>
    </Layout>
  );
};

Routes.propTypes = {
  history: object.isRequired,
  location: object.isRequired,
  match: object.isRequired,
};

export default () => <Route component={Routes} />;
