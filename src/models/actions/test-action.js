export const ADD_TEST = 'ADD_TEST';
export const REDUCE_TEST = 'REDUCE_TEST';

export function addTest(addNum) {
  return {
    type: ADD_TEST,
    payload: { addNum }
  }
}

export function reduceTest(reduceNum) {
  return {
    type: REDUCE_TEST,
    payload: { reduceNum }
  }
}