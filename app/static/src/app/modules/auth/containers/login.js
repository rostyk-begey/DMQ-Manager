import { Login } from 'app/modules/auth/components/login';
import { authLogin } from 'app/modules/app/thunks';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {
  authLogin,
};

export default compose(
  withRouter, // must go before connect
  connect(mapStateToProps, mapDispatchToProps),
)(Login);
