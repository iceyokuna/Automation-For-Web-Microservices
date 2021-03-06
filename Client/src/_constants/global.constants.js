// const productionServer = "http://the-timemachine.com";
const productionServer = "http://103.212.181.125";
const { NODE_ENV } = process.env;
const hostname = NODE_ENV === "production" ? productionServer : "localhost";

var socketUrl = `${hostname}:8000`;
var workflowEngineUrl = `${hostname}:8001`;
var googleServiceUrl = `${hostname}:8001`;
var accountManagerUrl = `${hostname}:8003`;
var serviceManagerUrl = `${hostname}:8004`;

console.log({ hostname });

export const globalConstants = {
  USER_REGISTER_URL: `${accountManagerUrl}/api/register`,
  USER_LOGIN_URL: `${accountManagerUrl}/api/login`,
  USER_LOGOUT_URL: `${accountManagerUrl}/api/logout`,
  USER_WORKFLOW_URL: `${accountManagerUrl}/api/workflow`,
  DELETE_COLLABORATORS_URL: `${accountManagerUrl}/api/collaborator/delete/`,
  WORKFLOW_LOG_URL: `${accountManagerUrl}/api/log/`,
  COLLABORATORS_URL: `${accountManagerUrl}/api/collaborator/`,
  SET_FCM_TOKEN_URL: `${accountManagerUrl}/api/fcm_token/`,
  NOTIFICATION_URL: `${accountManagerUrl}/api/notification/`,

  GET_ALL_SERVICES_URL: `${serviceManagerUrl}/api/all_services/`,
  GET_ALL_USER_SERVICES_URL: `${serviceManagerUrl}/api/all_user_service/`,
  UPDATE_USER_SERVICE_URL: `${serviceManagerUrl}/api/user_service/`,
  CREATE_USER_SERVICE_URL: `${serviceManagerUrl}/api/service/add`,
  DELETE_USER_SERVICE_URL: `${serviceManagerUrl}/api/user_service/`,
  USER_METHOD_URL: `${serviceManagerUrl}/api/user_method/`,
  GET_ALL_METHOD_URL: `http://localhost:8000/get_all_methods/`,
  GET_PREVIEW_INPUT_FORM_URL: `${workflowEngineUrl}/preview/`,
  GOOGLE_DOC_API_CREATE_URL: `${googleServiceUrl}/api/docs/create/`,
  EXECUTE_FLOW_SOCKET_URL: `${socketUrl}/execute/`
};
