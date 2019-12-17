import { App } from 'app/modules/app/components/app';
import {
  // selectAppProfileData,
  selectAuthToken,
} from 'app/modules/app/selectors';
import { getProfile } from 'app/modules/app/thunks';
import { getDataNodes } from 'app/modules/dataNodes/thunks';
import { getQueues } from 'app/modules/queues/thunks';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  // profileData: selectAppProfileData(),
  authToken: selectAuthToken(),
});

const mapDispatchToProps = {
  getQueues,
  getProfile,
  getDataNodes,
};

export default compose(
  withRouter, // must go before connect
  connect(mapStateToProps, mapDispatchToProps),
)(App);
