/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn */

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

describe('addthis_share', function() {
   'use strict';

    var $addthis;

    describe('configuring title $addthisProvider.share_title', function() {
        var title = 'hello world';

        beforeEach(function() {
            module(function($addthisProvider) {
                var newProfileId = $addthisProvider.profile_id(false);
                expect(newProfileId).toBe(false);
                var configCopy = $addthisProvider.config({});
                expect(configCopy).toEqual({});
                var shareCopy = $addthisProvider.share({});
                expect(shareCopy).toEqual({});

                validateAddThisProvider($addthisProvider);
                var titleResult = $addthisProvider.share_title(title);

                expect(titleResult).toBe(title);
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should set addthis_share.title ', function() {
            expect(window.addthis_share.title).toBe(title);
        });
    });

    describe('configuring url with $addthisProvider.share_url', function() {
        var url = 'https://www.addthis.com';

        beforeEach(function() {
            module(function($addthisProvider) {
                validateAddThisProvider($addthisProvider);
                var urlResult = $addthisProvider.share_url(url);
                expect(urlResult).toBe(url);
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should set addthis_share.url ', function() {
            expect(window.addthis_share.url).toBe(url);
        });
    });
});