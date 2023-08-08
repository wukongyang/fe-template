import request from "./index"
// 示例
export const loginApi=(data)=>request.post('/login',data)