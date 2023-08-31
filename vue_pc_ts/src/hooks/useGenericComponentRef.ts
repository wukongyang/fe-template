/**
 * @desc 解决泛型组件无法获取组件实例问题
 */
import { ref } from 'vue'

/**泛型组件出口类型 */
type GenericComponentExports<D extends (...p: any[]) => any> =
  //这里获取组件通用类型
  import('vue').ComponentPublicInstance &
    //这里获取defineExpose暴露的数据类型
    Parameters<NonNullable<NonNullable<ReturnType<D>['__ctx']>['expose']>>[0]

/**
 * @desc generic泛型组件实例类型
 * @param component 需要获取实例的组件
 */
export default function useGenericComponentRef<
  T extends (...p: any[]) => any = any
>(component: T) {
  //获得组件实例类型，能够正确的获得defineExpose暴露的类型与通用的组件类型
  type Instance = GenericComponentExports<typeof component>
  return ref<Instance>()
}
