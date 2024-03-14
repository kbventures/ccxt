import os
import sys

root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
sys.path.append(root)

# ----------------------------------------------------------------------------

# PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
# https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

# ----------------------------------------------------------------------------
# -*- coding: utf-8 -*-

from ccxt.test.base import test_currency  # noqa E402
from ccxt.test.base import test_shared_methods  # noqa E402

def test_fetch_currencies(exchange, skipped_properties):
    method = 'fetchCurrencies'
    # const isNative = exchange.has['fetchCurrencies'] && exchange.has['fetchCurrencies'] !== 'emulated';
    currencies = exchange.fetch_currencies()
    # todo: try to invent something to avoid undefined undefined, i.e. maybe move into private and force it to have a value
    if currencies is not None:
        values = list(currencies.values())
        test_shared_methods.assert_non_emtpy_array(exchange, skipped_properties, method, values)
        for i in range(0, len(values)):
            test_currency(exchange, skipped_properties, method, values[i])
