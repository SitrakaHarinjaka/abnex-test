import React, { memo } from 'react';
import PropTypes from 'prop-types';

import style from './Login.module.scss';

const NotFound = memo(() => {
  return <div className={style.back}>404 - not found</div>;
});

NotFound.propTypes = {
  children: PropTypes.element,
};

NotFound.defaultProps = {};
NotFound.displayName = 'NotFound';

export default NotFound;
