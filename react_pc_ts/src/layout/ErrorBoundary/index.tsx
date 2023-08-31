import React from "react";
import { Result } from "antd";

export default class ErrorBoundary extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // 呈现发生错误后的组件
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // 捕获错误，打印错误内容
    console.log(error, errorInfo);
  }

  render() {
    const { hasError }: any = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <>error</>
          }
        />
      );
    }
    return children;
  }
}
