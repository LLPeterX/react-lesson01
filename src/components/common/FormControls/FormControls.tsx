import React from 'react'
import styles from './FormControls.module.css'
import { Field, WrappedFieldProps, WrappedFieldMetaProps } from 'redux-form'
import { FieldValidatorType } from '../../../types/types'

export const TextArea: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}><input {...input} {...restProps} /></FormControl>
  )
}

type FormControlPropsType = {
  meta: WrappedFieldMetaProps
}

//const FormControl:React.FC<PropsType> = ({ input, meta, ...props }) => {
//const FormControl: FormControlType = ({ meta: { touched, error }, children }) => {
  const FormControl: React.FC<FormControlPropsType> = ({ meta: { touched, error }, children }) => {
  const hasError = error && touched;
  return (
    <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
      <div>
        {children}
      </div>
      {hasError && <span>{error}</span>}
    </div>
  )
}

// Фцнкц.компонента - универсальное поле ввода
// в props можно указать тип поля, напр. {type: "password"}
export const createField = (
  placeholder: string | undefined,
  name: string,
  validators: Array<FieldValidatorType>,
  component:  React.FC<WrappedFieldProps>,
  props = {},
  text: string = "") => (
    <div><Field name={name} id={name} type="text" placeholder={placeholder} component={component}
      validate={validators} {...props} />{text}</div>
  )