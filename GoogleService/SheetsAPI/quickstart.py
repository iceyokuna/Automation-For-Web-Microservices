from apiclient import discovery
import httplib2
from oauth2client import client


# (Receive auth_code by HTTPS POST)

# The ID and range of a sample spreadsheet.
SAMPLE_SPREADSHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'
SAMPLE_RANGE_NAME = 'Class Data!A2:E'


# Set path to the Web application client_secret_*.json file you downloaded from the
# Google API Console: https://console.developers.google.com/apis/credentials
CLIENT_SECRET_FILE = 'client_secrets.json'
auth_code = "4/QgH1Hor9-Zrl8JDIjDd2YMhB-5k74hGBJTj4aS17USboOFpBqpiHcMnevtarnfOZoNEtqmBfqMTUmCJvG18hIsU"


# Exchange auth code for access token, refresh token, and ID token
credentials = client.credentials_from_clientsecrets_and_code(
    CLIENT_SECRET_FILE,
    ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/spreadsheets.readonly'],
    auth_code)

# Call Google API
##http_auth = credentials.authorize(httplib2.Http())
service = discovery.build('sheets', 'v4',  credentials=credentials)

sheet = service.spreadsheets()

spreadsheet = {
    'properties': {
        'title': "sheet example ja"
    }
}
spreadsheet = sheet.create(body=spreadsheet,
                                    fields='spreadsheetId').execute()
print('Spreadsheet ID: {0}'.format(spreadsheet.get('spreadsheetId')))
##appfolder = drive_service.files().get(fileId='appfolder').execute()

# Call the Sheets API
##sheet = service.spreadsheets()
##result = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
##                            range=SAMPLE_RANGE_NAME).execute()
##values = result.get('values', [])
##
##if not values:
##    print('No data found.')
##else:
##    print('Name, Major:')
##    for row in values:
##        # Print columns A and E, which correspond to indices 0 and 4.
##        print('%s, %s' % (row[0], row[4]))


