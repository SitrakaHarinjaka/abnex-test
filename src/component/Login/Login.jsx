import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { setLogin, setConnectedUser } from '../../redux/action/userAction';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import style from './Login.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = memo(() => {
  let history = useHistory();

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const loginUser = async (name) => {
    dispatch(setLogin(name));
    dispatch(setConnectedUser(name));
    localStorage.setItem('login', name);

    if (name && name !== '' && name.password !== '') {
      toast.success(`Bienvenue ${name}`, {
        className: 'sucess-toast',
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      setTimeout(() => {
        history.push('/car');
        history.go(0);
      }, 2000);
    } else {
      toast.error(`User non-identifié, veuillez réessayer`, {
        className: 'error-toast',
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  const onSubmit = (data) => {
    loginUser(data.name);
  };
  return (
    <div className={style.back}>
      <ToastContainer />
      <div className={style.containerLogin}>
        <div className={style.contentFormulaire}>
          <div className={style.formulaire}>
            <h3>Se connecter</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Votre nom d'utilisateur"
                  {...register('name')}
                />
              </div>
              <div className={style.submitButton}>
                <button type="submit">Connexion</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

Login.propTypes = {
  children: PropTypes.element,
};

Login.defaultProps = {
  theme: 'pink',
};
Login.displayName = 'Login';

export default Login;
