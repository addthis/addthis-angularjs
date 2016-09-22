/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn */

'use strict';

describe('$addthisProvider environment()', function() {
    var $addthis;

    var prod = 'https://s7.addthis.com/js/300/addthis_widget.js';
    var test = 'http://cache-test.addthis.com/js/300/addthis_widget.js';
    var dev = 'http://cache-dev.addthis.com/js/300/addthis_widget.js';
    var local = 'http://cache-local.addthis.com/js/300/addthis_widget.js';
    var unittest = 'addthis_widget.js';

    describe('with no params', function() {
        var url;

        beforeEach(function() {
            module(function($addthisProvider) {
                url = $addthisProvider.environment();
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should return the default production URL by default', function() {
            expect(url).toBe(prod);
        });
    });

    describe('with test param', function() {
        var url;

        beforeEach(function() {
            module(function($addthisProvider) {
                url = $addthisProvider.environment('test');
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should return test URL', function() {
            expect(url).toBe(test);
        });
    });

    describe('with dev param', function() {
        var url;

        beforeEach(function() {
            module(function($addthisProvider) {
                url = $addthisProvider.environment('dev');
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should return dev URL', function() {
            expect(url).toBe(dev);
        });
    });

    describe('with local param', function() {
        var url;

        beforeEach(function() {
            module(function($addthisProvider) {
                url = $addthisProvider.environment('local');
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should return local URL', function() {
            expect(url).toBe(local);
        });
    });

    describe('with unittest param', function() {
        var url;

        beforeEach(function() {
            module(function($addthisProvider) {
                url = $addthisProvider.environment('unittest');
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should return local URL', function() {
            expect(url).toBe(unittest);
        });
    });
});