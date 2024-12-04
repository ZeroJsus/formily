/*
 * @Description: insert description
 * @Author: yangrongxin
 * @Date: 2024-07-26 15:35:43
 * @LastEditors: yangrongxin
 * @LastEditTime: 2024-07-26 15:45:41
 */
import React, { forwardRef, memo, Fragment } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { useObserver } from './hooks/useObserver'
import { IObserverOptions, IObserverProps, ReactFC } from './types'

/**
 * 执行组件订阅的方法
 * @param component react function component
 * @param options 
 * @returns 返回记忆后的组件
 */
export function observer<
  P,
  Options extends IObserverOptions = IObserverOptions
>(
  component: ReactFC<P>,
  options?: Options
): React.MemoExoticComponent<
  ReactFC<
    Options extends { forwardRef: true }
      ? P & {
          ref?: 'ref' extends keyof P ? P['ref'] : React.RefAttributes<any>
        }
      : React.PropsWithoutRef<P>
  >
> {
  const realOptions = {
    forwardRef: false,
    ...options,
  }

  const wrappedComponent = realOptions.forwardRef
    ? forwardRef((props: any, ref: any) => {
        return useObserver(() => component({ ...props, ref }), realOptions)
      })
    : (props: any) => {
        return useObserver(() => component(props), realOptions)
      }

  const memoComponent = memo(wrappedComponent)

  hoistNonReactStatics(memoComponent, component)

  if (realOptions.displayName) {
    memoComponent.displayName = realOptions.displayName
  }

  return memoComponent
}

export const Observer = observer((props: IObserverProps) => {
  const children =
    typeof props.children === 'function' ? props.children() : props.children
  return React.createElement(Fragment, {}, children)
})
