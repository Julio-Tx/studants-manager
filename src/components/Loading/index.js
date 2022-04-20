import React from 'react';
import PropTypes from 'prop-types';
import LoadingIcons from 'react-loading-icons';

import { Container } from './styled';
import * as colors from '../../config/colors';

export default function Loading({ isLoading }) {
  if (isLoading) {
    return (
      <Container>
        <div />
        <span>
          <LoadingIcons.Oval stroke={colors.primaryColor} />
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
