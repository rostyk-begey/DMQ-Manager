import { Home } from 'app/modules/home/components/home';
import {
  selectAllDataNodes,
  selectDataNodesIsLoading,
} from 'app/modules/dataNodes/selectors';
import { selectQueues } from 'app/modules/app/selectors';
import { getQueues } from 'app/modules/app/thunks';
import { getDataNodes } from 'app/modules/dataNodes/thunks';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  queues: selectQueues(),
  dataNodes: selectAllDataNodes(),
  isLoading: selectDataNodesIsLoading(),
});

const mapDispatchToProps = {
  getQueues,
  getDataNodes,
};

export default compose(
  withRouter, // must go before connect
  connect(mapStateToProps, mapDispatchToProps),
)(Home);
