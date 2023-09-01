import { Outlet, RouteObject } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Alert, Button, Result, Spin } from "antd";
import { Link } from "react-router-dom";

import Layout from "@/layout";
import Permissions from "@/layout/Permissions";
import config from "./config";
import { MenuDataItem } from "@ant-design/pro-components";
import ErrorBoundary from "@/layout/ErrorBoundary";

const defaultRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Permissions>{<Layout />}</Permissions>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/*",
        element: (
          <ErrorPage>
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={
                <Link to={"/"}>
                  <Button type="primary">Back Home</Button>
                </Link>
              }
            />
          </ErrorPage>
        ),
      },
    ],
  },
];

function ErrorPage(props: {
  children?:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  return (
    <div>
      {props?.children ? (
        props.children
      ) : (
        <div>
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>{props?.children}</p>
        </div>
      )}
    </div>
  );
}

// /**/ 表示二级目录 一般二级目录就够了  不够在加即可
export const modules = import.meta.glob("../pages/**/index.tsx");

function pathToLazyComponent(Ele: string) {
  const path = modules[`../pages/${Ele}/index.tsx`] as any;

  if (!path)
    return (
      <ErrorPage>
        <Alert
          message={
            Ele +
            ":Cannot find the path, please configure the correct folder path"
          }
          type="error"
        />
      </ErrorPage>
    );
  const Components = lazy(path);
  return (
    <Suspense fallback={<Spin size="small" />}>
      <ErrorBoundary>
        <Components />
      </ErrorBoundary>
    </Suspense>
  );
}

function getRoutesConfig(
  config: MenuDataItem[]
): (RouteObject & { single: boolean })[] {
  // console.log(config);
  const routes = config.map((item) => {
    return {
      ...item,
      path: item.path,
      element:
        item.children && item.children?.length > 0 && !item.component ? (
          <Outlet />
        ) : (
          pathToLazyComponent(item.component as string)
        ),
      children:
        item.children && item.children?.length > 0
          ? getRoutesConfig(item.children)
          : [],
      single: item.single || false,
    };
  });
  return routes;
}
function getRoutes() {
  const RoutesConfig = getRoutesConfig(config);
  for (let index = 0; index < RoutesConfig.length; index++) {
    const currentRoute = RoutesConfig[index];
    if (!currentRoute.single) {
      defaultRoutes[0].children?.push(currentRoute);
    } else {
      defaultRoutes.push(currentRoute);
    }
  }

  return defaultRoutes;
}

export default getRoutes();
