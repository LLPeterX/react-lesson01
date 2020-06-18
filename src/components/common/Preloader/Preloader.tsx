import React from 'react';
import s from './Preloader.module.css';
import preloader from '../../../assets/images/preloader.svg';

let Preloader:React.FC = () => {
  return (
    <div className={s.preloadContainer}>
          <img src={preloader} alt="" className={s.preloader} />
    </div>
  );
}

export default Preloader;