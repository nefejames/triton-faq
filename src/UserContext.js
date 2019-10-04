import React from 'react';

const UserContext = React.createContext({isLoggedIn:false});
const UserContextProvider = UserContext.Provider;
const UserContextConsumer = UserContext.Consumer;

export {
    UserContext,
    UserContextProvider,
    UserContextConsumer
}