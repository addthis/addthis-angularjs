/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn */

'use strict';

describe('$addthis provider', function() {
    var $addthisProvider;

    var validateAddThisProvider = function($addthisProvider) {
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

    it('should be defined', function() {
        module(function($addthisProvider) {
            expect($addthisProvider).toBeDefined();
        });
    });

    it('should define $addthis service and all its functions', function() {
        module(function($addthisProvider) {
            validateAddThisProvider($addthisProvider);
        });
    });

    it('should delete internal addthis_share.url if set at start and window.addthis exists already', function() {
        window.addthis_share = { 'url': 'foo' };
        window.addthis = true;

        module(function($addthisProvider) {
            var configCopy = $addthisProvider.config();
            expect(configCopy.url).toBeUndefined();
        });

        inject(function($injector) {
            var $addthis = $injector.get('$addthis');
        });
    });

    it('should delete internal addthis_share.title if set at start and window.addthis exists already', function() {
        window.addthis_share = { 'title': 'bar' };
        window.addthis = true;

        module(function($addthisProvider) {
            var configCopy = $addthisProvider.config();
            expect(configCopy.url).toBeUndefined();
        });

        inject(function($injector) {
            var $addthis = $injector.get('$addthis');
        });
    });

    it('should delete internal addthis_share.description if set at start and window.addthis exists already', function() {
        window.addthis_share = { 'description': 'baz' };
        window.addthis = true;

        module(function($addthisProvider) {
            var configCopy = $addthisProvider.config();
            expect(configCopy.description).toBeUndefined();
        });

        inject(function($injector) {
            var $addthis = $injector.get('$addthis');
        });
    });

    it('should delete internal addthis_share.media if set at start and window.addthis exists already', function() {
        window.addthis_share = { 'media': 'image' };
        window.addthis = true;

        module(function($addthisProvider) {
            var configCopy = $addthisProvider.config();
            expect(configCopy.media).toBeUndefined();
        });

        inject(function($injector) {
            var $addthis = $injector.get('$addthis');
        });
    });
});