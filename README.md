# nsfcareer-react-application

## IMPORTANT: do not upload Access keys to web (e.g. github, google drive)

### Initialization & Dependencies configuration (Local Machine Set-Up) :
- ###### NOTE : Skip this step if you're planning to deploy this application on for production. Follow the steps given in end to deploy for production !
- #### Install all the required dependencies by executing following commands :
- ##### Pre-Requisites
    - Nodejs (min version >= 10.X)
```
# If on Windows : Use Power-Shell to execute below commands
# If on Linux : sudo is required with -g based npm commands (They are global dependencies being installed in System)

# To run npm commands concurrently
$ sudo npm install -g concurrently

# To create daemon process of node server for development purpose
$ sudo npm install -g nodemon

# To install Project's dependencies
# Then in project root's directory run the following commands :
$ sudo npm run init

```

### To Run Application Locally:
#### Step 0 : Install Dependencies by following above steps.
#### Step 1 : Update config file in config/configuration_keys.json
  - ###### Add AWS Access Key ID and AWS Secret Access Key ID and AWS Buckets name in configuration_keys.json.
    - To do this, In AWS Management Console, Search and open IAM service, Then Select Users from Left-hand Side Pane. Select your user-name listed in Table. Then click on Security Credentials Tab, there you can access & view your all AWS Access Key IDs. If the user does not have a user account, then create one.
- ###### Update avatar3dClientId & avatar3dclientSecret in configuration_keys.json file. Note: avatar3dClientId and avatar3dclientSecret from the the Avatar3d SDK website. There are IDs created for "Developer Access"  and "Client Access". This information is from the "Client Access" section.
- ###### Update your AWS Cognito Credentials including: userPoolId, region & ClientId in configuration_keys.json.
    - You can find these in AWS Cognito service page. The userPooolID can be found under General settings, "Pool Id". The ClientID is under App integration, then App client settings, then there is a title for the App client, and under that there is "ID", this is the ID to use.
- ###### Update variable ( ComputeInstanceEndpoint ) with the endpoint of Compute Instance ( Docker Image deployed with NodeJS Service ) in below given format to generate Mesh Data :
    - E.g http://yourcomputeinstance.com/api/
#### Step 3 : Run Application locally :

```
# If on Windows : Use Power-Shell to execute below commands
# To run application normally
$ npm start

# To run application in dev-mode
$ npm run start-dev
```
#### Step 4 : Access application on URL -> http://localhost:3000 in your browser.
### To Deploy Application for Production Build ( AWS Elastic Beanstalk ):
#### In Local System
 - Generate a build of client side (Front-end) code;
  - ``` cd client ; npm run build ; ```
 - After successful build, Delete node_modules in /client/node_modules & root direcotory of repository.
 - Create a Zip file of repository from root directory excluding .git Directory
#### In AWS Elastic Beanstalk Management Console :
  - Click on `Create New Application` on Top Right corner.
  - Enter the name of application. Click on 'OK'.
  - Create an environment by clicking on `Create one now.` And Select Web server environment.
  - Enter Domain Name and check its availability.
  - Select NodeJS as preconfigured platform.
  - In Application Code , Select `Upload your code`. And upload the zip you created in your local computer of the repository.
  - Click on Configure more options, And Click on Software configuration . Click on modify .
  - Add node command as `npm run server`. And save the configuration.
  - Click on Create Environment. After process completion , A `URL` will be generated .
  - You can find this URL in the dashboard of Selected Application in AWS Elastic Beanstalk

### Major Dependencies

| Dependency  | README |
| ------ | ------ |
| NodeJS | https://nodejs.org/|
| ReactJS | https://reactjs.org/ |
