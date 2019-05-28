import { userConstants } from '_constants';
import { accountService, notificationServices } from 'services';
import { alertActions } from './';
import { history, askForPermissioToReceiveNotifications } from '_helpers';
import { toast } from 'react-toastify';

export const userActions = {
  login,
  logout,
  register,
  getAll,
  deleteUser
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));
    accountService.login(username, password)
      .then(
        res => {
          let user = res.data;
          dispatch(success(user));
          user = JSON.stringify(user);
          localStorage.setItem('user', user);
          history.push('/my_flows');
        }
      ).catch(error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      })

    // Fake login
    // setTimeout(() => {
    //   const token = 1234788989
    //   localStorage.setItem('user', token);
    //   dispatch(success(token));
    //   history.push('/my_flows');
    // }, 500)
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
  accountService.logout().then((res) => {
    localStorage.removeItem('user');
    history.push('/login');
  }).catch(err => { console.error(err); localStorage.removeItem('user'); history.push('/login') });

  return { type: userConstants.LOGOUT };
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    accountService.register(user)
      .then(
        user => {
          dispatch(success());
          toast.success("New user is created");
          // history.push('/login');
          // dispatch(alertActions.success('Registration successful'));
        }
      ).catch(error => {
        toast.error("Register failure");
        // dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
      })
  };

  function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    accountService.getAll()
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: userConstants.GETALL_REQUEST } }
  function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
  function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteUser(id) {
  return dispatch => {
    dispatch(request(id));

    accountService.delete(id)
      .then(
        user => dispatch(success(id)),
        error => dispatch(failure(id, error.toString()))
      );
  };

  function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
  function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
  function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}