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
});