import Exchange from './abstract/bybit.js';
import type { Int, OrderSide, OrderType, Trade, Order, OHLCV, FundingRateHistory, OpenInterest, OrderRequest, Balances, Str, Transaction, Ticker, OrderBook, Tickers, Greeks, Strings, Market, Currency, MarketInterface, TransferEntry, Liquidation } from './base/types.js';
/**
 * @class bybit
 * @augments Exchange
 */
export default class bybit extends Exchange {
    describe(): any;
    nonce(): number;
    addPaginationCursorToResult(response: any): any;
    isUnifiedEnabled(params?: {}): Promise<any[]>;
    upgradeUnifiedTradeAccount(params?: {}): Promise<any>;
    convertExpireDate(date: any): string;
    convertExpireDateToMarketIdDate(date: any): any;
    convertMarketIdExpireDate(date: any): string;
    createExpiredOptionMarket(symbol: string): MarketInterface;
    safeMarket(marketId?: any, market?: any, delimiter?: any, marketType?: any): MarketInterface;
    getBybitType(method: any, market: any, params?: {}): any[];
    fetchTime(params?: {}): Promise<number>;
    fetchCurrencies(params?: {}): Promise<{}>;
    fetchMarkets(params?: {}): Promise<any>;
    fetchSpotMarkets(params: any): Promise<any[]>;
    fetchFutureMarkets(params: any): Promise<any[]>;
    fetchOptionMarkets(params: any): Promise<any[]>;
    parseTicker(ticker: any, market?: Market): Ticker;
    fetchTicker(symbol: string, params?: {}): Promise<Ticker>;
    fetchTickers(symbols?: Strings, params?: {}): Promise<Tickers>;
    parseOHLCV(ohlcv: any, market?: Market): OHLCV;
    fetchOHLCV(symbol: string, timeframe?: string, since?: Int, limit?: Int, params?: {}): Promise<OHLCV[]>;
    parseFundingRate(ticker: any, market?: Market): {
        info: any;
        symbol: string;
        markPrice: number;
        indexPrice: number;
        interestRate: any;
        estimatedSettlePrice: any;
        timestamp: number;
        datetime: string;
        fundingRate: number;
        fundingTimestamp: number;
        fundingDatetime: string;
        nextFundingRate: any;
        nextFundingTimestamp: any;
        nextFundingDatetime: any;
        previousFundingRate: any;
        previousFundingTimestamp: any;
        previousFundingDatetime: any;
    };
    fetchFundingRates(symbols?: Strings, params?: {}): Promise<any>;
    fetchFundingRateHistory(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<FundingRateHistory[]>;
    parseTrade(trade: any, market?: Market): Trade;
    fetchTrades(symbol: string, since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    fetchOrderBook(symbol: string, limit?: Int, params?: {}): Promise<OrderBook>;
    parseBalance(response: any): Balances;
    fetchBalance(params?: {}): Promise<Balances>;
    parseOrderStatus(status: any): string;
    parseTimeInForce(timeInForce: any): string;
    parseOrder(order: any, market?: Market): Order;
    createMarketBuyOrderWithCost(symbol: string, cost: number, params?: {}): Promise<Order>;
    createMarketSellOrderWithCost(symbol: string, cost: number, params?: {}): Promise<Order>;
    createOrder(symbol: string, type: OrderType, side: OrderSide, amount: number, price?: number, params?: {}): Promise<Order>;
    createOrderRequest(symbol: string, type: OrderType, side: OrderSide, amount: number, price?: number, params?: {}, isUTA?: boolean): any;
    createOrders(orders: OrderRequest[], params?: {}): Promise<Order[]>;
    createUsdcOrder(symbol: any, type: any, side: any, amount: number, price?: number, params?: {}): Promise<Order>;
    editUsdcOrder(id: any, symbol: any, type: any, side: any, amount?: any, price?: any, params?: {}): Promise<Order>;
    editOrder(id: string, symbol: string, type: OrderType, side: OrderSide, amount?: number, price?: number, params?: {}): Promise<Order>;
    cancelUsdcOrder(id: any, symbol?: Str, params?: {}): Promise<Order>;
    cancelOrder(id: string, symbol?: Str, params?: {}): Promise<Order>;
    cancelAllUsdcOrders(symbol?: Str, params?: {}): Promise<any>;
    cancelAllOrders(symbol?: Str, params?: {}): Promise<any>;
    fetchUsdcOrders(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    fetchOrderClassic(id: string, symbol?: Str, params?: {}): Promise<Order>;
    fetchOrder(id: string, symbol?: Str, params?: {}): Promise<Order>;
    fetchOrders(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    fetchOrdersClassic(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    fetchClosedOrder(id: string, symbol?: Str, params?: {}): Promise<Order>;
    fetchOpenOrder(id: string, symbol?: Str, params?: {}): Promise<Order>;
    fetchCanceledAndClosedOrders(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    fetchClosedOrders(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    fetchCanceledOrders(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    fetchUsdcOpenOrders(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    fetchOpenOrders(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    fetchOrderTrades(id: string, symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    fetchMyUsdcTrades(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    fetchMyTrades(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    parseDepositAddress(depositAddress: any, currency?: Currency): {
        currency: string;
        address: string;
        tag: string;
        network: string;
        info: any;
    };
    fetchDepositAddressesByNetwork(code: string, params?: {}): Promise<{}>;
    fetchDepositAddress(code: string, params?: {}): Promise<{
        currency: string;
        address: string;
        tag: string;
        network: string;
        info: any;
    }>;
    fetchDeposits(code?: Str, since?: Int, limit?: Int, params?: {}): Promise<Transaction[]>;
    fetchWithdrawals(code?: Str, since?: Int, limit?: Int, params?: {}): Promise<Transaction[]>;
    parseTransactionStatus(status: any): string;
    parseTransaction(transaction: any, currency?: Currency): Transaction;
    fetchLedger(code?: Str, since?: Int, limit?: Int, params?: {}): Promise<any>;
    parseLedgerEntry(item: any, currency?: Currency): {
        id: string;
        currency: string;
        account: string;
        referenceAccount: any;
        referenceId: string;
        status: any;
        amount: number;
        before: number;
        after: number;
        fee: number;
        direction: string;
        timestamp: number;
        datetime: string;
        type: string;
        info: any;
    };
    parseLedgerEntryType(type: any): string;
    withdraw(code: string, amount: number, address: any, tag?: any, params?: {}): Promise<Transaction>;
    fetchPosition(symbol: string, params?: {}): Promise<import("./base/types.js").Position>;
    fetchUsdcPositions(symbols?: Strings, params?: {}): Promise<import("./base/types.js").Position[]>;
    fetchPositions(symbols?: Strings, params?: {}): Promise<import("./base/types.js").Position[]>;
    parsePosition(position: any, market?: Market): import("./base/types.js").Position;
    fetchLeverage(symbol: string, params?: {}): Promise<{
        info: import("./base/types.js").Position;
        leverage: number;
        marginMode: number;
    }>;
    setMarginMode(marginMode: string, symbol?: Str, params?: {}): Promise<any>;
    setLeverage(leverage: Int, symbol?: Str, params?: {}): Promise<any>;
    setPositionMode(hedged: boolean, symbol?: Str, params?: {}): Promise<any>;
    fetchDerivativesOpenInterestHistory(symbol: string, timeframe?: string, since?: Int, limit?: Int, params?: {}): Promise<OpenInterest[]>;
    fetchOpenInterest(symbol: string, params?: {}): Promise<OpenInterest>;
    fetchOpenInterestHistory(symbol: string, timeframe?: string, since?: Int, limit?: Int, params?: {}): Promise<OpenInterest[]>;
    parseOpenInterest(interest: any, market?: Market): OpenInterest;
    fetchCrossBorrowRate(code: string, params?: {}): Promise<{
        currency: string;
        rate: number;
        period: number;
        timestamp: number;
        datetime: string;
        info: any;
    }>;
    parseBorrowRate(info: any, currency?: Currency): {
        currency: string;
        rate: number;
        period: number;
        timestamp: number;
        datetime: string;
        info: any;
    };
    fetchBorrowInterest(code?: Str, symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<any>;
    parseBorrowInterest(info: any, market?: Market): {
        symbol: any;
        marginMode: string;
        currency: string;
        interest: number;
        interestRate: any;
        amountBorrowed: number;
        timestamp: any;
        datetime: any;
        info: any;
    };
    transfer(code: string, amount: number, fromAccount: string, toAccount: string, params?: {}): Promise<TransferEntry>;
    fetchTransfers(code?: Str, since?: Int, limit?: Int, params?: {}): Promise<any>;
    borrowCrossMargin(code: string, amount: number, params?: {}): Promise<any>;
    repayCrossMargin(code: string, amount: any, params?: {}): Promise<any>;
    parseMarginLoan(info: any, currency?: Currency): {
        id: string;
        currency: string;
        amount: any;
        symbol: any;
        timestamp: any;
        datetime: any;
        info: any;
    };
    parseTransferStatus(status: any): string;
    parseTransfer(transfer: any, currency?: Currency): {
        info: any;
        id: string;
        timestamp: number;
        datetime: string;
        currency: string;
        amount: number;
        fromAccount: string;
        toAccount: string;
        status: string;
    };
    fetchDerivativesMarketLeverageTiers(symbol: string, params?: {}): Promise<any[]>;
    fetchMarketLeverageTiers(symbol: string, params?: {}): Promise<any[]>;
    parseMarketLeverageTiers(info: any, market?: Market): any[];
    parseTradingFee(fee: any, market?: Market): {
        info: any;
        symbol: string;
        maker: number;
        taker: number;
    };
    fetchTradingFee(symbol: string, params?: {}): Promise<{
        info: any;
        symbol: string;
        maker: number;
        taker: number;
    }>;
    fetchTradingFees(params?: {}): Promise<{}>;
    parseDepositWithdrawFee(fee: any, currency?: Currency): {
        info: any;
        withdraw: {
            fee: any;
            percentage: any;
        };
        deposit: {
            fee: any;
            percentage: any;
        };
        networks: {};
    };
    fetchDepositWithdrawFees(codes?: Strings, params?: {}): Promise<any>;
    fetchSettlementHistory(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<any>;
    fetchMySettlementHistory(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<any>;
    parseSettlement(settlement: any, market: any): {
        info: any;
        symbol: string;
        price: number;
        timestamp: number;
        datetime: string;
    };
    parseSettlements(settlements: any, market: any): any[];
    fetchVolatilityHistory(code: string, params?: {}): Promise<any[]>;
    parseVolatilityHistory(volatility: any): any[];
    fetchGreeks(symbol: string, params?: {}): Promise<Greeks>;
    parseGreeks(greeks: any, market?: Market): {
        symbol: string;
        timestamp: any;
        datetime: any;
        delta: number;
        gamma: number;
        theta: number;
        vega: number;
        rho: any;
        bidSize: number;
        askSize: number;
        bidImpliedVolatility: number;
        askImpliedVolatility: number;
        markImpliedVolatility: number;
        bidPrice: number;
        askPrice: number;
        markPrice: number;
        lastPrice: number;
        underlyingPrice: number;
        info: any;
    };
    fetchMyLiquidations(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Liquidation[]>;
    parseLiquidation(liquidation: any, market?: Market): Liquidation;
    sign(path: any, api?: string, method?: string, params?: {}, headers?: any, body?: any): {
        url: string;
        method: string;
        body: any;
        headers: any;
    };
    handleErrors(httpCode: any, reason: any, url: any, method: any, headers: any, body: any, response: any, requestHeaders: any, requestBody: any): any;
}
