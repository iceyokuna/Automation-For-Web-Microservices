from apiclient import discovery
import httplib2
from oauth2client import client

# (Receive auth_code by HTTPS POST)

# Set path to the Web application client_secret_*.json file you downloaded from the
# Google API Console: https://console.developers.google.com/apis/credentials
CLIENT_SECRET_FILE = 'client_secret.json'
auth_code = "4/WQEXGPwZqeC6FpXV8nJkTAgBiD5073J2f5Zp2ImCuQ9AmmrBxdGzP7_7hWvqGmRahSaUmxMtVGbTiCZHnaT7y1w"

# Exchange auth code for access token, refresh token, and ID token
credentials = client.credentials_from_clientsecrets_and_code(
    CLIENT_SECRET_FILE,
    ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/documents.readonly'],
    auth_code)

# Call Google API
service = discovery.build('docs', 'v1', credentials=credentials)

title = 'My Document'
body = {
    'title': title
}
doc = service.documents().create(body=body).execute()
print('Created document with title: {0}'.format(
    doc.get('title')))
    