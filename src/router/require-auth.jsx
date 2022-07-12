import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequiresAuth = () => {
  let location = useLocation();
  const { token } = useSelector((store) => store.token);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export { RequiresAuth };
