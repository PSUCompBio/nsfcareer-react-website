# nsfcareer-react-application

## IMPORTANT: do not upload Access keys to web (e.g. github, google drive)

### Initialization & Dependencies configuration (Local Machine Set-Up) :
- ###### NOTE : Skip this step if you're planning to deploy this application on for production. Follow the steps given in end to deploy for production !
- #### Install all the required dependencies by executing following commands :
- ##### Pre-Requisites
    - A Debian based Linux System (Ubuntu)
    - Nodejs (min version >= 10.X)
```
# If on linux : sudo is required with -g based npm commands (They are global dependencies being installed in System)

# To run npm commands concurrently
$ sudo npm install -g concurrently

# To create daemon process of node server for development purpose
$ sudo npm install -g nodemon

# To install Project's dependencies
# Then in project root's directory run the following commands :
$ npm run init

```

### To Run Application Locally : 
#### Step 0 : Install Dependencies by following above steps.
#### Step 1 : Update config file in config/configuration_keys.json
  - ###### Add AWS Access Key ID and AWS Secret Access Key ID and AWS Buckets name in configuration_keys.json.
    - To do this, In AWS Management Console, Search and open IAM service, Then Select Users from Left-hand Side Pane. Select your user-name listed in Table. Then click on Security Credentials Tab, there you can access & view your all AWS Access Key IDs. If the user does not have a user account, then create one.
- ###### Update avatar3dClientId & avatar3dclientSecret in configuration_keys.json file. Note: avatar3dClientId and avatar3dclientSecret from the the Avatar3d SDK website. There are IDs created for "Developer Access"  and "Client Access". This information is from the "Client Access" section.
- ###### Update your AWS Cognito Credentials including: userPoolId, region & ClientId in configuration_keys.json.
    - You can find these in AWS Cognito service page. The userPooolID can be found under General settings, "Pool Id". The ClientID is under App integration, then App client settings, then there is a title for the App client, and under that there is "ID", this is the ID to use. 
#### Step 3 : Run Application locally :
```
# To run application normally 
$ npm start

# To run application in dev-mode 
$ npm run start-dev
```
#### Step 4 : Access application on URL -> http://localhost:3000 in your browser.
### To Deploy Application for Production Build :
- Clone this repository https://github.com/vradars/react-website-bash-script.git
- Open the repository .And follow the instructions from README.md to execute the scripts in above repository.
- Follow the on-console instructions & successfully deploy your application.

### Major Dependencies

| Dependency  | README |
| ------ | ------ |
| NodeJS | https://nodejs.org/|
| ReactJS | https://reactjs.org/ |
