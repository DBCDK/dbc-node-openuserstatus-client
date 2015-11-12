'use strict';

import {Promise} from 'es6-promise';
import request from 'request';
import {parseString} from 'xml2js';

let endpoint = null;

/**
 * Retrieves data from the webservice based on the parameters given
 *
 * @param {Object} params Parameters for the request
 * @return {Promise}
 */
function sendOpenUserStatusRequest(params) {
  return new Promise((resolve, reject) => {
    let options = {
      url: endpoint,
      qs: params
    };

    request(options, function (error, response) {
      if (response.statusCode === 200) {
        parseString(response.body, function (err, res) {
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
        let res = {
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
export function getUserStatus(values) {
  const params = {
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
export function cancelOrder(values) {
  const params = {
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
export function renewLoan(values) {
  const params = {
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
export function updateOrder(values) {
  const params = {
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

export function init(config = null) {
  if (!config || !config.endpoint) {
    throw new Error('Expected config object but got null or no endpoint provided');
  }
  endpoint = config.endpoint;
}

export const METHODS = {
  getUserStatus: getUserStatus,
  cancelOrder: cancelOrder,
  renewLoan: renewLoan,
  updateOrder: updateOrder
};
