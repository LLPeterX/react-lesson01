import Dialogs from './Dialogs';
import { sendMessageCreator } from '../../redux/dialogs-reducer';
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
      dispatch(sendMessageCreator(text));
      dispatch(reset('dialogsForm'));
    }
  };
}

// let AuthRedirectComponent = withAuthRedirect(Dialogs);
// const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(AuthRedirectComponent);
// export default DialogsContainer;

export default compose(connect(mapStateToProps,mapDispatchToProps), withAuthRedirect)(Dialogs);

