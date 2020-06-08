import React from 'react';
import Pagination from "react-js-pagination";
import User from './User';
import s from './Users.module.css'
import { UserType } from '../../types/types';

// Компонента для отображения списка пользователей

// Тип локального стейта
type LocalStateType = {
  activePage: number
}

// тип для пропсов
type PropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  users: Array<UserType>
  follow: (userId:number) => void
  unfollow: (userId:number) => void
  followingInProgress: Array<number>
}

class Users extends React.Component<PropsType,LocalStateType> {
  pagesCount: number; // число страниц списка юзеров

  constructor(props:PropsType) {
    super(props);
    this.pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
    // локальный стейт
    this.state = {
      activePage: this.props.currentPage
    };
  }


  // обработка выбора новой страницы. В лок.стейте запоминаем её номер и отправляем команду наверх
  // получить новую порцию юзеров.
  handlePageChange(pageNumber:number) {
    this.setState({ activePage: pageNumber });
    this.props.onPageChanged(pageNumber);
  }
  // здест используется сторонний Paginator
  render() {
    return (
      <div>
        <div className={s.paginationContainer}>
          <div>Total users: {this.props.totalUsersCount}</div>
          <Pagination activePage={this.state.activePage}
            itemsCountPerPage={9}
            totalItemsCount={this.props.totalUsersCount}
            pageRangeDisplayed={10}
            onChange={this.handlePageChange.bind(this)}
            nextPageText='>'
            prevPageText='<'
            activeClass={s.selectedPage}
            itemClass={s.pagination_item}
            activeLinkClass={s.pagination_item_link}
            linkClass={s.pagination_item_link}
          />
        </div>
        {/* на странице 9 (pageSize) блоков <User>  - 3 x 3*/}
        <div className={s.usersList}>
          {
            this.props.users.map(u =>
              <User key={u.id}
                 user={u} 
                 followingInProgress={this.props.followingInProgress}
                 follow={this.props.follow} 
                 unfollow={this.props.unfollow}
              />
            )
          }
        </div>
      </div>
    ); // return
  } // render()

}

export default Users;