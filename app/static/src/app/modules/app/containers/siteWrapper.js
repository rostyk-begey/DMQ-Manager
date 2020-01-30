import { SiteWrapper } from 'app/modules/app/components/siteWrapper';
import {
  selectAppProfileData,
  selectAccessToken,
  selectRefreshToken,
} from 'app/modules/app/selectors';
import { authLogout } from 'app/modules/app/thunks';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  profileData: selectAppProfileData(),
  accessToken: selectAccessToken(),
  refreshToken: selectRefreshToken(),
});

const mapDispatchToProps = {
  authLogout,
};

export default compose(
  withRouter, // must go before connect
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SiteWrapper);
