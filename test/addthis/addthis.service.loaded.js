/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn, waitsFor, runs, jasmine */

'use strict';

describe('$addthis.loaded()', function() {
    var $addthis;
    var $rootScope;
    var $q;
    var $interval;
    var $window;
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
        $rootScope = $injector.get('$rootScope');
        $q = $injector.get('$q');
        $interval = $injector.get('$interval');
        $window = $injector.get('$window');
        var spyonme = {
            'callback': function() {
                callbackSuccessful = true;
            }
        };
        spyOn(spyonme, 'callback');
    }));

    it('should return a promise', function() {
        var loadedPromise = $addthis.loaded();
        expect(typeof loadedPromise).toBe('object');
    });
});