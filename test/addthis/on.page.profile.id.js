/* globals describe, inject, beforeEach, expect, it */

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

    window.addthis_config = { 'pubid': profileId };

    describe('using window.addthis_config.pubid', function() {

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should be set', function() {
            /** if we picked up the pubid, we always populated it into
             * addthis_config when you set it (unless you passed a new one with
             * your new configs, in which case we start using that)
             */
            $addthis.config({});
            expect(window.addthis_config.pubid).toBe(profileId);
//            $addthis.config({ pubid: 123 });
//            expect(window.addthis_config.pubid).toBe(profileId);
        });
    });
/*
    describe('using $addthisProvider.config.pubid', function() {
        var addthis_config = {
            'pubid': profileId
        };

        beforeEach(function() {
            module(function($addthisProvider) {
                validateAddThisProvider($addthisProvider);
                var result = $addthisProvider.config(addthis_config);
                validateAddThisProvider(result);
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should set addthis_share ', function() {
            $addthis.config({});
            expect(window.addthis_config.pubid).toBe(profileId);
        });
    });
*/
});