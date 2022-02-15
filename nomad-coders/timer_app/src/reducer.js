// Import

// Actions
const START_TIMER = 'START_TIMER';
const STOP_TIMER = 'STOP_TIMER';
const ADD_SECOND = 'ADD_SECOND';

// Action Creators
function startTimer() {
  return {
    type: START_TIMER,
  };
}

function stoptTimer() {
  return {
    type: STOP_TIMER,
  };
}

function addSecond() {
  return {
    type: ADD_SECOND,
  };
}

// Reducer Funtions
function applyStartTimer(state) {
  return {
    ...state,
    isPlaying: true,
  };
}

function applyStopTimer(state) {
  return {
    ...state,
    isPlaying: false,
    elapsedTime: 0,
  };
}

function applyAddSecond(state) {
  return state.elapsedTime < state.timerDuration
    ? {
      ...state,
      elapsedTime: state.elapsedTime + 1,
    }
    : {
      ...state,
      isPlaying: false,
      elapsedTime: 0,
    };
}

// Reducer
const TIMER_DURATION = 1500;

const initialState = {
  isPlaying: false,
  elapsedTime: 0,
  timerDuration: TIMER_DURATION,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case START_TIMER:
      return applyStartTimer(state);
    case STOP_TIMER:
      return applyStopTimer(state);
    case ADD_SECOND:
      return applyAddSecond(state);
    default:
      return state;
  }
}

// Export Action Creators
const actionCreators = {
  startTimer,
  stoptTimer,
  addSecond,
};

export { actionCreators };

// Export Reducer
export default reducer;
