/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn, waitsFor, runs, jasmine */

'use strict';

describe('$addthis.loaded', function() {
    var $addthis;
    var $interval;
    var $rootScope;
    var originalTimeout;

    beforeEach(function() {
        module(function($addthisProvider) {
            var newProfileId = $addthisProvider.profileId(false);
            expect(newProfileId).toBe(false);
            var configCopy = $addthisProvider.config({});
            expect(configCopy).toEqual({});
            var shareCopy = $addthisProvider.share({});
            expect(shareCopy).toEqual({});
        });
    });

    beforeEach(inject(function($injector) {
        $addthis = $injector.get('$addthis');
        $interval = $injector.get('$interval');
        $rootScope = $injector.get('$rootScope');
    }));

    it('should return a promise', function() {
        var promise1 = $addthis.loaded();
        expect(typeof promise1).toBe('object');
        expect(promise1.then).toBeDefined();
    });

    it('should resolve promise using $interval after window.addthis is defined', function(done) {
        var promise1 = $addthis.loaded();
        promise1.then(function(addthis) {
            expect(addthis).toBe(window.addthis);
            done();
        });

        $interval.flush(200);

        window.addthis = { layers: { refresh: function(url, title) {}, lastViewRegistered: 0 } };
        $interval.flush(200);
    });

    it('should return same promise if called twice before being resolved', function() {
        var promise1 = $addthis.loaded();
        var promise2 = $addthis.loaded();
        expect(promise1).toBe(promise2);
    });

    it('should return same promise if called once before being resolved and once after', function(done) {
        var promise1 = $addthis.loaded();
        promise1.then(function(addthis) {
            var promise2 = $addthis.loaded();
            expect(promise1).toBe(promise2);
            done();
        });

        window.addthis = { layers: { refresh: function(url, title) {}, lastViewRegistered: 0 } };
        $interval.flush(200);
    });

    it('should resolve promise without using $interval if called after window.addthis is defined', function(done) {
        window.addthis = { layers: { refresh: function(url, title) {}, lastViewRegistered: 0 } };

        var promise1 = $addthis.loaded();
        promise1.then(function(addthis) {
            expect(addthis).toBe(window.addthis);
            done();
        });

        $rootScope.$digest();
    });
});