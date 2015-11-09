'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getUserStatus = getUserStatus;
exports.cancelOrder = cancelOrder;
exports.renewLoan = renewLoan;
exports.updateOrder = updateOrder;
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
            if (params.orderId) {
              // make sure all responses have a reference to orderId
              res.orderId = params.orderId;
            }
            resolve(res);
          }
        });
      } else {
        var res = {
          type: 'Error',
          statusCode: response.statusCode,
          statusMessage: response.statusMessage,
          response: response
        };
        // make sure all responses have a reference to orderId
        if (params.orderId) {
          res.orderId = params.orderId;
        }
        reject(res);
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

/**
 * Constructs the object of parameters for OpenUserStatus cancel order request.
 *
 * @param {Object} values Object with the necessary parameters
 * @return {Promise}
 */

function cancelOrder(values) {
  var params = {
    action: 'cancelOrder',
    outputType: 'xml',
    agencyId: values.agencyId,
    orderId: values.orderId,
    orderType: values.orderType,
    userId: values.userId,
    userPincode: values.pinCode
  };
  return sendOpenUserStatusRequest(params);
}

/**
 * Constructs the object of parameters for OpenUserStatus cancel order request.
 *
 * @param {Object} values Object with the necessary parameters
 * @return {Promise}
 */

function renewLoan(values) {
  var params = {
    action: 'renewLoan',
    outputType: 'xml',
    agencyId: values.agencyId,
    loanId: values.loanId,
    userId: values.userId,
    userPincode: values.pinCode
  };
  return sendOpenUserStatusRequest(params);
}

/**
 * Constructs the object of parameters for OpenUserStatus update order request.
 *
 * @param {Object} values Object with the necessary parameters
 * @return {Promise}
 */

function updateOrder(values) {
  var params = {
    action: 'updateOrder',
    outputType: 'xml',
    agencyId: values.agencyId,
    orderId: values.orderId,
    pickUpAgency: values.pickUpAgency,
    userId: values.userId,
    userPincode: values.pinCode
  };
  return sendOpenUserStatusRequest(params);
}

function init() {
  var config = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

  if (!config || !config.endpoint) {
    throw new Error('Expected config object but got null or no endpoint provided');
  }
  endpoint = config.endpoint;
}

var METHODS = {
  getUserStatus: getUserStatus,
  cancelOrder: cancelOrder,
  renewLoan: renewLoan,
  updateOrder: updateOrder
};
exports.METHODS = METHODS;