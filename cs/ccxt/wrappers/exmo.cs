namespace ccxt;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


public partial class exmo
{
    /// <summary>
    /// fetch the trading fees for multiple markets
    /// </summary>
    /// <remarks>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> a dictionary of [fee structures]{@link https://docs.ccxt.com/#/?id=fee-structure} indexed by market symbols.</returns>
    public async Task<Dictionary<string, object>> FetchTradingFees(Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchTradingFees(parameters);
        return ((Dictionary<string, object>)res);
    }
    public async Task<Dictionary<string, object>> FetchPrivateTradingFees(Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchPrivateTradingFees(parameters);
        return ((Dictionary<string, object>)res);
    }
    public async Task<Dictionary<string, object>> FetchPublicTradingFees(Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchPublicTradingFees(parameters);
        return ((Dictionary<string, object>)res);
    }
    /// <summary>
    /// please use fetchDepositWithdrawFees instead
    /// </summary>
    /// <remarks>
    /// See <see href="https://documenter.getpostman.com/view/10287440/SzYXWKPi#4190035d-24b1-453d-833b-37e0a52f88e2"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> a list of [transaction fees structures]{@link https://docs.ccxt.com/#/?id=fees-structure}.</returns>
    public async Task<Dictionary<string, object>> FetchTransactionFees(object codes = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchTransactionFees(codes, parameters);
        return ((Dictionary<string, object>)res);
    }
    /// <summary>
    /// fetch deposit and withdraw fees
    /// </summary>
    /// <remarks>
    /// See <see href="https://documenter.getpostman.com/view/10287440/SzYXWKPi#4190035d-24b1-453d-833b-37e0a52f88e2"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> a list of [transaction fees structures]{@link https://docs.ccxt.com/#/?id=fees-structure}.</returns>
    public async Task<Dictionary<string, object>> FetchDepositWithdrawFees(List<String> codes = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchDepositWithdrawFees(codes, parameters);
        return ((Dictionary<string, object>)res);
    }
    /// <summary>
    /// retrieves data on all markets for exmo
    /// </summary>
    /// <remarks>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object[]</term> an array of objects representing market data.</returns>
    public async Task<List<Dictionary<string, object>>> FetchMarkets(Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchMarkets(parameters);
        return ((IList<object>)res).Select(item => (item as Dictionary<string, object>)).ToList();
    }
    /// <summary>
    /// fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
    /// </summary>
    /// <remarks>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : timestamp in ms of the earliest candle to fetch
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum amount of candles to fetch
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>int[][]</term> A list of candles ordered as timestamp, open, high, low, close, volume.</returns>
    public async Task<List<OHLCV>> FetchOHLCV(string symbol, string timeframe = "1m", Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchOHLCV(symbol, timeframe, since, limit, parameters);
        return ((IList<object>)res).Select(item => new OHLCV(item)).ToList<OHLCV>();
    }
    /// <summary>
    /// query for balance and get the amount of funds available for trading or funds locked in orders
    /// </summary>
    /// <remarks>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.marginMode</term>
    /// <description>
    /// string : *isolated* fetches the isolated margin balance
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}.</returns>
    public async Task<Balances> FetchBalance(Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchBalance(parameters);
        return new Balances(res);
    }
    /// <summary>
    /// fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
    /// </summary>
    /// <remarks>
    /// <list type="table">
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum amount of order book entries to return
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols.</returns>
    public async Task<OrderBook> FetchOrderBook(string symbol, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchOrderBook(symbol, limit, parameters);
        return new OrderBook(res);
    }
    /// <summary>
    /// fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data for multiple markets
    /// </summary>
    /// <remarks>
    /// <list type="table">
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : max number of entries per orderbook to return, default is undefined
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> a dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbol.</returns>
    public async Task<Dictionary<string, OrderBook>> FetchOrderBooks(List<String> symbols = null, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchOrderBooks(symbols, limit, parameters);
        return ((Dictionary<string, OrderBook>)res);
    }
    /// <summary>
    /// fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market
    /// </summary>
    /// <remarks>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> a dictionary of [ticker structures]{@link https://docs.ccxt.com/#/?id=ticker-structure}.</returns>
    public async Task<Tickers> FetchTickers(List<String> symbols = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchTickers(symbols, parameters);
        return new Tickers(res);
    }
    /// <summary>
    /// fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
    /// </summary>
    /// <remarks>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}.</returns>
    public async Task<Ticker> FetchTicker(string symbol, Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchTicker(symbol, parameters);
        return new Ticker(res);
    }
    /// <summary>
    /// get the list of most recent trades for a particular symbol
    /// </summary>
    /// <remarks>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : timestamp in ms of the earliest trade to fetch
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum amount of trades to fetch
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>Trade[]</term> a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}.</returns>
    public async Task<List<Trade>> FetchTrades(string symbol, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchTrades(symbol, since, limit, parameters);
        return ((IList<object>)res).Select(item => new Trade(item)).ToList<Trade>();
    }
    /// <summary>
    /// fetch all trades made by the user
    /// </summary>
    /// <remarks>
    /// See <see href="https://documenter.getpostman.com/view/10287440/SzYXWKPi#b8d8d9af-4f46-46a1-939b-ad261d79f452"/>  <br/>
    /// See <see href="https://documenter.getpostman.com/view/10287440/SzYXWKPi#f4b1aaf8-399f-403b-ab5e-4926d967a106"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : the earliest time in ms to fetch trades for
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : *required for margin orders* the maximum number of trades structures to retrieve
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.offset</term>
    /// <description>
    /// int : last deal offset, default = 0
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>Trade[]</term> a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}.</returns>
    public async Task<List<Trade>> FetchMyTrades(string symbol = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchMyTrades(symbol, since, limit, parameters);
        return ((IList<object>)res).Select(item => new Trade(item)).ToList<Trade>();
    }
    /// <summary>
    /// create a trade order
    /// </summary>
    /// <remarks>
    /// See <see href="https://documenter.getpostman.com/view/10287440/SzYXWKPi#80daa469-ec59-4d0a-b229-6a311d8dd1cd"/>  <br/>
    /// See <see href="https://documenter.getpostman.com/view/10287440/SzYXWKPi#de6f4321-eeac-468c-87f7-c4ad7062e265"/>  <br/>
    /// See <see href="https://documenter.getpostman.com/view/10287440/SzYXWKPi#3561b86c-9ff1-436e-8e68-ac926b7eb523"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>price</term>
    /// <description>
    /// float : the price at which the order is to be fullfilled, in units of the quote currency, ignored in market orders
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.stopPrice</term>
    /// <description>
    /// float : the price at which a trigger order is triggered at
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.timeInForce</term>
    /// <description>
    /// string : *spot only* 'fok', 'ioc' or 'post_only'
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.postOnly</term>
    /// <description>
    /// boolean : *spot only* true for post only orders
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<Order> CreateOrder(string symbol, string type, string side, double amount, double? price2 = 0, Dictionary<string, object> parameters = null)
    {
        var price = price2 == 0 ? null : (object)price2;
        var res = await this.createOrder(symbol, type, side, amount, price, parameters);
        return new Order(res);
    }
    /// <summary>
    /// cancels an open order
    /// </summary>
    /// <remarks>
    /// See <see href="https://documenter.getpostman.com/view/10287440/SzYXWKPi#1f710d4b-75bc-4b65-ad68-006f863a3f26"/>  <br/>
    /// See <see href="https://documenter.getpostman.com/view/10287440/SzYXWKPi#a4d0aae8-28f7-41ac-94fd-c4030130453d"/>  <br/>
    /// See <see href="https://documenter.getpostman.com/view/10287440/SzYXWKPi#705dfec5-2b35-4667-862b-faf54eca6209"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.trigger</term>
    /// <description>
    /// boolean : true to cancel a trigger order
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.marginMode</term>
    /// <description>
    /// string : set to 'cross' or 'isolated' to cancel a margin order
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<Order> CancelOrder(string id, string symbol = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.cancelOrder(id, symbol, parameters);
        return new Order(res);
    }
    /// <summary>
    /// *spot only* fetches information on an order made by the user
    /// </summary>
    /// <remarks>
    /// See <see href="https://documenter.getpostman.com/view/10287440/SzYXWKPi#cf27781e-28e5-4b39-a52d-3110f5d22459"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<Order> FetchOrder(string id, string symbol = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchOrder(id, symbol, parameters);
        return new Order(res);
    }
    /// <summary>
    /// fetch all the trades made from a single order
    /// </summary>
    /// <remarks>
    /// See <see href="https://documenter.getpostman.com/view/10287440/SzYXWKPi#cf27781e-28e5-4b39-a52d-3110f5d22459"/>  <br/>
    /// See <see href="https://documenter.getpostman.com/view/10287440/SzYXWKPi#00810661-9119-46c5-aec5-55abe9cb42c7"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : the earliest time in ms to fetch trades for
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum number of trades to retrieve
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.marginMode</term>
    /// <description>
    /// string : set to "isolated" to fetch trades for a margin order
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object[]</term> a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}.</returns>
    public async Task<List<Trade>> FetchOrderTrades(string id, string symbol = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchOrderTrades(id, symbol, since, limit, parameters);
        return ((IList<object>)res).Select(item => new Trade(item)).ToList<Trade>();
    }
    /// <summary>
    /// fetch all unfilled currently open orders
    /// </summary>
    /// <remarks>
    /// See <see href="https://documenter.getpostman.com/view/10287440/SzYXWKPi#0e135370-daa4-4689-8acd-b6876dee9ba1"/>  <br/>
    /// See <see href="https://documenter.getpostman.com/view/10287440/SzYXWKPi#a7cfd4f0-476e-4675-b33f-22a46902f245"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : the earliest time in ms to fetch open orders for
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum number of  open orders structures to retrieve
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.marginMode</term>
    /// <description>
    /// string : set to "isolated" for margin orders
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>Order[]</term> a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<List<Order>> FetchOpenOrders(string symbol = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchOpenOrders(symbol, since, limit, parameters);
        return ((IList<object>)res).Select(item => new Order(item)).ToList<Order>();
    }
    /// <summary>
    /// fetches information on multiple canceled orders made by the user
    /// </summary>
    /// <remarks>
    /// See <see href="https://documenter.getpostman.com/view/10287440/SzYXWKPi#1d2524dd-ae6d-403a-a067-77b50d13fbe5"/>  <br/>
    /// See <see href="https://documenter.getpostman.com/view/10287440/SzYXWKPi#a51be1d0-af5f-44e4-99d7-f7b04c6067d0"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : timestamp in ms of the earliest order, default is undefined
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : max number of orders to return, default is undefined
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.marginMode</term>
    /// <description>
    /// string : set to "isolated" for margin orders
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<List<Dictionary<string, object>>> FetchCanceledOrders(string symbol = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchCanceledOrders(symbol, since, limit, parameters);
        return ((IList<object>)res).Select(item => (item as Dictionary<string, object>)).ToList();
    }
    /// <summary>
    /// *margin only* edit a trade order
    /// </summary>
    /// <remarks>
    /// See <see href="https://documenter.getpostman.com/view/10287440/SzYXWKPi#f27ee040-c75f-4b59-b608-d05bd45b7899"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>amount</term>
    /// <description>
    /// float : how much of the currency you want to trade in units of the base currency
    /// </description>
    /// </item>
    /// <item>
    /// <term>price</term>
    /// <description>
    /// float : the price at which the order is to be fullfilled, in units of the quote currency, ignored in market orders
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.triggerPrice</term>
    /// <description>
    /// float : stop price for stop-market and stop-limit orders
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.distance</term>
    /// <description>
    /// int : distance for trailing stop orders
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.expire</term>
    /// <description>
    /// int : expiration timestamp in UTC timezone for the order. order will not be expired if expire is 0
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.comment</term>
    /// <description>
    /// string : optional comment for order. up to 50 latin symbols, whitespaces, underscores
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<Order> EditOrder(string id, object symbol, object type, object side, object amount = null, object price = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.editOrder(id, symbol, type, side, amount, price, parameters);
        return new Order(res);
    }
    /// <summary>
    /// fetch the deposit address for a currency associated with this account
    /// </summary>
    /// <remarks>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> an [address structure]{@link https://docs.ccxt.com/#/?id=address-structure}.</returns>
    public async Task<Dictionary<string, object>> FetchDepositAddress(string code, Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchDepositAddress(code, parameters);
        return ((Dictionary<string, object>)res);
    }
    /// <summary>
    /// make a withdrawal
    /// </summary>
    /// <remarks>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> a [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}.</returns>
    public async Task<Transaction> Withdraw(string code, double amount, object address, object tag = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.withdraw(code, amount, address, tag, parameters);
        return new Transaction(res);
    }
    /// <summary>
    /// fetch history of deposits and withdrawals
    /// </summary>
    /// <remarks>
    /// <list type="table">
    /// <item>
    /// <term>code</term>
    /// <description>
    /// string : unified currency code for the currency of the deposit/withdrawals, default is undefined
    /// </description>
    /// </item>
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : timestamp in ms of the earliest deposit/withdrawal, default is undefined
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : max number of deposit/withdrawals to return, default is undefined
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> a list of [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}.</returns>
    public async Task<List<Transaction>> FetchDepositsWithdrawals(string code = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchDepositsWithdrawals(code, since, limit, parameters);
        return ((IList<object>)res).Select(item => new Transaction(item)).ToList<Transaction>();
    }
    /// <summary>
    /// fetch all withdrawals made from an account
    /// </summary>
    /// <remarks>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : the earliest time in ms to fetch withdrawals for
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum number of withdrawals structures to retrieve
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object[]</term> a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}.</returns>
    public async Task<List<Transaction>> FetchWithdrawals(string code = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchWithdrawals(code, since, limit, parameters);
        return ((IList<object>)res).Select(item => new Transaction(item)).ToList<Transaction>();
    }
    /// <summary>
    /// fetch data on a currency withdrawal via the withdrawal id
    /// </summary>
    /// <remarks>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> a [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}.</returns>
    public async Task<Transaction> FetchWithdrawal(string id, string code = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchWithdrawal(id, code, parameters);
        return new Transaction(res);
    }
    /// <summary>
    /// fetch information on a deposit
    /// </summary>
    /// <remarks>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> a [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}.</returns>
    public async Task<Transaction> FetchDeposit(object id = null, string code = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchDeposit(id, code, parameters);
        return new Transaction(res);
    }
    /// <summary>
    /// fetch all deposits made to an account
    /// </summary>
    /// <remarks>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : the earliest time in ms to fetch deposits for
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum number of deposits structures to retrieve
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object[]</term> a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}.</returns>
    public async Task<List<Transaction>> FetchDeposits(string code = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchDeposits(code, since, limit, parameters);
        return ((IList<object>)res).Select(item => new Transaction(item)).ToList<Transaction>();
    }
}
