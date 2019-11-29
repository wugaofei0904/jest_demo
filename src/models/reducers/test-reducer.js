import  { ADD_TEST, REDUCE_TEST }  from '../actions/test-action';

const initialState = {
  testData: 0
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TEST: {
      return {
        ...state,
        testData: state.testData + action.payload.addNum
      }
    }
    case REDUCE_TEST: {
      return {
        ...state,
        testData: state.testData - action.payload.reduceNum
      }
    }
    default:
      return state;
  }
}