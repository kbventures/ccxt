/// <reference types="node" />
import { Exchange } from '../../ccxt.js';
declare class baseMainTestClass {
    lang: string;
    isSynchronous: boolean;
    idTests: boolean;
    requestTestsFailed: boolean;
    responseTestsFailed: boolean;
    requestTests: boolean;
    wsTests: boolean;
    responseTests: boolean;
    staticTests: boolean;
    info: boolean;
    verbose: boolean;
    debug: boolean;
    privateTest: boolean;
    privateTestOnly: boolean;
    sandbox: boolean;
    skippedMethods: {};
    checkedPublicTests: {};
    testFiles: {};
    publicTests: {};
    newLine: string;
    rootDir: string;
    rootDirForSkips: string;
    onlySpecificTests: any[];
    envVars: NodeJS.ProcessEnv;
    proxyTestFileName: string;
    ext: string;
}
export default class testMainClass extends baseMainTestClass {
    parseCliArgs(): void;
    init(exchangeId: any, symbolArgv: any): Promise<void>;
    checkIfSpecificTestIsChosen(symbolArgv: any): any;
    importFiles(exchange: Exchange): Promise<void>;
    loadCredentialsFromEnv(exchange: Exchange): void;
    expandSettings(exchange: Exchange): void;
    addPadding(message: string, size: any): string;
    exchangeHint(exchange: any, market?: any): string;
    testMethod(methodName: string, exchange: any, args: any[], isPublic: boolean): Promise<void>;
    testSafe(methodName: any, exchange: any, args?: any[], isPublic?: boolean): Promise<boolean>;
    runPublicTests(exchange: any, symbol: any): Promise<void>;
    runTests(exchange: any, tests: any, isPublicTest: boolean): Promise<void>;
    loadExchange(exchange: any): Promise<boolean>;
    getTestSymbol(exchange: any, isSpot: any, symbols: any): any;
    getExchangeCode(exchange: any, codes?: any): any;
    getMarketsFromExchange(exchange: any, spot?: boolean): {};
    getValidSymbol(exchange: any, spot?: boolean): any;
    testExchange(exchange: any, providedSymbol?: any): Promise<void>;
    runPrivateTests(exchange: any, symbol: any): Promise<void>;
    testProxies(exchange: any): Promise<void>;
    startTest(exchange: any, symbol: any): Promise<void>;
    assertStaticError(cond: boolean, message: string, calculatedOutput: any, storedOutput: any, key?: any): void;
    loadMarketsFromFile(id: string): any;
    loadCurrenciesFromFile(id: string): any;
    loadStaticData(folder: string, targetExchange?: string): {};
    removeHostnamefromUrl(url: string): string;
    urlencodedToDict(url: string): {};
    assertNewAndStoredOutput(exchange: Exchange, skipKeys: string[], newOutput: any, storedOutput: any, strictTypeCheck?: boolean, assertingKey?: any): void;
    assertStaticRequestOutput(exchange: any, type: string, skipKeys: string[], storedUrl: string, requestUrl: string, storedOutput: any, newOutput: any): void;
    assertStaticResponseOutput(exchange: Exchange, skipKeys: string[], computedResult: any, storedResult: any): void;
    sanitizeDataInput(input: any): any[];
    testMethodStatically(exchange: any, method: string, data: object, type: string, skipKeys: string[]): Promise<void>;
    testResponseStatically(exchange: any, method: string, skipKeys: string[], data: object): Promise<void>;
    initOfflineExchange(exchangeName: string): Exchange;
    testExchangeRequestStatically(exchangeName: string, exchangeData: object, testName?: string): Promise<void>;
    testExchangeResponseStatically(exchangeName: string, exchangeData: object, testName?: string): Promise<void>;
    getNumberOfTestsFromExchange(exchange: any, exchangeData: object): number;
    runStaticRequestTests(targetExchange?: string, testName?: string): Promise<void>;
    runStaticTests(type: string, targetExchange?: string, testName?: string): Promise<void>;
    runStaticResponseTests(exchangeName?: any, test?: any): Promise<void>;
    runBrokerIdTests(): Promise<void>;
    testBinance(): Promise<void>;
    testOkx(): Promise<void>;
    testCryptocom(): Promise<void>;
    testBybit(): Promise<void>;
    testKucoin(): Promise<void>;
    testKucoinfutures(): Promise<void>;
    testBitget(): Promise<void>;
    testMexc(): Promise<void>;
    testHuobi(): Promise<void>;
    testWoo(): Promise<void>;
    testBitmart(): Promise<void>;
    testCoinex(): Promise<void>;
    testBingx(): Promise<void>;
    testPhemex(): Promise<void>;
}
export {};
