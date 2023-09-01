/** 1. 引入createStore.ts */
import createStore from './createStore'
// import user from './modules/user'
import system from "./modules/system"

/** 3. 组合所有状态 */
const store = createStore(() => ({
  system:system(),
}))

/** 向外暴露useModel, StoreProvider, getModel, connectModel */
export const { useModel, StoreProvider, getModel, connectModel } = store
