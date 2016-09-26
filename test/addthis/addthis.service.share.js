/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn */

'use strict';

describe('addthis_share', function() {
    var $addthis;
    var title = 'hello world';
    var url = 'https://www.addthis.com';

    beforeEach(function() {
        module(function($addthisProvider) {
            // cleanup after last tests
            var newProfileId, configCopy, shareCopy;
            newProfileId = $addthisProvider.profile_id(false);
            expect(newProfileId).toBe(false);
            configCopy = $addthisProvider.config({});
            expect(configCopy).toEqual({});
            shareCopy = $addthisProvider.share({});
            expect(shareCopy).toEqual({});
        });
    });

    beforeEach(inject(function($injector) {
        $addthis = $injector.get('$addthis');
    }));

    describe('configuring title $addthis.share_title', function() {
        it('should set addthis_share.title ', function() {
            var titleResult = $addthis.share_title(title);
            expect(titleResult).toBe(title);

            titleResult = $addthis.share_title();
            expect(titleResult).toBe(title);

            expect(window.addthis_share.title).toBe(title);
        });
    });

    describe('configuring url with $addthis.share_url', function() {
        it('should set addthis_share.url ', function() {
            var urlResult = $addthis.share_url(url);
            expect(urlResult).toBe(url);

            urlResult = $addthis.share_url();
            expect(urlResult).toBe(url);

            expect(window.addthis_share.url).toBe(url);
        });
    });

    describe('configuring title & url with $addthis.share', function() {
        it('should set addthis_share.config with url & title', function() {
            var shareConfig = {
                'url': url,
                'title': title
            };

            var shareCopy = $addthis.share(shareConfig);
            expect(shareCopy).toEqual(shareConfig);
            expect(window.addthis_share).toEqual(shareConfig);
        });
    });

    describe('configuring twitter via with $addthisProvider.twitter_via', function() {
        var twitterHandle = 'addthis';
        it('should set addthis_share.passthrough.twitter.via', function() {
            $addthis.twitter_via(twitterHandle);
            expect(window.addthis_share.passthrough.twitter.via).toBe(twitterHandle);
        });

        it('should delete addthis_share.passthrough.twitter.via if defined and passed false', function() {
            $addthis.twitter_via(twitterHandle);
            expect(window.addthis_share.passthrough.twitter.via).toBeDefined();
            $addthis.twitter_via(false);
            expect(window.addthis_share.passthrough.twitter.via).toBeUndefined();
        });

        it('should do nothing to addthis_share.passthrough.twitter.via if not defined and passed false', function() {
            $addthis.share({'passthrough': {'twitter': {'foo': 'bar'}}});
            expect(window.addthis_share.passthrough.twitter.via).toBeUndefined();
            expect(window.addthis_share.passthrough.twitter.foo).toBe('bar');
            $addthis.twitter_via(false);
            expect(window.addthis_share.passthrough.twitter.via).toBeUndefined();
            expect(window.addthis_share.passthrough.twitter.foo).toBe('bar');
        });

        it('should set addthis_share.passthrough.twitter.via without touching other items in addthis_share.passthrough', function() {
            $addthis.share({'passthrough': {'foo': 'bar'}});
            $addthis.twitter_via(twitterHandle);
            expect(window.addthis_share.passthrough.twitter.via).toBe(twitterHandle);
            expect(window.addthis_share.passthrough.foo).toBe('bar');
        });

        it('should set addthis_share.passthrough.twitter.via without touching other items in addthis_share.passthrough.twitter', function() {
            $addthis.share({'passthrough': {'twitter': {'foo': 'bar'}}});
            $addthis.twitter_via(twitterHandle);
            expect(window.addthis_share.passthrough.twitter.via).toBe(twitterHandle);
            expect(window.addthis_share.passthrough.twitter.foo).toBe('bar');
        });
    });

    describe('configuring url shortening with $addthisProvider.url_shortening', function() {
        var urlShorteningService = 'bitly';
        var socialService = 'twitter';
        it('should set addthis_share.url_transforms.shorten & addthis_share.shorteners', function() {
            $addthis.url_shortening(urlShorteningService, socialService);
            expect(window.addthis_share.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect(window.addthis_share.shorteners[urlShorteningService]).toEqual({});
        });

        it('should set addthis_share.url_transforms.shorten & addthis_share.shorteners without touching other items in addthis_share.url_transforms', function() {
            $addthis.share({'url_transforms': {'foo': 'bar'}});
            $addthis.url_shortening(urlShorteningService, socialService);
            expect(window.addthis_share.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect(window.addthis_share.shorteners[urlShorteningService]).toEqual({});
            expect(window.addthis_share.url_transforms.foo).toBe('bar');
        });

        it('should set addthis_share.url_transforms.shorten & addthis_share.shorteners without touching other items in addthis_share.url_transforms.shorten', function() {
            $addthis.share({'url_transforms': {'shorten': {'foo': 'bar'}}});
            $addthis.url_shortening(urlShorteningService, socialService);
            expect(window.addthis_share.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect(window.addthis_share.shorteners[urlShorteningService]).toEqual({});
            expect(window.addthis_share.url_transforms.shorten.foo).toBe('bar');
        });

        it('should set addthis_share.url_transforms.shorten & addthis_share.shorteners without touching other items in addthis_share.shorteners', function() {
            $addthis.share({'shorteners': {'foo': 'bar'}});
            $addthis.url_shortening(urlShorteningService, socialService);
            expect(window.addthis_share.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect(window.addthis_share.shorteners[urlShorteningService]).toEqual({});
            expect(window.addthis_share.shorteners.foo).toBe('bar');
        });
    });
});