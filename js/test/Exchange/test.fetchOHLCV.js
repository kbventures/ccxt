'use strict'

const assert = require ('assert');
const testOHLCV = require ('./test.ohlcv.js');

async function testFetchOHLCV (exchange, symbol) {
    const method = 'fetchOHLCV';
    const timeframes = Object.keys (exchange.timeframes);
    const timeframe = timeframes[0];
    const limit = 10;
    const duration = exchange.parseTimeframe (timeframe);
    const since = exchange.milliseconds () - duration * limit * 1000 - 1000;
    const ohlcvs = await exchange[method] (symbol, timeframe, since, limit);
    assert (Array.isArray (ohlcvs), exchange.id + ' ' + method + ' must return an array, returned ' + exchange.json (ohlcvs));
    console.log (exchange.id, method, 'fetched', ohlcvs.length, 'entries, asserting each ...');
    const now = exchange.milliseconds ();
    for (let i = 0; i < ohlcvs.length; i++) {
        testOHLCV (exchange, method, ohlcvs[i], symbol, now);
    }
    // todo: sorted timestamps check
}

module.exports = testFetchOHLCV;