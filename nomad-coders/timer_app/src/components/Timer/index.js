import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Timer from './presenter';
import { actionCreators } from '../../reducer';

function mapStateToProps(state) {
  const { isPlaying, elapsedTime, timerDuration } = state;
  return {
    isPlaying,
    elapsedTime,
    timerDuration,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startTimer: bindActionCreators(actionCreators.startTimer, dispatch),
    stoptTimer: bindActionCreators(actionCreators.stoptTimer, dispatch),
    addSecond: bindActionCreators(actionCreators.addSecond, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timer);
