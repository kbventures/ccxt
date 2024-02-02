<?php
namespace ccxt;

// ----------------------------------------------------------------------------

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

// -----------------------------------------------------------------------------
use \ccxt\Precise;
include_once PATH_TO_CCXT . '/test/base/test_shared_methods.php';

function test_order_book($exchange, $skipped_properties, $method, $orderbook, $symbol) {
    $format = array(
        'symbol' => 'ETH/BTC',
        'asks' => [[$exchange->parse_number('1.24'), $exchange->parse_number('0.453')], [$exchange->parse_number('1.25'), $exchange->parse_number('0.157')]],
        'bids' => [[$exchange->parse_number('1.23'), $exchange->parse_number('0.123')], [$exchange->parse_number('1.22'), $exchange->parse_number('0.543')]],
        'timestamp' => 1504224000000,
        'datetime' => '2017-09-01T00:00:00',
        'nonce' => 134234234,
    );
    $empty_allowed_for = ['symbol', 'nonce', 'datetime', 'timestamp']; // todo: make timestamp required
    assert_structure($exchange, $skipped_properties, $method, $orderbook, $format, $empty_allowed_for);
    assert_timestamp_and_datetime($exchange, $skipped_properties, $method, $orderbook);
    assert_symbol($exchange, $skipped_properties, $method, $orderbook, 'symbol', $symbol);
    $log_text = log_template($exchange, $method, $orderbook);
    //
    if ((is_array($skipped_properties) && array_key_exists('bid', $skipped_properties)) || (is_array($skipped_properties) && array_key_exists('ask', $skipped_properties))) {
        return;
    }
    $bids = $orderbook['bids'];
    $bids_length = count($bids);
    for ($i = 0; $i < $bids_length; $i++) {
        $current_bid_string = $exchange->safe_string($bids[$i], 0);
        $next_i = $i + 1;
        if ($bids_length > $next_i) {
            $next_bid_string = $exchange->safe_string($bids[$next_i], 0);
            $has_correct_order = Precise::string_gt($current_bid_string, $next_bid_string);
            assert($has_correct_order, 'current bid should be > than the next one: ' . $current_bid_string . '>' . $next_bid_string . $log_text);
        }
        assert_greater($exchange, $skipped_properties, $method, $bids[$i], 0, '0');
        assert_greater($exchange, $skipped_properties, $method, $bids[$i], 1, '0');
    }
    $asks = $orderbook['asks'];
    $asks_length = count($asks);
    for ($i = 0; $i < $asks_length; $i++) {
        $current_ask_string = $exchange->safe_string($asks[$i], 0);
        $next_i = $i + 1;
        if ($asks_length > $next_i) {
            $next_ask_string = $exchange->safe_string($asks[$next_i], 0);
            $has_correct_order = Precise::string_lt($current_ask_string, $next_ask_string);
            assert($has_correct_order, 'current ask should be < than the next one: ' . $current_ask_string . '<' . $next_ask_string . $log_text);
        }
        assert_greater($exchange, $skipped_properties, $method, $asks[$i], 0, '0');
        assert_greater($exchange, $skipped_properties, $method, $asks[$i], 1, '0');
    }
    if (is_array($skipped_properties) && array_key_exists('spread', $skipped_properties)) {
        return;
    }
    if ($bids_length && $asks_length) {
        $first_bid = $exchange->safe_string($bids[0], 0);
        $first_ask = $exchange->safe_string($asks[0], 0);
        // check bid-ask spread
        assert(Precise::string_lt($first_bid, $first_ask), 'bids[0][0] (' . $first_ask . ') should be < than asks[0][0] (' . $first_ask . ')' . $log_text);
    }
}
