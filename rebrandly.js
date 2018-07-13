var request = require("request");

function apiRequest(endpoint, httpmethod, body){
  request({
    uri: "https://api.rebrandly.com/v1/" + endpoint,
    method: httpmethod,
    body: body ? JSON.stringify(body) : null,
    headers: {
      'Content-Type': 'application/json',
      'apikey': 'YOUR_API_KEY'
    }
    }, function(err, response, body){
    if (err) failure(JSON.parse(err));
    else success(JSON.parse(body));
  })
}

function getRequest(endpoint, success, failure){
  return apiRequest(endpoint, "GET", null, success, failure)
}

function postRequest(endpoint, body, success, failure){
  return apiRequest(endpoint, "POST", body, success, failure)
}

function getAccount(success, failure){
    return getRequest("account", success, failure);
}

function createNewLink(link, success, failure){
  return postRequest("links", link, success, failure);
}

exports.getAccount = getAccount;
exports.createNewLink = createNewLink;