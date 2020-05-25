// тут хуйня и не работает.
import React from 'react';
import s from './Paginator.module.css';
import { useState } from 'react';

let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize=10}) => {
  console.log('call Paginator');
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages = [];
  let portionCount = Math.ceil(pagesCount/portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber-1)*portionSize+1;
  let rightPortionPageNumber = portionNumber*portionSize;

  for(let i=1; i<=pagesCount; i++) {
    pages.push(i);
  }
//debugger;
  return (
    <div className={s.paginationContainer}>
      {portionNumber>1 && <span className={s.pagination_item} onClick={setPortionNumber(portionNumber-1)}>&lt;&lt;</span>}
      {pages.filter(p => p>=leftPortionPageNumber && p<=rightPortionPageNumber).map(p=> {
        return <span 
          className={`${s.pagination_item} ${currentPage === p && s.selectedPage}`}
            onClick={(e) => {
              onPageChanged(p);
            }} key={p}>{p}</span>
      })}
      {portionCount>portionNumber && <span className={s.pagination_item} onClick={setPortionNumber(portionNumber+1)}>&gt;&gt;</span>}
      </div>
  )

}


export default Paginator;