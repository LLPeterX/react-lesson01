import Dialogs from './Dialogs';
import { actions } from '../../redux/dialogs-reducer.ts';
import {connect} from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { reset } from 'redux-form';


// используем rect-redux
let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    // updateNewMessage: (text) => {
    //   dispatch(updateNewMessageBodyCreator(text));
    // },
    sendMessage: (text) => {
      dispatch(actions.sendMessageActionCreator(text));
      dispatch(reset('dialogsForm'));
    }
  };
}

// let AuthRedirectComponent = withAuthRedirect(Dialogs);
// const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(AuthRedirectComponent);
// export default DialogsContainer;

export default compose(connect(mapStateToProps,mapDispatchToProps), withAuthRedirect)(Dialogs);

