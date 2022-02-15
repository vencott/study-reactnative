import React, { Component } from 'react';
import {
  View, Text, StyleSheet, StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import Button from '../Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CE0B24',
  },
  upper: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lower: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    color: 'white',
    fontSize: 120,
    fontWeight: '100',
  },
});

class Timer extends Component {
  componentWillReceiveProps(nextProps) {
    const currentProps = this.props;

    if (!currentProps.isPlaying && nextProps.isPlaying) {
      // start the interval
      const timerInterval = window.setInterval(() => {
        currentProps.addSecond();
      }, 1000);
      this.setState({
        timerInterval,
      });
    } else if (currentProps.isPlaying && !nextProps.isPlaying) {
      // stop the interval
      const { timerInterval } = this.state;
      clearInterval(timerInterval);
    }
  }

  _formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  render() {
    const {
      isPlaying, elapsedTime, timerDuration, startTimer, stoptTimer,
    } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.upper}>
          <Text style={styles.time}>{this._formatTime(timerDuration - elapsedTime)}</Text>
        </View>
        <View style={styles.lower}>
          <Button
            iconName={isPlaying ? 'stop-circle' : 'play-circle'}
            onPress={isPlaying ? stoptTimer : startTimer}
          />
        </View>
      </View>
    );
  }
}

Timer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  elapsedTime: PropTypes.number.isRequired,
  timerDuration: PropTypes.number.isRequired,
  startTimer: PropTypes.func.isRequired,
  stoptTimer: PropTypes.func.isRequired,
};

export default Timer;
