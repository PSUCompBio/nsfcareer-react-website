
// ======================================
//         INITIALIZING DEPENDENCIES
// ======================================
const express = require('express');
	app = express(),
	bodyParser = require("body-parser"),
	AWS = require('aws-sdk'),
	cors = require('cors'),
	utility = require('./utilities/utility');

// ======================================
//         	GLOBAL VARIABLES
// ======================================
const successMessage = "success";
const failureMessage = "failure";
const apiPrefix = "/api/"

// ======================================
//       CONFIGURING AWS SDK & EXPESS
// ======================================

// AWS Credentials loaded
AWS.config.loadFromPath('./config/AWSConfig.json');

// DynamoDB Object created to do SCAN , PUT , UPDATE operations
const docClient = new AWS.DynamoDB.DocumentClient({
	convertEmptyValues: true
});

// Express configured for POST Request handling of multiple types
// xxx-url encoded (form type)  & json type
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// ============================================
//     FUNCTIONS OR IMPLEMENTATIONS
// ============================================

// Function to fetch all the items of the table 'numbers' from DynamoDB
const fetchNumbers = () => {
	return new Promise(function (resolve, reject) {
		var params = {
			TableName: 'numbers'
		};
		//   var items
		var items = [];
		docClient.scan(params).eachPage((err, data, done) => {
			if (err) {
				reject(err);
			}
			if (data == null) {
				resolve(utility.concatArrays(items));
			} else {
				items.push(data.Items);
			}
			done();
		});
	})
}

const putNumbers = (numbersData) => {
	return new Promise(function (resolve, reject) {
		let param = {
			TableName: "numbers",
			Item: numbersData
		};
		docClient.put(param,function(err,data){
			if(err){
				console.log("ERROR IN TABLE_UPDATE=======\n",err);
				reject(err)
			}
			else{
				resolve(data)
			}
		})
	})
	}

// ============================================
//     				ROUTES
// ============================================

app.post(`${apiPrefix}getNumbers`, (req, res) => {
	console.log("API CAlled");
	
	fetchNumbers().then((numbers) => {
		res.send({
			message: successMessage,
			data: numbers
		})
	}).catch((err) => {
		console.log("Error while fetching numbers", err)
		res.send({
			message: failureMessage,
			data: [],
			error: err
		})
	})
});

app.post(`${apiPrefix}putNumbers`, (req, res) => {
	console.log("API CAlled put",req.body);
	
	putNumbers(req.body).then((data) => {
		res.send({
			message: successMessage
		})
	}).catch((err) => {
		
		res.send({
			message: failureMessage,
			error: err
		})
	})
});

// Configuring port for APP
const port = 3001;
const server = app.listen(port, function () {
	console.log('Magic happens on ' + port);
});

