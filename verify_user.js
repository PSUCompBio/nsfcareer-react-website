// Middle-ware to verify the idToken retrieved from cookie
var https = require('https');
var jose = require('node-jose');
var cognito = require("./config/cognito_configuration");

// ================================================
//            MIDDLEWARE CONFIGURATION
// ================================================

var region = cognito.region;
var userpool_id = cognito.userPoolId;
var app_client_id = cognito.ClientId;
var keys_url = 'https://cognito-idp.' + region + '.amazonaws.com/' + userpool_id + '/.well-known/jwks.json';

// ================================================
//         MIDDLEWARE - Cognito Token Verifier
// ================================================
function VerifyToken(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )

    console.log("Verify Token is called");
    
    try {
        var sections = req.cookies.token.split('.');
        
        // get the kid from the headers prior to verification
        var header = jose.util.base64url.decode(sections[0]);

        header = JSON.parse(header);

        var kid = header.kid;
        // download the public keys
        https.get(keys_url, function (response) {
            if (response.statusCode == 200) {
                response.on('data', function (body) {
                    var keys = JSON.parse(body)['keys'];
                    // search for the kid in the downloaded public keys
                    var key_index = -1;
                    for (var i = 0; i < keys.length; i++) {
                        if (kid == keys[i].kid) {
                            key_index = i;
                            break;
                        }
                    }
                    if (key_index == -1) {
                        console.log('Public key not found in jwks.json');
                        res.send({
                            message : "failure",
                            status : "AUTH_FAILURE",
                            error : "Internal Service Error"
                        })
                    }
                    // construct the public key
                    jose.JWK.asKey(keys[key_index]).
                    then(function (result) {
                        // verify the signature
                        jose.JWS.createVerify(result).
                        verify(req.cookies.token).
                        then(function (result) {
                            // now we can use the claims
                            var claims = JSON.parse(result.payload);
                            // additionally we can verify the token expiration
                            var current_ts = Math.floor(new Date() / 1000);
                            if (current_ts > claims.exp) {
                                res.send({
                                    message : "failure",
                                    status : "AUTH_FAILURE",
                                    error : "User session expired"
                                })
                            }
                            // and the Audience (use claims.client_id if verifying an access token)
                            else if (claims.aud != app_client_id) {
                                console.log('Token was not issued for this audience');
                                res.send({
                                    message : "failure",
                                    status : "AUTH_FAILURE",
                                    error : "Token not issued for this audience"
                                })
                            }
                            else{

                                req["user_cognito_id"] = claims.sub;
                                next();
                            }
                            
                        }).
                        catch(function () {
                            console.log('Signature verification failed');
                            res.send({
                                message : "failure",
                                status : "AUTH_FAILURE",
                                error : "Signature Verification failed!"
                            })
                        });
                    });
                });
            }
        });
    } catch (e) {
        console.log("Invalid token Input");
        
        res.send({
            message : "failure",
            status : "AUTH_FAILURE",
            error : "Invalid Token Input"
        })
    }
}


module.exports = VerifyToken;