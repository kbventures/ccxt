<?php
namespace ccxt;

// ----------------------------------------------------------------------------

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

// -----------------------------------------------------------------------------
use React\Async;
use React\Promise;
include_once PATH_TO_CCXT . '/test/base/test_ledger_entry.php';
include_once PATH_TO_CCXT . '/test/base/test_shared_methods.php';

function test_fetch_ledger_entry($exchange, $skipped_properties, $code) {
    return Async\async(function () use ($exchange, $skipped_properties, $code) {
        $method = 'fetchLedgerEntry';
        $items = Async\await($exchange->fetch_ledger($code));
        $length = count($items);
        assert_non_emtpy_array($exchange, $skipped_properties, $method, $items, $code);
        if ($length > 0) {
            $first_item = $items[0];
            $id = $first_item['id'];
            $item = Async\await($exchange->fetch_ledger_entry($id));
            $now = $exchange->milliseconds();
            test_ledger_entry($exchange, $skipped_properties, $method, $item, $code, $now);
        }
    }) ();
}
