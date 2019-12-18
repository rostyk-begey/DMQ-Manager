import { Home } from 'app/modules/home/components/home';
import {
  selectAllDataNodes,
  selectDataNodesIsLoading,
} from 'app/modules/dataNodes/selectors';
import { selectAllQueues } from 'app/modules/queues/selectors';
import { selectAllUsers } from 'app/modules/users/selectors';
import { getUsers } from 'app/modules/users/thunks';
import { getQueues } from 'app/modules/queues/thunks';
import { getDataNodes } from 'app/modules/dataNodes/thunks';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  users: selectAllUsers(),
  queues: selectAllQueues(),
  dataNodes: selectAllDataNodes(),
  isLoading: selectDataNodesIsLoading(),
});

const mapDispatchToProps = {
  getUsers,
  getQueues,
  getDataNodes,
};

export default compose(
  withRouter, // must go before connect
  connect(mapStateToProps, mapDispatchToProps),
)(Home);
