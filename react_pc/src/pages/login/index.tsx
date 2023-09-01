import { LoginFormPage, ProFormCheckbox } from "@ant-design/pro-components";
import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { Cookie } from "fe-funs";
import "./reset.css";

const tokenName = import.meta.env.VITE_APP_TOKEN_NAME;

export default () => {
  const Navigate = useNavigate();
  async function onSubmitCapture(values: any) {
    // 这里需要请求登录接口
    Cookie.set(tokenName, btoa("wukong_management"));
    if (values.username && values.password) {
      Navigate("/index");
    }

    return true;
  }
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="WuKong"
        onFinish={onSubmitCapture}
        subTitle="管理后台"
      >
        <>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "请输入任意密码" }]}
          >
            <Input.Password />
          </Form.Item>
        </>

        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: "right",
            }}
          >
            忘记密码
          </a>
        </div>
      </LoginFormPage>
    </div>
  );
};
