import React from "react";
import { AuthProvider } from "../../utils/contexts/AuthContext";
import { Provider } from "react-redux";
import { persistor, store } from "../../redux/store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import MainContextProvider from "../../utils/contexts/MainContext";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainContextProvider>
          <AuthProvider>{children}</AuthProvider>
          <ToastContainer newestOnTop />
        </MainContextProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
