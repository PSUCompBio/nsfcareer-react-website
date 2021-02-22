const AWS = require("aws-sdk");
var config = require('../config/configuration_keys.json'); 

var myconfig = AWS.config.update({
    accessKeyId: config.awsAccessKeyId, secretAccessKey: config.awsSecretAccessKey, region: config.region
});
const docClient = new AWS.DynamoDB.DocumentClient({
    convertEmptyValues: true,
});

function concatArrays(arrays) {
    return [].concat.apply([], arrays);
}

function getUserDetails(user_name, cb) {
    return new Promise((resolve, reject) => {
        var db_table = {
            TableName: "users",
            Key: {
                user_cognito_id: user_name,
            },
            ProjectionExpression: "last_name,first_name,team,sensor,organization,sensor_id_number,player_position, user_cognito_id",
			};
        docClient.get(db_table, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function getUserDetailBySensorId(sensor, sensor_id_number) {
    return new Promise((resolve, reject) => {
        let params;
        if (sensor) {
            params = {
                TableName: "users",
                FilterExpression: "sensor = :sensor and sensor_id_number = :sensor_id_number",
                ExpressionAttributeValues: {
                    ":sensor": sensor,
                    ":sensor_id_number": sensor_id_number
                }
            };
        } else {
            params = {
                TableName: "users",
                FilterExpression: "sensor_id_number = :sensor_id_number",
                ExpressionAttributeValues: {
                    ":sensor_id_number": sensor_id_number
                }
            };
        }
        
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}

function getUserDetailByPlayerId(sensor_id_number) {
    return new Promise((resolve, reject) => {
        let params;
       
        params = {
            TableName: "users",
            FilterExpression: "contains(player_id, :player_id)",
            ExpressionAttributeValues: {
                ":player_id": sensor_id_number
            }
        };
        
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}

function getUserDetailByAccountId(account_id) {
    return new Promise((resolve, reject) => {
        let params;
       
        params = {
            TableName: "users",
            FilterExpression: "contains(account_id, :account_id)",
            ExpressionAttributeValues: {
                ":account_id": account_id
            }
        };
        
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}
function updateSimulationFileStatusInDB(obj) {
    return new Promise((resolve, reject) => {
        var userParams = {
            TableName: "users",
            Key: {
                user_cognito_id: obj.user_cognito_id,
            },
            UpdateExpression:
                "set is_selfie_simulation_file_uploaded = :is_selfie_simulation_file_uploaded",
            ExpressionAttributeValues: {
                ":is_selfie_simulation_file_uploaded": true,
            },
            ReturnValues: "UPDATED_NEW",
        };
        docClient.update(userParams, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function addTeam(obj) {
    return new Promise((resolve, reject) => {
        var dbInsert = {
            TableName: "teams",
            Item: obj,
        };
        docClient.put(dbInsert, function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function addPlayer(obj) {
    return new Promise((resolve, reject) => {
        var dbInsert = {
            TableName: "users",
            Item: obj,
        };
        docClient.put(dbInsert, function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function deleteTeam(obj) {
    console.log("IN delete functionality");
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "teams",
            Key: {
                organization: obj.organization,
                team_name: obj.team_name,
            },
        };
        docClient.delete(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function fetchAllTeamsInOrganization(org) {
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "teams",
            KeyConditionExpression: "organization = :organization",
            ExpressionAttributeValues: {
                ":organization": org,
            },
        };
        var item = [];
        docClient.query(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}

function deleteTeamFromOrganizationList(org, team_name) {
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "teams",
            Key: {
                organization: org,
                team_name: "teams",
            },
        };
        docClient.get(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                var item = data.Item;
                var updatedList = item.team_list.filter(function (team) {
                    return team != team_name;
                });
                console.log(updatedList);
                var dbInsert = {
                    TableName: "teams",
                    Key: {
                        organization: org,
                        team_name: "teams",
                    },
                    UpdateExpression: "set #list = :newItem ",
                    ExpressionAttributeNames: {
                        "#list": "team_list",
                    },
                    ExpressionAttributeValues: {
                        ":newItem": updatedList,
                    },
                    ReturnValues: "UPDATED_NEW",
                };
                docClient.update(dbInsert, function (err, data) {
                    if (err) {
                        console.log("ERROR WHILE DELETING DATA", err);
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            }
        });
    });
}

function addTeamToOrganizationList(org, team_name) {
    return new Promise((resolve, reject) => {
        // if flag is true it means data array is to be created
        let params = {
            TableName: "teams",
            Key: {
                organization: org,
                team_name: "teams",
            },
        };
        docClient.get(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                console.log("DATA IS ADD USER TO ORG ", data);
                if (Object.keys(data).length == 0 && data.constructor === Object) {
                    var dbInsert = {
                        TableName: "teams",
                        Item: {
                            organization: org,
                            team_name: "teams",
                            team_list: [team_name],
                        },
                    };
                    docClient.put(dbInsert, function (err, data) {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                } else {
                    var dbInsert = {
                        TableName: "teams",
                        Key: {
                            organization: org,
                            team_name: "teams",
                        },
                        UpdateExpression: "set #list = list_append(#list, :newItem)",
                        ExpressionAttributeNames: {
                            "#list": "team_list",
                        },
                        ExpressionAttributeValues: {
                            ":newItem": [team_name],
                        },
                        ReturnValues: "UPDATED_NEW",
                    };

                    docClient.update(dbInsert, function (err, data) {
                        if (err) {
                            console.log("ERROR WHILE CREATING DATA", err);
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                }
            }
        });
    });
}

function getCumulativeAccelerationData(obj) {
    // return new Promise((resolve, reject) => {
    //     let params = {
    //         TableName: "sensor_details",
    //         KeyConditionExpression:
    //             "team = :team and begins_with(player_id,:player_id)",
    //         ExpressionAttributeValues: {
    //             ":player_id": obj.player_id,
    //             ":team": obj.team,
    //         },
    //     };
    //     var item = [];
    //     docClient.query(params).eachPage((err, data, done) => {
    //         if (err) {
    //             reject(err);
    //         }
    //         if (data == null) {
    //             resolve(concatArrays(item));
    //         } else {
    //             item.push(data.Items);
    //         }
    //         done();
    //     });
    // });

    return new Promise((resolve, reject) => {
        const player_obj = {};
        player_obj.organization = obj.organization;
        player_obj.team_name = obj.team;
        if (obj.brand && obj.brand != 'null') {
            player_obj.sensor = obj.brand;
        }
        getOrganizationData(player_obj)
            .then (org => {
                if (org.length > 0) {
                    let params;
                    if (obj.brand && obj.brand != 'null') {
                        params = {
                            TableName: "sensor_details",
                            KeyConditionExpression:  "org_id = :org_id and begins_with(player_id,:player_id)",
                            FilterExpression: "sensor = :sensor and organization = :organization and team = :team",
                            ExpressionAttributeValues: {
                                ":org_id": org[0].organization_id,
                                ":sensor": obj.brand,
                                ":organization": obj.organization,
                                ":team": obj.team,
                                ":player_id": obj.player_id + '$',
                            },
                            ScanIndexForward: false
                        };
                    } else {
                        params = {
                            TableName: "sensor_details",
                            KeyConditionExpression:  "org_id = :org_id and begins_with(player_id,:player_id)",
                            FilterExpression: "organization = :organization and team = :team",
                            ExpressionAttributeValues: {
                                ":org_id": org[0].organization_id,
                                ":organization": obj.organization,
                                ":team": obj.team,
                                ":player_id": obj.player_id + '$',
                            },
                            ScanIndexForward: false
                        };
                    }
                    
                    var item = [];
                    docClient.query(params).eachPage((err, data, done) => {
                        if (err) {
                            reject(err);
                        }
                        if (data == null) {
                            resolve(concatArrays(item));
                        } else {
                            item.push(data.Items);
                        }
                        done();
                    });
                } else {
                    resolve([]);
                }
            })    
    });
}

function getCumulativeAccelerationRecords(obj) {
    // return new Promise((resolve, reject) => {
    //     let params = {
    //         TableName: "sensor_details",
    //         KeyConditionExpression:
    //             "team = :team and begins_with(player_id,:player_id)",
    //         ExpressionAttributeValues: {
    //             ":player_id": obj.player_id,
    //             ":team": obj.team,
    //         },
    //     };
    //     var item = [];
    //     docClient.query(params).eachPage((err, data, done) => {
    //         if (err) {
    //             reject(err);
    //         }
    //         if (data == null) {
    //             resolve(concatArrays(item));
    //         } else {
    //             item.push(data.Items);
    //         }
    //         done();
    //     });
    // });

    return new Promise((resolve, reject) => {
        const player_obj = {};
        player_obj.organization = obj.organization;
        player_obj.team_name = obj.team;
        if (obj.brand && obj.brand != 'null') {
            player_obj.sensor = obj.brand;
        }
        getOrganizationData(player_obj)
            .then (org => {
                if (org.length > 0) {
                    let params;
                    if (obj.brand && obj.brand != 'null') {
                        params = {
                            TableName: "sensor_details",
                            KeyConditionExpression:  "org_id = :org_id and player_id= :player_id",
                            FilterExpression: "sensor = :sensor and organization = :organization and team = :team",
                            ExpressionAttributeValues: {
                                ":org_id": org[0].organization_id,
                                ":sensor": obj.brand,
                                ":organization": obj.organization,
                                ":team": obj.team,
                                ":player_id": obj.player_id,
                            },
                            ScanIndexForward: false
                        };
                    } else {
                        params = {
                            TableName: "sensor_details",
                            KeyConditionExpression:  "org_id = :org_id and player_id= :player_id",
                            FilterExpression: "organization = :organization and team = :team",
                            ExpressionAttributeValues: {
                                ":org_id": org[0].organization_id,
                                ":organization": obj.organization,
                                ":team": obj.team,
                                ":player_id": obj.player_id,
                            },
                            ScanIndexForward: false
                        };
                    }
                    
                    var item = [];
                    docClient.query(params).eachPage((err, data, done) => {
                        if (err) {
                            reject(err);
                        }
                        if (data == null) {
                            resolve(concatArrays(item));
                        } else {
                            item.push(data.Items);
                        }
                        done();
                    });
                } else {
                    resolve([]);
                }
            })    
    });
}


function getTeamDataWithPlayerRecords(obj) {
    return new Promise((resolve, reject) => {
        const player_obj = {};
        player_obj.organization = obj.organization;
        player_obj.team_name = obj.team;
        if (obj.sensor && obj.sensor != 'null') {
            player_obj.sensor = obj.sensor;
        }
        getOrganizationData(player_obj)
            .then (org => {
                if (org.length > 0) {
                    let params;
                    if (obj.sensor && obj.sensor != 'null') {
                        params = {
                            TableName: "sensor_details",
                            KeyConditionExpression:  "org_id = :org_id and begins_with(player_id,:player_id)",
                            FilterExpression: "sensor = :sensor and organization = :organization and team = :team",
                            ExpressionAttributeValues: {
                                ":org_id": org[0].organization_id,
                                ":sensor": obj.sensor,
                                ":organization": obj.organization,
                                ":team": obj.team,
                                ":player_id": obj.player_id + '$',
                            },
                            ExpressionAttributeNames : {
                                '#time': 'time',
                                '#date': 'date',
                                '#Impact_date': 'impact-date',
                                '#Impact_time': 'impact-time'
                            },
                            ProjectionExpression: " #time, #date,#Impact_date,#Impact_time, image_id,organization,player,player_id,sensor,simulation_status,team,user_cognito_id",
                            ScanIndexForward: false
                        };
                    } else {
                        params = {
                            TableName: "sensor_details",
                            KeyConditionExpression:  "org_id = :org_id and begins_with(player_id,:player_id)",
                            FilterExpression: "organization = :organization and team = :team",
                            ExpressionAttributeValues: {
                                ":org_id": org[0].organization_id,
                                ":organization": obj.organization,
                                ":team": obj.team,
                                ":player_id": obj.player_id + '$',
                            },
                            ExpressionAttributeNames : {
                                '#time': 'time',
                                '#date': 'date',
                                '#Impact_date': 'impact-date',
                                '#Impact_time': 'impact-time'
                            },
                            ProjectionExpression: " #time, #date,#Impact_date,#Impact_time, image_id,organization,player,player_id,sensor,simulation_status,team,user_cognito_id",
                            ScanIndexForward: false
                        };
                    }
                    var item = [];
                    docClient.query(params).eachPage((err, data, done) => {
                        if (err) {
                            reject(err);
                        }
                        if (data == null) {
                            resolve(concatArrays(item));
                        } else {
                            item.push(data.Items);
                        }
                        done();
                    });
                } else {
                    resolve([]);
                }
            })
    });
}

function getTeamDataWithPlayerRecords_3(player_id, team, sensor, organization) {
    return new Promise((resolve, reject) => {
        const player_obj = {};
        player_obj.organization = organization;
        player_obj.team_name = team;
        if (sensor && sensor != 'null') {
            player_obj.sensor = sensor;
        }
        getOrganizationData(player_obj)
            .then (org => {
                if (org.length > 0) {
                    let params;
                    if (sensor && sensor != 'null') {
                        params = {
                            TableName: "sensor_details",
                            KeyConditionExpression:  "org_id = :org_id and begins_with(player_id,:player_id)",
                            FilterExpression: "sensor = :sensor and organization = :organization and team = :team",
                            ExpressionAttributeValues: {
                                ":org_id": org[0].organization_id,
                                ":sensor": sensor,
                                ":organization": organization,
                                ":team": team,
                                ":player_id": player_id + '$',
                            },
                            ExpressionAttributeNames : {
                                '#time': 'time',
                                '#date': 'date',
                                '#Impact_date': 'impact-date',
                                '#Impact_time': 'impact-time'
                            },
                            ProjectionExpression: " #time, #date,#Impact_date,#Impact_time, image_id,organization,player,player_id,sensor,simulation_status,team,user_cognito_id",
                            ScanIndexForward: false
                        };
                    } else {
                        params = {
                            TableName: "sensor_details",
                            KeyConditionExpression:  "org_id = :org_id and begins_with(player_id,:player_id)",
                            FilterExpression: "organization = :organization and team = :team",
                            ExpressionAttributeValues: {
                                ":org_id": org[0].organization_id,
                                ":organization": organization,
                                ":team": team,
                                ":player_id": player_id + '$',
                            },
                            ExpressionAttributeNames : {
                                '#time': 'time',
                                '#date': 'date',
                                '#Impact_date': 'impact-date',
                                '#Impact_time': 'impact-time'
                            },
                            ProjectionExpression: " #time,#date,#Impact_date,#Impact_time,image_id,organization,player,player_id,sensor,simulation_status,team,user_cognito_id",
                            ScanIndexForward: false
                        };
                    }
                    var item = [];
                    docClient.query(params).eachPage((err, data, done) => {
                        if (err) {
                            reject(err);
                        }
                        if (data == null) {
                            resolve(concatArrays(item));
                        } else {
                            item.push(data.Items);
                        }
                        done();
                    });
                } else {
                    resolve([]);
                }
            })    
        
    });
}
function getTeamData(obj) {
    return new Promise((resolve, reject) => {
        const player_obj = {};
        player_obj.organization = obj.organization;
        player_obj.team_name = obj.team;
        if (obj.brand && obj.brand != 'null') {
            player_obj.sensor = obj.brand;
        }
        getOrganizationData(player_obj)
            .then (org => {
                if (org.length > 0) {
                    let params;
                    if (obj.brand && obj.brand != 'null') {
                        params = {
                            TableName: "sensor_details",
                            KeyConditionExpression:  "org_id = :org_id",
                            FilterExpression: "sensor = :sensor and organization = :organization and team = :team",
                            ExpressionAttributeValues: {
                                ":org_id": org[0].organization_id,
                                ":sensor": obj.brand,
                                ":organization": obj.organization,
                                ":team": obj.team
                            },
                            ExpressionAttributeNames: {
                                "#impactDate": "impact-date",
                                "#impactTime": "impact-time",
                            },
                            ProjectionExpression: "team, player_id, image_id,player,#impactDate,#impactTime"
                        };
                    } else {
                        params = {
                            TableName: "sensor_details",
                            KeyConditionExpression:  "org_id = :org_id",
                            FilterExpression: "organization = :organization and team = :team",
                            ExpressionAttributeValues: {
                                ":org_id": org[0].organization_id,
                                ":organization": obj.organization,
                                ":team": obj.team
                            },
                            ExpressionAttributeNames: {
                                "#impactDate": "impact-date",
                                "#impactTime": "impact-time",
                            },
                            ProjectionExpression: "team, player_id, image_id,player,#impactDate,#impactTime"
                        };
                    }
                    
                    var item = [];
                    docClient.query(params).eachPage((err, data, done) => {
                        if (err) {
                            reject(err);
                        }
                        if (data == null) {
                            resolve(concatArrays(item));
                        } else {
                            item.push(data.Items);
                        }
                        done();
                    });
                } else {
                    resolve([]);
                }
            })
    });
}

function getPlayersListFromTeamsDB(obj){
    return new Promise((resolve, reject)=>{
        var db_table = {
            TableName: 'teams',
            Key: {
                "organization": obj.organization,
                "team_name" : obj.team_name
            }
        };
        docClient.get(db_table, function (err, data) {
            if (err) {

                reject(err)

            } else {

                resolve(data.Item)
            }
        });
    })
}

function storeSensorData(sensor_data_array) {
    return new Promise((resolve, reject) => {
        var counter = 0;
        if (sensor_data_array.length == 0) {
            resolve(true);
        }
        for (var i = 0; i < sensor_data_array.length; i++) {
            if (sensor_data_array[i].level === 300) {
                delete sensor_data_array[i].sensor
            }
            let param = {
                TableName: "sensor_details",
                Item: sensor_data_array[i],
            };

            docClient.put(param, function (err, data) {
                counter++;
                if (err) {
                    console.log(err);
                    reject(err);
                }
                if (counter == sensor_data_array.length) {
                    resolve(true);
                }
            });
        }
    });
}

function addPlayerToTeamInDDB(org, team, player_id) {
    return new Promise((resolve, reject)=>{
        // if flag is true it means data array is to be created
        let params = {
            TableName: "teams",
            Key: {
                "organization": org,
                "team_name" : team
            }
        };
        docClient.get(params, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                if (Object.keys(data).length == 0 && data.constructor === Object) {
                    var dbInsert = {
                        TableName: "teams",
                        Item: { organization : org,
                            team_name : team,
                            player_list : [player_id] }
                        };
                        docClient.put(dbInsert, function (err, data) {
                            if (err) {
                                console.log(err);
                                reject(err);

                            } else {
                                resolve(data)
                            }
                        });
                    }
                    else {
                        // If Player does not exists in Team
                        if(data.Item.player_list.indexOf(player_id) <= -1){
                            var dbInsert = {
                                TableName: "teams",
                                Key: { "organization" : org,
                                "team_name" : team
                            },
                            UpdateExpression: "set #list = list_append(#list, :newItem)",
                            ExpressionAttributeNames: {
                                "#list": "player_list"
                            },
                            ExpressionAttributeValues: {
                                ":newItem": [player_id]
                            },
                            ReturnValues: "UPDATED_NEW"
                        }

                        docClient.update(dbInsert, function (err, data) {
                            if (err) {
                                console.log("ERROR WHILE CREATING DATA",err);
                                reject(err);

                            } else {
                                resolve(data)
                            }
                        });
                    }
                    else{
                        resolve("PLAYER ALREADY EXISTS IN TEAM");
                    }

                }
            }
        });


    })
}

function addPlayerToTeamOfOrganization(sensor, user_cognito_id, org, team, player_id) {
    return new Promise((resolve, reject) => {
        let params;
        if (sensor) {
            params = {
                TableName: "organizations",
                FilterExpression: "organization = :organization and sensor = :sensor and team_name = :team",
                ExpressionAttributeValues: {
                    ":sensor": sensor,
                    ":organization": org,
                    ":team": team,
                }
            };
        } else {
            params = {
                TableName: "organizations",
                FilterExpression: "organization = :organization and team_name = :team",
                ExpressionAttributeValues: {
                    ":organization": org,
                    ":team": team,
                }
            };
        }
        
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
           
            if (data == null) {
                const scanData = concatArrays(item);
                if (scanData.length > 0) {
                    // If Player does not exists in Team
                    if (scanData[0].player_list) {
                        if (scanData[0].player_list.indexOf(player_id) <= -1) {
                            const dbUpdate = {
                                TableName: "organizations",
                                Key: {
                                    organization_id: scanData[0].organization_id
                                },
                                UpdateExpression: "set #list = list_append(#list, :newItem)",
                                ExpressionAttributeNames: {
                                    "#list": "requested_player_list",
                                },
                                ExpressionAttributeValues: {
                                    ":newItem": [player_id],
                                },
                                ReturnValues: "UPDATED_NEW",
                            };
    
                            docClient.update(dbUpdate, function (err, data) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(data);
                                }
                            });
                        } else {
                            console.log("PLAYER ALREADY EXISTS IN TEAM");
                            resolve("PLAYER ALREADY EXISTS IN TEAM");
                        }
                    } else {
                        const dbInsert = {
                            TableName: "organizations",
                            Item: {
                                organization_id: scanData[0].organization_id,
                                sensor: sensor,
                                user_cognito_id: user_cognito_id,
                                organization: org,
                                team_name: team,
                                requested_player_list: [player_id]
                            },
                        };
                        docClient.put(dbInsert, function (err, data) {
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                resolve(data);
                            }
                        });
                    }
                } else {
                    const dbInsert = {
                        TableName: "organizations",
                        Item: {
                            organization_id: 'org-' + Date.now(),
                            sensor: sensor,
                            user_cognito_id: user_cognito_id,
                            organization: org,
                            team_name: team,
                            requested_player_list: [player_id]
                        },
                    };
                    docClient.put(dbInsert, function (err, data) {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                }
                //resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        }); 
    });
}

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function removeRequestedPlayerFromOrganizationTeam(org, team, player_id) {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: "organizations",
            FilterExpression: "organization = :organization and team_name = :team",
            ExpressionAttributeValues: {
                ":organization": org,
                ":team": team,
            }
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
           
            if (data == null) {
                const scanData = concatArrays(item);
                if (scanData.length > 0) {
                    // If Player does not exists in Team
                    if (scanData[0].requested_player_list && scanData[0].requested_player_list.indexOf(player_id) <= -1) {
                        resolve(null);
                    } else {
                        if (scanData[0].requested_player_list) {
                            let updatedList = scanData[0].requested_player_list;
                            updatedList = removeA(updatedList, player_id);
                            const dbUpdate = {
                                TableName: "organizations",
                                Key: {
                                    organization_id: scanData[0].organization_id
                                },
                                UpdateExpression: "set #list = :newItem ",
                                ExpressionAttributeNames: {
                                    "#list": "requested_player_list",
                                },
                                ExpressionAttributeValues: {
                                    ":newItem": updatedList,
                                },
                                ReturnValues: "UPDATED_NEW",
                            };

                            docClient.update(dbUpdate, function (err, data) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(data);
                                }
                            });
                        } else {
                            resolve(null);
                        }
                    }
                } else {
                }
            } else {
                item.push(data.Items);
            }
            done();
        }); 
    });
}

function checkIfSelfiePresent(player_id) {
    return new Promise((resolve, reject) => {
        //Fetch user details from dynamodb
        let params = {
            TableName: "users",
            Key: {
                "user_cognito_id": player_id
            }
        };
        docClient.get(params, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                console.log("check if selfie present ", data);
                if ((Object.keys(data).length == 0 && data.constructor === Object)) {
                    addPlayerToUsers(player_id)
                        .then(data => {
                            resolve(false);
                        })
                        .catch(err => {
                            reject(err);
                        })
                }
                else if (('is_selfie_image_uploaded' in data.Item && data.Item.is_selfie_image_uploaded == false) || (!data.Item.is_selfie_image_uploaded)) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            }
        });

    })
}

function addPlayerToUsers(user_id) {
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "users",
            Item: {
                user_cognito_id: user_id,
                is_selfie_image_uploaded: false
            }
        }
        docClient.put(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })

    })
}

function updateSelfieAndModelStatusInDB(obj) {

    return new Promise((resolve, reject) => {
        var userParams = {
            TableName: "users",
            Key: {
                "user_cognito_id": obj.user_cognito_id
            },
            UpdateExpression: "set is_selfie_image_uploaded = :selfie_image_uploaded, is_selfie_model_uploaded = :selfie_model_uploaded",
            ExpressionAttributeValues: {
                ":selfie_model_uploaded": true,
                ":selfie_image_uploaded": true,
            },
            ReturnValues: "UPDATED_NEW"
        };
        docClient.update(userParams, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });

}

function updateSimulationImageToDDB(
    image_id,
    bucket_name,
    path,
    status = "completed",
    token = null,
    secret = null
) {
    return new Promise((resolve, reject) => {
        if (image_id == null) {
            return resolve({ message: "No Image Simulation ID provided" });
        } else {
            // if flag is true it means data array is to be created
            let params = {
                TableName: "simulation_images",
                Key: {
                    image_id: image_id,
                },
            };
            docClient.get(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    if (Object.keys(data).length == 0 && data.constructor === Object) {
                        var dbInsert = {
                            TableName: "simulation_images",
                            Item: {
                                image_id: image_id,
                                bucket_name: bucket_name,
                                path: path,
                                status: status,
                                token: token,
                                secret: secret,
                            },
                        };
                        docClient.put(dbInsert, function (err, data) {
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                resolve(data);
                            }
                        });
                    } else {
                        // If Player does not exists in Team
                        var dbInsert = {
                            TableName: "simulation_images",
                            Key: { image_id: image_id },
                            UpdateExpression: "set #path = :path,#status = :status",
                            ExpressionAttributeNames: {
                                "#path": "path",
                                "#status": "status",
                            },
                            ExpressionAttributeValues: {
                                ":path": path,
                                ":status": status,
                            },
                            ReturnValues: "UPDATED_NEW",
                        };

                        docClient.update(dbInsert, function (err, data) {
                            if (err) {
                                console.log("ERROR WHILE CREATING DATA", err);
                                reject(err);
                            } else {
                                resolve(data);
                            }
                        });
                    }
                }
            });
        }
    });
}

function updateSimulationData(obj, cb) {
    var userParams = {
        TableName: "simulation_images",
        Key: {
            image_id: obj.image_id,
        },
        UpdateExpression:
            "set job_id = :job_id",
        ExpressionAttributeValues: {
            ":job_id": obj.job_id,
        },
        ReturnValues: "UPDATED_NEW",
    };
    docClient.update(userParams, (err, data) => {
        if (err) {
            cb(err, "");
        } else {
            cb("", data);
        }
    });
}

function getCompletedJobs() {
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "simulation_images",
            FilterExpression:
                "#job_status = :job_status_value and attribute_exists(job_id) and attribute_not_exists(computed_time)",
            ExpressionAttributeValues: {
                ":job_status_value": "completed",
            },
            ExpressionAttributeNames: {
                "#job_status": "status",
            },
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                console.log(data.Items);
                item.push(data.Items);
            }
            done();
        });
    });
}

function updateJobComputedTime(obj, cb) {
    var userParams = {
        TableName: "simulation_images",
        Key: {
            image_id: obj.image_id,
        },
        UpdateExpression:
            "set computed_time = :computed_time",
        ExpressionAttributeValues: {
            ":computed_time": obj.computed_time,
        },
        ReturnValues: "UPDATED_NEW",
    };
    docClient.update(userParams, (err, data) => {
        if (err) {
            cb(err, "");
        } else {
            cb("", data);
        }
    });
}

function fetchCGValues(account_id) {
    // return new Promise((resolve, reject) => {
    //     let params = {
    //         TableName: "users",
    //         Key: {
    //             "user_cognito_id": player_id
    //         },
    //         ProjectionExpression: "cg_coordinates"
    //     };
    //     docClient.get(params, function (err, data) {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             if (JSON.stringify(data).length == 2) {
    //                 resolve([]);
    //             } else {
    //                 resolve(data.Item.cg_coordinates);
    //             }
    //         }
    //     })
    // })

    return new Promise((resolve, reject) => {
        let params = {
            TableName: "users",
            FilterExpression: "account_id = :account_id",
            ExpressionAttributeValues: {
                ":account_id": account_id
            }
        };
        
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}

function getUserByPlayerId(player_id) {
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "users",
            FilterExpression: "player_id = :player_id",
            ExpressionAttributeValues: {
                ":player_id": player_id
            }
        };
        
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}

function uploadCGValuesAndSetINPStatus(user_cognito_id, file_name) {
    return new Promise((resolve, reject) => {
        fs.readFile(`./../users_data/${user_cognito_id}/morphed_vtk/${file_name}_cg.txt`, "utf8", function (err, data) {
            if (err) {
                reject(err)
            }
            else {
                var userParams = {
                    TableName: "users",
                    Key: {
                        "user_cognito_id": user_cognito_id
                    },
                    UpdateExpression: "set cg_coordinates = :cg, is_cg_present = :present, is_selfie_inp_uploaded = :is_selfie_inp_uploaded",
                    ExpressionAttributeValues: {
                        ":cg": data.split(" ").map(function (x) { return parseFloat(x) }),
                        ":present": true,
                        ":is_selfie_inp_uploaded": true
                    },
                    ReturnValues: "UPDATED_NEW"
                };
                docClient.update(userParams, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                })

            }
        })
    });
}

function getAllSensorBrands() {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: "sensors"
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}

function getBrandData(obj) {
    return new Promise((resolve, reject) => {

        // var users = obj.users;
        // var userObject = {};
        // var index = 0;
        // users.forEach(function(value) {
        //     index++;
        //     var userKey = ":uservalue"+index;
        //     userObject[userKey.toString()] = value;
        // });

        // let params = {
        //     TableName: "sensor_details",
        //     FilterExpression: "user_cognito_id IN (" + Object.keys(userObject).toString() + ")",
        //     ExpressionAttributeValues: userObject
        // };
        // var item = [];
        // docClient.scan(params).eachPage((err, data, done) => {
        //     if (err) {
        //         reject(err);
        //     }
        //     if (data == null) {
        //         resolve(concatArrays(item));
        //     } else {
        //         item.push(data.Items);
        //     }
        //     done();
        // });

        let params = {
            TableName: "sensor_details",
            FilterExpression: "sensor = :sensor",
            ExpressionAttributeValues: {
               ":sensor": obj.sensor
            },
            ProjectionExpression: "sensor,player_id,computed_time,image_id"
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}

function getBrandDataByorg(brand,organization) {
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "sensor_details",
            FilterExpression: "sensor = :sensor and organization = :organization",
            ExpressionAttributeValues: {
               ":sensor": brand,
               ":organization": organization
            },
            ProjectionExpression: "sensor,player_id,computed_time,image_id,team"
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}

function getAllOrganizationsOfSensorBrand(obj) {
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "organizations",
            FilterExpression: "sensor = :sensor",
            ExpressionAttributeValues: {
               ":sensor": obj.brand
            },
            ProjectionExpression: "organization, sensor, organization_id"
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}

function getBrandOrganizationData(sensor, organization) {
    return new Promise((resolve, reject) => {
        let params;

        if (sensor !== '') {
            params = {
                TableName: "sensor_details",
                FilterExpression: "sensor = :sensor and organization = :organization",
                ExpressionAttributeValues: {
                    ":sensor": sensor,
                    ":organization": organization
                },
                ProjectionExpression: "sensor,image_id,player_id,computed_time"
            };
        } else {
            params = {
                TableName: "sensor_details",
                FilterExpression: "organization = :organization",
                ExpressionAttributeValues: {
                   ":organization": organization
                },
                ProjectionExpression: "sensor,image_id,player_id,computed_time"
            };
        }
        
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}
function getAllTeamsOfOrganizationsOfSensorBrand(obj) {
    return new Promise((resolve, reject) => {
        let params;
        if (obj.brand) {
            params = {
                TableName: "organizations",
                FilterExpression: "sensor = :sensor and organization = :organization",
                ExpressionAttributeValues: {
                   ":sensor": obj.brand,
                   ":organization": obj.organization
                },
                ProjectionExpression: "sensor, organization, team_name, organization_id,user_cognito_id"
            };
        } else {
            params = {
                TableName: "organizations",
                FilterExpression: "organization = :organization",
                ExpressionAttributeValues: {
                   ":organization": obj.organization
                },
                ProjectionExpression: "sensor, organization, team_name, organization_id, user_cognito_id"
            };
        }
        
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}

function getOrganizationData(obj) {
    return new Promise((resolve, reject) => {
        let params;

        if (obj.sensor) {
            params = {
                TableName: "organizations",
                FilterExpression: "organization = :organization and team_name = :team_name and sensor = :sensor",
                ExpressionAttributeValues: {
                    ":organization": obj.organization,
                    ":team_name": obj.team_name,
                    ":sensor": obj.sensor,
                },
            };
        } else {
            params = {
                TableName: "organizations",
                FilterExpression: "organization = :organization and team_name = :team_name",
                ExpressionAttributeValues: {
                    ":organization": obj.organization,
                    ":team_name": obj.team_name
                },
            };
        }
                
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}

function getOrganizationTeamData(obj) {
    return new Promise((resolve, reject) => {
        const player_obj = {};
        player_obj.organization = obj.organization;
        player_obj.team_name = obj.team;
        if (obj.sensor) {
            player_obj.sensor = obj.sensor;
        }
        getOrganizationData(player_obj)
            .then (org => {
                if (org.length > 0) {
                    let params;
                    if (obj.sensor) {
                        params = {
                            TableName: "sensor_details",
                            // KeyConditionExpression:  "org_id = :org_id",
                            FilterExpression: "sensor = :sensor and organization = :organization and team = :team",
                            ExpressionAttributeValues: {
                                // ":org_id": org[0].organization_id,
                                ":sensor": obj.sensor,
                                ":organization": obj.organization,
                                ":team": obj.team
                            },
                            ProjectionExpression: "sensor,player_id,computed_time,image_id,team, org_id",
                            ScanIndexForward: false
                        };
                    } else {
                        params = {
                            TableName: "sensor_details",
                            // KeyConditionExpression: "org_id = :org_id",
                            FilterExpression: "organization = :organization and team = :team",
                            ExpressionAttributeValues: {
                                // ":org_id": org[0].organization_id,
                                ":organization": obj.organization,
                                ":team": obj.team
                            },
                            ProjectionExpression: "sensor,image_id,computed_time,player_id, org_id",
                            ScanIndexForward: false
                        };
                    }
                    
                    var item = [];
                    docClient.scan(params).eachPage((err, data, done) => {
                        if (err) {
                            console.log('err',err)
                            reject(err);
                        }
                        if (data == null) {
                            resolve(concatArrays(item));
                        } else {
                            item.push(data.Items);
                        }
                        done();
                    });
                } else {
                    resolve([]);
                }
            })
    });
}

function getPlayerSimulationFile(obj) {
    // console.log('obj.image_id',obj.image_id)
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "simulation_images",
            Key: {
                image_id: obj.image_id,
            },
        };
        docClient.get(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data.Item);
            }
        });
    });
}

function getPlayerSimulationStatus(image_id) {
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "simulation_images",
            Key: {
                image_id: image_id,
            },
        };
        docClient.get(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data.Item);
            }
        });
    });
}

function getSensorAdmins(sensor) {
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "sensors",
            Key: {
                sensor: sensor,
            },
        };
        docClient.get(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data.Item);
            }
        });
    });
}

/*======================================
    new funtion added 11-4-2020
========================================*/

function getSimulationImageRecord(image_id){
    return new Promise((resolve, reject) =>{
        var db_table = {
            TableName: 'simulation_images',
            Key: {
                "image_id": image_id
            }
        };
        docClient.get(db_table, function (err, data) {
            if (err) {

                reject(err)

            } else {
                resolve(data.Item)
            }
        });
    })
}
function createUserDbEntry(event, callback) {
    
    if (event.organization && event.team) {
        addPlayerToTeamOfOrganization('', '', event.organization, event.team, event.user_name)
        .then(result => {
            var dbInsert = {};
            // adding key with name user_cognito_id
            // deleting the key from parameter from "user_name"
            event["user_cognito_id"] = event.user_name;
            // event["sensor"] = 'Blackbox Biometrics';
            // event["organization"] = 'Army Research Laboratory';
            delete event.user_name;
            dbInsert = {
                TableName: "users",
                Item: event
            }


            docClient.put(dbInsert, function (dbErr, dbData) {
                if (dbErr) {
                    callback(dbErr, null);
                    console.log(dbErr);
                }
                else {
                    console.log(dbData);
                    callback(null, event);
                }
            });
        })
    } else {
        var dbInsert = {};
        // adding key with name user_cognito_id
        // deleting the key from parameter from "user_name"
        event["user_cognito_id"] = event.user_name;
        // event["sensor"] = 'Blackbox Biometrics';
        // event["organization"] = 'Army Research Laboratory';
        delete event.user_name;
        dbInsert = {
            TableName: "users",
            Item: event
        }


        docClient.put(dbInsert, function (dbErr, dbData) {
            if (dbErr) {
                callback(dbErr, null);
                console.log(dbErr);
            }
            else {
                console.log(dbData);
                callback(null, event);
            }
        });
    }
}

function createInviteUserDbEntry(event, callback) {
    var dbInsert = {};
    // adding key with name user_cognito_id
    // deleting the key from parameter from "user_name"
    // event["sensor"] = 'Blackbox Biometrics';
    delete event.user_name;
    dbInsert = {
        TableName: "InviteUsers",
        Item: event
    }


    docClient.put(dbInsert, function (dbErr, dbData) {
        if (dbErr) {
            callback(dbErr, null);
            console.log(dbErr);
        }
        else {
            console.log(dbData);
            callback(null, event);
        }
    });
}

function addRecordInUsersDDB(event) {
    return new Promise((resolve, reject) =>{
        var dbInsert = {};
        // adding key with name user_cognito_id
        // deleting the key from parameter from "user_name"
        dbInsert = {
            TableName: "users",
            Item: event
        }


        docClient.put(dbInsert, function (dbErr, dbData) {
            if (dbErr) {
                reject(dbErr)
                console.log(dbErr);
            }
            else {
                console.log(dbData);
                resolve(dbData);
            }
        });
    })
}

// Function to get Verification Status of the User
function getVerificationStatus(user_name, cb) {
    var db_table = {
        TableName: 'users',
        Key: {
            "user_name": user_name
        }
    };
    docClient.get(db_table, function (err, data) {
        if (err) {

            cb(err, "");

        } else {

            cb("", data);
        }
    });
}
function addUserDetailsToDb(user_details, cb) {
    var dbInsert = {
        TableName: "users",
        Item: user_details
    };
    docClient.put(dbInsert, function (err, data) {
        if (err) {

            cb(err, "");

        } else {

            cb("", data);
        }
    });
}

function getUserDbData(user_name, cb) {
    var db_table = {
        TableName: 'users',
        Key: {
            "user_cognito_id": user_name
        }
    };
    docClient.get(db_table, function (err, data) {
        if (err) {

            cb(err, "");

        } else {

            cb("", data);
        }
    });
}
function getUserTokenDBDetails(user_name, cb) {
    var db_table = {
        TableName: 'InviteUsers',
        Key: {
            "InviteToken": user_name
        }
    };
    docClient.get(db_table, function (err, data) {
        if (err) {

            cb(err, "");

        } else {

            cb("", data);
        }
    });
}

function getUserSensor(user_name) {
    console.log('user_name',user_name)
    return new Promise((resolve, reject) => {
        var params = {
            TableName: 'sensors',
            FilterExpression: "contains(#users, :user_cognito_id)",
            ExpressionAttributeNames: {
                "#users": "users",
            },
            ExpressionAttributeValues: {
                ":user_cognito_id": user_name,
            }
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}

function getOrganizationList() {
    return new Promise((resolve, reject) => {
        var params = {
            TableName: 'organizations',
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}

function InsertUserIntoSensor(user_name,sensor) {
    console.log('user_name',user_name,sensor)
    return new Promise((resolve, reject) => {
        var dbInsert = {
            TableName: "sensors",
            Key: { 
                "sensor" : sensor
            },
            UpdateExpression: "set #users = list_append(#users, :user_cognito_id)",
            ExpressionAttributeNames: {
                "#users": "users"
            },
            ExpressionAttributeValues: {
                ":user_cognito_id": [user_name]
            },
            ReturnValues: "UPDATED_NEW"
        }

        docClient.update(dbInsert, function (err, data) {
            if (err) {
                console.log("ERROR WHILE CREATING DATA",err);
                reject(err);

            } else {
                resolve(data)
            }
        });
    });
}


function InsertUserIntoOrg(user_name,organization_id, requested_player_list) {
    console.log('user_name',user_name,organization_id)
    return new Promise((resolve, reject) => {
        if(requested_player_list){
            var dbInsert = {
                TableName: "organizations",
                Key: { 
                    "organization_id" : organization_id
                },
                UpdateExpression: "set #requested_player_list = list_append(#requested_player_list, :user_cognito_id)",
                ExpressionAttributeNames: {
                    "#requested_player_list": "requested_player_list"
                },
                ExpressionAttributeValues: {
                    ":user_cognito_id": [user_name]
                },
                ReturnValues: "UPDATED_NEW"
            }
        }else{
            var dbInsert = {
                TableName: "organizations",
                Key: { 
                    "organization_id" : organization_id
                },
                UpdateExpression: "set #list = :newItem ",
                ExpressionAttributeNames: {
                    "#list": "requested_player_list",
                },
                ExpressionAttributeValues: {
                    ":newItem":  [user_name],
                },
                ReturnValues: "UPDATED_NEW",
            };
        }   
        docClient.update(dbInsert, function (err, data) {
            if (err) {
                console.log("ERROR WHILE CREATING DATA",err);
                reject(err);

            } else {
                resolve(data)
            }
        });
    });
}

function InsertImpactVideoKey(video_id,impact_video_path) {
    console.log('user_name',video_id,impact_video_path)
    return new Promise((resolve, reject) => {
       var userParams = {
            TableName: "simulation_images",
            Key: {
                image_id: video_id,
            },
            UpdateExpression:
                "set impact_video_path = :impact_video_path, trim_video_path = :trim_video_path, left_lock_time= :left_lock_time, right_lock_time = :right_lock_time",
            ExpressionAttributeValues: {
                ":impact_video_path": impact_video_path,
                ":left_lock_time": 0,
                ":right_lock_time": 0,
                ":trim_video_path": false,
            },
            ReturnValues: "UPDATED_NEW",
        };
        docClient.update(userParams, function (err, data) {
            if (err) {
                console.log("ERROR WHILE CREATING DATA",err);
                reject(err);

            } else {
                resolve(data)
            }
        });
    });
}

function InsertTrimVideoKey(video_id, trim_video_path, fps_of_trim_video) {
    console.log('user_name',video_id,trim_video_path)
    return new Promise((resolve, reject) => {
       var userParams = {
            TableName: "simulation_images",
            Key: {
                image_id: video_id,
            },
            UpdateExpression:
                "set trim_video_path = :trim_video_path, left_lock_time= :left_lock_time, right_lock_time = :right_lock_time, fps_of_trim_video = :fps_of_trim_video",
            ExpressionAttributeValues: {
                ":trim_video_path": trim_video_path,
                ":left_lock_time": 0,
                ":right_lock_time": 0,
                ":fps_of_trim_video": fps_of_trim_video
            },
            ReturnValues: "UPDATED_NEW",
        };
        docClient.update(userParams, function (err, data) {
            if (err) {
                console.log("ERROR WHILE CREATING DATA",err);
                reject(err);

            } else {
                resolve(data)
            }
        });
    });
}

function updateTrimVideoKey(video_id,trim_video_path) {
    console.log('user_name',video_id,trim_video_path)
    return new Promise((resolve, reject) => {
       var userParams = {
            TableName: "simulation_images",
            Key: {
                image_id: video_id,
            },
            UpdateExpression:
                "set trim_video_path = :trim_video_path, left_lock_time= :left_lock_time, right_lock_time = :right_lock_time, fps_of_trim_video = :fps_of_trim_video",
            ExpressionAttributeValues: {
                ":trim_video_path": trim_video_path,
                ":left_lock_time": 0,
                ":right_lock_time": 0,
                ":fps_of_trim_video": 27.9,
            },
            ReturnValues: "UPDATED_NEW",
        };
        docClient.update(userParams, function (err, data) {
            if (err) {
                console.log("ERROR WHILE CREATING DATA",err);
                reject(err);

            } else {
                resolve(data)
            }
        });
    });
}


// function storeSensorData(sensor_data_array){
//     return new Promise((resolve, reject) =>{
//         var counter = 0 ;
//         if(sensor_data_array.length == 0 ){
//             resolve(true);
//         }
//         for(var i = 0 ; i < sensor_data_array.length ; i++){
//             // TODO STORE SENSOR DATA
//             let param = {
//                 TableName: "sensor_details",
//                 Item: sensor_data_array[i]
//             };
//             docClient.put(param, function (err, data) {
//                 counter++;
//                 if (err) {
//                     console.log(err);
//                     reject(err)
//                 }
//                 if(counter == sensor_data_array.length){
//                     resolve(true);
//                 }
//             })
//         }
//     })
// }

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

const fetchStaffMembers = (user_cognito_id,brand) => {
    return new Promise(function (resolve, reject) {
        var params = {
            TableName: 'users',
             Key: {
                "user_cognito_id": user_cognito_id,
            }
           
        };
        //   var items
        var items = [];
        
          docClient.get(params, function (err, data) {
              if (err) {
                  reject(err)

              } else {
                // console.log('cg data is ',data);
                resolve(data.Item);
              }
          });
    })
    
}

const fetchAllUsers = () => {
    return new Promise(function (resolve, reject) {
        var params = {
            TableName: 'users'
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
        docClient.put(param, function (err, data) {
            if (err) {
                console.log("ERROR IN TABLE_UPDATE=======\n", err);
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

function getPlayerCgValues(player_id) {
  return new Promise((resolve, reject) =>{
      var db_table = {
          TableName: 'users',
          Key: {
              "user_cognito_id": player_id
          },
          ProjectionExpression: "cg_coordinates"
      };
      docClient.get(db_table, function (err, data) {
          if (err) {
              reject(err)

          } else {
               console.log('cg data is ',data);
              if(JSON.stringify(data).length==2) {
                resolve([]);
              } else {
                resolve(data.Item.cg_coordinates);
              }
          }
      });
  })
}
function setVideoTime(image_id,left_lock_time,right_lock_time,type) {
    return new Promise((resolve, reject) => {
        if(type == 'setVideoTime'){
            var userParams = {
                TableName: "simulation_images",
                Key: {
                    image_id: image_id,
                },
                UpdateExpression:
                    "set left_lock_time = :left_lock_time, right_lock_time = :right_lock_time",
                ExpressionAttributeValues: {
                    ":left_lock_time": left_lock_time,
                    ":right_lock_time": right_lock_time,

                },
                ReturnValues: "UPDATED_NEW",
            };
        }else{
            var userParams = {
                TableName: "simulation_images",
                Key: {
                    image_id: image_id,
                },
                UpdateExpression:
                    "set left_lock_time = :left_lock_time, right_lock_time = :right_lock_time",
                ExpressionAttributeValues: {
                    ":left_lock_time": left_lock_time,
                    ":right_lock_time": right_lock_time,
                    
                },
                ReturnValues: "UPDATED_NEW",
            };
        }
        docClient.update(userParams, function (err, data) {
            if (err) {
                console.log("ERROR WHILE CREATING DATA",err);
                reject(err);

            } else {
                resolve(data)
            }
        });
    });
}

/*++++++++++++++++ Geting org unique list ++++++++++++++++++++++*/
function getOrgUniqueList() {
    return new Promise((resolve, reject) => {
        var params = {
            TableName: 'users',
            FilterExpression: "#level = :level",
            ExpressionAttributeValues: {
                ":level": 300,
            },
            ExpressionAttributeNames: {
                "#level": "level",
            },
            ProjectionExpression: "organization"
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}
/*++++++++++++ Getting Organization teams +++++++++++++++++*/

function getOrgUniqueTeams(organization) {
    return new Promise((resolve, reject) => {
        var params = {
            TableName: 'organizations',
            FilterExpression: "organization = :organization",
            ExpressionAttributeValues: {
            ":organization": organization
            },
            ProjectionExpression: "team_name"
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}

function upDateUserFBGlid(body,user_cognito_id) {
    // body...
    console.log('body',body)
    return new Promise((resolve, reject) => {
        if(body.userIDfacebook){
            var update_details = {
                TableName : 'users',
                Key : {
                    "user_cognito_id": user_cognito_id
                },
                UpdateExpression : "set userIDfacebook = :userIDfacebook",
                ExpressionAttributeValues : {
                    ":userIDfacebook" : body.userIDfacebook,
                },
                ReturnValues: "UPDATED_NEW"
            };
        }else{
            var update_details = {
                TableName : 'users',
                Key : {
                    "user_cognito_id": user_cognito_id
                },
                UpdateExpression : "set userIDgoogle = :userIDgoogle",
                ExpressionAttributeValues : {
                    ":userIDgoogle" : body.userIDgoogle,
                },
                ReturnValues: "UPDATED_NEW"
            }; 
        }

        docClient.update(update_details, function(err, data){
            if(err) {
               reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

function upDateuserPassword(body,user_cognito_id) {
    // body...
    return new Promise((resolve, reject) => {
         let update_details = {
            TableName : 'users',
            Key : {
                "user_cognito_id": user_cognito_id
            },
            UpdateExpression : "set password = :password",
            ExpressionAttributeValues : {
                ":password" : body.password,
            },
            ReturnValues: "UPDATED_NEW"
        };

        docClient.update(update_details, function(err, data){
            if(err) {
               reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

function getUserAlreadyExists(email) {
    console.log('mail',email)
    return new Promise((resolve, reject) => {
        var params = {
            TableName: 'users',
            FilterExpression: "#email = :email",
            ExpressionAttributeNames: {
                "#email": "email",
            },
            ExpressionAttributeValues: {
                ":email": email,
            }
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}


function upDateuser(body,user_cognito_id) {
    // body...
    return new Promise((resolve, reject) => {
         let update_details = {
            TableName : 'users',
            Key : {
                "user_cognito_id": user_cognito_id
            },
            UpdateExpression : "set first_name = :first_name, last_name = :last_name, #level = :level, organization= :organization, sensor = :sensor, team = :team",
             ExpressionAttributeNames: {
                "#level": "level",
            },
            ExpressionAttributeValues : {
                ":first_name" : body.first_name,
                ":last_name" : body.last_name,
                ":level" : body.level,
                ":organization": body.organization,
                ":sensor" : body.sensor,
                ":team" : body.team
            },
            ReturnValues: "UPDATED_NEW"
        };

        docClient.update(update_details, function(err, data){
            if(err) {
               reject(err);
            } else {
                resolve(data);
            }
        })
    })
}
//Delete organizations
function DeleteOrganization(organization_id) {
    console.log('organization_id',organization_id)
    return new Promise((resolve, reject) => {
        var params = {
            TableName: "organizations",
            Key: { 
                "organization_id" : organization_id
            }
        }

        docClient.delete(params, function (err, data) {
            if (err) {
                console.log("error when deleting data\n",err);
                reject(err);

            } else {
                resolve(data)
            }
        });
    });
}
function getOrganizatonBynameSensor(organization, sensor){
    return new Promise((resolve, reject) =>{
        var   params = {
                TableName: "organizations",
                FilterExpression: "sensor = :sensor and organization = :organization ",
                ExpressionAttributeValues: {
                ":sensor": sensor,
                ":organization": organization,
                },
            };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    })
}

function getOrganizatonByTeam(organization, team_name,sensor){
    return new Promise((resolve, reject) =>{
        var   params = {
                TableName: "organizations",
                FilterExpression: "team_name = :team_name and organization = :organization and sensor = :sensor ",
                ExpressionAttributeValues: {
                ":team_name": team_name,
                ":organization": organization,
                ":sensor": sensor,
                },
            };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    })
}

function getOrgSensorData(organization, sensor){
    return new Promise((resolve, reject) =>{
        let params = {
            TableName: "sensor_details",
            FilterExpression: "organization= :organization and sensor = :sensor",
            ExpressionAttributeValues: {
               ":sensor": sensor,
               ":organization": organization
            },
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    })
}

function renameOrganization(OrganizationName,organization_id) {
    console.log('organization_id',organization_id)
    return new Promise((resolve, reject) => {
        var params = {
            TableName: "organizations",
            Key: { 
                "organization_id" : organization_id
            },
            UpdateExpression: "set #organization = :organization",
            ExpressionAttributeNames: {
                "#organization": "organization"
            },
            ExpressionAttributeValues: {
                ":organization": OrganizationName
            },
            ReturnValues: "UPDATED_NEW"
        }
        docClient.update(params, function (err, data) {
            if (err) {
                console.log("error when updating data\n",err);
                reject(err);

            } else {
                resolve(data)
            }
        });
    });
}
function renameSensorOrganization(OrganizationName,player_id, org_id) {
    console.log('OrganizationName',OrganizationName)
    return new Promise((resolve, reject) => {
        var params = {
            TableName: "sensor_details",
            Key: { 
                "org_id": org_id,
                "player_id" : player_id
            },
            UpdateExpression: "set #organization = :organization",
            ExpressionAttributeNames: {
                "#organization": "organization"
            },
            ExpressionAttributeValues: {
                ":organization": OrganizationName
            },
            ReturnValues: "UPDATED_NEW"
        }
        docClient.update(params, function (err, data) {
            if (err) {
                console.log("error when updating sensor data\n",err);
                reject(err);

            } else {
                resolve(data)
            }
        });
    });
}
//Add organization
function addOrganization(OrganizationName, sensor) {
    return new Promise((resolve, reject) =>{
        var dbInsert = {};
        // adding key with name user_cognito_id
        // deleting the key from parameter from "user_name"
        dbInsert = {
            TableName: "organizations",
            Item: {
                organization: OrganizationName,
                organization_id: 'org-'+Date.now(),
                player_list: [],
                sensor: sensor,
                team_name: ' ',
                user_cognito_id: ' '
            }
        }


        docClient.put(dbInsert, function (dbErr, dbData) {
            if (dbErr) {
                reject(dbErr)
                console.log(dbErr);
            }
            else {
                console.log(dbData);
                resolve(dbData);
            }
        });
    })
}
//Merge organization
function MergeOrganization(OrganizationName, organization_id) {
    console.log('user_name',OrganizationName,organization_id)
    return new Promise((resolve, reject) => {
        var dbInsert = {
            TableName: "organizations",
            Key: { 
                "organization_id" : organization_id
            },
            UpdateExpression: "set #organization = :organization",
            ExpressionAttributeNames: {
                "#organization": "organization"
            },
            ExpressionAttributeValues: {
                ":organization": OrganizationName
            },
            ReturnValues: "UPDATED_NEW"
        }

        docClient.update(dbInsert, function (err, data) {
            if (err) {
                console.log("ERROR WHILE CREATING DATA",err);
                reject(err);

            } else {
                resolve(data)
            }
        });
    });
}


//Add organization
function addorgTeam(TeamName, organization,sensor) {
    return new Promise((resolve, reject) =>{
        var dbInsert = {};
        // adding key with name user_cognito_id
        // deleting the key from parameter from "user_name"
        dbInsert = {
            TableName: "organizations",
            Item: {
                organization: organization,
                organization_id: 'org-'+Date.now(),
                player_list: [],
                sensor: sensor,
                team_name: TeamName,
                user_cognito_id: ' '
            }
        }


        docClient.put(dbInsert, function (dbErr, dbData) {
            if (dbErr) {
                reject(dbErr)
                console.log(dbErr);
            }
            else {
                console.log(dbData);
                resolve(dbData);
            }
        });
    })
}

function getSernsorDataByOrgTeam(org_id, team_name, organization){
    return new Promise((resolve, reject) =>{
        var params = {
                TableName: "sensor_details",
                KeyConditionExpression:  "org_id = :org_id",
                FilterExpression: "team = :team and organization = :organization ",
                ExpressionAttributeValues: {
                    ":org_id": org_id,
                    ":team": team_name,
                    ":organization": organization,
                },
            };
        var item = [];
        docClient.query(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    })
}

function getSernsorDataByTeam(team_name, organization){
    return new Promise((resolve, reject) =>{
        var params = {
                TableName: "sensor_details",
                FilterExpression: "team = :team and organization = :organization ",
                ExpressionAttributeValues: {
                    ":team": team_name,
                    ":organization": organization,
                },
            };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    })
}

function renameTeam(team_name,organization_id) {
    console.log('organization_id',organization_id)
    return new Promise((resolve, reject) => {
        var params = {
            TableName: "organizations",
            Key: { 
                "organization_id" : organization_id
            },
            UpdateExpression: "set #team_name = :team_name",
            ExpressionAttributeNames: {
                "#team_name": "team_name"
            },
            ExpressionAttributeValues: {
                ":team_name": team_name
            },
            ReturnValues: "UPDATED_NEW"
        }
        docClient.update(params, function (err, data) {
            if (err) {
                console.log("error when updating data\n",err);
                reject(err);

            } else {
                resolve(data)
            }
        });
    });
}

function getUserByTeam(team_name, organization){
    return new Promise((resolve, reject) =>{
        var params = {
                TableName: "users",
                FilterExpression: "team = :team and organization = :organization ",
                ExpressionAttributeValues: {
                ":team": team_name,
                ":organization": organization,
                },
                ProjectionExpression: "user_cognito_id"
            };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    })
}
function renameUsers(user_cognito_id, team_name) {
    return new Promise((resolve, reject) => {
        var params = {
            TableName: "users",
            Key: { 
                "user_cognito_id": user_cognito_id
            },
            UpdateExpression: "set #team = :team",
            ExpressionAttributeNames: {
                "#team": "team"
            },
            ExpressionAttributeValues: {
                ":team": team_name
            },
            ReturnValues: "UPDATED_NEW"
        }
        docClient.update(params, function (err, data) {
            if (err) {
                console.log("error when updating sensor data\n",err);
                reject(err);

            } else {
                resolve(data)
            }
        });
    });
}

function getUserDbDataByUserId(userID,type,email, cb) {
    if(email){
        var params = {
            TableName: 'users',
            FilterExpression: "#email = :email",
            ExpressionAttributeNames: {
                "#email": "email",
            },
            ExpressionAttributeValues: {
                ":email": email,
            }
        };
    }else{
        if(type == "facebook"){
            var params = {
                TableName: 'users',
                FilterExpression: "#userIDfacebook = :userIDfacebook",
                ExpressionAttributeNames: {
                    "#userIDfacebook": "userIDfacebook",
                },
                ExpressionAttributeValues: {
                    ":userIDfacebook": userID,
                }
            };
        }else{
            var params = {
                TableName: 'users',
                FilterExpression: "#userIDgoogle = :userIDgoogle",
                ExpressionAttributeNames: {
                    "#userIDgoogle": "userIDgoogle",
                },
                ExpressionAttributeValues: {
                    ":userIDgoogle": userID,
                }
            };
        }
    }
    let item = [];
    docClient.scan(params).eachPage((err, data, done) => {
        if (err) {
           cb(err, "");
        }
        if (data == null) {
           
            cb("", concatArrays(item));
        } else {
            item.push(data.Items);
        }
        done();
    });    
}

function getTeamList() {
    return new Promise((resolve, reject) => {
        var params = {
            TableName: 'organizations',
            ProjectionExpression: "sensor, organization, team_name"
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}

function getPlayerList() {
    console.log('geting list plyaer \n')
    return new Promise((resolve, reject) => {
        var params = {
            TableName: 'organizations',
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}

const fetchSensor = (sensor) => {
    return new Promise(function (resolve, reject) {
        var params = {
            TableName: 'sensors',
             Key: {
                "sensor": sensor
            }
           
        };
        //   var items
        var items = [];
        
          docClient.get(params, function (err, data) {
              if (err) {
                  reject(err)

              } else {
                // console.log('cg data is ',data);
                resolve(data.Item);
              }
          });
      })
}
function fetchOrgStaffMembers(organization) {
    console.log('organization',organization)
    return new Promise((resolve, reject) => {
        var params = {
            TableName: 'users',
            FilterExpression: "#organization = :organization and #level = :level",
            ExpressionAttributeNames: {
                "#organization": "organization",
                "#level": "level",
            },
            ExpressionAttributeValues: {
                ":organization": organization,
                ":level": 300
            }
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}
function getHeadAccelerationEvents(obj) {
    return new Promise((resolve, reject) => {
        let params = {
            TableName: 'sensor_details',
            KeyConditionExpression: "team = :team and begins_with(player_id, :player_id)",
            ExpressionAttributeValues: {
                ":team": obj.team,
                ":player_id": obj.player_id
            }
        };
        var item = [];
        docClient.query(params).eachPage((err, data, done) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (data == null) {
                let records = concatArrays(item);
                let date = records.map(function (record) {
                    return record.date;
                });
                // Now we will store no of impacts corresponding to date
                var date_map = new Map();
                for (var i = 0; i < date.length; i++) {
                    // check if key in map exists (Player id)
                    // if it doesn't exists then add the array element
                    // else update value of alert and impacts in existsing key in map
                    if (date_map.has(date[i])) {

                        let tempObject = date_map.get(date[i]);
                        tempObject += 1;
                        date_map.set(date[i], tempObject);
                    }
                    else {

                        date_map.set(date[i], 0);
                    }
                }
                console.log("DATE MAP", date_map.keys());
                console.log(Array.from(date_map.values()));
                resolve({
                    no_of_impacts: Array.from(date_map.values()),
                    dates: Array.from(date_map.keys()),
                    timestamp: Number(Date.now()).toString()
                });
            } else {
                item.push(data.Items);
            }
            done();
        });
    })
    // var myObject = {
    //     message : "success",
    //     data : {
    //         pressure : [176, 267, 187, 201, 180, 4, 230, 258, 14, 21, 89, 23, 119, 113, 28, 49],
    //         time_label : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
    //         timestamp : Number(Date.now()).toString()
    //     }
    // }
    // return myObject;
}

function getPlayersListFromTeamsDB_2(obj) {
    return new Promise((resolve, reject) => {
        let params;
            params = {
                TableName: "organizations",
                FilterExpression: "organization = :organization and team_name = :team_name",
                ExpressionAttributeValues: {
                ":organization": obj.organization,
                ":team_name": obj.team_name
                },
            };
        //}
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}

function getTeamDataWithPlayerRecords_2(obj) {

    return new Promise((resolve, reject) => {

        const player_obj = {};
        player_obj.organization = obj.organization;
        player_obj.team_name = obj.team;
        if (obj.sensor) {
            player_obj.sensor = obj.sensor;
        }
        getOrganizationData(player_obj)
            .then (org => {
                if (org.length > 0) {
                    let params;
                    if (obj.sensor) {
                        params = {
                            TableName: "sensor_details",
                            // KeyConditionExpression:  "org_id = :org_id and begins_with(player_id,:player_id)",
                            FilterExpression: "sensor = :sensor and organization = :organization and team = :team and begins_with(player_id,:player_id)",
                            ExpressionAttributeValues: {
                                // ":org_id": org[0].organization_id, 
                                ":sensor": obj.sensor,
                                ":organization": obj.organization,
                                ":team": obj.team,
                                ":player_id": obj.player_id + '$',
                            },
                            ExpressionAttributeNames : {
                                '#time': 'time',
                                '#date': 'date',
                                '#Impact_date': 'impact-date',
                                '#Impact_time': 'impact-time'
                            },
                            ProjectionExpression: " #time, #date,#Impact_date,#Impact_time, image_id,organization,player,player_id,sensor,simulation_status,team,user_cognito_id",
                            ScanIndexForward: false
                        };
                    } else {
                        params = {
                            TableName: "sensor_details",
                            // KeyConditionExpression:  "org_id = :org_id and begins_with(player_id,:player_id)",
                            FilterExpression: "organization = :organization and team = :team and begins_with(player_id,:player_id)",
                            ExpressionAttributeValues: {
                                // ":org_id": org[0].organization_id,
                                ":organization": obj.organization,
                                ":team": obj.team,
                                ":player_id": obj.player_id + '$',
                            },
                            ExpressionAttributeNames : {
                                '#time': 'time',
                                '#date': 'date',
                                '#Impact_date': 'impact-date',
                                '#Impact_time': 'impact-time'
                            },
                            ProjectionExpression: " #time, #date,#Impact_date,#Impact_time, image_id,organization,player,player_id,sensor,simulation_status,team,user_cognito_id",
                            ScanIndexForward: false
                        };
                    }
                    var item = [];
                    docClient.scan(params).eachPage((err, data, done) => {
                        if (err) {
                            reject(err);
                        }
                        if (data == null) {
                            resolve(concatArrays(item));
                        } else {
                            item.push(data.Items);
                        }
                        done();
                    });
                } else {
                    resolve([]);
                }
            })    
    });
}

function getBrandOrganizationData2(obj) {
    return new Promise((resolve, reject) => {
        let params = '';
        if(obj.sensor && obj.sensor != null){
            params = {
                TableName: "sensor_details",
                FilterExpression: "sensor = :sensor and organization = :organization",
                ExpressionAttributeValues: {
                    ":sensor": obj.sensor,
                    ":organization": obj.organization
                },
                ProjectionExpression: "sensor,image_id,player_id,computed_time"
            };
        }else{
            params = {
                TableName: "sensor_details",
                FilterExpression: "organization = :organization",
                ExpressionAttributeValues: {
                   ":organization": obj.organization
                },
                ProjectionExpression: "sensor,image_id,player_id,computed_time"
            };
        }
       
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}

function getAllOrganizationsOfSensorBrand(obj) {
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "organizations",
            FilterExpression: "sensor = :sensor",
            ExpressionAttributeValues: {
               ":sensor": obj.brand
            },
            ProjectionExpression: "organization, sensor, organization_id"
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}

function getTeamSpheres(obj) {
    console.log('obj---------------\n',obj)
    return new Promise((resolve, reject) => {
        let params;

        if (obj.brand && obj.brand != undefined && obj.brand != null) {
            params = {
                TableName: "sensor_details",
                FilterExpression: "sensor = :sensor and organization = :organization and team = :team",
                ExpressionAttributeValues: {
                   ":sensor": obj.brand,
                   ":organization": obj.organization,
                   ":team": obj.team,
                },
                ExpressionAttributeNames : {
                    '#time': 'time',
                    '#date': 'date',
                    '#Impact_date': 'impact-date',
                    '#Impact_time': 'impact-time'
                },
                ProjectionExpression: " #time, #date,#Impact_date,#Impact_time, image_id,organization,player,player_id,sensor,simulation_status,team,user_cognito_id",
                
            };
        } else {
            params = {
                TableName: "sensor_details",
                FilterExpression: "organization = :organization and team = :team",
                ExpressionAttributeValues: {
                   ":organization": obj.organization,
                   ":team": obj.team,
                },
                ExpressionAttributeNames : {
                    '#time': 'time',
                    '#date': 'date',
                    '#Impact_date': 'impact-date',
                    '#Impact_time': 'impact-time'
                },
                ProjectionExpression: " #time, #date,#Impact_date,#Impact_time, image_id,organization,player,player_id,sensor,simulation_status,team,user_cognito_id",
                
            };
        }
        
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {

                item.push(data.Items);
            }
            done();
        });
    });
}



function updateUserStatus(obj) {
    return new Promise((resolve, reject) => {
        if (obj.type && obj.type === 'uodate_sensor_id') {
            var userParams = {
                TableName: "users",
                Key: {
                    user_cognito_id: obj.user_cognito_id,
                },
                UpdateExpression:
                    "set sensor_id_number = :sensor_id_number",
                ExpressionAttributeValues: {
                    ":sensor_id_number": obj.sensor_id_number,
                },
                ReturnValues: "UPDATED_NEW",
            };
        } else {
            var userParams = {
                TableName: "users",
                Key: {
                    user_cognito_id: obj.user_cognito_id,
                },
                UpdateExpression:
                    "set player_status = :player_status",
                ExpressionAttributeValues: {
                    ":player_status": obj.status,
                },
                ReturnValues: "UPDATED_NEW",
            };
        }
        
        docClient.update(userParams, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function deleteSensorData(org_id, player_id){
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "sensor_details",
            Key: {
                org_id: org_id,
                player_id: player_id,
                
                
            },
        };
        docClient.delete(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function deleteSimulation_imagesData(image_id){
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "simulation_images",
            Key: {
                image_id: image_id,
            },
        };
        docClient.delete(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function getModalValidationDB(image_id){
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "modelValidation",
            FilterExpression: "image_id = :image_id",
            ExpressionAttributeValues: {
               ":image_id": image_id
            },
            // ProjectionExpression: "organization, sensor, organization_id"
        };
        var item = [];
        docClient.scan(params).eachPage((err, data) => {
            if (err) {
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
}

function checkSensorDataExists(obj) {
    console.log(obj);
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "sensor_details",
            FilterExpression: "player.#impact_id = :impact_id and player.#sensor_id = :sensor_id",
            ExpressionAttributeValues: {
                ":impact_id": obj['impact_id'],
                ":sensor_id": obj['sensor_id']
            },
            ExpressionAttributeNames: {
                "#impact_id": "impact-id",
                "#sensor_id": "sensor-id",
            },
            ProjectionExpression: "org_id, image_id, team, player_id"
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    })
}

function getPlayerImageDetailsByaccoutId(account_id) {
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "simulation_images",
            FilterExpression:
                "account_id = :account_id",
            ExpressionAttributeValues: {
                ":account_id": account_id,
            },
            ProjectionExpression: "org_id, image_id, team, player_id"
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}


function getOrgIdbyImageId(image_id) {
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "sensor_details",
            FilterExpression: "image_id = :image_id",
            ExpressionAttributeValues: {
               ":image_id":image_id
            },
            ProjectionExpression: "org_id,player_id"
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}

function updatePlayerPositions(player_id ,org_id, position, sport) {
    console.log('player_id ',player_id ,org_id, position)
    return new Promise((resolve, reject) => {
        var params = {
            TableName: "sensor_details",
            Key: { 
                "org_id": org_id,
                "player_id": player_id
            },
            UpdateExpression: "set player.sport = :sport, player.#player_position = :p",
            ExpressionAttributeValues:{
                ":sport":sport,
                ":p":position,

            },
            ExpressionAttributeNames: {
                "#player_position": "position",
            },
            ReturnValues:"UPDATED_NEW"
        }
        docClient.update(params, function (err, data) {
            if (err) {
                console.log("error when updating sensor data\n",err);
                reject(err);

            } else {
                console.log('position updated')
                resolve(data)
            }
        });
    });
}
function getPlayerSummariesData(player_id) {
    console.log('player_id ',player_id)
    return new Promise((resolve, reject) => {
        var params = {
		TableName: 'player_summaries_table',
		FilterExpression: "player_id = :player_id",		
		ExpressionAttributeValues: {
			":player_id": player_id,
		}
	};
	var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
				//console.log(data.Items);
                item.push(data.Items);
            }
            done();
        });
    });
}

function removePlayerFromTeam(PlayerId,organization,Team) {
    console.log("IN delete functionality");
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "organizations",
            FilterExpression: "organization = :organization and team_name = :team_name",		
			ExpressionAttributeValues: {
				":organization": organization,
				":team_name": Team,
			}
        };
		var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
				//console.log(data.Items);
                item.push(data.Items);
            }
            done();
        });
    });
}
function removePlayerFromTeam1(PlayerId,organization_id,player_list,requested_player_list) {
    console.log(organization_id);
    return new Promise((resolve, reject) => {
		var playerList = [];
		var requestedPlayerList = [];
		 if(player_list){
			 player_list.forEach(function (pdata, index) {
				 if(PlayerId != pdata){
					 playerList.push(pdata);
				 }
			 })
		}
		 if(requested_player_list){
			requested_player_list.forEach(function (rdata, index) {
				 if(PlayerId != rdata){
					 requestedPlayerList.push(rdata);
				 }
			})
		}
		var params = {
            TableName: "organizations",
            Key: { 
                "organization_id": organization_id,
            },
            UpdateExpression: "set player_list = :player_list, requested_player_list = :requested_player_list",
            ExpressionAttributeValues:{
                ":player_list":playerList,
                ":requested_player_list":requestedPlayerList,

            },
            ReturnValues:"UPDATED_NEW"
        }
        docClient.update(params, function (err, data) {
            if (err) {
                console.log("error when updating sensor data\n",err);
                reject(err);

            } else {
                console.log('position updated')
                resolve(data)
            }
        });
    });
}
function getAllOrganizationsOfSensorBrand1(board) {
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "organizations",
            FilterExpression: "sensor = :sensor",
            ExpressionAttributeValues: {
               ":sensor": board
            },
            ProjectionExpression: "player_list, requested_player_list,  team_name,  organization,  sensor, organization_id"
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }           
			if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}
function getOrgpPlayerFromSensorDetails(playerid,org_id) {
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "sensor_details",
            FilterExpression: "org_id = :org_id and begins_with(player_id,:player_id) ",
            ExpressionAttributeValues: {
               ":player_id": playerid,
               ":org_id": org_id
            },
            ProjectionExpression: "org_id,player_id,player"
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}
function getOrgpTeamFromSensorDetails(teamname,org_id) {
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "sensor_details",
            FilterExpression: "org_id = :org_id and team = :team ",
            ExpressionAttributeValues: {
               ":team": teamname,
               ":org_id": org_id
            },
            ProjectionExpression: "org_id,team,player_id"
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}
function getOrgFromSensorDetailsr(organization) {
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "sensor_details",
            FilterExpression: "organization = :organization  ",
            ExpressionAttributeValues: {
               ":organization": organization,
            },
            ProjectionExpression: "org_id,team,organization"
        };
        var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
                item.push(data.Items);
            }
            done();
        });
    });
}
function getOrgpPlayerFromUser(user_cognito_id) { 
return new Promise((resolve, reject) => {
   let params = {
        TableName: 'users',
		FilterExpression: "user_cognito_id = :user_cognito_id",
            ExpressionAttributeValues: {
               ":user_cognito_id": user_cognito_id
            },
		ProjectionExpression: "user_cognito_id,first_name,last_name,sensor_id_number"
		
    };
     var item = [];
        docClient.scan(params).eachPage((err, data, done) => {
            if (err) {
                reject(err);
            }
            if (data == null) {
                resolve(concatArrays(item));
            } else {
				console.log(data.Items),
                item.push(data.Items);
            }
            done();
        });
    });
}
module.exports = {
    getUserDetails,
    getUserDetailBySensorId,
    updateSimulationFileStatusInDB,
    addTeam,
    deleteTeam,
    fetchAllTeamsInOrganization,
    deleteTeamFromOrganizationList,
    addTeamToOrganizationList,
    getCumulativeAccelerationData,
    getTeamDataWithPlayerRecords,
    getTeamData,
    getPlayersListFromTeamsDB,
    storeSensorData,
    addPlayerToTeamInDDB,
    checkIfSelfiePresent,
    updateSelfieAndModelStatusInDB,
    updateSimulationImageToDDB,
    updateSimulationData,
    getCompletedJobs,
    updateJobComputedTime,
    fetchCGValues,
    uploadCGValuesAndSetINPStatus,
    addPlayerToTeamOfOrganization,
    getAllSensorBrands,
    getBrandData,
    getAllOrganizationsOfSensorBrand,
    getBrandOrganizationData,
    getAllTeamsOfOrganizationsOfSensorBrand,
    getOrganizationTeamData,
    getPlayerSimulationFile,
    getSensorAdmins,
    removeRequestedPlayerFromOrganizationTeam,
    getPlayerSimulationStatus,
    getCumulativeAccelerationRecords,
    getUserByPlayerId,
    addPlayer,
    getUserDetailByPlayerId,

    //11-4-2020
    getSimulationImageRecord,
    createUserDbEntry,
    createInviteUserDbEntry,
    addRecordInUsersDDB,
    getVerificationStatus,
    addUserDetailsToDb,
    getUserDbData,
    getUserTokenDBDetails,
    getUserSensor,
    getOrganizationList,
    InsertUserIntoSensor,
    InsertImpactVideoKey,
    storeSensorData,
    fetchNumbers,
    fetchStaffMembers,
    fetchAllUsers,
    putNumbers,
    getPlayerCgValues,
    setVideoTime,
    getOrgUniqueList,
    getOrgUniqueTeams,
    upDateUserFBGlid,
    upDateuserPassword,
    getUserAlreadyExists,
    upDateuser,
    DeleteOrganization,
    getOrganizatonBynameSensor,
    getOrganizatonByTeam,
    getOrgSensorData,
    renameOrganization,
    renameSensorOrganization,
    addOrganization,
    MergeOrganization,
    addorgTeam,
    getSernsorDataByTeam,
    renameTeam,
    getUserByTeam,
    renameUsers,
    getUserDbDataByUserId,
    getTeamList,
    getPlayerList,
    fetchSensor,
    fetchOrgStaffMembers,
    getHeadAccelerationEvents,
    getPlayersListFromTeamsDB_2,
    getTeamDataWithPlayerRecords_2,
    getBrandOrganizationData2,
    getAllOrganizationsOfSensorBrand,
    getTeamSpheres,
    updateUserStatus,
    getTeamDataWithPlayerRecords_3,
    getBrandDataByorg,
    deleteSensorData,
    deleteSimulation_imagesData,
    InsertTrimVideoKey,
    updateTrimVideoKey,
    getSernsorDataByOrgTeam,
    getModalValidationDB,
    checkSensorDataExists,
    getPlayerImageDetailsByaccoutId,
    getOrgIdbyImageId,
    updatePlayerPositions,
    getPlayerSummariesData,
    InsertUserIntoOrg,
	removePlayerFromTeam,
	removePlayerFromTeam1,
	getAllOrganizationsOfSensorBrand1,
	getOrgpPlayerFromSensorDetails,
	getOrgpPlayerFromUser,
    getUserDetailByAccountId,
	getOrgpTeamFromSensorDetails,
	getOrgFromSensorDetailsr,
};
