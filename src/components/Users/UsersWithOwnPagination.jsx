import React from 'react';
import Paginator from '../common/Paginator';
import User from './User';
import s from './Users.module.css'

class UsersWithOwnPagination extends React.Component {

  constructor(props) {
    super(props);
    this.pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
    this.pages = [];
    let maxVisiblePages = this.pagesCount > 20 ? 20 : this.pagesCount;
    for (let i = 1; i <= maxVisiblePages; i++) { this.pages.push(i); } // формируем массив [1,2,3,... pagesCount] - это номера страниц
    // local state for Pagination
    this.state = {
      activePage: this.props.currentPage
    };
  }


  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.props.onPageChanged(pageNumber);
  }
  render() {
    console.log('call Paginatror with totalItemsCount='+this.props.totalUsersCount);
    
    return (
      <div>
        <div className={s.paginationContainer}>
          <div>Total users: {this.props.totalUsersCount}</div>
        </div>
        <Paginator
          totalItemsCount={this.props.totalUsersCount}
          pageSize={5}
          currentPage={this.state.activePage}
          onPageChanged={this.handlePageChange.bind(this)}
        />

        {
          this.props.users.map(u =>
            <User user={u} followingInProgress={this.props.followingInProgress}
              follow={this.props.follow} unfollow={this.props.unfollow}
            key={u.id}/>
          )
        }
      </div>
    ); // return
  }

}

export default UsersWithOwnPagination;