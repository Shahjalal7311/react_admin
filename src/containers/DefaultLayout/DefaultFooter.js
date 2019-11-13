import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    return (
      <React.Fragment>
        <span><a href="#">React</a> &copy; 2019 web.</span>
        <span className="ml-auto">Powered by <a href="#">admin</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const mapDispatchToProps = {
  
}
export default connect(mapState, mapDispatchToProps)(DefaultFooter);
