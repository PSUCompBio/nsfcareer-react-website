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
            FilterExpression: "player_id = :player_id",
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
    //         TableName: "sensor_data",
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
        let params;

        if (obj.brand) {
            params = {
                TableName: "sensor_data",
                KeyConditionExpression:  "team = :team and begins_with(player_id,:player_id)",
                FilterExpression: "sensor = :sensor and organization = :organization",
                ExpressionAttributeValues: {
                   ":sensor": obj.brand,
                   ":organization": obj.organization,
                   ":team": obj.team,
                   ":player_id": obj.player_id + '$',
                },
                ScanIndexForward: false
            };
        } else {
            params = {
                TableName: "sensor_data",
                KeyConditionExpression:  "team = :team and begins_with(player_id,:player_id)",
                FilterExpression: "organization = :organization",
                ExpressionAttributeValues: {
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
    });
}

function getCumulativeAccelerationRecords(obj) {
    // return new Promise((resolve, reject) => {
    //     let params = {
    //         TableName: "sensor_data",
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
        let params;

        if (obj.brand) {
            params = {
                TableName: "sensor_data",
                KeyConditionExpression:  "team = :team and player_id= :player_id",
                FilterExpression: "sensor = :sensor and organization = :organization",
                ExpressionAttributeValues: {
                   ":sensor": obj.brand,
                   ":organization": obj.organization,
                   ":team": obj.team,
                   ":player_id": obj.player_id,
                },
                ScanIndexForward: false
            };
        } else {
            params = {
                TableName: "sensor_data",
                KeyConditionExpression:  "team = :team and player_id= :player_id",
                FilterExpression: "organization = :organization",
                ExpressionAttributeValues: {
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
    });
}


function getTeamDataWithPlayerRecords(obj) {

    return new Promise((resolve, reject) => {
        let params;

        if (obj.sensor) {
            params = {
                TableName: "sensor_data",
                KeyConditionExpression:  "team = :team and begins_with(player_id,:player_id)",
                FilterExpression: "sensor = :sensor and organization = :organization",
                ExpressionAttributeValues: {
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
                TableName: "sensor_data",
                KeyConditionExpression:  "team = :team and begins_with(player_id,:player_id)",
                FilterExpression: "organization = :organization",
                ExpressionAttributeValues: {
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
    });
}

function getTeamData(obj) {
    // return new Promise((resolve, reject) => {
    //     let params = {
    //         TableName: "sensor_data",
    //         KeyConditionExpression: "team = :team",
    //         ExpressionAttributeValues: {
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
        let params;

        if (obj.brand) {
            params = {
                TableName: "sensor_data",
                KeyConditionExpression:  "team = :team",
                FilterExpression: "sensor = :sensor and organization = :organization",
                ExpressionAttributeValues: {
                   ":sensor": obj.brand,
                   ":organization": obj.organization,
                   ":team": obj.team
                },
                ProjectionExpression: "team, player_id, image_id"
            };
        } else {
            params = {
                TableName: "sensor_data",
                KeyConditionExpression:  "team = :team",
                FilterExpression: "organization = :organization",
                ExpressionAttributeValues: {
                   ":organization": obj.organization,
                   ":team": obj.team
                },
                ProjectionExpression: "team, player_id, image_id"
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
    });
}

function getPlayersListFromTeamsDB(obj) {
    // return new Promise((resolve, reject) => {
    //     var db_table = {
    //         TableName: "teams",
    //         Key: {
    //             organization: obj.organization,
    //             team_name: obj.team_name,
    //         },
    //     };
    //     docClient.get(db_table, function (err, data) {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve(data.Item);
    //         }
    //     });
    // });
    return new Promise((resolve, reject) => {
        let params;

        // if (obj.brand) {
            
        //     params = {
        //         TableName: "organizations",
        //         FilterExpression: "sensor = :sensor and organization = :organization and team_name = :team_name",
        //         ExpressionAttributeValues: {
        //         ":sensor": obj.brand,
        //         ":organization": obj.organization,
        //         ":team_name": obj.team_name
        //         },
        //     };
        // } else {
            //console.log(obj);
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
                TableName: "sensor_data",
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
    return new Promise((resolve, reject) => {
        // if flag is true it means data array is to be created
        let params = {
            TableName: "teams",
            Key: {
                organization: org,
                team_name: team,
            },
        };

        docClient.get(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                if (Object.keys(data).length == 0 && data.constructor === Object) {
                    var dbInsert = {
                        TableName: "teams",
                        Item: {
                            organization: org,
                            team_name: team,
                            player_list: [player_id],
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
                    if (data.Item.player_list.indexOf(player_id) <= -1) {
                        var dbInsert = {
                            TableName: "teams",
                            Key: {
                                organization: org,
                                team_name: team,
                            },
                            UpdateExpression: "set #list = list_append(#list, :newItem)",
                            ExpressionAttributeNames: {
                                "#list": "player_list",
                            },
                            ExpressionAttributeValues: {
                                ":newItem": [player_id],
                            },
                            ReturnValues: "UPDATED_NEW",
                        };

                        docClient.update(dbInsert, function (err, data) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(data);
                            }
                        });
                    } else {
                        resolve("PLAYER ALREADY EXISTS IN TEAM");
                    }
                }
            }
        });
    });
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
                                    "#list": "player_list",
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
                                player_list: [player_id]
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
                            player_list: [player_id]
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
        //     TableName: "sensor_data",
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
            TableName: "sensor_data",
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

function getBrandOrganizationData(obj) {
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "sensor_data",
            FilterExpression: "sensor = :sensor and organization = :organization",
            ExpressionAttributeValues: {
                ":sensor": obj.sensor,
                ":organization": obj.organization
            },
            ProjectionExpression: "sensor,image_id,player_id,computed_time"
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
                ProjectionExpression: "sensor, organization, team_name, organization_id"
            };
        } else {
            params = {
                TableName: "organizations",
                FilterExpression: "organization = :organization",
                ExpressionAttributeValues: {
                   ":organization": obj.organization
                },
                ProjectionExpression: "sensor, organization, team_name, organization_id"
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
        let params;
        if (obj.sensor) {
            params = {
                TableName: "sensor_data",
                KeyConditionExpression:  "team = :team",
                FilterExpression: "sensor = :sensor and organization = :organization",
                ExpressionAttributeValues: {
                   ":sensor": obj.sensor,
                   ":organization": obj.organization,
                   ":team": obj.team
                },
                ProjectionExpression: "sensor,image_id,computed_time,player_id",
                ScanIndexForward: false
            };
        } else {
            params = {
                TableName: "sensor_data",
                KeyConditionExpression:  "team = :team",
                FilterExpression: "organization = :organization",
                ExpressionAttributeValues: {
                   ":organization": obj.organization,
                   ":team": obj.team
                },
                ProjectionExpression: "sensor,image_id,computed_time,player_id",
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
    });
}

function getPlayerSimulationFile(obj) {
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
    getUserDetailByPlayerId
};
