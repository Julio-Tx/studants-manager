import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { Container } from '../../styles/GlobalStyle';

export default function Photos(match) {
  const id = get(match, 'params.id', 0);
  if (id) {
    console.log(id);
  }
  return (
    <Container>
      <h1>Photos</h1>
    </Container>
  );
}
Photos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
