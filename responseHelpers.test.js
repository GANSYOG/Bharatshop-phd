const test = require('node:test');
const assert = require('node:assert');
const { createFallbackResponse } = require('./responseHelpers');

test('createFallbackResponse returns correctly structured object', (t) => {
    const text = 'This is a test product description that should be included in the response.';
    const result = createFallbackResponse(text, 'en');

    assert.ok(result.productDetails, 'Should have productDetails');
    assert.ok(result.recommendations, 'Should have recommendations');
    assert.ok(result.priceAnalysis, 'Should have priceAnalysis');
    assert.ok(result.shoppingTips, 'Should have shoppingTips');

    assert.strictEqual(typeof result.productDetails.name, 'string');
    assert.strictEqual(typeof result.productDetails.category, 'string');
    assert.ok(Array.isArray(result.recommendations), 'recommendations should be an array');
    assert.ok(Array.isArray(result.shoppingTips), 'shoppingTips should be an array');
});

test('createFallbackResponse truncates description correctly', (t) => {
    const longText = 'A'.repeat(300);
    const result = createFallbackResponse(longText, 'en');

    assert.strictEqual(result.productDetails.description.length, 203); // 200 + '...'
    assert.ok(result.productDetails.description.endsWith('...'));
    assert.strictEqual(result.productDetails.description.substring(0, 200), 'A'.repeat(200));
});

test('createFallbackResponse handles empty text', (t) => {
    const result = createFallbackResponse('', 'en');
    assert.strictEqual(result.productDetails.description, '...');
});

test('createFallbackResponse returns default recommendations and tips', (t) => {
    const result = createFallbackResponse('test', 'en');

    assert.ok(result.recommendations.includes('Check customer reviews before purchasing'));
    assert.strictEqual(result.priceAnalysis.range, 'Price varies by brand and seller');
    assert.ok(result.shoppingTips.includes('Buy from authorized sellers'));
});

test('createFallbackResponse ignores language for now (as per current implementation)', (t) => {
    const resultHi = createFallbackResponse('test', 'hi');
    const resultEn = createFallbackResponse('test', 'en');

    // They should be identical since current implementation doesn't use language
    assert.deepStrictEqual(resultHi, resultEn);
});
