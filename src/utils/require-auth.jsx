import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

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
