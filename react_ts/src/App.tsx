import { useEffect } from "react";
import { useRoutes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import routes from "@/routes/index";
import { ConfigProvider, theme } from "antd";
import { useModel } from "@/store";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { theme: systemTheme } = useModel("system");
  const { token } = theme.useToken();
  const Elements = useRoutes(routes);

  /** 初始化重定向 */
  const init = () => {
    if (pathname === "/") navigate("/index");
  };
  useEffect(init, [pathname]);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          systemTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div style={{color:token.colorText,height:'100%'}}>{Elements}</div>
    </ConfigProvider>
  );
}

export default App;
