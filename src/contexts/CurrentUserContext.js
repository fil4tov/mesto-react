import React from "react";
import api from "../utils/api";

export const CurrentUserContext = React.createContext({})

export const CurrentUserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api.getUserInfo()
      .then(setCurrentUser)
      .catch(console.log)
  }, []);

  const store = React.useMemo(() => {
    return {
      currentUser,
      setCurrentUser
    }
  }, [currentUser])

  return (
    <CurrentUserContext.Provider value={store}>
      {children}
    </CurrentUserContext.Provider>
  );
};