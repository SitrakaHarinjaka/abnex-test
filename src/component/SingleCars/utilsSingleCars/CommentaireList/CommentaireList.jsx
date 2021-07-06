import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import style from './CommentaireList.module.scss';
import ItemCommentaire from './ItemsCommentaire';
import { useState } from 'react';

const CommentaireList = memo(({ id }) => {
  const [listComment, setListComment] = useState([]);
  const commentsList = useSelector((state) => state.comments.comments);

  useEffect(() => {
    const commentsFilter = commentsList.filter(
      (comment) => comment.cars === id
    );
    setListComment(commentsFilter);
  }, [id, commentsList]);

  return (
    <div>
      <section className={style.listCars}>
        <div className={style.itemContainer}>
          {listComment &&
            React.Children.toArray(
              listComment.map((dataComment, index) => {
                return <ItemCommentaire key={index} data={dataComment} />;
              })
            )}
        </div>
      </section>
    </div>
  );
});

CommentaireList.propTypes = {
  children: PropTypes.element,
};

CommentaireList.defaultProps = {
  theme: 'pink',
};
CommentaireList.displayName = 'CommentaireList';

export default CommentaireList;
