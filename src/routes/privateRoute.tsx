import { useIsAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const isAuth = useIsAuth();

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
