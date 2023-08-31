import axios, {
  AxiosError,
  AxiosResponse,
  CreateAxiosDefaults,
  AxiosInterceptorOptions,
} from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = import.meta.env.VITE_APP_LOGIN_URL;

interface InterceptorsOptions<V = any> {
  requestOnFulfilled?: ((value: V) => V | Promise<V>) | null;
  requestOnRejected?: ((error: any) => any) | null;
  requestOptions?: AxiosInterceptorOptions;

  responseOnFulfilled?: ((value: V) => V | Promise<V>) | null;
  responseOnRejected?: ((error: any) => any) | null;
  responseOptions?: AxiosInterceptorOptions;
}
const defaultConfig = {
  // 默认地址请求地址，可在 .env 开头文件中修改
  baseURL: import.meta.env.VITE_APP_API_BASE_URL as string,
  // 设置超时时间（3s）
  timeout: 3000,
  // 跨域时候允许携带凭证
  withCredentials: true,
};
/**
 * @description网络请求
 * @param {CreateAxiosDefaults} [config] 单独的配置信息，会覆盖defaultConfig
 * @param {InterceptorsOptions} [options] 单独的拦截方法
 */
export default function useRequest<T = any>(
  config?: CreateAxiosDefaults,
  options?: InterceptorsOptions
) {
  const SERVICE = createInstance(config, options);

  function get<T>(url: string, params?: object, _object = {}) {
    return SERVICE.get<ResultData<T>>(url, { params, ..._object });
  }
  function post<T>(url: string, params?: object, _object = {}) {
    return SERVICE.post<ResultData<T>>(url, params, { ..._object });
  }
  function put<T>(url: string, params?: object, _object = {}) {
    return SERVICE.put<ResultData<T>>(url, params, { ..._object });
  }
  function deleteHttp<T>(url: string, params?: any, _object = {}) {
    return SERVICE.delete<ResultData<T>>(url, { params, ..._object });
  }
  function download(url: string, params?: object, _object = {}) {
    return SERVICE.post<ResultData<T>>(url, params, { ..._object });
  }
  function upload(url: string, file: File, _object = {}) {
    const formData = new FormData();
    formData.append("file", file);
    return SERVICE.post<ResultData<T>>(url, formData, { ..._object });
  }
  return { get, post, put, deleteHttp, download, upload };
}
export function createInstance(
  config?: CreateAxiosDefaults,
  options?: InterceptorsOptions
) {
  const Navigate = useNavigate();
  const [messageApi] = message.useMessage();

  // 实例化axios
  const SERVICE = axios.create({ ...defaultConfig, ...config });
  let requestOnFulfilled = (config: any) => {
    //   const globalStore = GlobalStore()
    // * 如果当前请求不需要显示 loading,在 api 服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading，参见loginApi
    //   config.headers!.noLoading || showFullScreenLoading()
    //   const token: string = globalStore.token
    // 这里需要处理携带token等的处理
    const token = "";
    return {
      ...config,
      headers: { ...config.headers, "x-access-token": token },
    };
  };
  let requestOnRejected = (error: AxiosError) => {
    return Promise.reject(error);
  };
  let responseOnFulfilled = (response: AxiosResponse) => {
    const { data } = response;

    if (data.code == ResultEnum.OVERDUE) {
      messageApi.error(data.msg);
      Navigate(LOGIN_URL);
      return Promise.reject(data);
    }
    // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
    if (data.code && data.code !== ResultEnum.SUCCESS) {
      messageApi.error(data.msg);
      return Promise.reject(data);
    }
    // * 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
    return data;
  };
  let responseOnRejected = async (error: AxiosError) => {
    const { response } = error;
    //   tryHideFullScreenLoading()
    // 请求超时单独判断，因为请求超时没有 response
    if (error.message.indexOf("timeout") !== -1)
      if (response)
        // ElMessage.error('请求超时！请您稍后重试')
        // 根据响应的错误状态码，做不同的处理
        checkStatus(response.status);
    // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
    //   if (!window.navigator.onLine) router.replace("/500");
    return Promise.reject(error);
  };
  if (options) {
    if (options.requestOnFulfilled) {
      requestOnFulfilled = options.requestOnFulfilled;
    }
    if (options.requestOnRejected) {
      requestOnRejected = options.requestOnRejected;
    }
    if (options.responseOnFulfilled) {
      responseOnFulfilled = options.responseOnFulfilled;
    }
    if (options.responseOnRejected) {
      responseOnRejected = options.responseOnRejected;
    }
  }
  SERVICE.interceptors.request.use(requestOnFulfilled, requestOnRejected);
  SERVICE.interceptors.response.use(responseOnFulfilled, responseOnRejected);
  return SERVICE;
}

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
const checkStatus = (status: number): void => {
  const [messageApi] = message.useMessage();

  switch (status) {
    case 400:
      messageApi.error("请求失败！请您稍后重试");
      break;
    case 401:
      messageApi.error("请求失败！请您稍后重试");
      break;
    case 403:
      messageApi.error("当前账号无权限访问！");

      break;
    case 404:
      messageApi.error("你所访问的资源不存在！");

      break;
    case 405:
      messageApi.error("请求方式错误！请您稍后重试");

      break;
    case 408:
      messageApi.error("请求超时！请您稍后重试");

      break;
    case 500:
      messageApi.error("服务异常！");

      break;
    case 502:
      messageApi.error("网关错误！");

      break;
    case 503:
      messageApi.error("服务不可用！");

      break;
    case 504:
      messageApi.error("网关超时！");

      break;
    default:
      messageApi.error("请求失败！");
  }
};
