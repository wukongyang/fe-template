declare enum ResultEnum {
  SUCCESS = 200,
  ERROR = 500,
  OVERDUE = 599,
  TIMEOUT = 10000,
  TYPE = "success",
}
// * 请求响应参数(不包含data)
declare interface Result {
  code: string;
  msg: string;
}

// * 请求响应参数(包含data)
declare interface ResultData<T = any> extends Result {
  data: T;
}
