import React from 'react';
import Pagination from "react-js-pagination";
//import Paginator from '../common/Paginator';
import User from './User';
import s from './Users.module.css'
//import ReactPaginate from 'react-paginate';
// нихуя не получается с ReactPaginate!

class Users extends React.Component {

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
        <div className={s.usersList}>
          {
            this.props.users.map(u =>
              <User user={u} followingInProgress={this.props.followingInProgress}
                follow={this.props.follow} unfollow={this.props.unfollow}
                key={u.id} />
            )
          }
        </div>
      </div>
    ); // return
  }

}

export default Users;