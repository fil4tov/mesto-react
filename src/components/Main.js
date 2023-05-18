import React from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts";

const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  cards,
  cardProps
}) => {
  const {currentUser: {name, avatar, about}} = React.useContext(CurrentUserContext)

  return (
    <main className="main">
      <section className="profile">
        <div
          onClick={onEditAvatar}
          className="profile__avatar-container"
        >
          <img className="profile__avatar" src={avatar} alt="Аватарка"/>
          <div className="profile__avatar-edit" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{name}</h1>
          <button
            onClick={onEditProfile}
            className="button profile__edit-button"
            type="button"
            aria-label="Редактировать профиль"/>
          <p className="profile__description">{about}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="button profile__add-button"
          type="button"
          aria-label="Добавить пост"/>
      </section>
      <section className="gallery" aria-label="Посты пользователя">
        {cards.map(card => (
          <Card
            key={card._id}
            {...card}
            {...cardProps}
          />
        ))}
      </section>
    </main>
  );
};

export default Main;