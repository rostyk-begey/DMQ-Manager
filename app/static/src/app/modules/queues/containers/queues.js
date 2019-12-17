import Queues from 'app/modules/queues/components/queues';
import {
  selectAllQueues,
  selectQueuesIsLoading,
} from 'app/modules/queues/selectors';
import { getQueues, createQueue, deleteQueue } from 'app/modules/queues/thunks';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  isLoading: selectQueuesIsLoading(),
  queues: selectAllQueues(),
});

const mapDispatchToProps = {
  getQueues,
  createQueue,
  deleteQueue,
};

export default compose(
  withRouter, // must go before connect
  connect(mapStateToProps, mapDispatchToProps),
)(Queues);
