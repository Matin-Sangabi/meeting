import { useRoutes } from "react-router-dom";
import { APP_PATHS } from "./path";
import Loadable from "./Loadable";
import { lazy } from "react";
import MainLayout from "../layout/MainLayout";

const HomePage = Loadable(lazy(() => import("../pages/home/HomePage")));
const LoginPage = Loadable(lazy(() => import("../pages/auth/login/LoginPage")));

const authRoutes = {
  path: APP_PATHS.auth,
  children: [{ path: APP_PATHS.login, element: <LoginPage /> }],
};

const homeRoutes = {
  path: APP_PATHS.home,
  element: <MainLayout />,
  children: [{ path: APP_PATHS.home, element: <HomePage /> }],
};

export default function Routes() {
  return useRoutes([authRoutes, homeRoutes]);
}
