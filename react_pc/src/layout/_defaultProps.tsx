import { ProLayoutProps } from "@ant-design/pro-components";
import RouteConfig from "@/routes/config";

const LayoutRoutes = RouteConfig.filter((v) => !v.single).map((v) => {
  return {
    ...v,
    component: v.filePath,
  };
});

const Config: ProLayoutProps = {
  route: {
    path: "/",
    routes: LayoutRoutes,
  },
  location: {
    pathname: "/index",
  },
};

export default Config;
