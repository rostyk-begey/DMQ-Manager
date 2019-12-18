import { App } from 'app/modules/app/components/app';
import {
  // selectAppProfileData,
  selectAccessToken,
  selectRefreshToken,
} from 'app/modules/app/selectors';
import { getProfile } from 'app/modules/app/thunks';
import { getDataNodes } from 'app/modules/dataNodes/thunks';
import { getQueues } from 'app/modules/queues/thunks';
import { getUsers } from 'app/modules/users/thunks';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  // profileData: selectAppProfileData(),
  accessToken: selectAccessToken(),
  refreshToken: selectRefreshToken(),
});

const mapDispatchToProps = {
  getUsers,
  getQueues,
  getProfile,
  getDataNodes,
};

export default compose(
  withRouter, // must go before connect
  connect(mapStateToProps, mapDispatchToProps),
)(App);
