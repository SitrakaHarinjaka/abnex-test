import { ActionTypes } from '../constants/action-types';

const initialState = {
  cars: [],
  comments: [],
};
export const carReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CARS:
      return { ...state, cars: payload };
    default:
      return state;
  }
};

export const selectedCarReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_CARS:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export const logUser = (state = { isLogged: false }, { type, payload }) => {
  switch (type) {
    case ActionTypes.LOG_USER:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export const signinUSer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SIGNIN_USER:
      return { ...state, ...payload };

    default:
      return state;
  }
};
export const getComments = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_COMMENTS:
      return { ...state, comments: [...state.comments, payload] };
    default:
      return state;
  }
};

export const setUserConnected = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.CONNECTED_USER:
      return { ...state, ...payload };

    default:
      return state;
  }
};
