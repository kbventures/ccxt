namespace ccxt;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

public partial class zaif : Exchange
{
    public override object describe()
    {
        return this.deepExtend(base.describe(), new Dictionary<string, object>() {
            { "id", "zaif" },
            { "name", "Zaif" },
            { "countries", new List<object>() {"JP"} },
            { "rateLimit", 100 },
            { "version", "1" },
            { "has", new Dictionary<string, object>() {
                { "CORS", null },
                { "spot", true },
                { "margin", null },
                { "swap", false },
                { "future", false },
                { "option", false },
                { "cancelOrder", true },
                { "createMarketOrder", false },
                { "createOrder", true },
                { "fetchBalance", true },
                { "fetchClosedOrders", true },
                { "fetchFundingHistory", false },
                { "fetchFundingRate", false },
                { "fetchFundingRateHistory", false },
                { "fetchFundingRates", false },
                { "fetchIndexOHLCV", false },
                { "fetchMarkets", true },
                { "fetchMarkOHLCV", false },
                { "fetchOpenInterestHistory", false },
                { "fetchOpenOrders", true },
                { "fetchOrderBook", true },
                { "fetchPremiumIndexOHLCV", false },
                { "fetchTicker", true },
                { "fetchTrades", true },
                { "fetchTradingFee", false },
                { "fetchTradingFees", false },
                { "withdraw", true },
            } },
            { "urls", new Dictionary<string, object>() {
                { "logo", "https://user-images.githubusercontent.com/1294454/27766927-39ca2ada-5eeb-11e7-972f-1b4199518ca6.jpg" },
                { "api", new Dictionary<string, object>() {
                    { "rest", "https://api.zaif.jp" },
                } },
                { "www", "https://zaif.jp" },
                { "doc", new List<object>() {"https://techbureau-api-document.readthedocs.io/ja/latest/index.html", "https://corp.zaif.jp/api-docs", "https://corp.zaif.jp/api-docs/api_links", "https://www.npmjs.com/package/zaif.jp", "https://github.com/you21979/node-zaif"} },
                { "fees", "https://zaif.jp/fee?lang=en" },
            } },
            { "fees", new Dictionary<string, object>() {
                { "trading", new Dictionary<string, object>() {
                    { "percentage", true },
                    { "taker", this.parseNumber("0.001") },
                    { "maker", this.parseNumber("0") },
                } },
            } },
            { "api", new Dictionary<string, object>() {
                { "public", new Dictionary<string, object>() {
                    { "get", new Dictionary<string, object>() {
                        { "depth/{pair}", 1 },
                        { "currencies/{pair}", 1 },
                        { "currencies/all", 1 },
                        { "currency_pairs/{pair}", 1 },
                        { "currency_pairs/all", 1 },
                        { "last_price/{pair}", 1 },
                        { "ticker/{pair}", 1 },
                        { "trades/{pair}", 1 },
                    } },
                } },
                { "private", new Dictionary<string, object>() {
                    { "post", new Dictionary<string, object>() {
                        { "active_orders", 5 },
                        { "cancel_order", 5 },
                        { "deposit_history", 5 },
                        { "get_id_info", 5 },
                        { "get_info", 10 },
                        { "get_info2", 5 },
                        { "get_personal_info", 5 },
                        { "trade", 5 },
                        { "trade_history", 50 },
                        { "withdraw", 5 },
                        { "withdraw_history", 5 },
                    } },
                } },
                { "ecapi", new Dictionary<string, object>() {
                    { "post", new Dictionary<string, object>() {
                        { "createInvoice", 1 },
                        { "getInvoice", 1 },
                        { "getInvoiceIdsByOrderNumber", 1 },
                        { "cancelInvoice", 1 },
                    } },
                } },
                { "tlapi", new Dictionary<string, object>() {
                    { "post", new Dictionary<string, object>() {
                        { "get_positions", 66 },
                        { "position_history", 66 },
                        { "active_positions", 5 },
                        { "create_position", 33 },
                        { "change_position", 33 },
                        { "cancel_position", 33 },
                    } },
                } },
                { "fapi", new Dictionary<string, object>() {
                    { "get", new Dictionary<string, object>() {
                        { "groups/{group_id}", 1 },
                        { "last_price/{group_id}/{pair}", 1 },
                        { "ticker/{group_id}/{pair}", 1 },
                        { "trades/{group_id}/{pair}", 1 },
                        { "depth/{group_id}/{pair}", 1 },
                    } },
                } },
            } },
            { "options", new Dictionary<string, object>() {} },
            { "precisionMode", TICK_SIZE },
            { "exceptions", new Dictionary<string, object>() {
                { "exact", new Dictionary<string, object>() {
                    { "unsupported currency_pair", typeof(BadRequest) },
                } },
                { "broad", new Dictionary<string, object>() {} },
            } },
        });
    }

    public async override Task<object> fetchMarkets(object parameters = null)
    {
        /**
        * @method
        * @name zaif#fetchMarkets
        * @see https://zaif-api-document.readthedocs.io/ja/latest/PublicAPI.html#id12
        * @description retrieves data on all markets for zaif
        * @param {object} [params] extra parameters specific to the exchange API endpoint
        * @returns {object[]} an array of objects representing market data
        */
        parameters ??= new Dictionary<string, object>();
        object markets = await this.publicGetCurrencyPairsAll(parameters);
        //
        //     [
        //         {
        //             "aux_unit_point": 0,
        //             "item_japanese": "\u30d3\u30c3\u30c8\u30b3\u30a4\u30f3",
        //             "aux_unit_step": 5.0,
        //             "description": "\u30d3\u30c3\u30c8\u30b3\u30a4\u30f3\u30fb\u65e5\u672c\u5186\u306e\u53d6\u5f15\u3092\u884c\u3046\u3053\u3068\u304c\u3067\u304d\u307e\u3059",
        //             "item_unit_min": 0.001,
        //             "event_number": 0,
        //             "currency_pair": "btc_jpy",
        //             "is_token": false,
        //             "aux_unit_min": 5.0,
        //             "aux_japanese": "\u65e5\u672c\u5186",
        //             "id": 1,
        //             "item_unit_step": 0.0001,
        //             "name": "BTC/JPY",
        //             "seq": 0,
        //             "title": "BTC/JPY"
        //         }
        //     ]
        //
        return this.parseMarkets(markets);
    }

    public override object parseMarket(object market)
    {
        object id = this.safeString(market, "currency_pair");
        object name = this.safeString(market, "name");
        var baseIdquoteIdVariable = ((string)name).Split(new [] {((string)"/")}, StringSplitOptions.None).ToList<object>();
        var baseId = ((IList<object>) baseIdquoteIdVariable)[0];
        var quoteId = ((IList<object>) baseIdquoteIdVariable)[1];
        object bs = this.safeCurrencyCode(baseId);
        object quote = this.safeCurrencyCode(quoteId);
        object symbol = add(add(bs, "/"), quote);
        return new Dictionary<string, object>() {
            { "id", id },
            { "symbol", symbol },
            { "base", bs },
            { "quote", quote },
            { "settle", null },
            { "baseId", baseId },
            { "quoteId", quoteId },
            { "settleId", null },
            { "type", "spot" },
            { "spot", true },
            { "margin", null },
            { "swap", false },
            { "future", false },
            { "option", false },
            { "active", null },
            { "contract", false },
            { "linear", null },
            { "inverse", null },
            { "contractSize", null },
            { "expiry", null },
            { "expiryDatetime", null },
            { "strike", null },
            { "optionType", null },
            { "precision", new Dictionary<string, object>() {
                { "amount", this.safeNumber(market, "item_unit_step") },
                { "price", this.parseNumber(this.parsePrecision(this.safeString(market, "aux_unit_point"))) },
            } },
            { "limits", new Dictionary<string, object>() {
                { "leverage", new Dictionary<string, object>() {
                    { "min", null },
                    { "max", null },
                } },
                { "amount", new Dictionary<string, object>() {
                    { "min", this.safeNumber(market, "item_unit_min") },
                    { "max", null },
                } },
                { "price", new Dictionary<string, object>() {
                    { "min", this.safeNumber(market, "aux_unit_min") },
                    { "max", null },
                } },
                { "cost", new Dictionary<string, object>() {
                    { "min", null },
                    { "max", null },
                } },
            } },
            { "created", null },
            { "info", market },
        };
    }

    public override object parseBalance(object response)
    {
        object balances = this.safeValue(response, "return", new Dictionary<string, object>() {});
        object deposit = this.safeValue(balances, "deposit");
        object result = new Dictionary<string, object>() {
            { "info", response },
            { "timestamp", null },
            { "datetime", null },
        };
        object funds = this.safeValue(balances, "funds", new Dictionary<string, object>() {});
        object currencyIds = new List<object>(((IDictionary<string,object>)funds).Keys);
        for (object i = 0; isLessThan(i, getArrayLength(currencyIds)); postFixIncrement(ref i))
        {
            object currencyId = getValue(currencyIds, i);
            object code = this.safeCurrencyCode(currencyId);
            object balance = this.safeString(funds, currencyId);
            object account = this.account();
            ((IDictionary<string,object>)account)["free"] = balance;
            ((IDictionary<string,object>)account)["total"] = balance;
            if (isTrue(!isEqual(deposit, null)))
            {
                if (isTrue(inOp(deposit, currencyId)))
                {
                    ((IDictionary<string,object>)account)["total"] = this.safeString(deposit, currencyId);
                }
            }
            ((IDictionary<string,object>)result)[(string)code] = account;
        }
        return this.safeBalance(result);
    }

    public async override Task<object> fetchBalance(object parameters = null)
    {
        /**
        * @method
        * @name zaif#fetchBalance
        * @see https://zaif-api-document.readthedocs.io/ja/latest/TradingAPI.html#id10
        * @description query for balance and get the amount of funds available for trading or funds locked in orders
        * @param {object} [params] extra parameters specific to the exchange API endpoint
        * @returns {object} a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}
        */
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        object response = await this.privatePostGetInfo(parameters);
        return this.parseBalance(response);
    }

    public async override Task<object> fetchOrderBook(object symbol, object limit = null, object parameters = null)
    {
        /**
        * @method
        * @name zaif#fetchOrderBook
        * @see https://zaif-api-document.readthedocs.io/ja/latest/PublicAPI.html#id34
        * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
        * @param {string} symbol unified symbol of the market to fetch the order book for
        * @param {int} [limit] the maximum amount of order book entries to return
        * @param {object} [params] extra parameters specific to the exchange API endpoint
        * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
        */
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        object market = this.market(symbol);
        object request = new Dictionary<string, object>() {
            { "pair", getValue(market, "id") },
        };
        object response = await this.publicGetDepthPair(this.extend(request, parameters));
        return this.parseOrderBook(response, getValue(market, "symbol"));
    }

    public override object parseTicker(object ticker, object market = null)
    {
        //
        // {
        //     "last": 9e-08,
        //     "high": 1e-07,
        //     "low": 9e-08,
        //     "vwap": 0.0,
        //     "volume": 135250.0,
        //     "bid": 9e-08,
        //     "ask": 1e-07
        // }
        //
        object symbol = this.safeSymbol(null, market);
        object vwap = this.safeString(ticker, "vwap");
        object baseVolume = this.safeString(ticker, "volume");
        object quoteVolume = Precise.stringMul(baseVolume, vwap);
        object last = this.safeString(ticker, "last");
        return this.safeTicker(new Dictionary<string, object>() {
            { "symbol", symbol },
            { "timestamp", null },
            { "datetime", null },
            { "high", this.safeString(ticker, "high") },
            { "low", this.safeString(ticker, "low") },
            { "bid", this.safeString(ticker, "bid") },
            { "bidVolume", null },
            { "ask", this.safeString(ticker, "ask") },
            { "askVolume", null },
            { "vwap", vwap },
            { "open", null },
            { "close", last },
            { "last", last },
            { "previousClose", null },
            { "change", null },
            { "percentage", null },
            { "average", null },
            { "baseVolume", baseVolume },
            { "quoteVolume", quoteVolume },
            { "info", ticker },
        }, market);
    }

    public async override Task<object> fetchTicker(object symbol, object parameters = null)
    {
        /**
        * @method
        * @name zaif#fetchTicker
        * @see https://zaif-api-document.readthedocs.io/ja/latest/PublicAPI.html#id22
        * @description fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
        * @param {string} symbol unified symbol of the market to fetch the ticker for
        * @param {object} [params] extra parameters specific to the exchange API endpoint
        * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
        */
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        object market = this.market(symbol);
        object request = new Dictionary<string, object>() {
            { "pair", getValue(market, "id") },
        };
        object ticker = await this.publicGetTickerPair(this.extend(request, parameters));
        //
        // {
        //     "last": 9e-08,
        //     "high": 1e-07,
        //     "low": 9e-08,
        //     "vwap": 0.0,
        //     "volume": 135250.0,
        //     "bid": 9e-08,
        //     "ask": 1e-07
        // }
        //
        return this.parseTicker(ticker, market);
    }

    public override object parseTrade(object trade, object market = null)
    {
        //
        // fetchTrades (public)
        //
        //      {
        //          "date": 1648559414,
        //          "price": 5880375.0,
        //          "amount": 0.017,
        //          "tid": 176126557,
        //          "currency_pair": "btc_jpy",
        //          "trade_type": "ask"
        //      }
        //
        object side = this.safeString(trade, "trade_type");
        side = ((bool) isTrue((isEqual(side, "bid")))) ? "buy" : "sell";
        object timestamp = this.safeTimestamp(trade, "date");
        object id = this.safeString2(trade, "id", "tid");
        object priceString = this.safeString(trade, "price");
        object amountString = this.safeString(trade, "amount");
        object marketId = this.safeString(trade, "currency_pair");
        object symbol = this.safeSymbol(marketId, market, "_");
        return this.safeTrade(new Dictionary<string, object>() {
            { "id", id },
            { "info", trade },
            { "timestamp", timestamp },
            { "datetime", this.iso8601(timestamp) },
            { "symbol", symbol },
            { "type", null },
            { "side", side },
            { "order", null },
            { "takerOrMaker", null },
            { "price", priceString },
            { "amount", amountString },
            { "cost", null },
            { "fee", null },
        }, market);
    }

    public async override Task<object> fetchTrades(object symbol, object since = null, object limit = null, object parameters = null)
    {
        /**
        * @method
        * @name zaif#fetchTrades
        * @see https://zaif-api-document.readthedocs.io/ja/latest/PublicAPI.html#id28
        * @description get the list of most recent trades for a particular symbol
        * @param {string} symbol unified symbol of the market to fetch trades for
        * @param {int} [since] timestamp in ms of the earliest trade to fetch
        * @param {int} [limit] the maximum amount of trades to fetch
        * @param {object} [params] extra parameters specific to the exchange API endpoint
        * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
        */
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        object market = this.market(symbol);
        object request = new Dictionary<string, object>() {
            { "pair", getValue(market, "id") },
        };
        object response = await this.publicGetTradesPair(this.extend(request, parameters));
        //
        //      [
        //          {
        //              "date": 1648559414,
        //              "price": 5880375.0,
        //              "amount": 0.017,
        //              "tid": 176126557,
        //              "currency_pair": "btc_jpy",
        //              "trade_type": "ask"
        //          }, ...
        //      ]
        //
        object numTrades = getArrayLength(response);
        if (isTrue(isEqual(numTrades, 1)))
        {
            object firstTrade = getValue(response, 0);
            if (!isTrue(getArrayLength(new List<object>(((IDictionary<string,object>)firstTrade).Keys))))
            {
                response = new List<object>() {};
            }
        }
        return this.parseTrades(response, market, since, limit);
    }

    public async override Task<object> createOrder(object symbol, object type, object side, object amount, object price = null, object parameters = null)
    {
        /**
        * @method
        * @name zaif#createOrder
        * @see https://zaif-api-document.readthedocs.io/ja/latest/MarginTradingAPI.html#id23
        * @description create a trade order
        * @param {string} symbol unified symbol of the market to create an order in
        * @param {string} type must be 'limit'
        * @param {string} side 'buy' or 'sell'
        * @param {float} amount how much of currency you want to trade in units of base currency
        * @param {float} [price] the price at which the order is to be fullfilled, in units of the quote currency, ignored in market orders
        * @param {object} [params] extra parameters specific to the exchange API endpoint
        * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
        */
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        if (isTrue(!isEqual(type, "limit")))
        {
            throw new ExchangeError ((string)add(this.id, " createOrder() allows limit orders only")) ;
        }
        object market = this.market(symbol);
        object request = new Dictionary<string, object>() {
            { "currency_pair", getValue(market, "id") },
            { "action", ((bool) isTrue((isEqual(side, "buy")))) ? "bid" : "ask" },
            { "amount", amount },
            { "price", price },
        };
        object response = await this.privatePostTrade(this.extend(request, parameters));
        return this.safeOrder(new Dictionary<string, object>() {
            { "info", response },
            { "id", ((object)getValue(getValue(response, "return"), "order_id")).ToString() },
        }, market);
    }

    public async override Task<object> cancelOrder(object id, object symbol = null, object parameters = null)
    {
        /**
        * @method
        * @name zaif#cancelOrder
        * @see https://zaif-api-document.readthedocs.io/ja/latest/TradingAPI.html#id37
        * @description cancels an open order
        * @param {string} id order id
        * @param {string} symbol not used by zaif cancelOrder ()
        * @param {object} [params] extra parameters specific to the exchange API endpoint
        * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
        */
        parameters ??= new Dictionary<string, object>();
        object request = new Dictionary<string, object>() {
            { "order_id", id },
        };
        return await this.privatePostCancelOrder(this.extend(request, parameters));
    }

    public override object parseOrder(object order, object market = null)
    {
        //
        //     {
        //         "currency_pair": "btc_jpy",
        //         "action": "ask",
        //         "amount": 0.03,
        //         "price": 56000,
        //         "timestamp": 1402021125,
        //         "comment" : "demo"
        //     }
        //
        object side = this.safeString(order, "action");
        side = ((bool) isTrue((isEqual(side, "bid")))) ? "buy" : "sell";
        object timestamp = this.safeTimestamp(order, "timestamp");
        object marketId = this.safeString(order, "currency_pair");
        object symbol = this.safeSymbol(marketId, market, "_");
        object price = this.safeString(order, "price");
        object amount = this.safeString(order, "amount");
        object id = this.safeString(order, "id");
        return this.safeOrder(new Dictionary<string, object>() {
            { "id", id },
            { "clientOrderId", null },
            { "timestamp", timestamp },
            { "datetime", this.iso8601(timestamp) },
            { "lastTradeTimestamp", null },
            { "status", "open" },
            { "symbol", symbol },
            { "type", "limit" },
            { "timeInForce", null },
            { "postOnly", null },
            { "side", side },
            { "price", price },
            { "stopPrice", null },
            { "triggerPrice", null },
            { "cost", null },
            { "amount", amount },
            { "filled", null },
            { "remaining", null },
            { "trades", null },
            { "fee", null },
            { "info", order },
            { "average", null },
        }, market);
    }

    public async override Task<object> fetchOpenOrders(object symbol = null, object since = null, object limit = null, object parameters = null)
    {
        /**
        * @method
        * @name zaif#fetchOpenOrders
        * @see https://zaif-api-document.readthedocs.io/ja/latest/MarginTradingAPI.html#id28
        * @description fetch all unfilled currently open orders
        * @param {string} symbol unified market symbol
        * @param {int} [since] the earliest time in ms to fetch open orders for
        * @param {int} [limit] the maximum number of  open orders structures to retrieve
        * @param {object} [params] extra parameters specific to the exchange API endpoint
        * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
        */
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        object market = null;
        object request = new Dictionary<string, object>() {};
        if (isTrue(!isEqual(symbol, null)))
        {
            market = this.market(symbol);
            ((IDictionary<string,object>)request)["currency_pair"] = getValue(market, "id");
        }
        object response = await this.privatePostActiveOrders(this.extend(request, parameters));
        return this.parseOrders(getValue(response, "return"), market, since, limit);
    }

    public async override Task<object> fetchClosedOrders(object symbol = null, object since = null, object limit = null, object parameters = null)
    {
        /**
        * @method
        * @name zaif#fetchClosedOrders
        * @see https://zaif-api-document.readthedocs.io/ja/latest/TradingAPI.html#id24
        * @description fetches information on multiple closed orders made by the user
        * @param {string} symbol unified market symbol of the market orders were made in
        * @param {int} [since] the earliest time in ms to fetch orders for
        * @param {int} [limit] the maximum number of order structures to retrieve
        * @param {object} [params] extra parameters specific to the exchange API endpoint
        * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
        */
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        object market = null;
        object request = new Dictionary<string, object>() {};
        if (isTrue(!isEqual(symbol, null)))
        {
            market = this.market(symbol);
            ((IDictionary<string,object>)request)["currency_pair"] = getValue(market, "id");
        }
        object response = await this.privatePostTradeHistory(this.extend(request, parameters));
        return this.parseOrders(getValue(response, "return"), market, since, limit);
    }

    public async override Task<object> withdraw(object code, object amount, object address, object tag = null, object parameters = null)
    {
        /**
        * @method
        * @name zaif#withdraw
        * @see https://zaif-api-document.readthedocs.io/ja/latest/TradingAPI.html#id41
        * @description make a withdrawal
        * @param {string} code unified currency code
        * @param {float} amount the amount to withdraw
        * @param {string} address the address to withdraw to
        * @param {string} tag
        * @param {object} [params] extra parameters specific to the exchange API endpoint
        * @returns {object} a [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}
        */
        parameters ??= new Dictionary<string, object>();
        var tagparametersVariable = this.handleWithdrawTagAndParams(tag, parameters);
        tag = ((IList<object>)tagparametersVariable)[0];
        parameters = ((IList<object>)tagparametersVariable)[1];
        this.checkAddress(address);
        await this.loadMarkets();
        object currency = this.currency(code);
        if (isTrue(isEqual(code, "JPY")))
        {
            throw new ExchangeError ((string)add(add(add(this.id, " withdraw() does not allow "), code), " withdrawals")) ;
        }
        object request = new Dictionary<string, object>() {
            { "currency", getValue(currency, "id") },
            { "amount", amount },
            { "address", address },
        };
        if (isTrue(!isEqual(tag, null)))
        {
            ((IDictionary<string,object>)request)["message"] = tag;
        }
        object result = await this.privatePostWithdraw(this.extend(request, parameters));
        //
        //     {
        //         "success": 1,
        //         "return": {
        //             "id": 23634,
        //             "fee": 0.001,
        //             "txid":,
        //             "funds": {
        //                 "jpy": 15320,
        //                 "btc": 1.392,
        //                 "xem": 100.2,
        //                 "mona": 2600
        //             }
        //         }
        //     }
        //
        object returnData = this.safeValue(result, "return");
        return this.parseTransaction(returnData, currency);
    }

    public override object parseTransaction(object transaction, object currency = null)
    {
        //
        //     {
        //         "id": 23634,
        //         "fee": 0.001,
        //         "txid":,
        //         "funds": {
        //             "jpy": 15320,
        //             "btc": 1.392,
        //             "xem": 100.2,
        //             "mona": 2600
        //         }
        //     }
        //
        currency = this.safeCurrency(null, currency);
        object fee = null;
        object feeCost = this.safeValue(transaction, "fee");
        if (isTrue(!isEqual(feeCost, null)))
        {
            fee = new Dictionary<string, object>() {
                { "cost", feeCost },
                { "currency", getValue(currency, "code") },
            };
        }
        return new Dictionary<string, object>() {
            { "id", this.safeString(transaction, "id") },
            { "txid", this.safeString(transaction, "txid") },
            { "timestamp", null },
            { "datetime", null },
            { "network", null },
            { "addressFrom", null },
            { "address", null },
            { "addressTo", null },
            { "amount", null },
            { "type", null },
            { "currency", getValue(currency, "code") },
            { "status", null },
            { "updated", null },
            { "tagFrom", null },
            { "tag", null },
            { "tagTo", null },
            { "comment", null },
            { "internal", null },
            { "fee", fee },
            { "info", transaction },
        };
    }

    public virtual object customNonce()
    {
        object num = ((object)(divide(this.milliseconds(), 1000))).ToString();
        object nonce = parseFloat(num);
        return toFixed(nonce, 8);
    }

    public override object sign(object path, object api = null, object method = null, object parameters = null, object headers = null, object body = null)
    {
        api ??= "public";
        method ??= "GET";
        parameters ??= new Dictionary<string, object>();
        object url = add(getValue(getValue(this.urls, "api"), "rest"), "/");
        if (isTrue(isEqual(api, "public")))
        {
            url = add(url, add(add(add("api/", this.version), "/"), this.implodeParams(path, parameters)));
        } else if (isTrue(isEqual(api, "fapi")))
        {
            url = add(url, add(add(add("fapi/", this.version), "/"), this.implodeParams(path, parameters)));
        } else
        {
            this.checkRequiredCredentials();
            if (isTrue(isEqual(api, "ecapi")))
            {
                url = add(url, "ecapi");
            } else if (isTrue(isEqual(api, "tlapi")))
            {
                url = add(url, "tlapi");
            } else
            {
                url = add(url, "tapi");
            }
            object nonce = this.customNonce();
            body = this.urlencode(this.extend(new Dictionary<string, object>() {
                { "method", path },
                { "nonce", nonce },
            }, parameters));
            headers = new Dictionary<string, object>() {
                { "Content-Type", "application/x-www-form-urlencoded" },
                { "Key", this.apiKey },
                { "Sign", this.hmac(this.encode(body), this.encode(this.secret), sha512) },
            };
        }
        return new Dictionary<string, object>() {
            { "url", url },
            { "method", method },
            { "body", body },
            { "headers", headers },
        };
    }

    public override object handleErrors(object httpCode, object reason, object url, object method, object headers, object body, object response, object requestHeaders, object requestBody)
    {
        if (isTrue(isEqual(response, null)))
        {
            return null;
        }
        //
        //     {"error": "unsupported currency_pair"}
        //
        object feedback = add(add(this.id, " "), body);
        object error = this.safeString(response, "error");
        if (isTrue(!isEqual(error, null)))
        {
            this.throwExactlyMatchedException(getValue(this.exceptions, "exact"), error, feedback);
            this.throwBroadlyMatchedException(getValue(this.exceptions, "broad"), error, feedback);
            throw new ExchangeError ((string)feedback) ;
        }
        object success = this.safeBool(response, "success", true);
        if (!isTrue(success))
        {
            throw new ExchangeError ((string)feedback) ;
        }
        return null;
    }
}
