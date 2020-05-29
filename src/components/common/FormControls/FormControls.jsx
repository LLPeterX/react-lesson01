import React from 'react'
import styles from './FormControls.module.css'
import {Field} from 'redux-form'

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

const FormControl = ({ input, meta, ...props }) => {
  const hasError = meta.error && meta.touched;
  return (
    <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
      <div>
        {props.children}
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  ) 
}

// Универсальное поле ввода
// в props можно указать тип поля, напр. {type: "password"}
export const createField = (placeholder, name, validators, component, props={}, text="") => (
  <div><Field name={name} type="text" placeholder={placeholder} component={component}
  validate={validators} {...props}/>{text}</div>
)