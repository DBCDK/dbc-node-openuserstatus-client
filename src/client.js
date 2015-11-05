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


export function init(config = null) {
  console.log('INIT USERSTATUS CLIENT');
  if (!config || !config.endpoint) {
    throw new Error('Expected config object but got null or no endpoint provided');
  }
  endpoint = config.endpoint;
}

export const METHODS = {
  getUserStatus: getUserStatus,
  cancelOrder: cancelOrder
};
