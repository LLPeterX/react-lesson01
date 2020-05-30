import React from 'react'
import s from './ProfileInfo.module.css'
import { reduxForm } from 'redux-form';
import { Input, TextArea, createField } from '../../common/FormControls/FormControls'

const ProfileForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={s.profileData}>
        <div className={s.editMode}>Режим редактирования</div>
        <div><b>Полное имя: </b>  {createField("Полное имя", "fullName", [], Input)}  </div>
        <div className={s.header__userInfo_job}>Обо мне: {createField("Краткая информация обо мне", "aboutMe", [], TextArea)}</div>
        <div className={s.header__userInfo_job}>Ищу работу: {createField(null, "lookingForAJob", [], Input, { type: "checkbox" })}</div>
        <div className={s.header__userInfo_job}>Профессиональные знания:
        {createField("Интересы", "lookingForAJobDescription", [], TextArea)}
        </div>

        {/* <div className={s.contacts}>
          <div className={s.contacts__title}>Контакты</div>
          <div className={s.contacts__body}>
            {Object.keys(profile.contacts).map(key => {
              return <Contact title={key} value={profile.contacts[key]} key={key} />
            })
            }n
          </div>
        </div> */}

        <button>Сохранить</button>
      </div>
    </form>
  );
}

let ProfileEditForm = reduxForm({ form: 'profile-edit' })(ProfileForm);


export default ProfileEditForm