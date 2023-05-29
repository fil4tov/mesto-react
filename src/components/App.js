import React from 'react';
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithImage from "./PopupWithImage";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ErrorBlock from "./ErrorBlock";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import {CurrentUserProvider} from "../contexts/";
import { usePopup } from "../hooks";
import api from "../utils/api";

const App = () => {
  const popupAdd = usePopup({initialIsOpen: false})
  const popupEdit = usePopup({initialIsOpen: false})
  const popupAvatar = usePopup({initialIsOpen: false})
  const popupDelete = usePopup({initialIsOpen: false})
  const popupImage = usePopup({initialIsOpen: false})

  const [selectedCard, setSelectedCard] = React.useState({});
  const [deletingCard, setDeletingCard] = React.useState('');

  const [cards, setCards] = React.useState([]);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    api.getInitialCards()
      .then(setCards)
      .catch(setError)
  }, []);

  const handleSubmitPopupEdit = async ({name, about}) => {
    return await api.updateUserInfo({name, about})
  }
  const handleSubmitPopupAdd = async ({name, link}) => {
    return await api.addCard({name, link})
  }
  const handleSubmitPopupAvatar = async ({avatar}) => {
    return await api.updateAvatar({avatar})
  }
  const handleSubmitPopupDelete = async (id) => {
    return await api.deleteCard(id)
  }

  const handleConfirmDeleteCard = React.useCallback((id) => {
    popupDelete.open()
    setDeletingCard(id)
  }, [])

  const handleClickCard = React.useCallback(({name, link}) => {
    popupImage.open()
    setSelectedCard({name, link})
  }, [])

  const handleLikeCard = React.useCallback((isLiked, id) => {
    api.toggleLike(id, isLiked ? 'DELETE' : 'PUT')
      .then(newCard => {
        setCards(cards.map(item => item._id === id ? newCard : item))
      })
      .catch(console.log)
  }, [cards])

  const cardProps = {
    onCardDelete: handleConfirmDeleteCard,
    onCardLike: handleLikeCard,
    onImageClick: handleClickCard
  }

  if (error) {
    return (
      <>
        <Header/>
        <ErrorBlock
          text='Не удалось загрузить приложение'
          error={error}
        />
      </>
    )
  }

  return (
    <CurrentUserProvider>
      <Header/>
      <Main
        onAddPlace={popupAdd.open}
        onEditAvatar={popupAvatar.open}
        onEditProfile={popupEdit.open}
        cards={cards}
        cardProps={cardProps}
      />
      <Footer/>

      <EditProfilePopup
        isOpen={popupEdit.isOpen}
        onClose={popupEdit.close}
        onSubmit={handleSubmitPopupEdit}
      />

      <EditAvatarPopup
        isOpen={popupAvatar.isOpen}
        onClose={popupAvatar.close}
        onSubmit={handleSubmitPopupAvatar}
      />

      <AddPlacePopup
        isOpen={popupAdd.isOpen}
        onClose={popupAdd.close}
        onSubmit={handleSubmitPopupAdd}
        cards={cards}
        setCards={setCards}
      />

      <ConfirmDeletePopup
        isOpen={popupDelete.isOpen}
        onClose={popupDelete.close}
        onSubmit={handleSubmitPopupDelete}
        cardId={deletingCard}
        cards={cards}
        setCards={setCards}
      />

      <PopupWithImage
        isOpen={popupImage.isOpen}
        onClose={popupImage.close}
        {...selectedCard}
      />
    </CurrentUserProvider>
  );
};

export default App;