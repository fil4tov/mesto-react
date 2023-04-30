import React from 'react';

const Card = ({name, link, likes, onImageClick}) => {
  return (
    <div className="card">
      <img
        onClick={() => onImageClick({name, link})}
        src={link}
        alt={name}
        className="card__photo"
      />
        <div className="card__description">
          <h2 className="card__location">{name}</h2>
          <div className="card__like">
            <button className="button card__like-button" type="button" aria-label="Поставить лайк"></button>
            <p className="card__likes">{likes.length}</p>
          </div>
        </div>
        <button className="button card__delete-button" type="button" aria-label="Удалить пост"></button>
    </div>
  );
};

export default Card;