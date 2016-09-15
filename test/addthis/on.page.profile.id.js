/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn */

'use strict';

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

describe('profile id', function() {
    var $addthis;
    var profileId = 'ra-57b71bceb3ebb9df';

    beforeEach(function() {
        module(function($addthisProvider) {
            window.addthis_config = { 'pubid': profileId };

            var newProfileId = $addthisProvider.profile_id(false);
            expect(newProfileId).toBe(false);
            var configCopy = $addthisProvider.config({});
            expect(configCopy).toEqual({});
            var shareCopy = $addthisProvider.share({});
            expect(shareCopy).toEqual({});
        });
    });

    describe('using window.addthis_config.pubid', function() {
        beforeEach(inject(function($injector) {
           $addthis = $injector.get('$addthis');
        }));

        it('should be returned by $addthis.profile_id', function() {
            /** if we picked up the pubid, we always populated it into
             * addthis_config when you set it (unless you passed a new one with
             * your new configs, in which case we start using that)
             */
            var newProfileId = $addthis.profile_id();
            expect(newProfileId).toBe(profileId);
        });

        it('should be in addthis_config.pubid', function() {
            expect(window.addthis_config.pubid).toBe(profileId);
        });

        it('should be added into an empty addthis_config', function() {
            var config = $addthis.config({});
            expect(config.pubid).toBe(profileId);
        });

        it('should be added into a non-empty addthis_config that does not have pubid set', function() {
            var config = $addthis.config({'foo': 'bar'});
            expect(config.pubid).toBe(profileId);
            expect(config.foo).toBe('bar');
        });
    });
});