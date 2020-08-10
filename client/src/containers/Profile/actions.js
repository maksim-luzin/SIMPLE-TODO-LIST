import * as authService from 'src/services/authService';
import {
  SET_USER,
  USER_LOGOUT
} from './actionTypes';

const setToken = token => localStorage.setItem('token', token);

const setUser = user => async dispatch => dispatch({
  type: SET_USER,
  payload: user
});

const logoutUser = () => ({
  type: USER_LOGOUT,
  payload: null
});

const setAuthData = (user = null, token = '') => (dispatch, getRootState) => {
  setToken(token);
  if (!user) {
    dispatch(logoutUser());
  }
  setUser(user)(dispatch, getRootState);
};

const handleAuthResponse = authResponsePromise => async (dispatch, getRootState) => {
  const { user, token } = await authResponsePromise;
  setAuthData(user, token)(dispatch, getRootState);
};

export const login = request => handleAuthResponse(authService.login(request));

export const register = request => handleAuthResponse(authService.registration(request));

export const loadCurrentUser = () => async (dispatch, getRootState) => {
  const user = await authService.getCurrentUser();
  setUser(user)(dispatch, getRootState);
};

export const logout = () => setAuthData();
