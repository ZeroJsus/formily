import React, { Fragment, useMemo } from 'react'
import { isBool, isFn, isValid } from '@formily/shared'
import { GeneralField } from '@formily/core'
import { Schema } from '@formily/json-schema'
import { SchemaContext } from '../shared'
import { IRecursionFieldProps, ReactFC } from '../types'
import { useField, useExpressionScope } from '../hooks'
import { ObjectField } from './ObjectField'
import { ArrayField } from './ArrayField'
import { Field } from './Field'
import { VoidField } from './VoidField'

const useFieldProps = (schema: Schema) => {
  // 获取注入的额外的上下文信息
  const scope = useExpressionScope()
  return schema.toFieldProps({
    scope,
  }) as any
}

const useBasePath = (props: IRecursionFieldProps) => {
  const parent = useField()
  if (props.onlyRenderProperties) {
    return props.basePath || parent?.address.concat(props.name)
  }
  return props.basePath || parent?.address
}

export const RecursionField: ReactFC<IRecursionFieldProps> = (props) => {
  const basePath = useBasePath(props)
  const fieldSchema = useMemo(() => new Schema(props.schema), [props.schema])
  const fieldProps = useFieldProps(fieldSchema)
  const renderProperties = (field?: GeneralField) => {
    if (props.onlyRenderSelf) return
    const properties = Schema.getOrderProperties(fieldSchema)
    if (!properties.length) return
    return (
      <Fragment>
        {properties.map(({ schema: item, key: name }, index) => {
          const base = field?.address || basePath
          let schema: Schema = item
          if (isFn(props.mapProperties)) {
            const mapped = props.mapProperties(item, name)
            if (mapped) {
              schema = mapped
            }
          }
          if (isFn(props.filterProperties)) {
            if (props.filterProperties(schema, name) === false) {
              return null
            }
          }
          if (isBool(props.propsRecursion) && props.propsRecursion) {
            return (
              <RecursionField
                propsRecursion={true}
                filterProperties={props.filterProperties}
                mapProperties={props.mapProperties}
                schema={schema}
                key={`${index}-${name}`}
                name={name}
                basePath={base}
              />
            )
          }
          return (
            <RecursionField
              schema={schema}
              key={`${index}-${name}`}
              name={name}
              basePath={base}
            />
          )
        })}
      </Fragment>
    )
  }

  const render = () => {
    if (!isValid(props.name)) return renderProperties()
    if (fieldSchema.type === 'object') {
      if (props.onlyRenderProperties) return renderProperties()
      return (
        <ObjectField {...fieldProps} name={props.name} basePath={basePath}>
          {renderProperties}
        </ObjectField>
      )
    } else if (fieldSchema.type === 'array') {
      return (
        <ArrayField {...fieldProps} name={props.name} basePath={basePath} />
      )
    } else if (fieldSchema.type === 'void') {
      if (props.onlyRenderProperties) return renderProperties()
      return (
        <VoidField {...fieldProps} name={props.name} basePath={basePath}>
          {renderProperties}
        </VoidField>
      )
    }
    return <Field {...fieldProps} name={props.name} basePath={basePath} />
  }

  if (!fieldSchema) return <Fragment />

  // TODO: 思考是不是可以将这部分内容放到服务器进行渲染 -- 不行 业务的交给领域，样式的放给前端
  return (
    <SchemaContext.Provider value={fieldSchema}>
      {render()}
    </SchemaContext.Provider>
  )
}
