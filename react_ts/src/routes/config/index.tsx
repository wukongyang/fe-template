import { CrownFilled, SmileFilled } from "@ant-design/icons";
import { MenuDataItem } from "@ant-design/pro-components";

/**
 * 配置参照MenuDataItem类型 ，其中component则为页面相对于pages的路径（所有页面需要放在pages下面）
 * single 字段为配置不在layout组件里面
*/

const RouteConfig: MenuDataItem[] = [
  {
    path: "/index",
    name: "欢迎",
    icon: <SmileFilled />,
    component: "index",
  },

  {
    path: "/about",
    name: "关于我们",
    icon: "https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg",
    children: [
      {
        path: "/about/index",
        name: "列表",
        icon: <SmileFilled />,
        component: "about",
      },
      {
        path: "/about/detail",
        name: "详情",
        icon: <SmileFilled />,
        hideInMenu:true,
        component: "about/detail",
      },
    ],
  },
  {
    path: "/user",
    name: "用户管理",
    icon: <CrownFilled />,
    component: "user",
  },

  {
    label: "登录",
    path: "/login",
    single: true,
    component: "login",
  },
];

export default RouteConfig;
