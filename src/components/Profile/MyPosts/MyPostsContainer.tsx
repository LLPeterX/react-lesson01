import { actions } from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'
import {connect} from 'react-redux'
// import {reset} from 'redux-form'
// import { ProfileType } from '../../../types/types'
import { AppStateType } from '../../../redux/redux-store'
// import {InitialStateType, PostType} from '../../../redux/profile-reducer'
// import { Dispatch } from 'react'
import {MapPropsType, MapDispatchType} from './MyPosts'

// type MapPropsType = {
//   posts: Array<PostType>
// }

// type MapDispatchType = {
//   addPost: (text:string) => void
// }


let mapStateToProps = (state:AppStateType):MapPropsType => {
  return {
    posts: state.profilePage.postsData,
    //newPostText: state.profilePage.newPostText
  } as MapPropsType
} 

// let mapDispatchToProps = (dispatch:Dispatch<MapDispatchType>) => {
//   return {
//     addPost: (text:string) => {
//       dispatch(actions.addPostActionCreator(text));
//       //dispatch(reset('addPostForm'));
//     }
//   }
// }

//const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);
const MyPostsContainer = connect<MapPropsType, MapDispatchType,{},AppStateType>(
  mapStateToProps,
   {addPost: actions.addPostActionCreator}
  )(MyPosts);

export default MyPostsContainer;