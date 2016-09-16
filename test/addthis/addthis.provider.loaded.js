/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn, waitsFor, runs, jasmine */

'use strict';

describe('$addthis.loaded()', function() {
    var $addthis;
    var originalTimeout;
    var callbackSuccessful;

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

    it('should return a promise', function() {
        var loadedPromise = $addthis.loaded();
        expect(typeof loadedPromise).toBe('object');
    });

    it('should return the same promise if unresolved', function() {
        var loadedPromise = $addthis.loaded();
        expect(typeof loadedPromise).toBe('object');
        var loadedPromise2 = $addthis.loaded();
        expect(loadedPromise).toBe(loadedPromise2);
    });
});