import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "../../pages/AuthPage/AuthPage";
import FeedPage from "../../pages/FeedPage/FeedPage";
import PinPage from "../../pages/PinPage/PinPage";
import FavoritesPage from "../../pages/FavoritesPage/FavoritesPage";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./Layout";
import { ROUTES } from "../../shared/config/routes";

const router = createBrowserRouter([
  {
    path: ROUTES.login,
    element: <AuthPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: ROUTES.feed, element: <FeedPage /> },
          { path: ROUTES.pinTemplate, element: <PinPage /> },
          { path: ROUTES.favorites, element: <FavoritesPage /> },
        ],
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
