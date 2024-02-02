import Exchange from './abstract/commex.js';
import { sha256 } from './static_dependencies/noble-hashes/sha256.js';
import { sha512 } from './static_dependencies/noble-hashes/sha512.js';
import type { Int, OHLCV, Trade, Market, Ticker } from './base/types.js';

/**
 * @class Commex
 * @augments Exchange
 */
export default class commex extends Exchange {
    describe () {
        return this.deepExtend (super.describe (), {
            'id': 'commex',
            'name': 'Commex',
            'countries': [ 'RU' ],
            'rateLimit': 1000,
            'version': 'v1',
            'has': {
                'CORS': undefined,
                'spot': true,
                'margin': false,
                'swap': false,
                'future': true,
                'option': false,
                'addMargin': false,
                'cancelAllOrders': true,
                'cancelOrder': true,
                'cancelOrders': true,
                'createDepositAddress': true,
                'createOrder': true,
                'createStopLimitOrder': true,
                'createStopMarketOrder': true,
                'createStopOrder': true,
                'editOrder': true,
                'fetchBalance': true,
                'fetchBorrowInterest': false,
                'fetchBorrowRateHistories': false,
                'fetchBorrowRateHistory': false,
                'fetchClosedOrders': true,
                'fetchCrossBorrowRate': false,
                'fetchCrossBorrowRates': false,
                'fetchCurrencies': true,
                'fetchDepositAddress': true,
                'fetchDeposits': true,
                'fetchFundingHistory': false,
                'fetchFundingRate': false,
                'fetchFundingRateHistory': false,
                'fetchFundingRates': false,
                'fetchIndexOHLCV': false,
                'fetchIsolatedBorrowRate': false,
                'fetchIsolatedBorrowRates': false,
                'fetchLedger': true,
                'fetchLedgerEntry': true,
                'fetchLeverageTiers': false,
                'fetchMarkets': true,
                'fetchMarkOHLCV': false,
                'fetchMyTrades': true,
                'fetchOHLCV': true,
                'fetchOpenInterestHistory': false,
                'fetchOpenOrders': true,
                'fetchOrder': true,
                'fetchOrderBook': true,
                'fetchOrderTrades': 'emulated',
                'fetchPositions': true,
                'fetchPremiumIndexOHLCV': false,
                'fetchTicker': true,
                'fetchTickers': true,
                'fetchTime': true,
                'fetchTrades': true,
                'fetchTradingFee': true,
                'fetchTradingFees': false,
                'fetchWithdrawals': true,
                'setLeverage': false,
                'setMarginMode': false,
                'transfer': true,
                'withdraw': true,
            },
            // https://www.commex.com/api-docs/en/?shell#public-api-definitions
            'timeframes': {
                '1m': '1m',
                '3m': '3m',
                '5m': '5m',
                '15m': '15m',
                '30m': '30m',
                '1h': '1h',
                '4h': '4h',
                '6h': '6h',
                '8h': '8h',
                '12h': '12h',
                '1d': '1d',
                '3d': '3d',
                '1w': '1w',
            },
            'fees': {
                'trading': {
                    'tierBased': true,
                    'percentage': true,
                    'maker': this.parseNumber ('0.001'),
                    'taker': this.parseNumber ('0.001'),
                    'tiers': {
                        'taker': [
                            [ this.parseNumber ('0'), this.parseNumber ('0.001') ],
                            [ this.parseNumber ('1000000'), this.parseNumber ('0.006') ],
                            [ this.parseNumber ('2000000'), this.parseNumber ('0.005') ],
                            [ this.parseNumber ('4000000'), this.parseNumber ('0.004') ],
                            [ this.parseNumber ('8000000'), this.parseNumber ('0.002') ],
                            [ this.parseNumber ('3000000'), this.parseNumber ('0.002') ],
                        ],
                        'maker': [
                            [ this.parseNumber ('0'), this.parseNumber ('0.001') ],
                            [ this.parseNumber ('1000000'), this.parseNumber ('0.005') ],
                            [ this.parseNumber ('2000000'), this.parseNumber ('0.004') ],
                            [ this.parseNumber ('4000000'), this.parseNumber ('0.003') ],
                            [ this.parseNumber ('8000000'), this.parseNumber ('0.001') ],
                            [ this.parseNumber ('3000000'), this.parseNumber ('0.0') ],
                        ],
                    },
                },
            },
            'urls': {
                'logo': 'https://example.com/image.jpg',
                'api': {
                    'public': 'https://api.commex.com/api',
                },
                'www': 'https://www.commex.com',
                'doc': [
                    'https://www.commex.com/api-docs/en/#rest-open-api',
                    'https://www.commex.com/api-docs/en/futures-api.html',
                ],
            },
            'api': {
                'public': {
                    'get': [
                        'ticker/bookTicker',
                        'exchangeInfo',
                        'klines',
                        'time',
                        'depth',
                        'trades',
                        'aggTrades',
                        'ticker/24hr',
                    ],
                },
            },
        });
    }

    async fetchMarkets (params = {}) {
        /**
         * @method
         * @name commex#fetchMarkets
         * @description retrieves data on all markets for commex
         * @see https://www.commex.com/api-docs/en/index.html#exchange-information
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object[]} an array of objects representing market data
         */
        const response = await this.publicGetExchangeInfo (params);
        //         https://api.commex.com/api/v1/ticker/bookTicker
        // [
        //   {
        //     symbol: 'BTCUSDT',
        //     bidPrice: '43599.00000000',
        //     bidQty: '0.00010000',
        //     askPrice: '43600.60000000',
        //     askQty: '0.00515000'
        //   },
        //   {
        //     symbol: 'ETHUSDT',
        //     bidPrice: '2282.14000000',
        //     bidQty: '1.44540000',
        //     askPrice: '2282.15000000',
        //     askQty: '0.83530000'
        //   },
        // commex end
        const markets = this.safeValue (response, 'symbols', {});
        const result = [];
        for (let i = 0; i < markets.length; i++) {
            const market = markets[i];
            const baseId = this.safeString (market, 'baseAsset');
            const quoteId = this.safeString (market, 'quoteAsset');
            const base = this.safeCurrencyCode (baseId);
            const quote = this.safeCurrencyCode (quoteId);
            const altName = this.safeString (market, 'symbol');
            const leverageBuy = undefined;
            const leverageBuyLength = undefined;
            const precisionPrice = this.parseNumber (this.parsePrecision (this.safeString (market, 'pair_decimals')));
            result.push ({
                'id': market['symbol'],
                'wsId': undefined,
                'symbol': altName,
                'base': base,
                'quote': quote,
                'settle': undefined,
                'baseId': baseId,
                'quoteId': quoteId,
                'settleId': undefined,
                'darkpool': undefined,
                'altname': altName,
                'type': 'spot',
                'spot': true,
                'margin': undefined,
                'swap': false,
                'future': false,
                'option': false,
                'active': true,
                'contract': false,
                'linear': undefined,
                'inverse': undefined,
                // 'taker': false,
                // 'maker': false,
                'contractSize': undefined,
                'expiry': undefined,
                'expiryDatetime': undefined,
                'strike': undefined,
                'optionType': undefined,
                'precision': {
                    'amount': this.parseNumber (this.parsePrecision (this.safeString (market, 'lot_decimals'))),
                    'price': precisionPrice,
                },
                'limits': {
                    'leverage': {
                        'min': this.parseNumber ('1'),
                        'max': this.safeNumber (leverageBuy, leverageBuyLength - 1, 1),
                    },
                    'amount': {
                        'min': this.safeNumber (market, 'ordermin'),
                        'max': undefined,
                    },
                    'price': {
                        'min': precisionPrice,
                        'max': undefined,
                    },
                    'cost': {
                        'min': this.safeNumber (market, 'costmin'),
                        'max': undefined,
                    },
                },
                'created': undefined,
                'info': market,
            });
        }
        this.options['marketsByAltname'] = this.indexBy (result, 'altname');
        return result;
    }

    sign (path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        let url = '/' + this.version + '/' + path;
        if (api === 'public') {
            if (Object.keys (params).length) {
                // urlencodeNested is used to address https://github.com/ccxt/ccxt/issues/12872
                url += '?' + this.urlencodeNested (params);
            }
        } else if (api === 'private') {
            const isCancelOrderBatch = (path === 'CancelOrderBatch');
            this.checkRequiredCredentials ();
            const nonce = this.nonce ().toString ();
            // urlencodeNested is used to address https://github.com/ccxt/ccxt/issues/12872
            if (isCancelOrderBatch) {
                body = this.json (this.extend ({ 'nonce': nonce }, params));
            } else {
                body = this.urlencodeNested (this.extend ({ 'nonce': nonce }, params));
            }
            const auth = this.encode (nonce + body);
            const hash = this.hash (auth, sha256, 'binary');
            const binary = this.encode (url);
            const binhash = this.binaryConcat (binary, hash);
            const secret = this.base64ToBinary (this.secret);
            const signature = this.hmac (binhash, secret, sha512, 'base64');
            headers = {
                'API-Key': this.apiKey,
                'API-Sign': signature,
                // 'Content-Type': 'application/x-www-form-urlencoded',
            };
            if (isCancelOrderBatch) {
                headers['Content-Type'] = 'application/json';
            } else {
                headers['Content-Type'] = 'application/x-www-form-urlencoded';
            }
        } else {
            url = '/' + path;
        }
        url = this.urls['api'][api] + url;
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }

    async fetchOHLCV (symbol: string, timeframe = '1m', since: Int = undefined, limit: Int = undefined, params = {}): Promise<OHLCV[]> {
        /**
         * @method
         * @name commex#fetchOHLCV
         * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
         * @see https://www.commex.com/api-docs/en/?shell#kline-candlestick-data
         * @param {string} symbol unified symbol of the market to fetch OHLCV data
         * @param {string} timeframe the length of time each candle represents
         * @param {int} [since] timestamp in ms of the earliest candle to fetch
         * @param {int} [limit] the maximum amount of candles to fetch
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {boolean} [params.paginate] default false, when true will automatically paginate by calling this endpoint multiple times. See in the docs all the [availble parameters](https://github.com/ccxt/ccxt/wiki/Manual#pagination-params)
         * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
         */
        await this.loadMarkets ();
        let paginate = false;
        [ paginate, params ] = this.handleOptionAndParams (params, 'fetchOHLCV', 'paginate');
        if (paginate) {
            return await this.fetchPaginatedCallDeterministic ('fetchOHLCV', symbol, since, limit, timeframe, params, 720) as OHLCV[];
        }
        const market = this.market (symbol);
        const parsedTimeframe = this.safeString (this.timeframes, timeframe);
        const request = {
            'symbol': market['id'],
        };
        if (parsedTimeframe !== undefined) {
            request['interval'] = parsedTimeframe;
        } else {
            request['interval'] = timeframe;
        }
        if (since !== undefined) {
            request['startTime'] = this.parseToInt ((since - 1) / 1000);
        }
        const response = await this.publicGetKlines (this.extend (request, params));
        // commex.fetchOHLCV('BTCUSDT','1d','unix time stamp start time','limit', {aditional query paramters example endTime for commex})
        // [
        //     [
        //       1499040000000,      // Open time
        //       "0.01634790",       // Open
        //       "0.80000000",       // High
        //       "0.01575800",       // Low
        //       "0.01577100",       // Close
        //       "148976.11427815",  // Volume
        //       1499644799999,      // Close time
        //       "2434.19055334",    // Quote asset volume
        //       308,                // Number of trades
        //       "1756.87402397",    // Taker buy base asset volume
        //       "28.46694368"       // Taker buy quote asset volume
        //     ]
        //   ]
        return this.parseOHLCVs (response, market, timeframe, since, limit);
    }

    async fetchStatus (params = {}) {
        /**
         * @method
         * @name commex#fetchStatus
         * @description the latest known information on the availability of the exchange API
         * @see https://www.commex.com/api-docs/en/?shell#check-server-time
         * @returns {object} a [status structure]{@link https://docs.ccxt.com/#/?id=exchange-status-structure}
         */
        const response = await this.publicGetTime (params);
        // { "serverTime": 1655374964469 }
        const data = this.safeTimestamp (response, 'serverTime', 0);
        return {
            'status': (data !== 0) ? 'ok' : 'maintenance',
            'updated': undefined,
            'eta': undefined,
            'url': undefined,
            'info': undefined,
        };
    }

    async fetchTrades (symbol: string, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Trade[]> {
        /**
         * @method
         * @name binance#fetchTrades
         * @description get the list of most recent trades for a particular symbol
         * Default fetchTradesMethod
         * @see https://binance-docs.github.io/apidocs/spot/en/#compressed-aggregate-trades-list        // publicGetAggTrades (spot)
         * Other fetchTradesMethod
         * @see https://binance-docs.github.io/apidocs/spot/en/#recent-trades-list                      // publicGetTrades (spot)
         * @param {string} symbol unified symbol of the market to fetch trades for
         * @param {int} [since] not used by commex
         * @param {int} [limit] default 500, max 1000
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {int} [params.until] only used when fetchTradesMethod is 'publicGetAggTrades'
         * @param {int} [params.fetchTradesMethod] 'publicGetAggTrades' (spot default), 'publicGetTrades'         *
         * EXCHANGE SPECIFIC PARAMETERS
         * @param {int} [params.fromId] trade id to fetch from, default gets most recent trades, not used when fetchTradesMethod is 'publicGetTrades'
         * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
         */
        await this.loadMarkets ();
        // let paginate = false;
        // [ paginate, params ] = this.handleOptionAndParams (params, 'fetchTrades', 'paginate');
        const market = this.market (symbol);
        const request = {
            'symbol': market['id'],
            // 'fromId': 123,    // ID to get aggregate trades from INCLUSIVE.
            // 'startTime': 456, // Timestamp in ms to get aggregate trades from INCLUSIVE.
            // 'endTime': 789,   // Timestamp in ms to get aggregate trades until INCLUSIVE.
            // 'limit': 500,     // default = 500, maximum = 1000
        };
        // let method = this.safeString (this.options, 'fetchTradesMethod');
        // ????
        // let method = this.safeString2 (params, 'fetchTradesMethod', 'method');
        const method = this.safeString (params, 'fetchTradesMethod', 'publicGetAggTrades');
        // if (method === undefined) {
        //     method = 'publicGetAggTrades';
        // }
        if (since !== undefined) {
            request['startTime'] = since;
            // https://github.com/ccxt/ccxt/issues/6400
            // https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#compressedaggregate-trades-list
            request['endTime'] = this.sum (since, 3600000);
        }
        const until = this.safeInteger (params, 'until');
        if (until !== undefined) {
            request['endTime'] = until;
        }
        if (limit !== undefined) {
            request['limit'] = limit; // default = 500, maximum = 1000
        }
        params = this.omit (params, [ 'until', 'fetchTradesMethod' ]);
        //
        // Caveats:
        // - default limit (500) applies only if no other parameters set, trades up
        //   to the maximum limit may be returned to satisfy other parameters
        // - if both limit and time window is set and time window contains more
        //   trades than the limit then the last trades from the window are returned
        // - "tradeId" accepted and returned by this method is "aggregate" trade id
        //   which is different from actual trade id
        // - setting both fromId and time window results in error
        const response = await this[method] (this.extend (request, params));
        // Aggregated trades
        // [
        //     {
        //       "a": 26129,          // Aggregate tradeId
        //       "p": "0.01633102",   // Price
        //       "q": "4.70443515",   // Quantity
        //       "f": 27781,          // First tradeId
        //       "l": 27781,          // First tradeId
        //       "T": 1498793709153,  // Timestamp
        //       "m": true            // Was the buyer the maker?
        //     }
        //   ]
        // Recent trades
        // [
        //     {
        //       "id": 28457,
        //       "price": "4.00000100",
        //       "qty": "12.00000000",
        //       "quoteQty": "48.000012",
        //       "time": 1499865549590,
        //       "isBuyerMaker": true,
        //       "isBestMatch": true
        //     }
        //   ]
        return this.parseTrades (response, market, since, limit);
    }

    parseTrade (trade, market: Market = undefined): Trade {
        // Binance
        // aggregate trades
        // https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#compressedaggregate-trades-list
        //
        //     {
        //         "a": 26129,         // Aggregate tradeId
        //         "p": "0.01633102",  // Price
        //         "q": "4.70443515",  // Quantity
        //         "f": 27781,         // First tradeId
        //         "l": 27781,         // Last tradeId
        //         "T": 1498793709153, // Timestamp
        //         "m": true,          // Was the buyer the maker?
        //         "M": true           // Was the trade the best price match?
        //     }
        //
        // REST: aggregate trades for swap & future (both linear and inverse)
        //
        //     {
        //         "a": "269772814",
        //         "p": "25864.1",
        //         "q": "3",
        //         "f": "662149354",
        //         "l": "662149355",
        //         "T": "1694209776022",
        //         "m": false,
        //     }
        //
        // recent public trades and old public trades
        // https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#recent-trades-list
        // https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#old-trade-lookup-market_data
        //
        //     {
        //         "id": 28457,
        //         "price": "4.00000100",
        //         "qty": "12.00000000",
        //         "time": 1499865549590,
        //         "isBuyerMaker": true,
        //         "isBestMatch": true
        //     }
        //
        // private trades
        // https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#account-trade-list-user_data
        //
        //     {
        //         "symbol": "BNBBTC",
        //         "id": 28457,
        //         "orderId": 100234,
        //         "price": "4.00000100",
        //         "qty": "12.00000000",
        //         "commission": "10.10000000",
        //         "commissionAsset": "BNB",
        //         "time": 1499865549590,
        //         "isBuyer": true,
        //         "isMaker": false,
        //         "isBestMatch": true
        //     }
        //
        // futures trades
        // https://binance-docs.github.io/apidocs/futures/en/#account-trade-list-user_data
        //
        //     {
        //       "accountId": 20,
        //       "buyer": False,
        //       "commission": "-0.07819010",
        //       "commissionAsset": "USDT",
        //       "counterPartyId": 653,
        //       "id": 698759,
        //       "maker": False,
        //       "orderId": 25851813,
        //       "price": "7819.01",
        //       "qty": "0.002",
        //       "quoteQty": "0.01563",
        //       "realizedPnl": "-0.91539999",
        //       "side": "SELL",
        //       "symbol": "BTCUSDT",
        //       "time": 1569514978020
        //     }
        //     {
        //       "symbol": "BTCUSDT",
        //       "id": 477128891,
        //       "orderId": 13809777875,
        //       "side": "SELL",
        //       "price": "38479.55",
        //       "qty": "0.001",
        //       "realizedPnl": "-0.00009534",
        //       "marginAsset": "USDT",
        //       "quoteQty": "38.47955",
        //       "commission": "-0.00076959",
        //       "commissionAsset": "USDT",
        //       "time": 1612733566708,
        //       "positionSide": "BOTH",
        //       "maker": true,
        //       "buyer": false
        //     }
        //
        // { respType: FULL }
        //
        //     {
        //       "price": "4000.00000000",
        //       "qty": "1.00000000",
        //       "commission": "4.00000000",
        //       "commissionAsset": "USDT",
        //       "tradeId": "1234",
        //     }
        //
        // options: fetchMyTrades
        //
        //     {
        //         "id": 1125899906844226012,
        //         "tradeId": 73,
        //         "orderId": 4638761100843040768,
        //         "symbol": "ETH-230211-1500-C",
        //         "price": "18.70000000",
        //         "quantity": "-0.57000000",
        //         "fee": "0.17305890",
        //         "realizedProfit": "-3.53400000",
        //         "side": "SELL",
        //         "type": "LIMIT",
        //         "volatility": "0.30000000",
        //         "liquidity": "MAKER",
        //         "time": 1676085216845,
        //         "priceScale": 1,
        //         "quantityScale": 2,
        //         "optionSide": "CALL",
        //         "quoteAsset": "USDT"
        //     }
        //
        // options: fetchTrades
        //
        //     {
        //         "id": 1,
        //         "symbol": "ETH-230216-1500-C",
        //         "price": "35.5",
        //         "qty": "0.03",
        //         "quoteQty": "1.065",
        //         "side": 1,
        //         "time": 1676366446072
        //     }
        //
        // Commex
        // Aggregate data
        // https://www.commex.com/api-docs/en/#compressed-aggregate-trades-list
        //     {
        //       "a": 26129,          // Aggregate tradeId
        //       "p": "0.01633102",   // Price
        //       "q": "4.70443515",   // Quantity
        //       "f": 27781,          // First tradeId
        //       "l": 27781,          // First tradeId
        //       "T": 1498793709153,  // Timestamp
        //       "m": true            // Was the buyer the maker?
        //     }
        // Rescent trades list
        // https://www.commex.com/api-docs/en/#recent-trades-list
        //   {
        //     "id": 28457,
        //     "price": "4.00000100",
        //     "qty": "12.00000000",
        //     "quoteQty": "48.000012",
        //     "time": 1499865549590,
        //     "isBuyerMaker": true,
        //     "isBestMatch": true
        //   }
        const timestamp = this.safeInteger2 (trade, 'T', 'time');
        const price = this.safeString2 (trade, 'p', 'price');
        const amount = this.safeString2 (trade, 'q', 'qty');
        const cost = this.safeString2 (trade, 'quoteQty', undefined);
        const symbol = market['symbol'];
        const id = this.safeString2 (trade, 'a', 'id');
        let side = undefined;
        const buyerMaker = this.safeValue2 (trade, 'm', 'isBuyerMaker');
        side = buyerMaker ? 'sell' : 'buy'; // this is reversed intentionally
        return this.safeTrade ({
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'symbol': symbol,
            'id': id,
            'order': undefined,
            // 'type': this.safeStringLower (trade, 'type'),
            'side': side,
            'takerOrMaker': undefined,
            'price': price,
            'amount': amount,
            'cost': cost,
            'fee': undefined,
        }, market);
    }

    async fetchTicker (symbol: string, params = {}): Promise<Ticker> {
        /**
         * @method
         * @name commex#fetchTicker
         * @description fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
         * @see https://www.commex.com/api-docs/en/#24hr-ticker-price-change-statistics         // spot
         * @param {string} symbol unified symbol of the market to fetch the ticker for
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {boolean} [params.rolling] (spot only) default false, if true, uses the rolling 24 hour ticker endpoint /api/v3/ticker
         * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
         * Example request single ticker
         * {"symbol":"BTCUSDT","priceChange":"536.40000000","priceChangePercent":"1.257","weightedAvgPrice":"43067.42186779","prevClosePrice":null,"lastPrice":"43205.10000000",
         * "lastQty":null,"bidPrice":"43222.80000000","bidQty":"0.05410000","askPrice":"43253.10000000","askQty":"0.09600000","openPrice":"42668.70000000",
         * "highPrice":"43466.80000000","lowPrice":"42566.40000000","volume":"69.86994000","openTime":1706806740000,"closeTime":1706893164145,"firstId":168282,
         * "lastId":172205,"count":3924,"quoteVolume":"3009118.18185700"};
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'symbol': market['id'],
        };
        let response = undefined;
        response = await this.publicGetTicker24hr (this.extend (request, params));
        return this.parseTicker (response, market);
    }

    parseTicker (ticker, market: Market = undefined): Ticker {
        const timestamp = this.safeInteger (ticker, 'closeTime');
        const marketType = 'Spot';
        const marketId = this.safeString (ticker, 'symbol');
        const symbol = this.safeSymbol (marketId, market, undefined, marketType);
        const last = this.safeString (ticker, 'lastPrice');
        const baseVolume = this.safeString (ticker, 'volume');
        const quoteVolume = this.safeString2 (ticker, 'quoteVolume', 'amount');
        return this.safeTicker ({
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'high': this.safeString2 (ticker, 'highPrice', 'high'),
            'low': this.safeString2 (ticker, 'lowPrice', 'low'),
            'bid': this.safeString (ticker, 'bidPrice'),
            'bidVolume': this.safeString (ticker, 'bidQty'),
            'ask': this.safeString (ticker, 'askPrice'),
            'askVolume': this.safeString (ticker, 'askQty'),
            'vwap': this.safeString (ticker, 'weightedAvgPrice'),
            'open': this.safeString2 (ticker, 'openPrice', 'open'),
            'close': last,
            'last': last,
            'previousClose': this.safeString (ticker, 'prevClosePrice'), // previous day close
            'change': this.safeString (ticker, 'priceChange'),
            'percentage': this.safeString (ticker, 'priceChangePercent'),
            'average': undefined,
            'baseVolume': baseVolume,
            'quoteVolume': quoteVolume,
            'info': ticker,
        }, market);
    }
}

