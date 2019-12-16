import { Home } from 'app/modules/home/components/home';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {};

export default compose(
  withRouter, // must go before connect
  connect(mapStateToProps, mapDispatchToProps),
)(Home);
