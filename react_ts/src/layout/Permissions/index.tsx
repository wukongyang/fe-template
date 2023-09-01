import { Cookie } from "fe-funs";
import { Navigate } from "react-router-dom";

const TOKEN_NAME = import.meta.env.VITE_APP_TOKEN_NAME;
/**
 * @description权限处理组件
 * */
const Permissions = ({ children }: { children: React.ReactNode }) => {
  const token = Cookie.get(TOKEN_NAME) || "";
  return token ? children : <Navigate to="/login" />;
};
export default Permissions;
