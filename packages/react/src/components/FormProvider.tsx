/*
 * @Description: 用于捕获form对象的组件
 * @Author: yangrongxin
 * @Date: 2024-07-26 15:35:43
 * @LastEditors: yangrongxin
 * @LastEditTime: 2024-09-05 17:50:48
 */
import React from 'react'
import { useAttach } from '../hooks/useAttach'
import { FormContext, ContextCleaner } from '../shared'
import { IProviderProps, ReactFC } from '../types'

// 从顶层的form组件中获取到的 form领域对象 通过Provider 提供给下层的组件进行使用
export const FormProvider: ReactFC<IProviderProps> = (props) => {
  const form = useAttach(props.form)
  return (
    // 给当前子元素自动挂在 provider 的方法
    <ContextCleaner>
      <FormContext.Provider value={form}>{props.children}</FormContext.Provider>
    </ContextCleaner>
  )
}

FormProvider.displayName = 'FormProvider'
