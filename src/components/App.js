import React from 'react';
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";

const App = () => {
  const [isPopupEditOpened, setIsPopupEditOpened] = React.useState(false);
  const [isPopupAddOpened, setIsPopupAddOpened] = React.useState(false);
  const [isPopupAvatarOpened, setIsPopupAvatarOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const closeAllPopups = () => {
    setIsPopupAddOpened(false)
    setIsPopupEditOpened(false)
    setIsPopupAvatarOpened(false)
    setSelectedCard({})
  }

  const handleClickCard = ({name, link}) => {
    setSelectedCard({name, link})
  }

  return (
    <>
      <Header/>
      <Main
        onAddPlace={() => setIsPopupAddOpened(true)}
        onEditAvatar={() => setIsPopupAvatarOpened(true)}
        onEditProfile={() => setIsPopupEditOpened(true)}
        isPopupAddOpened={isPopupAddOpened}
        isPopupEditOpened={isPopupEditOpened}
        isPopupAvatarOpened={isPopupAvatarOpened}
        handleClosePopup={closeAllPopups}
        handleClickCard={handleClickCard}
        selectedCard={selectedCard}
      />
      <Footer/>
    </>
  );
};

export default App;
