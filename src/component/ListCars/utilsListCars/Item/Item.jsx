import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './Item.module.scss';

const Item = memo(({ data }) => {
  const { id, title, body } = data;
  let idImage = Math.floor(Math.random() * 2);

  const thumbImage = useMemo(() => {
    return require(`../../../../images/cars/${idImage}.png`);
  }, [idImage]);

  return (
    <Link to={`/car/${id}`}>
      <div className={styles.item}>
        <div className={styles.imageVideoContainer}>
          <div className={styles.imageVideo}>
            <img src={thumbImage.default} alt="" />
          </div>
        </div>
        <div className={styles.textContent}>
          <span className={styles.typeContentBlue}>{title}</span>
          <p className={styles.contentAudio}>{body}</p>
        </div>
      </div>
    </Link>
  );
});

Item.propTypes = {
  data: PropTypes.object.isRequired,
};

Item.defaultProps = {
  data: {},
};

Item.displayName = 'ItemCars';

export default Item;
