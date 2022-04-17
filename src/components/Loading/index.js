import React from 'react';
import PropTypes from 'prop-types';
import LoadingIcons from 'react-loading-icons';

import { Container } from './styled';

export default function Loading({ isLoading }) {
  if (isLoading) {
    return (
      <Container>
        <div />
        <span>
          <LoadingIcons.SpinningCircles />
        </span>
      </Container>
    );
  }
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
