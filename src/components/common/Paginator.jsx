import React from 'react';
import s from './Paginator.module.css';

// в props должны передаваться:
//  - totalUserCount
//  = pageSize 
let UsersPaginator = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for(let i=1; i<=pagesCount; i++) {
    pages.push(i);
  }
  //let maxVisiblePages = pagesCount > 20 ? 20 : pagesCount;
  return (
    <div className={s.paginationContainer}>
      {pages.map(p=> {
        return <span 
          className={`${s.pagination_item} ${props.currentPage === p && s.selectedPage}`}
            onClick={(e) => {
              props.onPageChanged(p);
            }} key={p}>{p}</span>
      })}
      </div>
  )

}


export default UsersPaginator;