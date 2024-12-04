/*
 * @Description: insert description
 * @Author: yangrongxin
 * @Date: 2024-07-26 15:35:43
 * @LastEditors: yangrongxin
 * @LastEditTime: 2024-09-05 17:19:30
 */
import { FormPath } from '@formily/shared'
import { Form } from '../models'
import { IFormProps } from '../types'
import {
  getValidateLocaleIOSCode,
  getLocaleByPath,
  setValidateLanguage,
  registerValidateFormats,
  registerValidateLocale,
  registerValidateMessageTemplateEngine,
  registerValidateRules,
} from '@formily/validator'
import {
  createEffectHook,
  createEffectContext,
  useEffectForm,
} from './effective'
import {
  isArrayField,
  isArrayFieldState,
  isDataField,
  isDataFieldState,
  isField,
  isFieldState,
  isForm,
  isFormState,
  isGeneralField,
  isGeneralFieldState,
  isObjectField,
  isObjectFieldState,
  isQuery,
  isVoidField,
  isVoidFieldState,
} from './checkers'

/**
 * 创建一个form对象
 * @param options 基础的一些配置属性
 * @returns 
 */
const createForm = <T extends object = any>(options?: IFormProps<T>) => {
  return new Form(options)
}

export {
  FormPath,
  createForm,
  isArrayField,
  isArrayFieldState,
  isDataField,
  isDataFieldState,
  isField,
  isFieldState,
  isForm,
  isFormState,
  isGeneralField,
  isGeneralFieldState,
  isObjectField,
  isObjectFieldState,
  isQuery,
  isVoidField,
  isVoidFieldState,
  getValidateLocaleIOSCode,
  getLocaleByPath,
  setValidateLanguage,
  registerValidateFormats,
  registerValidateLocale,
  registerValidateMessageTemplateEngine,
  registerValidateRules,
  createEffectHook,
  createEffectContext,
  useEffectForm,
}
