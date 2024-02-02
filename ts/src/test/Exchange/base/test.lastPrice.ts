
import assert from 'assert';
import testSharedMethods from './test.sharedMethods.js';
import Precise from '../../../base/Precise.js';

function testLastPrice (exchange, skippedProperties, method, entry, symbol) {
    const format = {
        'info': {},
        'symbol': 'ETH/BTC',
        'timestamp': 1502962946216,
        'datetime': '2017-09-01T00:00:00',
        'price': exchange.parseNumber ('1.234'), // price of last trade (closing price for current period)
        'side': 'buy', // buy or sell
    };
    const emptyAllowedFor = [ 'timestamp', 'datetime', 'side' ];
    testSharedMethods.assertStructure (exchange, skippedProperties, method, entry, format, emptyAllowedFor);
    testSharedMethods.assertTimestampAndDatetime (exchange, skippedProperties, method, entry);
    //
    testSharedMethods.assertGreater (exchange, skippedProperties, method, entry, 'price', '0');
    testSharedMethods.assertInArray (exchange, skippedProperties, method, entry, 'side', [ 'buy', 'sell', undefined ]);
}

export default testLastPrice;
