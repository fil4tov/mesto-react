import React from 'react';
import {CurrentUserContext} from "../contexts";

const Card = React.memo(({
  _id,
  name,
  link,
  likes,
  owner,
  onImageClick,
  onCardLike,
  onCardDelete
}) => {
  const {currentUser} = React.useContext(CurrentUserContext)
  const isOwner = currentUser._id === owner._id
  const isLiked = likes.some(item => item._id === currentUser._id)
  const cardLikeButtonClassName = (
    `button card__like-button ${isLiked ? 'card__like-button_active' : ''}`
  )

  const handleDeleteCard = () => {
    onCardDelete(_id)
  }

  const handleOpenPopup = () => {
    onImageClick({name, link})
  }

  const handleLikeCard = () => {
    onCardLike(isLiked, _id)
  }

  return (
    <div className="card">
      <img
        onClick={handleOpenPopup}
        src={link}
        alt={name}
        className="card__photo"
      />
      <div className="card__description">
        <h2 className="card__location">{name}</h2>
        <div className="card__like">
          <button
            onClick={handleLikeCard}
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Поставить лайк"
          />
          <p className="card__likes">{likes.length}</p>
        </div>
      </div>
      {isOwner &&
        <button
          onClick={handleDeleteCard}
          className="button card__delete-button"
          type="button"
          aria-label="Удалить пост"
        />}
    </div>
  );
});

export default Card;