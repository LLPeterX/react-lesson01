import { addPostActionCreator } from '../../../redux/profile-reducer.ts'
import MyPosts from './MyPosts'
import {connect} from 'react-redux'
import {reset} from 'redux-form'

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (text) => {
      dispatch(addPostActionCreator(text));
      dispatch(reset('mypost'));
    }
  }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);

export default MyPostsContainer;