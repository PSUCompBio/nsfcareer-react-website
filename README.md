# nsfcareer-react-application

## Steps to run the application
 - Duplicate the /config/AWSConfig.example.json to config/AWSConfig.json

- Update your AWS Access key ID , Secret Key & Region in
   /config/AWSConfig.json (this files is included in
	 .gitignore so it will not be committed on future pushes to github)

 ------
 - Duplicate the config/cognito_configuration.example.js to config/cognito_configuration.js

 - Update your AWS Cognito Credentials including: userPoolId, region & ClientId in
   the file residing in /config/cognito_configuration.example.js.

   - Set  apiVersion as "2016-04-19"

------
- Duplicate the AvatarTest.example.py to AvatarTest.py

- Add ClientId and client secret of "Client Access" in AvatarTest.py file.

------

- Duplicate the .env_example to .env

- Add AWS Access Key ID and AWS Secret Access Key ID to .env file.

------
- Duplicate the oauth.example.json to oauth.json

- Update access token: and expiration date code

------

## IMPORTANT: do not upload Access keys to web (e.g. github, google drive)
```sh

# Pre-Requisite dependencies

# If on linux : sudo is required with -g based npm commands (They are global dependencies being installed in System)

# To run npm commands concurrently
$ sudo npm install -g concurrently

# To create daemon process of node server for development purpose
$ sudo npm install -g nodemon

# To install Project's dependencies
# Then in project root's directory run the following commands :
$ npm run init

# To Run the Application locally:
$ npm start

# To Run the Application in Dev mode:
$ npm run start-dev
```
