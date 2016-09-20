/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn, waitsFor, runs, jasmine */

'use strict';

describe('$addthis.layers_refresh', function() {
    var $addthis;
    var $interval;
    var originalTimeout;

    beforeEach(function() {
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
        $interval = $injector.get('$interval');
    }));

    it('should not cancel $interval if window.addthis.layers.refresh is not yet defined', function() {
        spyOn($interval, 'cancel').and.callThrough();
        $addthis.layers_refresh();
        $interval.flush(100);
        expect($interval.cancel).not.toHaveBeenCalled();
    });

    it('should cancel $interval once window.addthis.layers.refresh is called', function(done) {
        window.addthis = { layers: { refresh: function(url, title) {}, lastViewRegistered: 0 } };
        spyOn($interval, 'cancel').and.callThrough();
        spyOn(window.addthis.layers, 'refresh').and.callThrough();

        $addthis.layers_refresh();
        expect(window.addthis.layers.refresh).not.toHaveBeenCalled();
        setTimeout(function() {
            $interval.flush(100);
            expect($interval.cancel).toHaveBeenCalled();
            done();
        }, 100);
    });

    it('should call window.addthis.layers.refresh', function(done) {
        window.addthis = { layers: { refresh: function(url, title) {}, lastViewRegistered: 0 } };
        spyOn(window.addthis.layers, 'refresh').and.callThrough();

        $addthis.layers_refresh();
        expect(window.addthis.layers.refresh).not.toHaveBeenCalled();
        setTimeout(function() {
            $interval.flush(100);
            expect(window.addthis.layers.refresh).toHaveBeenCalled();
            done();
        }, 100);
    });

    it('should wait 100ms before calling window.addthis.layers.refresh between calls', function(done) {
        var msInterval = 100;

        window.addthis = { layers: { refresh: function(url, title) {}, lastViewRegistered: 0 } };
        spyOn(window.addthis.layers, 'refresh').and.callThrough();

        $addthis.layers_refresh();
        expect(window.addthis.layers.refresh).not.toHaveBeenCalled();
        setTimeout(function() {
            $interval.flush(100);
            expect(window.addthis.layers.refresh.calls.count()).toEqual(1);
            $addthis.layers_refresh();
            expect(window.addthis.layers.refresh.calls.count()).toEqual(1);
            setTimeout(function() {
                $interval.flush(100);
                expect(window.addthis.layers.refresh.calls.count()).toEqual(2);
                done();
            }, msInterval);
        }, msInterval);
    });

    it('should wait 500ms before calling window.addthis.layers.refresh if lastViewRegistered is now', function(done) {
        var now = (new Date()).getTime();
        window.addthis = { layers: { refresh: function(url, title) {}, lastViewRegistered: now } };
        spyOn(window.addthis.layers, 'refresh').and.callThrough();
        spyOn($interval, 'cancel').and.callThrough();

        $addthis.layers_refresh();
        expect(window.addthis.layers.refresh).not.toHaveBeenCalled();
        var msLeft = 500;
        var msInterval = 100;

        var intervalId = setInterval(function() {
            $interval.flush(msInterval);
            msLeft = msLeft - msInterval;
            if (msLeft > 0) {
                expect(window.addthis.layers.refresh).not.toHaveBeenCalled();
            } else {
                clearInterval(intervalId);
                setTimeout(function() {
                    expect(window.addthis.layers.refresh).toHaveBeenCalled();
                    expect($interval.cancel).toHaveBeenCalled();
                    done();
                }, msInterval);

            }
        }, msInterval);
    });
});