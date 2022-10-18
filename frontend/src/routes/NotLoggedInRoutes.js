import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function NotLoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state }));

  return user ? <Navigate to="/" /> : <Outlet />;
  //outlet allow you to access elements inside another routes
}
