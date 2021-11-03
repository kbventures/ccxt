'use strict';

//  ---------------------------------------------------------------------------

const Exchange = require ('./base/Exchange');
const { ExchangeError, ArgumentsRequired, InvalidNonce, OrderNotFound, InvalidOrder, DDoSProtection, BadRequest, AuthenticationError } = require ('./base/errors');
const Precise = require ('./base/Precise');
const { TICK_SIZE } = require ('./base/functions/number');

//  ---------------------------------------------------------------------------

module.exports = class latoken2 extends Exchange {
    describe () {
        return this.deepExtend (super.describe (), {
            'id': 'latoken2',
            'name': 'Latoken',
            'countries': [ 'KY' ], // Cayman Islands
            'version': 'v2',
            'rateLimit': 2000,
            'certified': false,
            'userAgent': this.userAgents['chrome'],
            'has': {
                'fetchBalance': true,
                'fetchCurrencies': true,
                'fetchMarkets': true,
                'fetchMyTrades': true,
                'fetchOrderBook': true,
                'fetchOrder': true,
                'fetchOrders': true,
                'fetchTicker': true,
                'fetchTickers': true,
                'fetchTrades': true,
                'fetchTransactions': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/61511972-24c39f00-aa01-11e9-9f7c-471f1d6e5214.jpg',
                'api': 'https://api.latoken.com',
                'www': 'https://latoken.com',
                'doc': [
                    'https://api.latoken.com',
                ],
                'fees': 'https://latoken.com/fees',
            },
            'api': {
                'public': {
                    'get': {
                        'book/{currency}/{quote}': 1,
                        'chart/week': 1,
                        'chart/week/{currency}/{quote}': 1,
                        'currency': 1,
                        'currency/available': 1,
                        'currency/quotes': 1,
                        'currency/{currency}': 1,
                        'pair': 1,
                        'pair/available': 1,
                        'ticker': 1,
                        'ticker/{base}/{quote}': 1,
                        'time': 1,
                        'trade/history/{currency}/{quote}': 1,
                        'trade/fee/{currency}/{quote}': 1,
                        'trade/feeLevels': 1,
                        'transaction/bindings': 1,
                    },
                },
                'private': {
                    'get': {
                        'auth/account': 1,
                        'auth/account/currency/{currency}/{type}': 1,
                        'auth/order': 1,
                        'auth/order/getOrder/{id}': 1,
                        'auth/order/pair/{currency}/{quote}': 1,
                        'auth/order/pair/{currency}/{quote}/active': 1,
                        'auth/stopOrder': 1,
                        'auth/stopOrder/getOrder/{id}': 1,
                        'auth/stopOrder/pair/{currency}/{quote}': 1,
                        'auth/stopOrder/pair/{currency}/{quote}/active': 1,
                        'auth/trade': 1,
                        'auth/trade/pair/{currency}/{quote}': 1,
                        'auth/trade/fee/{currency}/{quote}': 1,
                        'auth/transaction': 1,
                        'auth/transaction/bindings': 1,
                        'auth/transaction/bindings/{currency}': 1,
                        'auth/transaction/{id}': 1,
                        'auth/transfer': 1,
                    },
                    'post': {
                        'auth/order/cancel': 1,
                        'auth/order/cancelAll': 1,
                        'auth/order/cancelAll/{currency}/{quote}': 1,
                        'auth/order/place': 1,
                        'auth/spot/deposit': 1,
                        'auth/spot/withdraw': 1,
                        'auth/stopOrder/cancel': 1,
                        'auth/stopOrder/cancelAll': 1,
                        'auth/stopOrder/cancelAll/{currency}/{quote}': 1,
                        'auth/stopOrder/place': 1,
                        'auth/transaction/depositAddress': 1,
                        'auth/transaction/withdraw': 1,
                        'auth/transaction/withdraw/cancel': 1,
                        'auth/transaction/withdraw/confirm': 1,
                        'auth/transaction/withdraw/resendCode': 1,
                        'auth/transfer/email': 1,
                        'auth/transfer/id': 1,
                        'auth/transfer/phone': 1,
                    },
                },
            },
            'precisionMode': TICK_SIZE,
            'fees': {
                'trading': {
                    'feeSide': 'get',
                    'tierBased': false,
                    'percentage': true,
                    'maker': this.parseNumber ('0.0049'),
                    'taker': this.parseNumber ('0.0049'),
                },
            },
            'commonCurrencies': {
                'MT': 'Monarch',
                'TPAY': 'Tetra Pay',
                'TSL': 'Treasure SL',
            },
            'exceptions': {
                'exact': {
                    // INTERNAL_ERROR - internal server error. You can contact our support to solve this problem.
                    // SERVICE_UNAVAILABLE - requested information currently not available. You can contact our support to solve this problem or retry later.
                    // NOT_AUTHORIZED - user's query not authorized. Check if you are logged in.
                    // FORBIDDEN - you don't have enough access rights.
                    // BAD_REQUEST - some bad request, for example bad fields values or something else. Read response message for more information.
                    // NOT_FOUND - entity not found. Read message for more information.
                    // ACCESS_DENIED - access is denied. Probably you don't have enough access rights, you contact our support.
                    // REQUEST_REJECTED - user's request rejected for some reasons. Check error message.
                    // HTTP_MEDIA_TYPE_NOT_SUPPORTED - http media type not supported.
                    // MEDIA_TYPE_NOT_ACCEPTABLE - media type not acceptable
                    // METHOD_ARGUMENT_NOT_VALID - one of method argument is invalid. Check argument types and error message for more information.
                    // VALIDATION_ERROR - check errors field to get reasons.
                    // ACCOUNT_EXPIRED - restore your account or create a new one.
                    // BAD_CREDENTIALS - invalid username or password.
                    // COOKIE_THEFT - cookie has been stolen. Let's try reset your cookies.
                    // CREDENTIALS_EXPIRED - credentials expired.
                    // INSUFFICIENT_AUTHENTICATION - for example, 2FA required.
                    // UNKNOWN_LOCATION - user logged from unusual location, email confirmation required.
                    // TOO_MANY_REQUESTS - too many requests at the time. A response header X-Rate-Limit-Remaining indicates the number of allowed request per a period.
                },
                'broad': {
                    'invalid API key, signature or digest': AuthenticationError,
                },
            },
            'options': {
                'defaultType': 'spot',
                'types': {
                    'wallet': 'ACCOUNT_TYPE_WALLET',
                    'spot': 'ACCOUNT_TYPE_SPOT',
                },
                'accounts': {
                    'ACCOUNT_TYPE_WALLET': 'wallet',
                    'ACCOUNT_TYPE_SPOT': 'spot',
                },
            }
        });
    }

    nonce () {
        return this.milliseconds () - this.options['timeDifference'];
    }

    async fetchTime (params = {}) {
        const response = await this.publicGetTime (params);
        //
        //     {
        //         "serverTime": 1570615577321
        //     }
        //
        return this.safeInteger (response, 'serverTime');
    }

    async loadTimeDifference (params = {}) {
        const serverTime = await this.fetchTime (params);
        const after = this.milliseconds ();
        this.options['timeDifference'] = after - serverTime;
        return this.options['timeDifference'];
    }

    async fetchMarkets (params = {}) {
        const currencies = await this.fetchCurrenciesFromCache (params);
        //
        //     [
        //         {
        //             "id":"1a075819-9e0b-48fc-8784-4dab1d186d6d",
        //             "status":"CURRENCY_STATUS_ACTIVE",
        //             "type":"CURRENCY_TYPE_ALTERNATIVE", // CURRENCY_TYPE_CRYPTO, CURRENCY_TYPE_IEO
        //             "name":"MyCryptoBank",
        //             "tag":"MCB",
        //             "description":"",
        //             "logo":"",
        //             "decimals":18,
        //             "created":1572912000000,
        //             "tier":1,
        //             "assetClass":"ASSET_CLASS_UNKNOWN",
        //             "minTransferAmount":0
        //         },
        //         {
        //             "id":"db02758e-2507-46a5-a805-7bc60355b3eb",
        //             "status":"CURRENCY_STATUS_ACTIVE",
        //             "type":"CURRENCY_TYPE_FUTURES_CONTRACT",
        //             "name":"BTC USDT Futures Contract",
        //             "tag":"BTCUSDT",
        //             "description":"",
        //             "logo":"",
        //             "decimals":8,
        //             "created":1589459984395,
        //             "tier":1,
        //             "assetClass":"ASSET_CLASS_UNKNOWN",
        //             "minTransferAmount":0
        //         },
        //     ]
        //
        const response = await this.publicGetPair (params);
        //
        //     [
        //         {
        //             "id":"dba4289b-6b46-4d94-bf55-49eec9a163ad",
        //             "status":"PAIR_STATUS_ACTIVE", // CURRENCY_STATUS_INACTIVE
        //             "baseCurrency":"fb9b53d6-bbf6-472f-b6ba-73cc0d606c9b",
        //             "quoteCurrency":"620f2019-33c0-423b-8a9d-cde4d7f8ef7f",
        //             "priceTick":"0.000000100000000000",
        //             "priceDecimals":7,
        //             "quantityTick":"0.010000000",
        //             "quantityDecimals":2,
        //             "costDisplayDecimals":7,
        //             "created":1572957210501,
        //             "minOrderQuantity":"0",
        //             "maxOrderCostUsd":"999999999999999999",
        //             "minOrderCostUsd":"0",
        //             "externalSymbol":""
        //         }
        //     ]
        //
        if (this.safeValue (this.options, 'adjustForTimeDifference', true)) {
            await this.loadTimeDifference ();
        }
        const currenciesById = this.indexBy (currencies, 'id');
        const result = [];
        for (let i = 0; i < response.length; i++) {
            const market = response[i];
            const id = this.safeString (market, 'id');
            // the exchange shows them inverted
            const baseId = this.safeString (market, 'baseCurrency');
            const quoteId = this.safeString (market, 'quoteCurrency');
            const baseCurrency = this.safeValue (currenciesById, baseId);
            const quoteCurrency = this.safeValue (currenciesById, quoteId);
            if (baseCurrency !== undefined && quoteCurrency !== undefined) {
                const base = this.safeCurrencyCode (this.safeString (baseCurrency, 'tag'));
                const quote = this.safeCurrencyCode (this.safeString (quoteCurrency, 'tag'));
                const symbol = base + '/' + quote;
                const precision = {
                    'price': this.safeNumber (market, 'priceTick'),
                    'amount': this.safeNumber (market, 'quantityTick'),
                };
                const lowercaseQuote = quote.toLowerCase ();
                const capitalizedQuote = this.capitalize (lowercaseQuote);
                const limits = {
                    'amount': {
                        'min': this.safeNumber (market, 'minOrderQuantity'),
                        'max': undefined,
                    },
                    'price': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'cost': {
                        'min': this.safeNumber (market, 'minOrderCost' + capitalizedQuote),
                        'max': this.safeNumber (market, 'maxOrderCost' + capitalizedQuote),
                    },
                };
                const status = this.safeString (market, 'status');
                const active = (status === 'PAIR_STATUS_ACTIVE');
                result.push ({
                    'id': id,
                    'info': market,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'baseId': baseId,
                    'quoteId': quoteId,
                    'type': 'spot',
                    'spot': true,
                    'active': active, // assuming true
                    'precision': precision,
                    'limits': limits,
                });
            }
        }
        return result;
    }

    async fetchCurrenciesFromCache (params = {}) {
        // this method is now redundant
        // currencies are now fetched before markets
        const options = this.safeValue (this.options, 'fetchCurrencies', {});
        const timestamp = this.safeInteger (options, 'timestamp');
        const expires = this.safeInteger (options, 'expires', 1000);
        const now = this.milliseconds ();
        if ((timestamp === undefined) || ((now - timestamp) > expires)) {
            const response = await this.publicGetCurrency (params);
            this.options['fetchCurrencies'] = this.extend (options, {
                'response': response,
                'timestamp': now,
            });
        }
        return this.safeValue (this.options['fetchCurrencies'], 'response');
    }

    async fetchCurrencies (params = {}) {
        const response = await this.fetchCurrenciesFromCache (params);
        //
        //     [
        //         {
        //             "id":"1a075819-9e0b-48fc-8784-4dab1d186d6d",
        //             "status":"CURRENCY_STATUS_ACTIVE",
        //             "type":"CURRENCY_TYPE_ALTERNATIVE", // CURRENCY_TYPE_CRYPTO, CURRENCY_TYPE_IEO
        //             "name":"MyCryptoBank",
        //             "tag":"MCB",
        //             "description":"",
        //             "logo":"",
        //             "decimals":18,
        //             "created":1572912000000,
        //             "tier":1,
        //             "assetClass":"ASSET_CLASS_UNKNOWN",
        //             "minTransferAmount":0
        //         },
        //         {
        //             "id":"db02758e-2507-46a5-a805-7bc60355b3eb",
        //             "status":"CURRENCY_STATUS_ACTIVE",
        //             "type":"CURRENCY_TYPE_FUTURES_CONTRACT",
        //             "name":"BTC USDT Futures Contract",
        //             "tag":"BTCUSDT",
        //             "description":"",
        //             "logo":"",
        //             "decimals":8,
        //             "created":1589459984395,
        //             "tier":1,
        //             "assetClass":"ASSET_CLASS_UNKNOWN",
        //             "minTransferAmount":0
        //         },
        //     ]
        //
        const result = {};
        for (let i = 0; i < response.length; i++) {
            const currency = response[i];
            const id = this.safeString (currency, 'id');
            const tag = this.safeString (currency, 'tag');
            const code = this.safeCurrencyCode (tag);
            const decimals = this.safeString (currency, 'decimals');
            const precision = this.parseNumber ('1e-' + decimals);
            const fee = this.safeNumber (currency, 'fee');
            const currencyType = this.safeString (currency, 'type');
            const parts = currencyType.split ('_');
            const lastPart = this.safeValue (parts, parts.length - 1);
            const type = lastPart.toLowerCase ();
            const status = this.safeString (currency, 'status');
            const active = (status === 'CURRENCY_STATUS_ACTIVE');
            const name = this.safeString (currency, 'name');
            result[code] = {
                'id': id,
                'code': code,
                'info': currency,
                'name': name,
                'type': type,
                'active': active,
                'fee': fee,
                'precision': precision,
                'limits': {
                    'amount': {
                        'min': this.safeNumber (currency, 'minTransferAmount'),
                        'max': undefined,
                    },
                    'withdraw': {
                        'min': undefined,
                        'max': undefined,
                    },
                },
            };
        }
        return result;
    }

    async fetchBalance (params = {}) {
        await this.loadMarkets ();
        const response = await this.privateGetAuthAccount (params);
        //
        //     [
        //         {
        //             id: "e5852e02-8711-431c-9749-a6f5503c6dbe",
        //             status: "ACCOUNT_STATUS_ACTIVE",
        //             type: "ACCOUNT_TYPE_WALLET",
        //             timestamp: "1635920106506",
        //             currency: "0c3a106d-bde3-4c13-a26e-3fd2394529e5",
        //             available: "100.000000",
        //             blocked: "0.000000"
        //         },
        //         {
        //             id: "369df204-acbc-467e-a25e-b16e3cc09cf6",
        //             status: "ACCOUNT_STATUS_ACTIVE",
        //             type: "ACCOUNT_TYPE_SPOT",
        //             timestamp: "1635920106504",
        //             currency: "0c3a106d-bde3-4c13-a26e-3fd2394529e5",
        //             available: "100.000000",
        //             blocked: "0.000000"
        //         }
        //     ]
        //
        const result = {
            'info': response,
            'timestamp': undefined,
            'datetime': undefined,
        };
        let maxTimestamp = undefined;
        const defaultType = this.safeString2 (this.options, 'fetchBalance', 'defaultType', 'spot');
        const type = this.safeString (params, 'type', defaultType);
        const types = this.safeValue (this.options, 'types', {});
        const accountType = this.safeString (types, type, type);
        const balancesByType = this.groupBy (response, 'type');
        const balances = this.safeValue (balancesByType, accountType, []);
        for (let i = 0; i < balances.length; i++) {
            const balance = balances[i];
            const currencyId = this.safeString (balance, 'currency');
            const timestamp = this.safeInteger (balance, 'timestamp');
            if (timestamp !== undefined) {
                if (maxTimestamp === undefined) {
                    maxTimestamp = timestamp;
                } else {
                    maxTimestamp = Math.max (maxTimestamp, timestamp);
                }
            }
            const code = this.safeCurrencyCode (currencyId);
            const account = this.account ();
            account['free'] = this.safeString (balance, 'available');
            account['used'] = this.safeString (balance, 'blocked');
            result[code] = account;
        }
        result['timestamp'] = maxTimestamp;
        result['datetime'] = this.iso8601 (maxTimestamp);
        return this.parseBalance (result);
    }

    async fetchOrderBook (symbol, limit = undefined, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'currency': market['baseId'],
            'quote': market['quoteId'],
        };
        if (limit !== undefined) {
            request['limit'] = limit; // max 1000
        }
        const response = await this.publicGetBookCurrencyQuote (this.extend (request, params));
        //
        //     {
        //         "ask":[
        //             {"price":"4428.76","quantity":"0.08136","cost":"360.3239136","accumulated":"360.3239136"},
        //             {"price":"4429.77","quantity":"1.11786","cost":"4951.8626922","accumulated":"5312.1866058"},
        //             {"price":"4430.94","quantity":"1.78418","cost":"7905.5945292","accumulated":"13217.781135"},
        //         ],
        //         "bid":[
        //             {"price":"4428.43","quantity":"0.13675","cost":"605.5878025","accumulated":"605.5878025"},
        //             {"price":"4428.19","quantity":"0.03619","cost":"160.2561961","accumulated":"765.8439986"},
        //             {"price":"4428.15","quantity":"0.02926","cost":"129.567669","accumulated":"895.4116676"},
        //         ],
        //         "totalAsk":"53.14814",
        //         "totalBid":"112216.9029791"
        //     }
        //
        return this.parseOrderBook (response, symbol, undefined, 'bid', 'ask', 'price', 'quantity');
    }

    parseTicker (ticker, market = undefined) {
        //
        //     {
        //         "symbol":"620f2019-33c0-423b-8a9d-cde4d7f8ef7f/0c3a106d-bde3-4c13-a26e-3fd2394529e5",
        //         "baseCurrency":"620f2019-33c0-423b-8a9d-cde4d7f8ef7f",
        //         "quoteCurrency":"0c3a106d-bde3-4c13-a26e-3fd2394529e5",
        //         "volume24h":"76411867.852585600000000000",
        //         "volume7d":"637809926.759451100000000000",
        //         "change24h":"2.5300",
        //         "change7d":"5.1300",
        //         "lastPrice":"4426.9"
        //     }
        //
        const marketId = this.safeString (ticker, 'symbol');
        const symbol = this.safeSymbol (marketId, market);
        const last = this.safeNumber (ticker, 'lastPrice');
        const change = this.safeNumber (ticker, 'change24h');
        const timestamp = this.nonce ();
        return this.safeTicker ({
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'low': this.safeNumber (ticker, 'low'),
            'high': this.safeNumber (ticker, 'high'),
            'bid': undefined,
            'bidVolume': undefined,
            'ask': undefined,
            'askVolume': undefined,
            'vwap': undefined,
            'open': undefined,
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': change,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': undefined,
            'quoteVolume': this.safeNumber (ticker, 'volume24h'),
            'info': ticker,
        });
    }

    async fetchTicker (symbol, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'base': market['baseId'],
            'quote': market['quoteId'],
        };
        const response = await this.publicGetTickerBaseQuote (this.extend (request, params));
        //
        //     {
        //         "symbol":"620f2019-33c0-423b-8a9d-cde4d7f8ef7f/0c3a106d-bde3-4c13-a26e-3fd2394529e5",
        //         "baseCurrency":"620f2019-33c0-423b-8a9d-cde4d7f8ef7f",
        //         "quoteCurrency":"0c3a106d-bde3-4c13-a26e-3fd2394529e5",
        //         "volume24h":"76411867.852585600000000000",
        //         "volume7d":"637809926.759451100000000000",
        //         "change24h":"2.5300",
        //         "change7d":"5.1300",
        //         "lastPrice":"4426.9"
        //     }
        //
        return this.parseTicker (response, market);
    }

    async fetchTickers (symbols = undefined, params = {}) {
        await this.loadMarkets ();
        const response = await this.publicGetTicker (params);
        //
        //     [
        //         {
        //             "symbol":"DASH/BTC",
        //             "baseCurrency":"ed75c263-4ab9-494b-8426-031dab1c7cc1",
        //             "quoteCurrency":"92151d82-df98-4d88-9a4d-284fa9eca49f",
        //             "volume24h":"1.977753278000000000",
        //             "volume7d":"18.964342670000000000",
        //             "change24h":"-1.4800",
        //             "change7d":"-5.5200",
        //             "lastPrice":"0.003066"
        //         },
        //     ]
        //
        return this.parseTickers (response, symbols);
    }

    parseTrade (trade, market = undefined) {
        //
        // fetchTrades (public)
        //
        //     {
        //         "id":"c152f814-8eeb-44f0-8f3f-e5c568f2ffcf",
        //         "isMakerBuyer":false,
        //         "baseCurrency":"620f2019-33c0-423b-8a9d-cde4d7f8ef7f",
        //         "quoteCurrency":"0c3a106d-bde3-4c13-a26e-3fd2394529e5",
        //         "price":"4435.56",
        //         "quantity":"0.32534",
        //         "cost":"1443.0650904",
        //         "timestamp":1635854642725,
        //         "makerBuyer":false
        //     }
        //
        // fetchMyTrades (private)
        //
        //     {
        //         "id":"02e02533-b4bf-4ba9-9271-24e2108dfbf7",
        //         "isMakerBuyer":false,
        //         "direction":"TRADE_DIRECTION_BUY",
        //         "baseCurrency":"620f2019-33c0-423b-8a9d-cde4d7f8ef7f",
        //         "quoteCurrency":"0c3a106d-bde3-4c13-a26e-3fd2394529e5",
        //         "price":"4564.32",
        //         "quantity":"0.01000",
        //         "cost":"45.6432",
        //         "fee":"0.223651680000000000",
        //         "order":"c9cac6a0-484c-4892-88e7-ad51b39f2ce1",
        //         "timestamp":1635921580399,
        //         "makerBuyer":false
        //     }
        //
        const type = undefined;
        const timestamp = this.safeInteger (trade, 'timestamp');
        const priceString = this.safeString (trade, 'price');
        const amountString = this.safeString (trade, 'quantity');
        const price = this.parseNumber (priceString);
        const amount = this.parseNumber (amountString);
        let costString = this.safeString (trade, 'cost');
        if (costString === undefined) {
            costString = Precise.stringMul (priceString, amountString);
        }
        const cost = this.parseNumber (costString);
        const makerBuyer = this.safeValue (trade, 'makerBuyer');
        let side = this.safeString (trade, 'side');
        if (side === undefined) {
            side = makerBuyer ? 'sell' : 'buy';
        }
        const baseId = this.safeString (trade, 'baseCurrency');
        const quoteId = this.safeString (trade, 'quoteCurrency');
        const base = this.safeCurrencyCode (baseId);
        const quote = this.safeCurrencyCode (quoteId);
        const symbol = base + '/' + quote;
        const market = this.market (symbol);
        const symbol = this.safeSymbol (undefined, market);
        const id = this.safeString (trade, 'id');
        const orderId = this.safeString (trade, 'order');
        const feeCost = this.safeNumber (trade, 'fee');
        let fee = undefined;
        if (feeCost !== undefined) {
            fee = {
                'cost': feeCost,
                'currency': undefined,
            };
        }
        return {
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'symbol': symbol,
            'id': id,
            'order': undefined,
            'type': type,
            'takerOrMaker': undefined,
            'side': side,
            'price': price,
            'amount': amount,
            'cost': cost,
            'fee': undefined,
        };
    }

    async fetchTrades (symbol, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'currency': market['baseId'],
            'quote': market['quoteId'],
            // 'from': since.toString (), // milliseconds
            // 'limit': limit, // default 100
        };
        if (since !== undefined) {
            request['from'] = since.toString ();
        }
        if (limit !== undefined) {
            request['limit'] = limit; // default 50, max 100
        }
        const response = await this.publicGetTradeHistoryCurrencyQuote (this.extend (request, params));
        //
        //     [
        //         {"id":"c152f814-8eeb-44f0-8f3f-e5c568f2ffcf","isMakerBuyer":false,"baseCurrency":"620f2019-33c0-423b-8a9d-cde4d7f8ef7f","quoteCurrency":"0c3a106d-bde3-4c13-a26e-3fd2394529e5","price":"4435.56","quantity":"0.32534","cost":"1443.0650904","timestamp":1635854642725,"makerBuyer":false},
        //         {"id":"cfecbefb-3d11-43d7-b9d4-fa16211aad8a","isMakerBuyer":false,"baseCurrency":"620f2019-33c0-423b-8a9d-cde4d7f8ef7f","quoteCurrency":"0c3a106d-bde3-4c13-a26e-3fd2394529e5","price":"4435.13","quantity":"0.26540","cost":"1177.083502","timestamp":1635854641114,"makerBuyer":false},
        //         {"id":"f43d3ec8-db94-49f3-b534-91dbc2779296","isMakerBuyer":true,"baseCurrency":"620f2019-33c0-423b-8a9d-cde4d7f8ef7f","quoteCurrency":"0c3a106d-bde3-4c13-a26e-3fd2394529e5","price":"4435.00","quantity":"0.41738","cost":"1851.0803","timestamp":1635854640323,"makerBuyer":true},
        //     ]
        //
        return this.parseTrades (response, market, since, limit);
    }

    async fetchMyTrades (symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        const request = {
            // 'currency': market['baseId'],
            // 'quote': market['quoteId'],
            // 'from': this.milliseconds (),
            // 'limit': limit, // default '100'
        };
        let method = 'privateGetAuthTrade';
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market (symbol);
            request['currency'] = market['baseId'];
            request['quote'] = market['quoteId'];
            method = 'privateGetAuthTradePairCurrencyQuote';
        }
        if (limit !== undefined) {
            request['limit'] = limit; // default 100
        }
        const response = await this[method] (this.extend (request, params));
        //
        //     [
        //         {
        //             "id":"02e02533-b4bf-4ba9-9271-24e2108dfbf7",
        //             "isMakerBuyer":false,
        //             "direction":"TRADE_DIRECTION_BUY",
        //             "baseCurrency":"620f2019-33c0-423b-8a9d-cde4d7f8ef7f",
        //             "quoteCurrency":"0c3a106d-bde3-4c13-a26e-3fd2394529e5",
        //             "price":"4564.32",
        //             "quantity":"0.01000",
        //             "cost":"45.6432",
        //             "fee":"0.223651680000000000",
        //             "order":"c9cac6a0-484c-4892-88e7-ad51b39f2ce1",
        //             "timestamp":1635921580399,
        //             "makerBuyer":false
        //         }
        //     ]
        //
        return this.parseTrades (response, market, since, limit);
    }

    parseOrderStatus (status) {
        const statuses = {
            'active': 'open',
            'partiallyFilled': 'open',
            'filled': 'closed',
            'cancelled': 'canceled',
        };
        return this.safeString (statuses, status, status);
    }

    parseOrder (order, market = undefined) {
        //
        // createOrder
        //
        //     {
        //         "orderId":"1563460093.134037.704945@0370:2",
        //         "cliOrdId":"",
        //         "pairId":370,
        //         "symbol":"ETHBTC",
        //         "side":"sell",
        //         "orderType":"limit",
        //         "price":1.0,
        //         "amount":1.0
        //     }
        //
        // cancelOrder, fetchOrder, fetchOpenOrders, fetchClosedOrders, fetchCanceledOrders
        //
        //     {
        //         "id":"a76bd262-3560-4bfb-98ac-1cedd394f4fc",
        //         "status":"ORDER_STATUS_PLACED",
        //         "side":"ORDER_SIDE_BUY",
        //         "condition":"ORDER_CONDITION_GOOD_TILL_CANCELLED",
        //         "type":"ORDER_TYPE_LIMIT",
        //         "baseCurrency":"620f2019-33c0-423b-8a9d-cde4d7f8ef7f",
        //         "quoteCurrency":"0c3a106d-bde3-4c13-a26e-3fd2394529e5",
        //         "clientOrderId":"web-macos_chrome_1a6a6659-6f7c-4fac-be0b-d1d7ac06d",
        //         "price":"4000.00",
        //         "quantity":"0.01",
        //         "cost":"40.000000000000000000",
        //         "filled":"0",
        //         "trader":"7244bb3a-b6b2-446a-ac78-fa4bce5b59a9",
        //         "creator":"ORDER_CREATOR_USER",
        //         "creatorId":"",
        //         "timestamp":1635920767648
        //     }
        //
        const id = this.safeString (order, 'orderId');
        const timestamp = this.safeTimestamp (order, 'timeCreated');
        const marketId = this.safeString (order, 'symbol');
        const symbol = this.safeSymbol (marketId, market);
        const side = this.safeString (order, 'side');
        const type = this.safeString (order, 'orderType');
        const price = this.safeNumber (order, 'price');
        const amount = this.safeNumber (order, 'amount');
        const filled = this.safeNumber (order, 'executedAmount');
        const status = this.parseOrderStatus (this.safeString (order, 'orderStatus'));
        const timeFilled = this.safeTimestamp (order, 'timeFilled');
        let lastTradeTimestamp = undefined;
        if ((timeFilled !== undefined) && (timeFilled > 0)) {
            lastTradeTimestamp = timeFilled;
        }
        const clientOrderId = this.safeString (order, 'cliOrdId');
        return this.safeOrder ({
            'id': id,
            'clientOrderId': clientOrderId,
            'info': order,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'lastTradeTimestamp': lastTradeTimestamp,
            'status': status,
            'symbol': symbol,
            'type': type,
            'timeInForce': undefined,
            'postOnly': undefined,
            'side': side,
            'price': price,
            'stopPrice': undefined,
            'cost': undefined,
            'amount': amount,
            'filled': filled,
            'average': undefined,
            'remaining': undefined,
            'fee': undefined,
            'trades': undefined,
        });
    }

    async fetchOrders (symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        const request = {
            // 'from': this.milliseconds (),
            // 'limit': limit, // default 100
        };
        if (limit !== undefined) {
            request['limit'] = limit; // default 100
        }
        const response = await this.privateGetAuthOrder (this.extend (request, params));
        //
        //     [
        //         {
        //             "id":"a76bd262-3560-4bfb-98ac-1cedd394f4fc",
        //             "status":"ORDER_STATUS_PLACED",
        //             "side":"ORDER_SIDE_BUY",
        //             "condition":"ORDER_CONDITION_GOOD_TILL_CANCELLED",
        //             "type":"ORDER_TYPE_LIMIT",
        //             "baseCurrency":"620f2019-33c0-423b-8a9d-cde4d7f8ef7f",
        //             "quoteCurrency":"0c3a106d-bde3-4c13-a26e-3fd2394529e5",
        //             "clientOrderId":"web-macos_chrome_1a6a6659-6f7c-4fac-be0b-d1d7ac06d",
        //             "price":"4000.00",
        //             "quantity":"0.01000",
        //             "cost":"40.00",
        //             "filled":"0.00000",
        //             "trader":"7244bb3a-b6b2-446a-ac78-fa4bce5b59a9",
        //             "creator":"USER",
        //             "creatorId":"",
        //             "timestamp":1635920767648
        //         }
        //     ]
        //
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market (symbol);
        }
        return this.parseOrders (response, market, since, limit);
    }

    async fetchOpenOrders (symbol = undefined, since = undefined, limit = undefined, params = {}) {
        return this.fetchOrdersWithMethod ('private_get_order_active', symbol, since, limit, params);
    }

    async fetchClosedOrders (symbol = undefined, since = undefined, limit = undefined, params = {}) {
        return this.fetchOrdersByStatus ('filled', symbol, since, limit, params);
    }

    async fetchCanceledOrders (symbol = undefined, since = undefined, limit = undefined, params = {}) {
        return this.fetchOrdersByStatus ('cancelled', symbol, since, limit, params);
    }

    async fetchOrdersByStatus (status, symbol = undefined, since = undefined, limit = undefined, params = {}) {
        const request = {
            'status': status,
        };
        return this.fetchOrdersWithMethod ('private_get_order_status', symbol, since, limit, this.extend (request, params));
    }

    async fetchOrdersWithMethod (method, symbol = undefined, since = undefined, limit = undefined, params = {}) {
        if (symbol === undefined) {
            throw new ArgumentsRequired (this.id + ' fetchOrdersWithMethod() requires a symbol argument');
        }
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'symbol': market['id'],
        };
        if (limit !== undefined) {
            request['limit'] = limit; // default 100
        }
        const response = await this[method] (this.extend (request, params));
        //
        //     [
        //         {
        //             "orderId": "1555492358.126073.126767@0502:2",
        //             "cliOrdId": "myNewOrder",
        //             "pairId": 502,
        //             "symbol": "LAETH",
        //             "side": "buy",
        //             "orderType": "limit",
        //             "price": 136.2,
        //             "amount": 0.57,
        //             "orderStatus": "partiallyFilled",
        //             "executedAmount": 0.27,
        //             "reaminingAmount": 0.3,
        //             "timeCreated": 155551580736,
        //             "timeFilled": 0
        //         }
        //     ]
        //
        return this.parseOrders (response, market, since, limit);
    }

    async fetchOrder (id, symbol = undefined, params = {}) {
        await this.loadMarkets ();
        const request = {
            'id': id,
        };
        const response = await this.privateGetAuthOrderGetOrderId (this.extend (request, params));
        //
        //     {
        //         "id":"a76bd262-3560-4bfb-98ac-1cedd394f4fc",
        //         "status":"ORDER_STATUS_PLACED",
        //         "side":"ORDER_SIDE_BUY",
        //         "condition":"ORDER_CONDITION_GOOD_TILL_CANCELLED",
        //         "type":"ORDER_TYPE_LIMIT",
        //         "baseCurrency":"620f2019-33c0-423b-8a9d-cde4d7f8ef7f",
        //         "quoteCurrency":"0c3a106d-bde3-4c13-a26e-3fd2394529e5",
        //         "clientOrderId":"web-macos_chrome_1a6a6659-6f7c-4fac-be0b-d1d7ac06d",
        //         "price":"4000.00",
        //         "quantity":"0.01",
        //         "cost":"40.000000000000000000",
        //         "filled":"0",
        //         "trader":"7244bb3a-b6b2-446a-ac78-fa4bce5b59a9",
        //         "creator":"ORDER_CREATOR_USER",
        //         "creatorId":"",
        //         "timestamp":1635920767648
        //     }
        //
        return this.parseOrder (response);
    }

    async createOrder (symbol, type, side, amount, price = undefined, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const uppercaseType = type.toUpperCase ();
        const orderSide = (side === 'buy') ? 'BID' : 'ASK';
        const request = {
            'baseCurrency': market['baseId'],
            'quoteCurrency': market['quoteId'],
            'side': orderSide, // "BUY", "BID", "SELL", "ASK"
            'condition': 'GTC', // "GTC", "GOOD_TILL_CANCELLED", "IOC", "IMMEDIATE_OR_CANCEL", "FOK", "FILL_OR_KILL"
            'type': uppercaseType, // "LIMIT", "MARKET"
            'clientOrderId': this.uuid (), // 50 characters max
            'price': '4000.1', // this.priceToPrecision (symbol, price),
            'quantity': '0.01', // this.amountToPrecision (symbol, amount),
            'timestamp': this.milliseconds ().toString (), // this.sum (this.milliseconds (), -7 * 24 * 60 * 60 * 1000),
            // 'timeAlive': this.sum (this.milliseconds (), 7 * 24 * 60 * 60 * 1000),
        };
        // if (uppercaseType === 'LIMIT') {
        //     request['price'] = this.priceToPrecision (symbol, price);
        // }
        const response = await this.privatePostAuthOrderPlace (this.extend (request, params));
        //
        //     {
        //         "orderId":"1563460093.134037.704945@0370:2",
        //         "cliOrdId":"",
        //         "pairId":370,
        //         "symbol":"ETHBTC",
        //         "side":"sell",
        //         "orderType":"limit",
        //         "price":1.0,
        //         "amount":1.0
        //     }
        //
        return this.parseOrder (response, market);
    }

    async cancelOrder (id, symbol = undefined, params = {}) {
        await this.loadMarkets ();
        const request = {
            'orderId': id,
        };
        const response = await this.privatePostOrderCancel (this.extend (request, params));
        //
        //     {
        //         "orderId": "1555492358.126073.126767@0502:2",
        //         "cliOrdId": "myNewOrder",
        //         "pairId": 502,
        //         "symbol": "LAETH",
        //         "side": "buy",
        //         "orderType": "limit",
        //         "price": 136.2,
        //         "amount": 0.57,
        //         "orderStatus": "partiallyFilled",
        //         "executedAmount": 0.27,
        //         "reaminingAmount": 0.3,
        //         "timeCreated": 155551580736,
        //         "timeFilled": 0
        //     }
        //
        return this.parseOrder (response);
    }

    async cancelAllOrders (symbol = undefined, params = {}) {
        if (symbol === undefined) {
            throw new ArgumentsRequired (this.id + ' cancelAllOrders() requires a symbol argument');
        }
        await this.loadMarkets ();
        const marketId = this.marketId (symbol);
        const request = {
            'symbol': marketId,
        };
        const response = await this.privatePostOrderCancelAll (this.extend (request, params));
        //
        //     {
        //         "pairId": 502,
        //         "symbol": "LAETH",
        //         "cancelledOrders": [
        //             "1555492358.126073.126767@0502:2"
        //         ]
        //     }
        //
        const result = [];
        const canceledOrders = this.safeValue (response, 'cancelledOrders', []);
        for (let i = 0; i < canceledOrders.length; i++) {
            const order = this.parseOrder ({
                'symbol': marketId,
                'orderId': canceledOrders[i],
                'orderStatus': 'canceled',
            });
            result.push (order);
        }
        return result;
    }


    async fetchTransactions (code = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        const request = {
            // 'page': '1',
            // 'size': 100,
        };
        const response = await this.privateGetAuthTransaction (this.extend (request, params));
        //
        //     {
        //         "hasNext":false,
        //         "content":[
        //             {
        //                 "id":"fbf7d0d1-2629-4ad8-9def-7a1dba423362",
        //                 "status":"TRANSACTION_STATUS_CONFIRMED",
        //                 "type":"TRANSACTION_TYPE_DEPOSIT",
        //                 "senderAddress":"",
        //                 "recipientAddress":"0x3c46fa2e3f9023bc4897828ed173f8ecb3a554bc",
        //                 "amount":"200.000000000000000000",
        //                 "transactionFee":"0.000000000000000000",
        //                 "timestamp":1635893208404,
        //                 "transactionHash":"0x28bad3b74a042df13d64ddfbca855566a51bf7f190b8cd565c236a18d5cd493f#42",
        //                 "blockHeight":13540262,
        //                 "currency":"0c3a106d-bde3-4c13-a26e-3fd2394529e5",
        //                 "memo":null,
        //                 "paymentProvider":"a8d6d1cb-f84a-4e9d-aa82-c6a08b356ee1",
        //                 "requiresCode":false
        //             }
        //         ],
        //         "first":true,
        //         "hasContent":true,
        //         "pageSize":10
        //     }
        //
        let currency = undefined;
        if (code !== undefined) {
            currency = this.currency (code);
        }
        const content = this.safeValue (response, 'content', []);
        return this.parseTransactions (content, currency, since, limit);
    }

    parseTransaction (transaction, currency = undefined) {
        //
        //     {
        //         "id":"fbf7d0d1-2629-4ad8-9def-7a1dba423362",
        //         "status":"TRANSACTION_STATUS_CONFIRMED",
        //         "type":"TRANSACTION_TYPE_DEPOSIT",
        //         "senderAddress":"",
        //         "recipientAddress":"0x3c46fa2e3f9023bc4897828ed173f8ecb3a554bc",
        //         "amount":"200.000000000000000000",
        //         "transactionFee":"0.000000000000000000",
        //         "timestamp":1635893208404,
        //         "transactionHash":"0x28bad3b74a042df13d64ddfbca855566a51bf7f190b8cd565c236a18d5cd493f#42",
        //         "blockHeight":13540262,
        //         "currency":"0c3a106d-bde3-4c13-a26e-3fd2394529e5",
        //         "memo":null,
        //         "paymentProvider":"a8d6d1cb-f84a-4e9d-aa82-c6a08b356ee1",
        //         "requiresCode":false
        //     }
        //
        const id = this.safeString (transaction, 'id');
        const timestamp = this.safeInteger (transaction, 'timestamp');
        const currencyId = this.safeString (transaction, 'currency');
        const code = this.safeCurrencyCode (currencyId, currency);
        const status = this.parseTransactionStatus (this.safeString (transaction, 'status'));
        const amount = this.safeNumber (transaction, 'amount');
        let addressFrom = this.safeString (transaction, 'senderAddress');
        if (addressFrom === '') {
            addressFrom = undefined;
        }
        let addressTo = this.safeString (transaction, 'recipientAddress');
        if (addressTo === '') {
            addressTo = undefined;
        }
        const txid = this.safeString (transaction, 'transactionHash');
        const tagTo = this.safeString (transaction, 'memo');
        let fee = undefined;
        const feeCost = this.safeNumber (transaction, 'transactionFee');
        if (feeCost !== undefined) {
            fee = {
                'cost': feeCost,
                'currency': code,
            };
        }
        const type = this.parseTransactionType (this.safeString (transaction, 'type'));
        return {
            'info': transaction,
            'id': id,
            'txid': txid,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'addressFrom': addressFrom,
            'addressTo': addressTo,
            'address': addressTo,
            'tagFrom': undefined,
            'tagTo': tagTo,
            'tag': tagTo,
            'type': type,
            'amount': amount,
            'currency': code,
            'status': status,
            'updated': undefined,
            'fee': fee,
        };
    }

    parseTransactionStatus (status) {
        const statuses = {
            'TRANSACTION_STATUS_CONFIRMED': 'ok',
            'TRANSACTION_STATUS_EXECUTED': 'ok',
        };
        return this.safeString (statuses, status, status);
    }

    parseTransactionType (type) {
        const types = {
            'TRANSACTION_TYPE_DEPOSIT': 'deposit',
            'TRANSACTION_TYPE_WITHDRAWAL': 'withdrawal',
        };
        return this.safeString (types, type, type);
    }

    sign (path, api = 'public', method = 'GET', params = undefined, headers = undefined, body = undefined) {
        const request = '/' + this.version + '/' + this.implodeParams (path, params);
        let requestString = request;
        const query = this.omit (params, this.extractParams (path));
        const urlencodedQuery = this.urlencode (query);
        if (method === 'GET') {
            if (Object.keys (query).length) {
                requestString += '?' + urlencodedQuery;
            }
        }
        if (api === 'private') {
            headers = {};
            this.checkRequiredCredentials ();
            if (method === 'POST') {
                headers['Content-Type'] = 'application/json';
                body = this.json (query);
            }
            const auth = method + request + urlencodedQuery;
            const signature = this.hmac (this.encode (auth), this.encode (this.secret));
            headers = {
                'X-LA-APIKEY': this.apiKey,
                'X-LA-SIGNATURE': signature,
                // 'X-LA-DIGEST': 'HMAC-SHA256', // HMAC-SHA384, HMAC-SHA512, optional
            };
        }
        const url = this.urls['api'] + requestString;
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }

    handleErrors (code, reason, url, method, headers, body, response, requestHeaders, requestBody) {
        if (!response) {
            return;
        }
        //
        // {"result":false,"message":"invalid API key, signature or digest","error":"BAD_REQUEST","status":"FAILURE"}
        // {"result":false,"message":"request expired or bad <timeAlive>/<timestamp> format","error":"BAD_REQUEST","status":"FAILURE"}
        // {"message":"Internal Server Error","error":"INTERNAL_ERROR","status":"FAILURE"}
        // {"result":false,"message":"Internal error","error":"For input string: \"NaN\"","status":"FAILURE"}
        //
        const message = this.safeString (response, 'message');
        const feedback = this.id + ' ' + body;
        if (message !== undefined) {
            this.throwExactlyMatchedException (this.exceptions['exact'], message, feedback);
            this.throwBroadlyMatchedException (this.exceptions['broad'], message, feedback);
        }
        const error = this.safeValue (response, 'error', {});
        const errorMessage = this.safeString (error, 'message');
        if (errorMessage !== undefined) {
            this.throwExactlyMatchedException (this.exceptions['exact'], errorMessage, feedback);
            this.throwBroadlyMatchedException (this.exceptions['broad'], errorMessage, feedback);
            throw new ExchangeError (feedback); // unknown message
        }
    }
};
