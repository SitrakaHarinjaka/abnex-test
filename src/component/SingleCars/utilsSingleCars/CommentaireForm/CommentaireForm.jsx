import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { setComment } from '../../../../redux/action/userAction';

import { useDispatch } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';

import style from './CommentaireForm.module.scss';

const CommentaireForm = memo(({ id }) => {
  const [user, setUser] = useState();

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const getUser = async () => {
    const response = localStorage.getItem('login');

    if (response) {
      setUser(response);
    }
  };
  const addComment = async (mail, comments) => {
    const comment = {
      user: user,
      comments,
      cars: id,
    };

    if (user) {
      dispatch(setComment(comment));
      toast.success(`Merci ${user}, pour votre commentaire`, {
        className: 'sucess-toast',
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } else {
      toast.error(
        `${user}!, il semble que vous ne pouvez pas envoyer de commentaire`,
        {
          className: 'error-toast',
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        }
      );
    }
  };
  useEffect(() => {
    getUser();
  });
  const onSubmit = (data) => {
    addComment(user, data.commentaire);
  };

  return (
    <div className={style.commentContainer}>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formGroup}>
          <h3>
            Bonjour {user} , vous voulez donnez votre avis à propos de cette
            voiture ?{' '}
          </h3>
          <textarea
            name="commentaire"
            id="commentaire"
            placeholder="laisser un commentaire sur la voiture"
            {...register('commentaire')}
          />
          <div className={style.submitButton}>
            <button type="submit">Laisser un commentaire</button>
          </div>
        </div>
      </form>
    </div>
  );
});

CommentaireForm.propTypes = {
  children: PropTypes.element,
};

CommentaireForm.defaultProps = {};
CommentaireForm.displayName = 'CommentaireForm';

export default CommentaireForm;
