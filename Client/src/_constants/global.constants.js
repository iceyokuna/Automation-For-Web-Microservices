const productionServer = "https://the-timemachine.com";
const developmentServer = "http://178.128.214.101";

export const globalConstants = {
  USER_REGISTER_URL: `${developmentServer}:8003/api/register`,
  USER_LOGIN_URL: `${developmentServer}:8003/api/login`,
  USER_LOGOUT_URL: `${developmentServer}:8003/api/logout`,
  USER_WORKFLOW_URL: `${developmentServer}:8003/api/workflow`,

  GET_ALL_SERVICES_URL: `${developmentServer}:8004/api/all_services`,
  GET_ALL_INBOX_TASKS_URL: `https://5c8f65998447f30014cb826b.mockapi.io/api/endUserTasks`,
  GET_ALL_NOTIFICATIONS_URL: `https://5c8f65998447f30014cb826b.mockapi.io/api/notifications`,
  GET_ALL_USER_SERVICES_URL: `${developmentServer}:8004/api/all_user_service`,

  COLLABORATORS_URL: `${developmentServer}:8004/api/collaborator`,
  SET_FCM_TOKEN_URL: `${developmentServer}:8004/api/fcm_token`,

  CREATE_USER_SERVICE_URL: `${developmentServer}:8003/api/service/add`,
  DELETE_USER_SERVICE_URL: `${developmentServer}:8003/api/user_service`,

  USER_METHOD_URL: `${developmentServer}:8003/api/user_method`,

  DELETE_COLLABORATORS_URL: `${developmentServer}:8003/api/collaborator/delete`,


};