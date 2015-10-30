'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getUserStatus = getUserStatus;
exports.init = init;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _es6Promise = require('es6-promise');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _xml2js = require('xml2js');

var endpoint = null;

/**
 * Retrieves data from the webservice based on the parameters given
 *
 * @param {Object} params Parameters for the request
 * @return {Promise}
 */
function sendOpenUserStatusRequest(params) {
  return new _es6Promise.Promise(function (resolve, reject) {
    var options = {
      url: endpoint,
      qs: params
    };
    (0, _request2['default'])(options, function (error, response) {
      if (response.statusCode === 200) {
        (0, _xml2js.parseString)(response.body, function (err, res) {
          if (!err) {
            resolve(res);
          }
        });
      } else {
        reject({
          type: 'Error',
          statusCode: response.statusCode,
          statusMessage: response.statusMessage,
          response: response
        });
      }
    });
  });
}

/**
 * Constructs the object of parameters for OpenUserStatus get user status request.
 *
 * @param {Object} values Object with the necessary parameters
 * @return {Promise}
 */

function getUserStatus(values) {
  var params = {
    action: 'getUserStatus',
    outputType: 'xml',
    agencyId: values.agencyId,
    userId: values.userId,
    userPincode: values.pinCode
  };
  return sendOpenUserStatusRequest(params);
}

var METHODS = {
  getUserStatus: getUserStatus
};

exports.METHODS = METHODS;
/**
 * Setting the necessary paramerters for the client to be usable.
 * The endpoint is only set if endpoint is null to allow setting it through
 * environment variables.
 *
 * @param {Object} config Config object with the necessary parameters to use
 * the webservice
 */

function init(config) {
  if (!endpoint) {
    endpoint = config.endpoint;
  }

  return METHODS;
}