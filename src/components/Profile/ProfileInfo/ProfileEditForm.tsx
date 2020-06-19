import React from 'react'
import s from './ProfileInfo.module.css'
import { reduxForm, InjectedFormProps } from 'redux-form';
import { Input, TextArea, createField, GetStringKeys } from '../../common/FormControls/FormControls'
import { ProfileType, FormErrorFieldType } from '../../../types/types'


type PropsType = {
  profile: ProfileType
  //error: FormErrorFieldType|null
}
type ProfileFormKeys = GetStringKeys<ProfileType>


const ProfileForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ handleSubmit, profile, error }) => {
  if (error) {
    console.log('ProfileForm Error:');
    console.log(error);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={s.profileData}>
        <div><b>Полное имя: </b>  {createField<ProfileFormKeys>("Полное имя", "fullName", [], Input)}  </div>
        <div className={s.header__userInfo_job}>Обо мне: {createField<ProfileFormKeys>("Краткая информация обо мне", "aboutMe", [], TextArea)}</div>
        <div className={s.header__userInfo_job}>Ищу работу: {createField<ProfileFormKeys>(undefined, "lookingForAJob", [], Input, { type: "checkbox" })}</div>
        <div className={s.header__userInfo_job}>Профессиональные знания:
        {createField("Интересы", "lookingForAJobDescription", [], TextArea)}
        </div>

        <div className={s.contacts}>
          <div className={s.contacts__title}>Контакты</div>
          <div className={s.contacts__body_edit}>
            {/* todo: что-то придумать для типа key  */}
            {Object.keys(profile.contacts).map((key) => {
              return (
                // <div key={key} className={error && (error.fieldName === 'contacts.' + key ? s.errorField : "")}>
                //   <label htmlFor={key}>{key}</label>
                //   {createField(key, 'contacts.' + key, [], Input)}
                // </div>
                <div key={key} >
                  <label htmlFor={key}>{key}</label>
                  {createField(key, 'contacts.' + key, [], Input)}
                </div>

              );
            })
            }
          </div>
        </div>

        {/* {error && <div className={s.error}>{error}</div>} */}

        <button>Сохранить</button>
      </div>
    </form>
  );
}

let ProfileEditForm = reduxForm<ProfileType, PropsType>({ form: 'profile-edit' })(ProfileForm);


export default ProfileEditForm