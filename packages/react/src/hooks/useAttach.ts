/*
 * @Description: insert description
 * @Author: yangrongxin
 * @Date: 2024-07-26 15:35:43
 * @LastEditors: yangrongxin
 * @LastEditTime: 2024-09-05 17:49:38
 */
import { unstable_useCompatEffect } from '@formily/reactive-react'
interface IRecycleTarget {
  onMount: () => void
  onUnmount: () => void
}

/**
 * 通过不可变对象来持久化 当前form的内容 同时触发form 领域对象的 挂载 和 取消挂载的方法
 * @param target 
 * @returns 
 */
export const useAttach = <T extends IRecycleTarget>(target: T): T => {
  unstable_useCompatEffect(() => {
    target.onMount()
    return () => target.onUnmount()
  }, [target])
  return target
}
