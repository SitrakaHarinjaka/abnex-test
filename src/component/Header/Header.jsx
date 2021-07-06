import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setConnectedUser } from '../../redux/action/userAction';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PropTypes from 'prop-types';
import profil from '../../images/profil.jpg';
import style from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import logo from '../../images/logo.jpg';
import { useState } from 'react';

const Header = memo(() => {
  const [login, setLogin] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserSession = async () => {
      setLogin(localStorage.getItem('login'));
      const response = login ? login : '';

      if (response) {
        dispatch(setConnectedUser(response));
      }
    };
    checkUserSession();
  }, [dispatch, login, setLogin]);

  const MenuNavigation = memo(() => {
    let history = useHistory();

    const removeSession = useCallback((key) => {
      if (localStorage.getItem(key) === null) return false;
      localStorage.removeItem(key);
      return true;
    }, []);

    const deconnecter = () => {
      const isSessionRemoved = removeSession('login');
      if (isSessionRemoved) {
        toast.error(`Vous êtes déconnecté`, {
          className: 'error-toast',
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
      setTimeout(() => {
        history.go(0);
      }, 2000);
    };
    if (login && login !== null) {
      return (
        <>
          <nav>
            <ul>
              <ToastContainer />
              <li>
                <Link to="/car">Liste</Link>
              </li>
              <li>
                <button onClick={deconnecter}>Déconnexion</button>
              </li>
            </ul>
          </nav>
          <div className={style.image}>
            <img src={profil} alt="profil" />
          </div>
        </>
      );
    }
    return (
      <nav>
        <ul>
          <li>
            <Link to="/login">Connexion</Link>
          </li>
          <li>
            <Link to="/car">Liste des voitures</Link>
          </li>
        </ul>
      </nav>
    );
  });

  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.logo}>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className={style.navImage}>
          <div className={style.navigation}>
            <MenuNavigation />
          </div>
        </div>
      </div>
    </header>
  );
});

Header.propTypes = {
  children: PropTypes.element,
};

Header.defaultProps = {
  theme: 'pink',
};
Header.displayName = 'Header';

export default Header;
