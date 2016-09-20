/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn */

'use strict';

beforeEach(function() {
    delete window.addthis_share;
    delete window.addthis_config;
    delete window.addthis_plugin_info;
    delete window.addthis;

    module('addthis');
});

describe('with no explicit configuration', function() {
    var $addthis;

    beforeEach(inject(function($injector) {
        $addthis = $injector.get('$addthis');
    }));

    it('should define addthis_share as an empty object', function() {
        expect(window.addthis_share).toEqual({});
    });

    it('should define addthis_config as an empty object', function() {
        expect(window.addthis_config).toEqual({});
    });

    it('should define addthis_plugin_info', function() {
        expect(window.addthis_plugin_info).toBeDefined();
    });
});