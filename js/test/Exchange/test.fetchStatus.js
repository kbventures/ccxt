'use strict'

const testStatus = require ('./test.status.js');

async function testFetchStatus (exchange) {
    const method = 'fetchStatus';
    const status = await exchange[method] ();
    console.log (exchange.id, method, 'fetched succesfully, asserting now ...');
    testStatus (exchange, method, status, exchange.milliseconds ());
}

module.exports = testFetchStatus;