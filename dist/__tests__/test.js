'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _chai = require('chai');

var _clientJs = require('../client.js');

var OpenUserStatus = _interopRequireWildcard(_clientJs);

describe('Test OpenUserStatus getUserStatus', function () {

  it('Assert a getUserStatus error response', function (done) {
    this.timeout(5000);
    setTimeout(done, 5000);
    var config = {
      endpoint: 'https://openuserstatus.addi.dk/test_1.2/'
    };

    OpenUserStatus.init(config);
    var result = OpenUserStatus.getUserStatus({
      agencyId: '738100',
      userId: '000',
      pinCode: '000'
    });

    result.then(function (userStatusResult) {
      _chai.assert.equal(userStatusResult['ous:getUserStatusResponse']['ous:getUserStatusError'][0], 'Service unavailable');
      done();
    });
  });
});

describe('Test OpenUserStatus cancelOrder', function () {

  it('Assert a cancelOrder error response', function (done) {
    this.timeout(5000);
    setTimeout(done, 5000);
    var config = {
      endpoint: 'https://openuserstatus.addi.dk/test_1.2/'
    };

    OpenUserStatus.init(config);
    var result = OpenUserStatus.cancelOrder({
      agencyId: 'DK-710100',
      userId: '000',
      pinCode: '000'
    });

    result.then(function (cancelOrderResult) {
      _chai.assert.equal(cancelOrderResult['ous:cancelOrderResponse']['ous:cancelOrderError'][0], 'Element rule violated');
      done();
    });
  });
});

describe('Test OpenUserStatus renewLoan', function () {

  it('Assert a renewLoan error response', function (done) {
    this.timeout(5000);
    setTimeout(done, 5000);
    var config = {
      endpoint: 'https://openuserstatus.addi.dk/test_1.2/'
    };

    OpenUserStatus.init(config);
    var result = OpenUserStatus.renewLoan({
      agencyId: 'DK-100451',
      userId: '000',
      pinCode: '000'
    });

    result.then(function (renewLoanResult) {
      _chai.assert.equal(renewLoanResult['ous:renewLoanResponse']['ous:renewLoanError'][0], 'Element rule violated');
      done();
    });
  });
});