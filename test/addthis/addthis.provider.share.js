/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn */

'use strict';

describe('addthis_share', function() {
    var $addthis;
    var title = 'hello world';
    var url = 'https://www.addthis.com';
    var description = 'this is a description';
    var media = 'https://www.addthis.com/img/png';

    describe('configuring title $addthisProvider.share_title', function() {
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

                var titleResult;
                titleResult = $addthisProvider.share_title(title);
                expect(titleResult).toBe(title);
                titleResult = $addthisProvider.share_title();
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

                var urlResult;
                urlResult = $addthisProvider.share_url(url);
                expect(urlResult).toBe(url);
                urlResult = $addthisProvider.share_url();
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
                newProfileId = $addthisProvider.profile_id(false);
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

    describe('configuring description $addthisProvider.share_description', function() {
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

                var descriptionResult;
                descriptionResult = $addthisProvider.share_description(description);
                expect(descriptionResult).toBe(description);
                descriptionResult = $addthisProvider.share_description();
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

    describe('configuring media $addthisProvider.share_media', function() {
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

                var mediaResult;
                mediaResult = $addthisProvider.share_media(media);
                expect(mediaResult).toBe(media);
                mediaResult = $addthisProvider.share_media();
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

    describe('configuring twitter via with $addthisProvider.twitter_via', function() {
        var twitterHandle = 'addthis';
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

                $addthisProvider.twitter_via(twitterHandle);
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should set addthis_share.passthrough.twitter.via', function() {
            expect(window.addthis_share.passthrough.twitter.via).toBe(twitterHandle);
        });
    });

    describe('configuring url shortening with $addthisProvider.url_shortening', function() {
        var urlShorteningService = 'bitly';
        var socialService = 'twitter';
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

                $addthisProvider.url_shortening(urlShorteningService, socialService);
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