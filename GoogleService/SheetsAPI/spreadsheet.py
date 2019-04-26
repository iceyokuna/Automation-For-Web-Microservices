from pprint import pprint

from googleapiclient import discovery

# TODO: Change placeholder below to generate authentication credentials. See
# https://developers.google.com/sheets/quickstart/python#step_3_set_up_the_sample
#
# Authorize using one of the following scopes:
#     'https://www.googleapis.com/auth/drive'
#     'https://www.googleapis.com/auth/drive.file'
#     'https://www.googleapis.com/auth/spreadsheets'
credentials = None

service = discovery.build('sheets', 'v4', credentials=credentials)

spreadsheet_body = {
    # TODO: Add desired entries to the request body.
    'mimeType': 'application/vnd.google-apps.spreadsheet',
  'title': 'Name of Spreadsheet',
}

request = service.spreadsheets().create(body=spreadsheet_body)
response = request.execute()

# TODO: Change code below to process the `response` dict:
pprint(response)

