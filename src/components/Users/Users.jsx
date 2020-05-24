import React from 'react';
//import Pagination from "react-js-pagination";
import Paginator from '../common/Paginator';
import User from './User';
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
    //    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
    this.props.onPageChanged(pageNumber);
  }
  render() {
    return (
      <div>
        {/* <div className={s.paginationContainer}>
          <div>Total users: {this.props.totalUsersCount}</div>
          <Pagination activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={this.props.totalUsersCount}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
            nextPageText='>'
            prevPageText='<'
            activeClass={s.selectedPage}
            itemClass={s.pagination_item}
            activeLinkClass={s.pagination_item_link}
            linkClass={s.pagination_item_link}
          />
        </div> */}
        <Paginator
          totalUsersCount={this.props.totalUsersCount}
          pageSize={5}
          currentPage={this.state.activePage}
          onPageChanged={this.handlePageChange.bind(this)}
        />

        {
          this.props.users.map(u =>
            <User user={u} followingInProgress={this.props.followingInProgress}
              follow={this.props.follow} unfollow={this.props.unfollow}
            key={u.id}/>
            // <div key={u.id}>
            //   <span>
            //     <div>
            //       <NavLink to={"/profile/" + u.id}>
            //         <img src={u.photos.small ? u.photos.small : defaultAvatar} alt="" className={s.userPhoto} />
            //         {/* <img src={defaultAvatar} alt="" className={s.userPhoto} /> */}
            //       </NavLink>
            //     </div>
            //     {/* <div>{u.followed ? 'true' : 'false'}</div> */}
            //     <div>
            //       {u.followed
            //         ? <button disabled={this.props.followingInProgress.some(id => id === u.id)} onClick={() => {
            //           this.props.unfollow(u.id);
            //         }} >UnFollow</button>
            //         : <button disabled={this.props.followingInProgress.some(id => id === u.id)} onClick={() => {
            //           this.props.follow(u.id);
            //         }}>Follow</button>
            //       }
            //     </div>
            //   </span>
            //   <span>
            //     <span>
            //       {/* <div>{u.fullName}</div> */}
            //       <div>{u.id} : {u.name} </div>
            //       <div>{u.status}</div>
            //     </span>
            //     <span>
            //       <div>{"u.location.city"}</div>
            //       <div>{"u.location.country"}</div>
            //     </span>
            //   </span>
            // </div>
          )
        }
      </div>
    ); // return
  }

}

export default Users;