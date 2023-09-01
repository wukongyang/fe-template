import {useRequest} from "@/hooks"

const Request=useRequest()


export async function getUser(){
   return Request.get<{name:string}>('/user/user')
}