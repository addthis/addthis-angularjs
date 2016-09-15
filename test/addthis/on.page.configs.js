/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn */

describe('outside configs', function() {
   'use strict';

    var $addthis;
    var testConfigs = {
        'foo': 'bar',
        'pubid': 'blah'
    };

    var testShare = {
        url: 'foo',
        title: 'bar'
    };

    beforeEach(function() {
        module(function($addthisProvider) {
            window.addthis_config = angular.copy(testConfigs);
            window.addthis_share = angular.copy(testShare);

            var newProfileId = $addthisProvider.profile_id(false);
            expect(newProfileId).toBe(false);
            var configCopy = $addthisProvider.config({});
            expect(configCopy).toEqual({});
            var shareCopy = $addthisProvider.share({});
            expect(shareCopy).toEqual({});


        });
    });

    beforeEach(inject(function($injector) {
        $addthis = $injector.get('$addthis');
    }));

    describe('from window.addthis_config', function() {
        it('should be preserved', function() {
            expect(window.addthis_config).toEqual(testConfigs);
            var configCopy = $addthis.config();
            expect(testConfigs).toEqual(configCopy);

            expect(testConfigs.pubid).toEqual($addthis.profile_id());
        });
    });

    describe('from window.addthis_share', function() {
        it('should be preserved', function() {
            expect(window.addthis_share).toEqual(testShare);
            var ShareCopy = $addthis.share();
            expect(testShare).toEqual(ShareCopy);

            expect(testShare.title).toEqual($addthis.share_title());
            expect(testShare.url).toEqual($addthis.share_url());
        });
    });
});
