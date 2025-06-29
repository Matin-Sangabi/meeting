import { Fragment } from "react";
import Routes from "./routes/routes";
import { Toaster } from "react-hot-toast";
import AppProvider from "./provider/AppProvider";
import WalletProvider from "./provider/WalletProvider";
import AuthProvider from "./context/AuthContext";

export default function App() {
  return (
    <Fragment>
      <WalletProvider>
        <AppProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </AppProvider>
      </WalletProvider>
      <Toaster />
    </Fragment>
  );
}
