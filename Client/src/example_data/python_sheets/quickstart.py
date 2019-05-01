from apiclient import discovery
import httplib2
from oauth2client import client


# (Receive auth_code by HTTPS POST)


# Set path to the Web application client_secret_*.json file you downloaded from the
# Google API Console: https://console.developers.google.com/apis/credentials
CLIENT_SECRET_FILE = 'client_secret.json'
auth_code = "4/PQExj1V9E0FJiOkRVURGJsOzlAFJ5f3B727xPLNyupNV7w6XCnVTLqVqw9t_0Qzmpt63W0kBuKvDHnlyjYY-eOI"

# Exchange auth code for access token, refresh token, and ID token
credentials = client.credentials_from_clientsecrets_and_code(
    CLIENT_SECRET_FILE,
    ['https://www.googleapis.com/auth/drive.file','profile', 'email'],
    auth_code)

# Call Google API
http_auth = credentials.authorize(httplib2.Http())
drive_service = discovery.build('drive', 'v3', http=http_auth)
##appfolder = drive_service.files().get(fileId='appfolder').execute()

# Get profile info from ID token
userid = credentials.id_token['sub']
email = credentials.id_token['email']

print(userid, email)
