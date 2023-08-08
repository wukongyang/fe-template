import request from "./index"
// 示例
export const loginApi =(data: string | Record<string, any>) => request.post<{token:string}>('/login', data)