'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = OpenUserStatus;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _xml2js = require('xml2js');

/**
 * Retrieves data from the webservice based on the parameters given
 *
 * @param {Object} params Parameters for the request
 * @return {Promise}
 */
function sendOpenUserStatusRequest(endpoint, params) {
  return new Promise(function (resolve, reject) {
    var options = {
      url: endpoint,
      qs: params
    };

    (0, _request2['default'])(options, function (error, response) {
      if (response.statusCode === 200) {
        (0, _xml2js.parseString)(response.body, function (err, res) {
          if (params.orderId) {
            // make sure all responses have a reference to orderId
            res.orderId = params.orderId;
          }
          if (params.loanId) {
            // make sure all responses have a reference to loanId
            res.loanId = params.loanId;
          }
          if (!err) {
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
        // make sure all responses have a reference to loanId
        if (params.loanId) {
          res.loanId = params.loanId;
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
function getUserStatus(endpoint, values) {
  var params = {
    action: 'getUserStatus',
    outputType: 'xml',
    agencyId: values.agencyId,
    userId: values.userId,
    userPincode: values.pinCode
  };
  return sendOpenUserStatusRequest(endpoint, params);
}

/**
 * Constructs the object of parameters for OpenUserStatus cancel order request.
 *
 * @param {Object} values Object with the necessary parameters
 * @return {Promise}
 */
function cancelOrder(endpoint, values) {
  var params = {
    action: 'cancelOrder',
    outputType: 'xml',
    agencyId: values.agencyId,
    orderId: values.orderId,
    orderType: values.orderType,
    userId: values.userId,
    userPincode: values.pinCode
  };
  return sendOpenUserStatusRequest(endpoint, params);
}

/**
 * Constructs the object of parameters for OpenUserStatus cancel order request.
 *
 * @param {Object} values Object with the necessary parameters
 * @return {Promise}
 */
function renewLoan(endpoint, values) {
  var params = {
    action: 'renewLoan',
    outputType: 'xml',
    agencyId: values.agencyId,
    loanId: values.loanId,
    userId: values.userId,
    userPincode: values.pinCode
  };
  return sendOpenUserStatusRequest(endpoint, params);
}

/**
 * Constructs the object of parameters for OpenUserStatus update order request.
 *
 * @param {Object} values Object with the necessary parameters
 * @return {Promise}
 */
function updateOrder(endpoint, values) {
  var params = {
    action: 'updateOrder',
    outputType: 'xml',
    agencyId: values.agencyId,
    orderId: values.orderId,
    pickUpAgency: values.pickUpAgency,
    userId: values.userId,
    userPincode: values.pinCode
  };
  return sendOpenUserStatusRequest(endpoint, params);
}

function OpenUserStatus() {
  var config = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

  if (!config || !config.endpoint) {
    throw new Error('Expected config object but got null or no endpoint provided');
  }

  return {
    getUserStatus: getUserStatus.bind(null, config.endpoint),
    cancelOrder: cancelOrder.bind(null, config.endpoint),
    renewLoan: renewLoan.bind(null, config.endpoint),
    updateOrder: updateOrder.bind(null, config.endpoint)
  };
}

module.exports = exports['default'];