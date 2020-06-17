import Dialogs from './Dialogs';
import { actions, ActionsType } from '../../redux/dialogs-reducer';
import {connect} from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect.js';
import { compose, Dispatch } from 'redux';
import { reset, FormAction } from 'redux-form';
import { AppStateType } from '../../redux/redux-store';

type DispatchType = Dispatch<ActionsType | FormAction>
// используем rect-redux
let mapStateToProps = (state:AppStateType) => {
  return {
    dialogsPage: state.dialogsPage
  }
}

let mapDispatchToProps = (dispatch:DispatchType) => {
  return {
    sendMessage: (text:string) => {
      //console.log('call mapDispatchToProps');
      
      dispatch(actions.sendMessageActionCreator(text));
      dispatch(reset('dialogsForm'));
    }
  };
}

// let AuthRedirectComponent = withAuthRedirect(Dialogs);
// const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(AuthRedirectComponent);
// export default DialogsContainer;

export default compose(connect(mapStateToProps,mapDispatchToProps), withAuthRedirect)(Dialogs) as React.FC;

