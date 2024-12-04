/*
 * @Description: 监听模式
 * @Author: yangrongxin
 * @Date: 2024-07-26 15:35:43
 * @LastEditors: yangrongxin
 * @LastEditTime: 2024-09-05 18:03:48
 */
import { Tracker } from '@formily/reactive'
import { IObserverOptions } from '../types'
import { useForceUpdate } from './useForceUpdate'
import { useCompatFactory } from './useCompatFactory'

/**
 * 观察组件变化的实现
 * @param view 
 * @param options 
 * @returns 
 */
export const useObserver = <T extends () => any>(
  view: T,
  options?: IObserverOptions
): ReturnType<T> => {
  const forceUpdate = useForceUpdate()
  const tracker = useCompatFactory(
    () =>
      new Tracker(() => {
        if (typeof options?.scheduler === 'function') {
          options.scheduler(forceUpdate)
        } else {
          forceUpdate()
        }
      }, options?.displayName)
  )
  return tracker.track(view)
}
