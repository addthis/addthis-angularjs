/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn */

'use strict';

describe('addthis_config', function() {
    var $addthis;
    var profileId = 'ra-57b71bceb3ebb9df';
    var testConfigs = {
        'foo': 'bar'
    };

    describe('set via $addthis.config & profileID not set', function() {
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

        it('should match what was set', function() {
            var configCopy = $addthis.config(testConfigs);
            expect(configCopy).toEqual(testConfigs);
            expect(window.addthis_config).toEqual(testConfigs);
        });
    });
    describe('set via $addthis.config & profileId set', function() {
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
                configCopy = $addthisProvider.config({});
                expect(configCopy).toEqual({'pubid': profileId});
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should match what was set but also add in pubid', function() {
            var configCopy = $addthis.config(testConfigs);
            expect(configCopy.foo).toBe(testConfigs.foo);
            expect(configCopy.pubid).toBe(profileId);
            expect(window.addthis_config.foo).toBe(testConfigs.foo);
            expect(window.addthis_config.pubid).toBe(profileId);
        });
    });

    describe('set via $addthis.config & profileId, override profile id', function() {
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
                configCopy = $addthisProvider.config({});
                expect(configCopy).toEqual({'pubid': profileId});
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should be able to override the pubid', function() {
            var configCopy = $addthis.config({'pubid': 'foo'});
            expect(configCopy.pubid).toBe('foo');

            configCopy = $addthis.config({});
            expect(configCopy.pubid).toBe('foo');

            expect(window.addthis_config.pubid).toBe('foo');
        });
    });

    describe('set via $addthisProvider.config with ignore_server_config true', function() {
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

        it('should set window.addthis_config.ignore_server_config to true', function() {
            var configCopy = $addthis.config({ignore_server_config: true});
            expect(configCopy).toEqual({ignore_server_config: true});
            expect(window.addthis_config.ignore_server_config).toBe(true);
        });

        it('should set window.addthis_plugin_info.plugin_mode to Local', function() {
            var configCopy = $addthis.config({ignore_server_config: true});
            expect(window.addthis_plugin_info.plugin_mode).toBe('Local');
        });
    });

    describe('set via $addthisProvider.config with ignore_server_config false', function() {
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

        it('should set window.addthis_config.ignore_server_config to false', function() {
            var configCopy = $addthis.config({ignore_server_config: false});
            expect(configCopy).toEqual({ignore_server_config: false});
            expect(window.addthis_config.ignore_server_config).toBe(false);
        });

        it('should set window.addthis_plugin_info.plugin_mode to AddThis', function() {
            var configCopy = $addthis.config({ignore_server_config: false});
            expect(window.addthis_plugin_info.plugin_mode).toBe('AddThis');
        });
    });
});

