/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn */

'use strict';

describe('$addthisProvider configure profile id', function() {
    var $addthis;
    var profileId = 'ra-57b71bceb3ebb9df';

    describe('using $addthisProvider.profile_id', function() {
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

                newProfileId = $addthisProvider.profile_id(profileId);
                expect(newProfileId).toBe(profileId);
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should be set', function() {
            expect(window.addthis_config.pubid).toBe(profileId);
        });
    });

    describe('using $addthisProvider.config.pubid', function() {
        var addthis_config = {
            'pubid': profileId
        };

        beforeEach(function() {
            module(function($addthisProvider) {
                var result = $addthisProvider.config(addthis_config);
                expect(result).toEqual(addthis_config);
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should set addthis_share ', function() {
            expect(window.addthis_config.pubid).toBe(profileId);
        });
    });
});