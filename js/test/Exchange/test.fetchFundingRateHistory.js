'use strict'

const assert = require ('assert');
const testFundingRateHistory = require ('./test.fundingRateHistory.js');
const testSharedMethods = require ('./test.sharedMethods.js');

async function testFetchFundingRateHistory (exchange, symbol) {
    const method = 'fetchFundingRateHistory';
    const fundingRatesHistory = await exchange[method] (symbol);
    assert (Array.isArray (fundingRatesHistory), exchange.id + ' ' + method + ' ' + symbol + ' must return an array, returned ' + exchange.json (fundingRatesHistory));
    console.log (exchange.id, method, 'fetched', fundingRatesHistory.length, 'entries, asserting each ...');
    for (let i = 0; i < fundingRatesHistory.length; i++) {
        testFundingRateHistory (exchange, method, fundingRatesHistory[i], symbol);
    }
    testSharedMethods.reviseSortedTimestamps (exchange, method, symbol, fundingRatesHistory);
}

module.exports = testFetchFundingRateHistory;