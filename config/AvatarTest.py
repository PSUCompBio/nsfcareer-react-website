#!/usr/bin/env python3


import os
import sys
import requests
import time
import io
import zipfile
import json
from PIL import Image
from io import BytesIO
from time import gmtime, strftime

# note: client_id and client_secret below is from the
# the Avatar3d SDK website. There are IDs created for
# "Developer Access" and "Client Access". The information
# below is from the "Client Access" section.
AUTH_FORM = {
    'grant_type': 'client_credentials',
    'client_id': sys.argv[2],
    'client_secret': sys.argv[3],
}


AUTH_FILE = 'config/oauth.json'
PLAYER_FILE = 'config/player.json'


def get_auth_header():
    now = time.time()
    access_token = None
    token_type = None

    if os.path.isfile(AUTH_FILE):
        #print('Checking previously saved token validity')

        with open(AUTH_FILE) as ifd:
            auth = json.load(ifd)

        expired = now > auth['expires']

        if not expired:
            access_token = auth['access_token']
            token_type = auth['token_type']

    request_new = not (access_token and token_type)

    if request_new:
        #print('Getting a token...')
        rsp = requests.post(
            'https://api.avatarsdk.com/o/token/',
            data=AUTH_FORM
        ).json()

        access_token = rsp['access_token']
        token_type = rsp['token_type']

        #print('Saving token for future use')
        with open(AUTH_FILE, 'w') as ofd:
            # reserve 1 minute to avoid expiration in the middle of
            # avatar retrieval. Works only for relatively fast
            # connections
            rsp['expires'] = now + rsp['expires_in'] - 60
            json.dump(rsp, ofd)

    headers = {'Authorization': '{0} {1}'.format(token_type, access_token)}

    return headers


def get_player_uid_header(headers):
    player_uid = None

    if os.path.isfile(PLAYER_FILE):
        #print('Loading previously saved PlayerUID')

        with open(PLAYER_FILE) as ifd:
            player = json.load(ifd)

        player_uid = player['code']

    if not player_uid:
        #print('Creating a player...')

        player_form = {'comment': 'test_py'}
        rsp = requests.post(
            'https://api.avatarsdk.com/players/',
            data=player_form, headers=headers
        ).json()

        player_id = rsp['code']

        #print('Saving PlayerUID future use')
        with open(PLAYER_FILE, 'w') as ofd:
            json.dump(rsp, ofd)

    return {'X-PlayerUID': player_uid}


def main(selfie):
    headers = get_auth_header()

    headers.update(
        get_player_uid_header(headers)
    )
  
    #print('Uploading image...')
    data = {'name': 'test', 'pipeline': 'head_1.2'}
    files = {'photo': BytesIO(requests.get(selfie).content)}
    rsp = requests.post(
        'https://api.avatarsdk.com/avatars/',
        headers=headers, data=data, files=files
    ).json()

    avatar_status_url = rsp['url']

    #print('Waiting for avatar to compute...', end='', flush=True)
    while True:
        rsp = requests.get(avatar_status_url, headers=headers).json()

        #print('.', end='', flush=True)

        if rsp['status'] == 'Completed':
            #print('Completed!')
            break

        time.sleep(3)

    #print('Downloading avatar...')
    mesh = requests.get(rsp['mesh'], headers=headers)
    texture = requests.get(rsp['texture'], headers=headers)

    #print('Saving avatar model to a ply file...')
    directoryName = 'avatars/' + sys.argv[4] + '/head'
    with io.BytesIO(mesh.content) as zipmemory:
        with zipfile.ZipFile(zipmemory) as archive:
            archive.extractall(directoryName)

    #print('Saving texture to a jpg file')
    with open(directoryName + '/model.jpg', 'wb') as texture_file:
        texture_file.write(texture.content)
		
		
	#print('Uploading image...')
    data = {'name': 'test', 'pipeline': 'static'}
    files = {'photo': BytesIO(requests.get(selfie).content)}
    rsp = requests.post(
        'https://api.avatarsdk.com/avatars/',
        headers=headers, data=data, files=files
    ).json()

    avatar_status_url = rsp['url']

    #print('Waiting for avatar to compute...', end='', flush=True)
    while True:
        rsp = requests.get(avatar_status_url, headers=headers).json()

        #print('.', end='', flush=True)

        if rsp['status'] == 'Completed':
            #print('Completed!')
            break

        time.sleep(3)

    #print('Downloading avatar...')
    mesh = requests.get(rsp['mesh'], headers=headers)
    texture = requests.get(rsp['texture'], headers=headers)

    #print('Saving avatar model to a ply file...')
    directoryName = 'avatars/' + sys.argv[4] + '/face'
    with io.BytesIO(mesh.content) as zipmemory:
        with zipfile.ZipFile(zipmemory) as archive:
            archive.extractall(directoryName)

    #print('Saving texture to a jpg file')
    with open(directoryName + '/model.jpg', 'wb') as texture_file:
        texture_file.write(texture.content)	

    #print('Ready! Look for model.ply and model.jpg in your current folder!')
    return 'avatars/' + sys.argv[4]


if __name__ == '__main__':
    sys.stdout.flush()
    if AUTH_FORM['client_id'] == 'XXX' or AUTH_FORM['client_secret'] == 'XXX':
        print((
            'Before running this script, please replace \'XXX\' in '
            'lines 13 and 14 with your `client_id` and '
            '`client_secret` correspondingly. You can get them by '
            'logging to https://accounts.avatarsdk.com/developer/ '
            'with your credentials. Do not forget to set Authorization Grant '
            'to `Client credentials`!'
        ))
        sys.exit(1)

    if len(sys.argv) < 2:
        print('Specify selfie file')
        sys.exit(1)
    if len(sys.argv) < 4:
        print('Specify Client ID and Client Secret')
        sys.exit(1)    
    dName = main(sys.argv[1])
    sys.stdout.write(dName)