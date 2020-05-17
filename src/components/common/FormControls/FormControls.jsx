import React from 'react';
import styles from './FormControls.module.css';

export const TextArea = (props) => {
  // const hasError = meta.error && meta.touched;
  // return (
  //   <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
  //     <div>
  //       <textarea {...input} {...props} />
  //     </div>
  //     {hasError && <span>{meta.error}</span>}
  //   </div>
  // )
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