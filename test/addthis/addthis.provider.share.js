/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn */

'use strict';

describe('addthis_share', function() {
    var $addthis;
    var title = 'hello world';
    var url = 'https://www.addthis.com';
    var description = 'this is a description';
    var media = 'https://www.addthis.com/img/png';

    describe('configuring title $addthisProvider.shareTitle', function() {
        beforeEach(function() {
            module(function($addthisProvider) {
                // cleanup after last tests
                var newProfileId, configCopy, shareCopy;
                newProfileId = $addthisProvider.profileId(false);
                expect(newProfileId).toBe(false);
                configCopy = $addthisProvider.config({});
                expect(configCopy).toEqual({});
                shareCopy = $addthisProvider.share({});
                expect(shareCopy).toEqual({});

                var titleResult;
                titleResult = $addthisProvider.shareTitle(title);
                expect(titleResult).toBe(title);
                titleResult = $addthisProvider.shareTitle();
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

    describe('configuring url with $addthisProvider.shareUrl', function() {
        beforeEach(function() {
            module(function($addthisProvider) {
                // cleanup after last tests
                var newProfileId, configCopy, shareCopy;
                newProfileId = $addthisProvider.profileId(false);
                expect(newProfileId).toBe(false);
                configCopy = $addthisProvider.config({});
                expect(configCopy).toEqual({});
                shareCopy = $addthisProvider.share({});
                expect(shareCopy).toEqual({});

                var urlResult;
                urlResult = $addthisProvider.shareUrl(url);
                expect(urlResult).toBe(url);
                urlResult = $addthisProvider.shareUrl();
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

    describe('configuring title & url with $addthisProvider.share', function() {
        var shareConfig = {
            'url': url,
            'title': title
        };

        beforeEach(function() {
            module(function($addthisProvider) {
                // cleanup after last tests
                var newProfileId, configCopy, shareCopy;
                newProfileId = $addthisProvider.profileId(false);
                expect(newProfileId).toBe(false);
                configCopy = $addthisProvider.config({});
                expect(configCopy).toEqual({});
                shareCopy = $addthisProvider.share({});
                expect(shareCopy).toEqual({});

                shareCopy = $addthisProvider.share(shareConfig);
                expect(shareCopy).toEqual(shareConfig);
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should set addthis_share.config with url & title', function() {
            expect(window.addthis_share).toEqual(shareConfig);
        });
    });

    describe('configuring description $addthisProvider.shareDescription', function() {
        beforeEach(function() {
            module(function($addthisProvider) {
                // cleanup after last tests
                var newProfileId, configCopy, shareCopy;
                newProfileId = $addthisProvider.profileId(false);
                expect(newProfileId).toBe(false);
                configCopy = $addthisProvider.config({});
                expect(configCopy).toEqual({});
                shareCopy = $addthisProvider.share({});
                expect(shareCopy).toEqual({});

                var descriptionResult;
                descriptionResult = $addthisProvider.shareDescription(description);
                expect(descriptionResult).toBe(description);
                descriptionResult = $addthisProvider.shareDescription();
                expect(descriptionResult).toBe(description);
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should set addthis_share.description ', function() {
            expect(window.addthis_share.description).toBe(description);
        });
    });

    describe('configuring media $addthisProvider.shareMedia', function() {
        beforeEach(function() {
            module(function($addthisProvider) {
                // cleanup after last tests
                var newProfileId, configCopy, shareCopy;
                newProfileId = $addthisProvider.profileId(false);
                expect(newProfileId).toBe(false);
                configCopy = $addthisProvider.config({});
                expect(configCopy).toEqual({});
                shareCopy = $addthisProvider.share({});
                expect(shareCopy).toEqual({});

                var mediaResult;
                mediaResult = $addthisProvider.shareMedia(media);
                expect(mediaResult).toBe(media);
                mediaResult = $addthisProvider.shareMedia();
                expect(mediaResult).toBe(media);
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should set addthis_share.media ', function() {
            expect(window.addthis_share.media).toBe(media);
        });
    });

    describe('configuring twitter via with $addthisProvider.twitterVia', function() {
        var twitterHandle = 'addthis';
        beforeEach(function() {
            module(function($addthisProvider) {
                // cleanup after last tests
                var newProfileId, configCopy, shareCopy;
                newProfileId = $addthisProvider.profileId(false);
                expect(newProfileId).toBe(false);
                configCopy = $addthisProvider.config({});
                expect(configCopy).toEqual({});
                shareCopy = $addthisProvider.share({});
                expect(shareCopy).toEqual({});

                $addthisProvider.twitterVia(twitterHandle);
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should set addthis_share.passthrough.twitter.via', function() {
            expect(window.addthis_share.passthrough.twitter.via).toBe(twitterHandle);
        });
    });

    describe('configuring url shortening with $addthisProvider.urlShortening', function() {
        var urlShorteningService = 'bitly';
        var socialService = 'twitter';
        beforeEach(function() {
            module(function($addthisProvider) {
                // cleanup after last tests
                var newProfileId, configCopy, shareCopy;
                newProfileId = $addthisProvider.profileId(false);
                expect(newProfileId).toBe(false);
                configCopy = $addthisProvider.config({});
                expect(configCopy).toEqual({});
                shareCopy = $addthisProvider.share({});
                expect(shareCopy).toEqual({});

                $addthisProvider.urlShortening(urlShorteningService, socialService);
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should set addthis_share.url_transforms.shorten & addthis_share.shorteners', function() {
            expect(window.addthis_share.url_transforms.shorten[socialService]).toBe(urlShorteningService);
            expect(window.addthis_share.shorteners[urlShorteningService]).toEqual({});
        });
    });
});