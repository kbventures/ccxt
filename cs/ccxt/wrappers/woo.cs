namespace ccxt;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


public partial class woo
{
    /// <summary>
    /// retrieves data on all markets for woo
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
    public async Task<List<MarketInterface>> FetchMarkets(Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchMarkets(parameters);
        return ((IList<object>)res).Select(item => new MarketInterface(item)).ToList<MarketInterface>();
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
    /// fetch the trading fees for multiple markets
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.woo.org/#get-account-information-new"/>  <br/>
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
    /// <summary>
    /// create a market buy order by providing the symbol and cost
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.woo.org/#send-order"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<Order> CreateMarketBuyOrderWithCost(string symbol, object cost, Dictionary<string, object> parameters = null)
    {
        var res = await this.createMarketBuyOrderWithCost(symbol, cost, parameters);
        return new Order(res);
    }
    /// <summary>
    /// create a trailing order by providing the symbol, type, side, amount, price and trailingAmount
    /// </summary>
    /// <remarks>
    /// <list type="table">
    /// <item>
    /// <term>price</term>
    /// <description>
    /// float : the price for the order to be filled at, in units of the quote currency, ignored in market orders
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
    /// <returns> <term>object</term> an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<Order> CreateTrailingAmountOrder(string symbol, string type, string side, object amount, object price = null, object trailingAmount = null, object trailingTriggerPrice = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.createTrailingAmountOrder(symbol, type, side, amount, price, trailingAmount, trailingTriggerPrice, parameters);
        return new Order(res);
    }
    /// <summary>
    /// create a trailing order by providing the symbol, type, side, amount, price and trailingPercent
    /// </summary>
    /// <remarks>
    /// <list type="table">
    /// <item>
    /// <term>price</term>
    /// <description>
    /// float : the price for the order to be filled at, in units of the quote currency, ignored in market orders
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
    /// <returns> <term>object</term> an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<Order> CreateTrailingPercentOrder(string symbol, string type, string side, object amount, object price = null, object trailingPercent = null, object trailingTriggerPrice = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.createTrailingPercentOrder(symbol, type, side, amount, price, trailingPercent, trailingTriggerPrice, parameters);
        return new Order(res);
    }
    /// <summary>
    /// create a trade order
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.woo.org/#send-order"/>  <br/>
    /// See <see href="https://docs.woo.org/#send-algo-order"/>  <br/>
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
    /// <term>params.triggerPrice</term>
    /// <description>
    /// float : The price a trigger order is triggered at
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.takeProfit</term>
    /// <description>
    /// object : *takeProfit object in params* containing the triggerPrice at which the attached take profit order will be triggered (perpetual swap markets only)
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.stopLoss</term>
    /// <description>
    /// object : *stopLoss object in params* containing the triggerPrice at which the attached stop loss order will be triggered (perpetual swap markets only)
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.algoType</term>
    /// <description>
    /// float : 'STOP'or 'TRAILING_STOP' or 'OCO' or 'CLOSE_POSITION'
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.cost</term>
    /// <description>
    /// float : *spot market buy only* the quote quantity that can be used as an alternative for the amount
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.trailingAmount</term>
    /// <description>
    /// string : the quote amount to trail away from the current market price
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.trailingPercent</term>
    /// <description>
    /// string : the percent to trail away from the current market price
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.trailingTriggerPrice</term>
    /// <description>
    /// string : the price to trigger a trailing order, default uses the price argument
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
    /// edit a trade order
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.woo.org/#edit-order"/>  <br/>
    /// See <see href="https://docs.woo.org/#edit-order-by-client_order_id"/>  <br/>
    /// See <see href="https://docs.woo.org/#edit-algo-order"/>  <br/>
    /// See <see href="https://docs.woo.org/#edit-algo-order-by-client_order_id"/>  <br/>
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
    /// <term>params.triggerPrice</term>
    /// <description>
    /// float : The price a trigger order is triggered at
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.stopLossPrice</term>
    /// <description>
    /// float : price to trigger stop-loss orders
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.takeProfitPrice</term>
    /// <description>
    /// float : price to trigger take-profit orders
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.trailingAmount</term>
    /// <description>
    /// string : the quote amount to trail away from the current market price
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.trailingPercent</term>
    /// <description>
    /// string : the percent to trail away from the current market price
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.trailingTriggerPrice</term>
    /// <description>
    /// string : the price to trigger a trailing order, default uses the price argument
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
    /// cancels an open order
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.woo.org/#cancel-algo-order"/>  <br/>
    /// See <see href="https://docs.woo.org/#cancel-order"/>  <br/>
    /// See <see href="https://docs.woo.org/#cancel-order-by-client_order_id"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.stop</term>
    /// <description>
    /// boolean : whether the order is a stop/algo order
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<Dictionary<string, object>> CancelOrder(string id, string symbol = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.cancelOrder(id, symbol, parameters);
        return ((Dictionary<string, object>)res);
    }
    /// <summary>
    /// cancel all open orders in a market
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.woo.org/#cancel-all-pending-orders"/>  <br/>
    /// See <see href="https://docs.woo.org/#cancel-orders"/>  <br/>
    /// See <see href="https://docs.woo.org/#cancel-all-pending-algo-orders"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.stop</term>
    /// <description>
    /// boolean : whether the order is a stop/algo order
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> an list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<Dictionary<string, object>> CancelAllOrders(string symbol = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.cancelAllOrders(symbol, parameters);
        return ((Dictionary<string, object>)res);
    }
    /// <summary>
    /// fetches information on an order made by the user
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.woo.org/#get-algo-order"/>  <br/>
    /// See <see href="https://docs.woo.org/#get-order"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.stop</term>
    /// <description>
    /// boolean : whether the order is a stop/algo order
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
    /// fetches information on multiple orders made by the user
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.woo.org/#get-orders"/>  <br/>
    /// See <see href="https://docs.woo.org/#get-algo-orders"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : the earliest time in ms to fetch orders for
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum number of order structures to retrieve
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.stop</term>
    /// <description>
    /// boolean : whether the order is a stop/algo order
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.isTriggered</term>
    /// <description>
    /// boolean : whether the order has been triggered (false by default)
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.side</term>
    /// <description>
    /// string : 'buy' or 'sell'
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.trailing</term>
    /// <description>
    /// boolean : set to true if you want to fetch trailing orders
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>Order[]</term> a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<List<Order>> FetchOrders(string symbol = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchOrders(symbol, since, limit, parameters);
        return ((IList<object>)res).Select(item => new Order(item)).ToList<Order>();
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
    /// fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.woo.org/#kline-public"/>  <br/>
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
    /// fetch all the trades made from a single order
    /// </summary>
    /// <remarks>
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
    /// fetch all trades made by the user
    /// </summary>
    /// <remarks>
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
    /// int : the maximum number of trades structures to retrieve
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
    /// <returns> <term>Trade[]</term> a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}.</returns>
    public async Task<List<Trade>> FetchMyTrades(string symbol = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchMyTrades(symbol, since, limit, parameters);
        return ((IList<object>)res).Select(item => new Trade(item)).ToList<Trade>();
    }
    /// <summary>
    /// fetch all the accounts associated with a profile
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
    /// <returns> <term>object</term> a dictionary of [account structures]{@link https://docs.ccxt.com/#/?id=account-structure} indexed by the account type.</returns>
    public async Task<List<Dictionary<string, object>>> FetchAccounts(Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchAccounts(parameters);
        return ((IList<object>)res).Select(item => (item as Dictionary<string, object>)).ToList();
    }
    /// <summary>
    /// query for balance and get the amount of funds available for trading or funds locked in orders
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.woo.org/#get-current-holding-get-balance-new"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
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
    /// fetch the history of changes, actions done by the user or operations that altered balance of the user
    /// </summary>
    /// <remarks>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : timestamp in ms of the earliest ledger entry, default is undefined
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : max number of ledger entrys to return, default is undefined
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
    /// <returns> <term>object</term> a [ledger structure]{@link https://docs.ccxt.com/#/?id=ledger-structure}.</returns>
    public async Task<Dictionary<string, object>> FetchLedger(string code = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchLedger(code, since, limit, parameters);
        return ((Dictionary<string, object>)res);
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
    /// transfer currency internally between wallets on the same account
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
    /// <returns> <term>object</term> a [transfer structure]{@link https://docs.ccxt.com/#/?id=transfer-structure}.</returns>
    public async Task<TransferEntry> Transfer(string code, double amount, object fromAccount, object toAccount, Dictionary<string, object> parameters = null)
    {
        var res = await this.transfer(code, amount, fromAccount, toAccount, parameters);
        return new TransferEntry(res);
    }
    /// <summary>
    /// fetch a history of internal transfers made on an account
    /// </summary>
    /// <remarks>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : the earliest time in ms to fetch transfers for
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum number of  transfers structures to retrieve
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
    /// <returns> <term>object[]</term> a list of [transfer structures]{@link https://docs.ccxt.com/#/?id=transfer-structure}.</returns>
    public async Task<Dictionary<string, object>> FetchTransfers(string code = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchTransfers(code, since, limit, parameters);
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
    public async Task<List<FundingHistory>> FetchFundingHistory(string symbol = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchFundingHistory(symbol, since, limit, parameters);
        return ((IList<object>)res).Select(item => new FundingHistory(item)).ToList<FundingHistory>();
    }
    public async Task<Dictionary<string, object>> FetchFundingRate(string symbol, Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchFundingRate(symbol, parameters);
        return ((Dictionary<string, object>)res);
    }
    public async Task<Dictionary<string, object>> FetchFundingRates(List<String> symbols = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchFundingRates(symbols, parameters);
        return ((Dictionary<string, object>)res);
    }
    /// <summary>
    /// fetches historical funding rate prices
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.woo.org/#get-funding-rate-history-for-one-market-public"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : timestamp in ms of the earliest funding rate to fetch
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum amount of [funding rate structures]{@link https://docs.ccxt.com/#/?id=funding-rate-history-structure} to fetch
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.until</term>
    /// <description>
    /// int : timestamp in ms of the latest funding rate
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.paginate</term>
    /// <description>
    /// boolean : default false, when true will automatically paginate by calling this endpoint multiple times. See in the docs all the [availble parameters](https://github.com/ccxt/ccxt/wiki/Manual#pagination-params)
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object[]</term> a list of [funding rate structures]{@link https://docs.ccxt.com/#/?id=funding-rate-history-structure}.</returns>
    public async Task<List<FundingRateHistory>> FetchFundingRateHistory(string symbol = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchFundingRateHistory(symbol, since, limit, parameters);
        return ((IList<object>)res).Select(item => new FundingRateHistory(item)).ToList<FundingRateHistory>();
    }
    public async Task<Int64> FetchLeverage(string symbol, Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchLeverage(symbol, parameters);
        return (Int64)res;
    }
    public async Task<Dictionary<string, object>> SetLeverage(Int64 leverage, string symbol = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.setLeverage(leverage, symbol, parameters);
        return ((Dictionary<string, object>)res);
    }
    public async Task<Position> FetchPosition(string symbol = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchPosition(symbol, parameters);
        return new Position(res);
    }
    public async Task<List<Position>> FetchPositions(List<String> symbols = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchPositions(symbols, parameters);
        return ((IList<object>)res).Select(item => new Position(item)).ToList<Position>();
    }
}
