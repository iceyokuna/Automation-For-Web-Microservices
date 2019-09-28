const productionServer = "https://the-timemachine.com";
const developmentServer = "http://103.212.181.125";

// const mode = "public";
const mode = "local";

if (mode === "local") {
  var workflowEngineUrl = "http://127.0.0.1:8000";
  var googleServiceUrl = "http://127.0.0.1:8004";
  var accountManagerUrl = `${developmentServer}:8003`;
  var serviceManagerUrl = `${developmentServer}:8004`;
} else if (mode === "public") {
  var workflowEngineUrl = "http://127.0.0.1:8000";
  var googleServiceUrl = "https://c3160663.ngrok.io";
  var accountManagerUrl = `${developmentServer}:8003`;
  var serviceManagerUrl = `${developmentServer}:8004`;
}


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

  GET_PREVIEW_INPUT_FORM_URL: `${workflowEngineUrl}/preview/`,
  GOOGLE_DOC_API_CREATE_URL: `${googleServiceUrl}/api/docs/create/`,
};