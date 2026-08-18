import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store";
import { ROUTES } from "../../shared/config/routes";

function ProtectedRoute() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
