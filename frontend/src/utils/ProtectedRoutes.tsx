import { Navigate, Outlet } from "react-router-dom";
import { store } from "../state/store";

const ProtectedRoutes = () => {
  const token = store.getState().accessToken.token;
  return token ? <Outlet /> : <Navigate to={"/auth"} />;
};

export default ProtectedRoutes;
