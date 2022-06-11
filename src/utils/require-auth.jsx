import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequiresAuth = ({ children }) => {
  let location = useLocation();
  const { token } = useSelector((store) => store.token);

  return token ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export { RequiresAuth };
