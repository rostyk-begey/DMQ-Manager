import Users from 'app/modules/users/components/users';
import {
  selectAllUsers,
  selectUsersIsLoading,
} from 'app/modules/users/selectors';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from 'app/modules/users/thunks';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  isLoading: selectUsersIsLoading(),
  users: selectAllUsers(),
});

const mapDispatchToProps = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};

export default compose(
  withRouter, // must go before connect
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Users);
