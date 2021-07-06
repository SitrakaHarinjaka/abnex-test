import React, { memo, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectedCars } from '../../redux/action/carsActions';
import CommentaireForm from './utilsSingleCars/CommentaireForm';
import CommentaireList from './utilsSingleCars/CommentaireList';
import { Link } from 'react-router-dom';

import styles from './SingleCars.module.scss';

const SingleCars = memo(() => {
  const car = useSelector((state) => state.car);
  const loggedIn = localStorage.getItem('login');
  const { title, body } = car;
  const { idCars } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCarDetail = async () => {
      const response = await axios
        .get(`${process.env.REACT_APP_SERVER_HOST}/posts/${idCars}`)
        .catch((err) => {
          console.log('Err', err);
        });

      dispatch(selectedCars(response.data));
    };
    if (idCars && idCars !== '') fetchSingleCarDetail();
  }, [idCars, dispatch]);

  let idImage = Math.floor(Math.random() * 2);

  const thumbImage = useMemo(() => {
    return require(`../../images/cars/${idImage}.png`);
  }, [idImage]);

  const Commentaire = memo(() => {
    if (loggedIn) {
      return (
        <div>
          <CommentaireList id={idCars} />
          <CommentaireForm id={idCars} />
        </div>
      );
    }
    return (
      <div className={styles.containerNotConnected}>
        <div>
          <span>Veuillez vous connecter pour ajouter un commentaire</span>
        </div>
        <div className={styles.button}>
          <Link to="/login">Se connecter</Link>
        </div>
      </div>
    );
  }, [loggedIn]);

  return (
    <section className={styles.singleCar}>
      <div className={styles.singleCar}>
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
      </div>
      <Commentaire />
    </section>
  );
});

SingleCars.propTypes = {
  children: PropTypes.element,
};

SingleCars.defaultProps = {
  theme: 'pink',
};
SingleCars.displayName = 'SingleCars';

export default SingleCars;
