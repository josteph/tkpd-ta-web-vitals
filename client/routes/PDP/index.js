import React from 'react';
import { object } from 'prop-types';

import PdpComponent from './components';

const PDP = ({ match }) => {
	return (<PdpComponent match={match}/>)
};

PDP.propTypes = {
  match: object.isRequired,
};

export default PDP;
