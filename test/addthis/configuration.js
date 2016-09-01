/* globals describe, inject, beforeEach, expect, it */
describe('addthis module', function() {
   'use strict';

    var $addthis;

    beforeEach(function() {
        module('addthis');
    });

    describe('$addthis service', function () {
        beforeEach(inject(function (_$addthis_) {
            $addthis = _$addthis_;
        }));

        it('should define $addthis service', function () {
            expect($addthis).toBeDefined();
        });

    });

    // Here we don't do any configuration to our provider, and start with
    // addthis_config and addthis_share undefined
    describe('with no configuration', function() {
        beforeEach(function() {
            inject(function(_$addthis_) {
                $addthis = _$addthis_;
            });
        });

        it('should define service', function () {
            expect($addthis).toBeDefined();
        });

        it('should define addthis_share', function () {
            expect(window.addthis_share).toBeDefined();
        });

        it('should define addthis_config', function () {
            expect(window.addthis_config).toBeDefined();
        });

        it('should define addthis_plugin_info', function () {
            expect(window.addthis_plugin_info).toBeDefined();
        });
    });

    // Here we do some configuration
    describe('configuring share title with $addthisProvider.share_title', function() {
        var title = 'hello world';
        var url = 'https://www.addthis.com';
        var profileId = 'ra-57b71bceb3ebb9df';

        // Configure the provider and instanciate it
        beforeEach(function() {
            module(function($addthisProvider) {
                $addthisProvider.share_title(title);
            });

            inject(function(_$addthis_) {
                $addthis = _$addthis_;
            });
        });

        it('should have set addthis_share.title ', function () {
            expect(window.addthis_share.title).toBe(title);
        });
    });
});