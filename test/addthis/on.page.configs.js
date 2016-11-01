/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn */
'use strict';

describe('outside configs', function() {
    var $addthis;
    var testConfigs1 = {
        'foo': 'bar'
    };
    var testConfigs2 = {
        'foo': 'bar',
        'pubid': 'blah'
    };
    var testShare = {
        url: 'foo',
        title: 'bar',
        description: 'baz',
        media: 'image'
    };

    describe('without profile ID', function() {
        beforeEach(function() {
            window.addthis_config = angular.copy(testConfigs1);
            window.addthis_share = angular.copy(testShare);

            module(function($addthisProvider) {
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
                expect(window.addthis_config).toEqual(testConfigs1);
                var configCopy = $addthis.config();
                expect(testConfigs1).toEqual(configCopy);
            });
        });

        describe('from window.addthis_share', function() {
            it('should be preserved', function() {
                expect(window.addthis_share).toEqual(testShare);
                var ShareCopy = $addthis.share();
                expect(testShare).toEqual(ShareCopy);

                expect(testShare.title).toEqual($addthis.share_title());
                expect(testShare.url).toEqual($addthis.share_url());
                expect(testShare.description).toEqual($addthis.share_description());
                expect(testShare.media).toEqual($addthis.share_media());
            });
        });
    });

    describe('with profile ID', function() {
        beforeEach(function() {
            window.addthis_config = angular.copy(testConfigs2);

            module(function($addthisProvider) {
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
                expect(window.addthis_config).toEqual(testConfigs2);
                var configCopy = $addthis.config();
                expect(testConfigs2).toEqual(configCopy);

                expect(testConfigs2.pubid).toEqual($addthis.profile_id());
            });
        });
    });
});
