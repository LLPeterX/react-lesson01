import React from 'react'
import styles from './FormControls.module.css'
import {Field} from 'redux-form'
import {FieldValidatorType, ReduxFormMetaType, ReduxFormInputType} from '../../../types/types'

// type PropsType = {
//   meta: ReduxFormMetaType
//   input: ReduxFormInputType
//   props: any
// }

export const TextArea = (props) => {
  const {input, meta, ...restProps} = props;
  return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
  const {input, meta, ...restProps} = props;
  return (
    <FormControl {...props}><input {...input} {...restProps} /></FormControl>
  )
}
type FormControlParamsType = {
  // meta: ReduxFormMetaType
  meta: {
    touched: boolean
    error: string
  }
  }
type FormControlType = (params: FormControlParamsType) => React.ReactNode;


//const FormControl:React.FC<PropsType> = ({ input, meta, ...props }) => {
const FormControl:React.FC<FormControlParamsType> = ({ meta: {touched, error},children }) => {
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

// Универсальное поле ввода
// в props можно указать тип поля, напр. {type: "password"}
export const createField = (
  placeholder:string|null, 
  name:string, 
  validators: Array<FieldValidatorType>, 
  component:string|React.Component|React.FC,
  props={}, 
  text:string ="") => (
    <div><Field name={name} id={name} type="text" placeholder={placeholder} component={component}
     validate={validators} {...props}/>{text}</div>
  )