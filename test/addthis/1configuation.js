/* globals describe, inject, beforeEach, expect, it */
var validateAddThisService = function ($addthis) {
    expect($addthis).toBeDefined();
    expect($addthis.add).toBeDefined();
    expect($addthis.layers_refresh).toBeDefined();
    expect($addthis.config).toBeDefined();
    expect($addthis.share).toBeDefined();
    expect($addthis.share_url).toBeDefined();
    expect($addthis.share_title).toBeDefined();
    expect($addthis.loaded).toBeDefined();
};

var validateAddThisProvider = function ($addthisProvider) {
    expect($addthisProvider).toBeDefined();
    expect($addthisProvider.profile_id).toBeDefined();
    expect($addthisProvider.config).toBeDefined();
    expect($addthisProvider.share).toBeDefined();
    expect($addthisProvider.share_url).toBeDefined();
    expect($addthisProvider.share_title).toBeDefined();
    expect($addthisProvider.disable_auto_add).toBeDefined();
    expect($addthisProvider.enable_auto_add).toBeDefined();
    expect($addthisProvider.script_in_head).toBeDefined();
    expect($addthisProvider.$get).toBeDefined();
};

describe('addthis module', function() {
   'use strict';

    var $addthis;

    beforeEach(function() {
        delete window.addthis_share;
        delete window.addthis_config;
        module('addthis');
    });

    describe('$addthis service', function () {
        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should define $addthis service', function () {
            expect($addthis).toBeDefined();
        });
    });

    it('should define $addthis service and all its functions', function () {
        validateAddThisService($addthis);
    });

    describe('with no configuration', function() {
        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should define addthis_share as an empty object', function () {
            expect(window.addthis_share).toEqual({});
        });

        it('should define addthis_config as an empty object', function () {
            expect(window.addthis_config).toEqual({});
        });

        it('should define addthis_plugin_info', function () {
            expect(window.addthis_plugin_info).toBeDefined();
        });
    });

    describe('configuring share title with $addthisProvider.share_title', function() {
        var title = 'hello world';

        beforeEach(function() {
            module(function($addthisProvider) {
                validateAddThisProvider($addthisProvider);
                var result = $addthisProvider.share_title(title);
                validateAddThisProvider(result);
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should set addthis_share.title ', function () {
            expect(window.addthis_share.title).toBe(title);
        });
    });

    describe('configuring share url with $addthisProvider.share_url', function() {
        var url = 'https://www.addthis.com';

        beforeEach(function() {
            module(function($addthisProvider) {
                validateAddThisProvider($addthisProvider);
                var result = $addthisProvider.share_url(url);
                validateAddThisProvider(result);
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should set addthis_share.url ', function () {
            expect(window.addthis_share.url).toBe(url);
        });
    });

    describe('configuring profile ID with $addthisProvider.profile_id', function() {
        var profileId = 'ra-57b71bceb3ebb9df';

        beforeEach(function() {
            module(function($addthisProvider) {
                validateAddThisProvider($addthisProvider);
                var result = $addthisProvider.profile_id(profileId);
                validateAddThisProvider(result);
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should set addthis_share.url ', function () {
            expect(window.addthis_config.pubid).toBe(profileId);
        });
    });

    describe('configuring addthis_share with $addthisProvider.share', function() {
        var profileId = 'ra-57b71bceb3ebb9df';
        var addthis_share = {
            'url': 'http://www.example.com',
            'title': 'foo'
        };

        beforeEach(function() {
            module(function($addthisProvider) {
                validateAddThisProvider($addthisProvider);
                var result = $addthisProvider.share(addthis_share);
                validateAddThisProvider(result);
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should set addthis_share ', function () {
            //expect(window.addthis_share).not.toBe(addthis_share);
            //expect(window.addthis_share).toEqual(addthis_share);
        });
    });
});