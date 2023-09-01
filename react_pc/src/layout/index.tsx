import {
  GithubFilled,
  LogoutOutlined,
  PlusCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import type { ProSettings } from "@ant-design/pro-components";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  SettingDrawer,
} from "@ant-design/pro-components";
import { Switch, Watermark } from "antd";
import { ConfigProvider, Dropdown, Input, theme } from "antd";
import React, { useEffect, useState } from "react";
import defaultProps from "./_defaultProps.tsx";
import { getModel } from "@/store";
import Wukong from "@/assets/wukong.webp";

const PageTitle = import.meta.env.VITE_APP_TITLE;
const LOGIN_URL=import.meta.env.VITE_APP_LOGIN_URL

const SearchInput = () => {
  const { token } = theme.useToken();
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
          backgroundColor: token.colorBgTextHover,
        }}
        prefix={
          <SearchOutlined
            style={{
              color: token.colorTextLightSolid,
            }}
          />
        }
        placeholder="搜索方案"
        bordered={false}
      />
      <PlusCircleFilled
        style={{
          color: token.colorPrimary,
          fontSize: 24,
        }}
      />
    </div>
  );
};
const WatermarkWarp: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { watermark } = getModel("system");
  return (
    <>
      {watermark.close ? (
        children
      ) : (
        <Watermark {...watermark}>{children}</Watermark>
      )}
    </>
  );
};

export default () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    layout: "mix",
    fixedHeader: true,
    siderMenuType: "sub",
  });
  const Navigate = useNavigate();
  const Location = useLocation();
  const [pathname, setPathname] = useState("/index");
  const [num, setNum] = useState(40);
  const { setTheme, theme: clientTheme } = getModel("system");

  function onThemeChange(checked: boolean) {
    setTheme(checked ? "light" : "dark");
  }
  if (typeof document === "undefined") {
    return <div />;
  }
  useEffect(() => {
    setPathname(Location.pathname);
  }, [Location.pathname]);
  return (
    <WatermarkWarp>
      <div
        id="test-pro-layout"
        style={{
          height: "100vh",
          overflow: "auto",
        }}
      >
        <ProConfigProvider hashed={false}>
          <ConfigProvider
            getTargetContainer={() => {
              return (
                document.getElementById("test-pro-layout") || document.body
              );
            }}
          >
            <ProLayout
              prefixCls="my-prefix"
              {...defaultProps}
              location={{
                pathname,
              }}
              token={{
                header: {
                  colorBgMenuItemSelected: "rgba(0,0,0,0.04)",
                },
              }}
              siderMenuType="group"
              menu={{
                collapsedShowGroupTitle: false,
              }}
              avatarProps={{
                src: Wukong,
                size: "small",
                title: "悟空",
                render: (_, dom) => {
                  return (
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: "logout",
                            icon: <LogoutOutlined />,
                            label: <span onClick={()=>{
                              Navigate(LOGIN_URL)
                            }}>退出登录</span>,
                          },
                        ],
                      }}
                    >
                      {dom}
                    </Dropdown>
                  );
                },
              }}
              actionsRender={(props) => {
                if (props.isMobile) return [];
                if (typeof window === "undefined") return [];
                return [
                  props.layout !== "side" &&
                  document.body.clientWidth > 1400 ? (
                    <SearchInput />
                  ) : undefined,
                  <GithubFilled key="GithubFilled" />,
                  <div>
                    <Switch
                      checkedChildren={<>light</>}
                      unCheckedChildren={<>dark</>}
                      onChange={onThemeChange}
                      checked={clientTheme === "light" ? true : false}
                    />
                  </div>,
                ];
              }}
              breadcrumbRender={(route: any) => {
                return [
                  {
                    breadcrumbName: "Home",
                    component: "index",
                    linkPath: "/index",
                    title: "Home",
                  },
                  ...route,
                ];
              }}
              breadcrumbProps={{
                itemRender: (item: any) => {
                  // console.log("------>>>", item);

                  return (
                    <span
                      onClick={() => {
                        if (!item.component) return;
                        Navigate(item.linkPath);
                      }}
                      style={{ cursor: item.component ? "pointer" : "default" }}
                    >
                      {item.breadcrumbName}
                    </span>
                  );
                },
              }}
              menuFooterRender={(props) => {
                if (props?.collapsed) return undefined;
                return (
                  <div
                    style={{
                      textAlign: "center",
                      paddingBlockStart: 12,
                    }}
                  >
                    <div>© 2021 Made with love</div>
                    <div>by Wukong</div>
                  </div>
                );
              }}
              onMenuHeaderClick={(e) => console.log(e)}
              menuItemRender={(item, dom) => (
                <div
                  onClick={() => {
                    Navigate(item.path as string);
                  }}
                >
                  {dom}
                </div>
              )}
              title={PageTitle}
              {...settings}
            >
              {/* <Outlet /> */}
              <PageContainer
                token={{
                  paddingInlinePageContainerContent: num,
                }}
              >
                <ProCard>
                  <Outlet />
                </ProCard>
              </PageContainer>

              <SettingDrawer
                pathname={pathname}
                enableDarkTheme
                getContainer={(e: any) => {
                  if (typeof window === "undefined") return e;
                  return document.getElementById("test-pro-layout");
                }}
                settings={settings}
                onSettingChange={(changeSetting) => {
                  setSetting(changeSetting);
                }}
                disableUrlParams={false}
              />
            </ProLayout>
          </ConfigProvider>
        </ProConfigProvider>
      </div>
    </WatermarkWarp>
  );
};
