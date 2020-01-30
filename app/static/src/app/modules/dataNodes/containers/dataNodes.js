import DataNodes from 'app/modules/dataNodes/components/dataNodes';
import {
  selectAllDataNodes,
  selectDataNodesIsLoading,
} from 'app/modules/dataNodes/selectors';
import {
  getDataNodes,
  createDataNode,
  deleteDataNode,
} from 'app/modules/dataNodes/thunks';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  isLoading: selectDataNodesIsLoading(),
  dataNodes: selectAllDataNodes(),
});

const mapDispatchToProps = {
  getDataNodes,
  createDataNode,
  deleteDataNode,
};

export default compose(
  withRouter, // must go before connect
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(DataNodes);
