/*
 * @Description: insert description
 * @Author: yangrongxin
 * @Date: 2024-07-26 15:35:43
 * @LastEditors: yangrongxin
 * @LastEditTime: 2024-09-05 17:53:02
 */
import React from 'react'
import { Form as FormType, ObjectField, IFormFeedback } from '@formily/core'
import { useParentForm, FormProvider, JSXComponent } from '@formily/react'
import { FormLayout, IFormLayoutProps } from '../form-layout'
import { PreviewText } from '../preview-text'
export interface FormProps extends IFormLayoutProps {
  /** 表单初始化的时候 传递的Form对象 */
  form?: FormType
  component?: JSXComponent
  onAutoSubmit?: (values: any) => any
  onAutoSubmitFailed?: (feedbacks: IFormFeedback[]) => void
  previewTextPlaceholder?: React.ReactNode
}

export const Form: React.FC<React.PropsWithChildren<FormProps>> = ({
  form,
  component,
  onAutoSubmit,
  onAutoSubmitFailed,
  previewTextPlaceholder,
  ...props
}) => {
  const top = useParentForm()
  const renderContent = (form: FormType | ObjectField) => (
    <PreviewText.Placeholder value={previewTextPlaceholder}>
      <FormLayout {...props}>
        {React.createElement(
          // type
          component,
          // props
          {
            onSubmit(e: React.FormEvent) {
              e?.stopPropagation?.()
              e?.preventDefault?.()
              form.submit(onAutoSubmit).catch(onAutoSubmitFailed)
            },
          },
          // children
          props.children
        )}
      </FormLayout>
    </PreviewText.Placeholder>
  )
  if (form)
    // 给 form 和下面的子元素挂载 form 元素进行操作
    return <FormProvider form={form}>{renderContent(form)}</FormProvider>
  if (!top) throw new Error('must pass form instance by createForm')
  return renderContent(top)
}

Form.defaultProps = {
  component: 'form',
}

export default Form
