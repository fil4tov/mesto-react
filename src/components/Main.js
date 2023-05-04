import React from 'react';
import Card from "./Card";
import ErrorBlock from "./ErrorBlock";
import api from "../utils/api";

const Main = ({onEditProfile, onAddPlace, onEditAvatar, handleClickCard}) => {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([{name, about, avatar}, cards]) => {
        setUserName(name)
        setUserDescription(about)
        setUserAvatar(avatar)
        setCards(cards)
      })
      .catch(setError)
  }, []);

  if (error) {
    return (
      <ErrorBlock
        text='Не удалось загрузить приложение'
        error={error}
      />
    )
  }

  return (
    <main className="main">
      <section className="profile">
        <div
          onClick={onEditAvatar}
          className="profile__avatar-container"
        >
          <img className="profile__avatar" src={userAvatar} alt="Аватарка"/>
          <div className="profile__avatar-edit"></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            onClick={onEditProfile}
            className="button profile__edit-button"
            type="button"
            aria-label="Редактировать профиль"/>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="button profile__add-button"
          type="button"
          aria-label="Добавить пост"/>
      </section>
      <section className="gallery" aria-label="Посты пользователя">
        {cards.map(({_id, ...card}) =>
          <Card key={_id} {...card} onImageClick={handleClickCard}/>)}
      </section>
    </main>
  );
};

export default Main;