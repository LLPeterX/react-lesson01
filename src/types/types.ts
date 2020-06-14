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

 export type FieldValidatorType = (value:string) => string | undefined;

export type GetUsersType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}
