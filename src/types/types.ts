export type PhotosType = {
  small: string | null
  large: string | null
}
export type ContactsType = {
  github: string | null
  vk: string | null
  facebook: string | null
  instagram: string | null
  twitter: string | null
  website: string | null
  youtube: string | null
  mainLink: string | null
}
export type ProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string|null
  fullName: string
  contacts: ContactsType
  photos: PhotosType
}

// Users
export type UserType = {
  id:  number
  name: string
  status: string|null
  photos: PhotosType
  followed: boolean
 }

 export enum ResultCodeEnum {
  SUCCESS=0,
  ERROR=1,
  CAPTCHA_REQUIRED=10
}

export type FieldValidatorType = (value:string) => string | undefined;

export type ReduxFormMetaType = {
  active : boolean // true if this field currently has focus. It will only work if you are passing onFocus to your input element.
  asyncValidating : boolean //  true if the form is currently running asynchronous validation because this field was blurred.
  dirty : boolean // true if the field value has changed from its initialized value. Opposite of pristine.
  dispatch : Function //   The Redux dispatch function.
  error? : string //  The error for this field if its value is not passing validation. Both synchronous, asynchronous, and submit validation errors will be reported here.
  invalid : boolean //  true if the field value fails validation (has a validation error). Opposite of valid.
  pristine : boolean // true if the field value is the same as its initialized value. Opposite of dirty.
  submitting : boolean //   true if the field is currently being submitted
  touched : boolean //  true if the field has been touched. By default this will be set when the field is blurred.
  valid : boolean //   true if the field value passes validation (has no validation errors). Opposite of invalid.
  visited: boolean // true if this field has ever had focus. It will only work if you are passing onFocus to your input element
}

export type ReduxFormInputType = {
 checked? : boolean
 name : string
 onBlur: (eventOrValue:any) => void
 onChange: (eventOrValue:any) => void
 onDragStart: (event:any) => void
 onDrop: (event:any) => void
 onFocus: (event:any)=>void
 value: any
}