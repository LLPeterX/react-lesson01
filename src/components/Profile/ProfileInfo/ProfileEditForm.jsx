import React from 'react'
import s from './ProfileInfo.module.css'
import { reduxForm } from 'redux-form';
import { Input, TextArea, createField } from '../../common/FormControls/FormControls'

const ProfileForm = ({ handleSubmit, profile, error }) => {

  // const getIvalidField = (errorMessage) => {
  //   const matches = errorMessage.match('error.*\-\>(.+)\\)');
  //   return matches.length>0 ? matches[1] : null;
  // }
  //debugger;
  //if(error) debugger;
  return (
    <form onSubmit={handleSubmit}>
      <div className={s.profileData}>
        <div><b>Полное имя: </b>  {createField("Полное имя", "fullName", [], Input)}  </div>
        <div className={s.header__userInfo_job}>Обо мне: {createField("Краткая информация обо мне", "aboutMe", [], TextArea)}</div>
        <div className={s.header__userInfo_job}>Ищу работу: {createField(null, "lookingForAJob", [], Input, { type: "checkbox" })}</div>
        <div className={s.header__userInfo_job}>Профессиональные знания:
        {createField("Интересы", "lookingForAJobDescription", [], TextArea)}
        </div>

        <div className={s.contacts}>
          <div className={s.contacts__title}>Контакты</div>
          <div className={s.contacts__body_edit}>
            {Object.keys(profile.contacts).map(key => {
              return (
                <div key={key} className={error && (error.fieldName === 'contacts.' + key ? s.errorField : "")}>
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

let ProfileEditForm = reduxForm({ form: 'profile-edit' })(ProfileForm);


export default ProfileEditForm