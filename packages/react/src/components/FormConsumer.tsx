/*
 * @Description: insert description
 * @Author: yangrongxin
 * @Date: 2024-07-26 15:35:43
 * @LastEditors: yangrongxin
 * @LastEditTime: 2024-09-05 17:56:45
 */
import React, { Fragment } from 'react'
import { isFn } from '@formily/shared'
import { observer } from '@formily/reactive-react'
import { useForm } from '../hooks'
import { IFormSpyProps, ReactFC } from '../types'

/**
 * 使用一个 可订阅的对象 在每次操作该对象的属性数据过程中，会自动通知订阅者
 * 使用FormConsumer的元素 在加载的时候 会自动增加一个 form对象
 */
export const FormConsumer: ReactFC<IFormSpyProps> = observer((props) => {
  const children = isFn(props.children) ? props.children(useForm()) : null
  return <Fragment>{children}</Fragment>
})

FormConsumer.displayName = 'FormConsumer'
